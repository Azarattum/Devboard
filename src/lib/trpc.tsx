"use client";

import {
  defaultShouldDehydrateQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { type inferRouterOutputs, type inferRouterInputs } from "@trpc/server";
import { createWSClient, loggerLink, wsLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "~/server/api/root";
import SuperJSON from "superjson";
import { useState } from "react";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        serializeData: SuperJSON.serialize,
      },
      hydrate: { deserializeData: SuperJSON.deserialize },
      queries: { staleTime: 30 * 1000 },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") return createQueryClient();
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
        wsLink({
          client: createWSClient({ url: getBaseUrl() + "/api/trpc" }),
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
