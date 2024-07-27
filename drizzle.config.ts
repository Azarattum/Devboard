import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: "./src/server/db/schema.ts",
  tablesFilter: ["dashboard_*"],
  dialect: "sqlite",
} satisfies Config;
