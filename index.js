import { config } from "https://deno.land/x/dotenv/mod.ts";

import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import db from "./db.js"

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Welcome to Deno";
});

router.get("/test", async (ctx) => {
  const query = await db("SELECT * FROM posts");
  ctx.response.body = query;
});

router.get("/test/:id", async (ctx) => {
  const query = await db("SELECT * FROM posts WHERE id = $id", {id: ctx.params.id});
  ctx.response.body = query[0];
});


app.use(router.routes());

app.listen({ port: 3000 });
