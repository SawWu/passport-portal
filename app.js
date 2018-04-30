const Koa = require('koa');
const app = new Koa();

const host=`3000`;

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(host);

console.log(`passport-portal is run http://127.0.0.1:${host}`);