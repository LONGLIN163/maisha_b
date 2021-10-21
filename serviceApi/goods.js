const Router = require ('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/',async (ctx) => {
    ctx.body="hahahhaha"
})

router.get('/importgoods',async(ctx)=>{
     fs.readFile('./data_json/goods.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('Done'+saveCount)
            }).catch(error=>{
                 console.log('Save Failed'+error)
            })
        })
    })
    ctx.body="import data..."

})

module.exports=router;