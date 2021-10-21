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

router.post('/login',async(ctx)=>{
    let loginUser = ctx.request.body
    let userName = loginUser.userName
    let password = loginUser.password
    // get User's model
    const User = mongoose.model('User')
    await User.findOne({userName:userName}).exec() // why must be exec(), return a promise obj???
    .then(async(result)=>{  // if useName exist, we need to an async compare for pwd
        console.log(result)
        if(result){
           //console.log(User)
            let newUser = new User()  //***create user instance then we can call the instance method***
            await newUser.comparePassword(password,result.password)
            .then( (isMatch)=>{
                //console.log("isMatch------",isMatch)
                ctx.body={ code:200, message:isMatch} 
            })
            .catch(error=>{
                console.log(error)
                ctx.body={ code:500, message:error}
            })
        }else{
            ctx.body={ code:200, message:'This username is not exist here!'}
        }

    }).catch(error=>{
        console.log(error)
        ctx.body={ code:500, message:error  }
    })
})

module.exports=router;