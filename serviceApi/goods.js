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
                console.log('Done:'+saveCount)
            }).catch(error=>{
                 console.log('Failed:'+error)
            })
        })
    })
    ctx.body="import goods"

})

router.get('/importcat',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('Done:'+saveCount)
            }).catch(error=>{
                 console.log('Failed:'+error)
            })
        })
    })
    ctx.body="import category"
})

router.get('/importsubcat',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0 
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('Done:'+saveCount)
            }).catch(error=>{
                console.log('Failed:'+error)
            })
        }) 
    })
    ctx.body="import sub_category"
})

//**get goods info */
/* router.post('/getDetailGoodsInfo',async(ctx)=>{
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    await Goods.findOne({ID:goodsId}).exec()
    .then(async(result)=>{  
        ctx.body={code:200,message:result}
    })
    .catch(error=>{
        console.log(error)
        ctx.body={code:500,message:error}
    })
}) */

router.post('/getDetailGoodsInfo',async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result=await Goods.findOne({ID:goodsId}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={code:500,message:err}
    }
})

module.exports=router;