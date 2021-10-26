const Router = require ('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/',async (ctx) => {
    ctx.body="goods home"
})

router.get('/replace',async(ctx)=>{
    fs.readFile('./data_json/goods.json','utf8',(err,data)=>{
       data=JSON.parse(data) // convert str to obj
       data.map((item,index)=>{
            console.log(item)
            item.NAME="product name"
            item.DETAIL="<img src=\"https://m.media-amazon.com/images/I/61TWkeyVPhL._AC_SL1000_.jpg\" width=\"100%\" height=\"auto\" alt=\"\" /><img src=\"https://m.media-amazon.com/images/I/61K69gAfg+L._AC_SL1000_.jpg\" width=\"100%\" height=\"auto\" alt=\"\" /><img src=\"https://m.media-amazon.com/images/I/61Us54zEBLL._AC_SL1000_.jpg\" width=\"100%\" height=\"auto\" alt=\"\" /><img src=\"https://m.media-amazon.com/images/I/61bxFSoFLqL._AC_SL1000_.jpg\" width=\"100%\" height=\"auto\" alt=\"\" /><img src=\"https://m.media-amazon.com/images/I/61cU4mOTZlL._AC_SL1000_.jpg\" width=\"100%\" height=\"auto\" alt=\"\" /><img src=\"https://m.media-amazon.com/images/I/71c6F8-xDML._AC_SL1000_.jpg\" width=\"100%\" height=\"auto\" alt=\"\" />"
            item.IMAGE1="https://m.media-amazon.com/images/I/61TWkeyVPhL._AC_SL1000_.jpg"
       })
       //console.log("------------")
       //console.log(data)
       let newdata = JSON.stringify(data);
       fs.writeFile('./data_json/haha.json', newdata, (err) => {
        if (err) throw err;
        console.log('Data written to file');
       });
    })
   ctx.body="convert data"
})


router.get('/importgoods',async(ctx)=>{
     //fs.readFile('./data_json/goods.json','utf8',(err,data)=>{
     fs.readFile('./data_json/newgoods.json','utf8',(err,data)=>{
        console.log(1)
        //console.log(data)
        console.log(2)
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

router.get('/getCategoryList',async(ctx)=>{
    //console.log('getCategoryList---',123)
    try{
        const Category = mongoose.model('Category')
        let result = await Category.find({}).exec()
        //console.log("result---",result)
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})

router.post('/getSubCategoryList',async(ctx)=>{
    try{
        //let categoryId = ctx.request.body.categoryId
        let categoryId = '1'
        console.log("getSubCategoryList---",categoryId)
        console.log("getSubCategoryList---",(typeof categoryId))
        const CategorySub = mongoose.model('CategorySub')
        //let result = await CategorySub.find({MALL_CATEGORY_ID:'2'}).exec()
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()

        console.log("result2---",result)

        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})

router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        let categorySubId = ctx.request.body.categorySubId 
        let page=ctx.request.body.page // how many pages
        console.log("getGoodsListByCategorySubID---",ctx.request.body)
        //console.log("getGoodsListByCategorySubID---",categorySubId,page)

        let num=10 // show items in each page
        let start=(page-1)*10 // start item index in each page

        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:categorySubId})
        .skip(start)
        .limit(num)
        .exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})

module.exports=router;