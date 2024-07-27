/* eslint-disable @typescript-eslint/no-misused-promises */
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./src/server/api/root";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ hostname, port, dev });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const http = createServer(async (req, res) => {
    try {
      if (!req.url) throw new Error("Invalid URL");
      await handle(req, res, parse(req.url, true));
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.info(
        ` \x1b[1m\x1b[32m✓\x1b[0m Listening on http://${hostname}:${port}` +
          ` (MODE: ${dev ? "development" : process.env.NODE_ENV})`,
      );
    });

  const ws = new WebSocketServer({ noServer: true });

  http.on("upgrade", (request, socket, head) => {
    if (!request.url) return;
    const { pathname } = parse(request.url, false);
    if (pathname?.startsWith("/api/trpc")) {
      ws.handleUpgrade(request, socket, head, (socket) => {
        ws.emit("connection", socket, request);
      });
    }
  });
  http.on("close", () => {
    ws.removeAllListeners();
    ws.close();
  });

  applyWSSHandler({ router: appRouter, wss: ws });
});
