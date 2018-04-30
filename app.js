const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const views = require('koa-views');
const path = require('path');
const mongoose = require('mongoose');
const app = new Koa();
let router = new Router();

app.use(bodyParser());

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
app.use(serve('bower_components'));

let Article = require('./models/article');

Article.find({}, async (err, articles) => {
  await router.get('/', async (ctx, next) => {
    await ctx.render('index', {
      articles
    });
  })
});

router.get('/articles/new', async (ctx) => {
  await ctx.render('new', {
    title: 'Add Article'
  });
});

router.get('/articles/:id', (ctx) => {
  Article.findById(ctx.params.id, (err, article) => {
    console.log(article);
    ctx.render('show', {
      article
    })
  })
})

router.post('/articles/create', async (ctx) => {
  let article = new Article(ctx.request.body);
  await article.save((err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  ctx.redirect('/');
});

app.use(router.routes());

app.listen(port, () => {
  console.log(`passport-portal listening on port http://${host}:${port}`);
});





