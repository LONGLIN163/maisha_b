const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')

//IIFE
;(async () =>{
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({userName:'xixixi',password:'123456'})
  oneUser.save().then(()=>{
    console.log("insert success")
  })
  const user=await User.findOne({})
  console.log(user)

})()

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})