/**
 * API local per desenvolupament (mateixes rutes que Vercel /api/*).
 * Ús: node --env-file=.env scripts/dev-api.mjs
 */
import http from "node:http";
import { URL } from "node:url";
import content from "../api/content.js";
import blocks from "../api/blocks.js";
import upload from "../api/upload.js";

const PORT = Number(process.env.API_PORT || 8787);

const routes = {
  "/api/content": content,
  "/api/blocks": blocks,
  "/api/upload": upload,
};

const createRes = (res) => {
  const api = {
    statusCode: 200,
    setHeader: (key, value) => {
      res.setHeader(key, value);
      return api;
    },
    status: (code) => {
      api.statusCode = code;
      return api;
    },
    json: (data) => {
      if (!res.headersSent) {
        res.statusCode = api.statusCode;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
      }
      res.end(JSON.stringify(data));
    },
    end: (data) => {
      if (!res.headersSent) {
        res.statusCode = api.statusCode;
      }
      res.end(data ?? "");
    },
  };
  return api;
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
    const handler = routes[url.pathname];

    if (!handler) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    req.query = Object.fromEntries(url.searchParams.entries());
    await handler(req, createRes(res));
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: error.message || "Error" }));
    }
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`API Lisle a http://127.0.0.1:${PORT}`);
  console.log(
    `DATABASE_URL: ${process.env.DATABASE_URL ? "OK" : "FALTA"} · BLOB: ${
      process.env.BLOB_READ_WRITE_TOKEN ? "OK" : "FALTA"
    }`
  );
});
