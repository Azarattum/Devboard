/* eslint-disable perfectionist/sort-objects */
import {
  sqliteTable as table,
  primaryKey,
  numeric,
  text,
  int,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const builds = table(
  "builds",
  {
    environment: text("environment").notNull(),
    timestamp: int("timestamp", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    duration: numeric("duration").notNull(),
    status: text("status", { enum: ["success", "fail", "pending"] }).notNull(),
    users: text("users", { mode: "json" })
      .default(sql`[]`)
      .notNull()
      .$type<string[]>(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.environment, table.timestamp] }),
  }),
);

export const statistics = table("statistics", {
  label: text("label").primaryKey(),
  value: int("value").default(0),
});

export const activity = table("activity", {
  timestamp: text("timestamp").primaryKey(),
  value: int("value").default(0).notNull(),
  event: text("event"),
});
