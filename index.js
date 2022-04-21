import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import db from "./db.js"

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Welcome to Deno ! PG-Deno 2";
});

router.get("/posts", async (ctx) => {
  const query = await db("SELECT * FROM posts");
  ctx.response.body = query;
});

router.get("/posts/:id", async (ctx) => {
  const query = await db("SELECT * FROM posts WHERE id = $id", {id: ctx.params.id});
  ctx.response.body = query[0];
});

router.post("/posts", async (ctx) => {
  const query = await db("INSERT INTO posts (title, body) VALUES ($title, $body) RETURNING *", {
    title: ctx.body.value.get('title'),
    body: ctx.body.value.get('body');
  ctx.response.body = query;
});


app.use(router.routes());

app.listen({ port: 3000 });
