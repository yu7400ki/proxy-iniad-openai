import { Hono } from "hono";
import { cors } from "hono/cors";

const API_URL = "https://api.openai.iniad.org";

const proxy = new Hono();

proxy.use("*", cors());

proxy.mount("/", async (req) => {
  const path = new URL(req.url).pathname;
  const url = API_URL + path;
  const { method, headers, body } = req;
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});

export default proxy;
