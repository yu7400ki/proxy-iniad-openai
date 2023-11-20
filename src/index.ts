import { Hono } from "hono";
import { cors } from "hono/cors";

const API_URL = "https://api.openai.iniad.org";

const proxy = new Hono();

proxy.use("*", cors());

proxy.mount("/", async (req) => {
  const path = new URL(req.url).pathname;
  const url = new URL(path, API_URL);
  const res = await fetch(url, req);
  return new Response(res.body, res);
});

export default proxy;
