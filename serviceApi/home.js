const Router = require('koa-router')
let router = new Router()

router.get('/',async (ctx) => {
    ctx.body="this is home home"
})
router.get('/register',async (ctx) => {
    ctx.body="this is home register"
})

module.exports=router;