import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import {everyMinute} from 'https://deno.land/x/deno_cron/cron.ts';
import db from "./db.js"

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Welcome to Deno API Test";
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
  const body = await (ctx.request.body()).value;
  const query = await db("INSERT INTO posts (title, body) VALUES ($title, $body) RETURNING *", {
    title: body.title,
    body: body.body
  });
  ctx.response.body = query;
});

// everyMinute(() => {
//   console.log('CRON JOB RAN !!!!!! Testing cron job');
// });


app.use(router.routes());

app.listen({ port: 3000 });
