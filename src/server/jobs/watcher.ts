import type { ImperativeCapture, Capture, Config } from "../../types/config";
import { environments, statistics, type Build } from "../db/schema";
import slack, { type RichTextBlock } from "@slack/bolt";
import { parseTime, unixDay } from "../../lib/utils";
import EventEmitter from "node:events";
import { and, eq } from "drizzle-orm";
import { db } from "../db";

type Slack = slack.App;

export async function watch(config: Config) {
  const app =
    config.slack && new slack.App({ ...config.slack, socketMode: true });

  await db
    .insert(environments)
    .values(Object.keys(config.builds ?? {}).map((name) => ({ name })))
    .onConflictDoNothing();

  Object.entries(config.builds ?? {}).forEach(([environment, captures]) => {
    const captureWhen = (status: Build["status"]) => {
      capture(captures[status], app, (detail, extra) => {
        const seconds = parseTime(detail) / 1000;
        events.emit("build", environment, status, seconds, extra);
      });
    };

    captureWhen("success");
    captureWhen("pending");
    captureWhen("fail");
  });

  Object.entries(config.statistics ?? {}).forEach(([label, target]) => {
    capture(target, app, async (count) => {
      const today = unixDay();
      const [current] = await db
        .select({ value: statistics.value })
        .from(statistics)
        .where(and(eq(statistics.label, label), eq(statistics.day, today)));
      const value = (current?.value ?? 0) + (+count ?? 0);
      events.emit("statistics", label, value, today);
    });
  });

  capture(config.activity?.idle, app, (value) => {
    if (Number.isFinite(+value)) events.emit("activity", +value);
  });

  capture(config.activity?.event, app, async (event) => {
    const activity = await execute(config.activity?.idle);
    if (Number.isFinite(+activity)) events.emit("activity", +activity, event);
  });

  void app?.start();
}

const filter = (params: Capture) => (text?: string) => {
  if (!text) return false;

  const { include, exclude, capture, match } = params;
  if (exclude?.some((x) => text.includes(x))) return false;
  if (include && !include.every((x) => text.includes(x))) return false;

  if (!match) return text;
  if (match.global) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return (text.match(match)?.length || null)?.toString() || false;
  }
  return (
    text.match(match)?.[typeof capture === "number" ? capture : 0] ?? false
  );
};

function capture(
  params: Capture | undefined,
  app: Slack | undefined,
  callback: (captured: string, extra?: string) => void,
) {
  if (!params) return;
  const validate = filter(params);

  if ("url" in params) {
    setInterval(
      () => void execute(params).then((text) => text && callback(text)),
      params.interval,
    );
  } else {
    const { channel, capture, threads, extra, user } = params;
    function resolve(user?: string) {
      return (
        user &&
        app?.client.users.info({ user }).then(
          (x) => x.user?.name,
          () => undefined,
        )
      );
    }

    app?.event("message", async (event) => {
      const { subtype } = event.message;
      if (subtype && subtype !== "file_share" && subtype !== "bot_message") {
        return;
      }
      if (event.message.channel !== channel) return;
      if (user && event.message.user !== user) return;
      if (!threads && event.message.thread_ts) return;
      const { message } = event;

      const captured = validate(message.text);
      if (captured) {
        const resolvers = {
          mentioned: () => {
            const ids = message.blocks
              ?.filter((x): x is RichTextBlock => x.type === "rich_text")
              .flatMap((block) =>
                block.elements.flatMap((element) =>
                  element.elements
                    .filter((x) => x.type === "user")
                    .map((x) => x.user_id),
                ),
              );

            if (ids) {
              return Promise.all(ids.map(resolve)).then((x) => x.join(", "));
            }
          },
          author: () => resolve(message.user),
        };

        const details = extra && (await resolvers[extra]());
        callback(capture === "extra" && details ? details : captured, details);
      }
    });
  }
}

async function execute(params?: ImperativeCapture) {
  if (!params) return false;

  if ("url" in params) {
    return fetch(params.url)
      .then((response) => response.text())
      .then(filter(params))
      .then((text) => text ?? false);
  }

  return false;
}

export type Events = {
  build: [
    environment: string,
    status: Build["status"],
    duration: number,
    extra?: string,
  ];
  statistics: [label: string, value: number, day: number];
  activity: [value: number, event?: string];
};

export const events = new EventEmitter<Events>();
