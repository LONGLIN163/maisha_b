const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.get('/',async (ctx) => {
    ctx.body="this is user home"
})
router.post('/register',async (ctx) => {

    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'register success!'
        }
    }).catch(error=>{
         //500,could be internal error!
        ctx.body={
            code:500,
            message:error
        }
    })
})

module.exports=router;