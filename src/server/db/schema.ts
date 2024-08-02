/* eslint-disable perfectionist/sort-objects */
import {
  sqliteTable as table,
  primaryKey,
  text,
  real,
  int,
} from "drizzle-orm/sqlite-core";
import { type InferSelectModel, relations, sql } from "drizzle-orm";

export const environments = table("environments", {
  name: text("name").primaryKey(),
});
export type Environment = InferSelectModel<typeof environments>;

export const environmentsRelations = relations(environments, ({ many }) => ({
  builds: many(builds),
}));
export type EnvironmentBuilds = InferSelectModel<typeof environments> & {
  builds: Build[];
};

export const builds = table(
  "builds",
  {
    environment: text("environment")
      .references(() => environments.name)
      .notNull(),
    timestamp: int("timestamp", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    duration: real("duration"),
    status: text("status", {
      enum: ["success", "fail", "pending", "locked", "unlocked"],
    }).notNull(),
    extra: text("extra"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.environment, table.timestamp] }),
  }),
);
export type Build = InferSelectModel<typeof builds>;

export const buildsRelations = relations(builds, ({ one }) => ({
  details: one(environments, {
    fields: [builds.environment],
    references: [environments.name],
  }),
}));

export const statistics = table(
  "statistics",
  {
    day: int("day").notNull(),
    label: text("label").notNull(),
    value: int("value").default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.day, table.label] }),
  }),
);
export type Statistic = InferSelectModel<typeof statistics>;

export const activity = table("activity", {
  timestamp: int("timestamp", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull()
    .primaryKey(),
  value: int("value").default(0).notNull(),
  event: text("event"),
});
export type Activity = InferSelectModel<typeof activity>;
