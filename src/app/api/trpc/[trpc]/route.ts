import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";
import { createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
import { env } from "~/env";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    onError:
      env.NODE_ENV === "development"
        ? ({ error, path }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
    createContext: () => createContext(req),
    endpoint: "/api/trpc",
    router: appRouter,
    req,
  });

export { handler as POST, handler as GET };
