import { type Config } from "drizzle-kit";

export default {
  dbCredentials: { url: "file:./db.sqlite" },
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
} satisfies Config;
