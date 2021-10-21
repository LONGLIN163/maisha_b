const Koa = require('koa');
const app = new Koa();
const {connect , initSchemas} = require('./database/init.js')
// then we can do the post
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
// then we can cors
const cors = require('koa2-cors')
app.use(cors())

// load router objs
const Router = require('koa-router')
let user=require('./serviceApi/user.js') 
let home=require('./serviceApi/home.js') 
let goods=require('./serviceApi/goods.js') 

// mount all routes
let router = new Router();
router.use('/user',user.routes()) // all the routes will be under '/user/routes'
router.use('/home',home.routes()) // ...
router.use('/goods',goods.routes()) // ...
// load router middlewares
app.use(router.routes())
app.use(router.allowedMethods())

//IIFE
;(async () =>{
  await connect()
  initSchemas()
})()

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})