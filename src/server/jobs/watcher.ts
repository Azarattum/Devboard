import type { ImperativeCapture, Capture, Config } from "~/types/config";
import { statistics, type Build } from "../db/schema";
import { parseTime, unixDay } from "~/lib/utils";
import EventEmitter from "node:events";
import { and, eq } from "drizzle-orm";
import slack from "@slack/bolt";
import { db } from "../db";

type Slack = slack.App;

export function watch(config: Config) {
  const app =
    config.slack && new slack.App({ ...config.slack, socketMode: true });

  Object.entries(config.builds).forEach(([environment, captures]) => {
    const captureWhen = (status: Build["status"]) => {
      capture(captures[status], app, (detail) => {
        const seconds = parseTime(detail) / 1000;
        events.emit("build", environment, status, seconds);
      });
    };

    captureWhen("success");
    captureWhen("pending");
    captureWhen("fail");
  });

  Object.entries(config.statistics).forEach(([label, target]) => {
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

  capture(config.activity.idle, app, (value) => {
    if (Number.isFinite(+value)) events.emit("activity", +value);
  });

  capture(config.activity.event, app, async (detail) => {
    const activity = await execute(config.activity.idle);
    if (Number.isFinite(+activity)) events.emit("activity", +activity, detail);
  });

  void app?.start();
}

const filter = (params: Capture) => (text?: string) => {
  if (!text) return false;

  const { include, exclude, capture, match } = params;
  if (exclude?.some((x) => text.includes(x))) return false;
  if (include && !include.every((x) => text.includes(x))) return false;

  if (!match) return text;
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (match.global) return String(text.match(match)?.length) || false;
  return text.match(match)?.[capture ?? 0] ?? false;
};

function capture(
  params: Capture | undefined,
  app: Slack | undefined,
  callback: (captured: string) => void,
) {
  if (!params) return;
  const validate = filter(params);

  if ("url" in params) {
    setInterval(
      () => void execute(params).then((text) => text && callback(text)),
      params.interval,
    );
  } else {
    const { channel, user } = params;
    app?.event("message", async (event) => {
      if (event.message.channel !== channel) return;
      if (user && (event.message as { user?: string }).user !== user) return;

      const captured = validate((event.message as { text?: string }).text);
      if (captured) callback(captured);
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
  build: [environment: string, status: Build["status"], duration: number];
  statistics: [label: string, value: number, day: number];
  activity: [value: number, event?: string];
};

export const events = new EventEmitter<Events>();
