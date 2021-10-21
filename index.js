const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')

// load router objs
const Router = require('koa-router')
let user=require('./serviceApi/user.js') 
let home=require('./serviceApi/home.js') 

// mount all routes
let router = new Router();
router.use('/user',user.routes()) // all the routes will be under '/user/routes'
router.use('/home',home.routes()) // ...
// load router middlewares
app.use(router.routes())
app.use(router.allowedMethods())

//IIFE
// ;(async () =>{
//   await connect()
//   initSchemas()
//   const User = mongoose.model('User')
//   let oneUser = new User({userName:'hahaha',password:'123456'})
//   oneUser.save().then(()=>{
//     console.log("insert success")
//   })
//   const user=await User.findOne({})
//   console.log(user)

// })()

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})