import { config } from "https://deno.land/x/dotenv/mod.ts";

import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import db from "./db.js"

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "ByeWorld!";
});

router.get("/test", async (ctx) => {
  const query = await db("SELECT * FROM posts");
  ctx.response.body = query;
});

app.use(router.routes());

app.listen({ port: 3000 });
