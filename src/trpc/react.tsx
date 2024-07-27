"use client";

import { type inferRouterOutputs, type inferRouterInputs } from "@trpc/server";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { unstable_httpBatchStreamLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import SuperJSON from "superjson";
import { useState } from "react";
import { type AppRouter } from "~/server/api/root";
import { createQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

const API = createTRPCReact<AppRouter>();
export { API as api };

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    API.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
          url: getBaseUrl() + "/api/trpc",
          transformer: SuperJSON,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <API.Provider queryClient={queryClient} client={trpcClient}>
        {props.children}
      </API.Provider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
