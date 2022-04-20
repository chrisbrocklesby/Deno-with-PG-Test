import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

const app = new Application();
const router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = 'ByeWorld!';
});

app.use(router.routes());


app.listen({ port: 3000 });
