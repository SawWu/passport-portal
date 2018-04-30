const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const mongoose = require('mongoose');
const app = new Koa();
let router = new Router();

const port = process.env.PORT || 3000;
const host = `127.0.0.1`;

mongoose.connect(`mongodb://${host}/passport`);
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to Mongodb');
});

db.on('error', (err) => {
  console.log(err);
});

app.use(views(__dirname + '/views', {extension: 'pug'}));

let Article = require('./models/article');

Article.find({}, async (err, articles) => {
  await router.get('/', async (ctx, next) => {
    await ctx.render('index', {
      title: 'Hello Koa 2!',
      articles
    });
  })
});

app.use(router.routes());

app.listen(port, () => {
  console.log(`passport-portal listening on port http://${host}:${port}`);
});





