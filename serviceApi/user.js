const Router = require('koa-router')
let router = new Router()

router.get('/',async (ctx) => {
    ctx.body="this is user home"
})
router.get('/register',async (ctx) => {
    ctx.body="this is user register"
})

module.exports=router;