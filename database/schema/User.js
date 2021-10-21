const mongoose = require('mongoose')
const { Schema } = mongoose;
let ObjectId = Schema.Types.ObjectId // destructure main key type
const bcrypt = require('bcrypt')
let SALT_WORK_FACTOR = 10

// create user schema
const userSchema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  password:String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
})

// login logic
userSchema.methods = { // this is an instance method, need to create an instance, **methods**
  comparePassword:(_password,password)=>{
      return new Promise((resolve,reject)=>{
          bcrypt.compare(_password,password,(err,isMatch)=>{
              if(!err) resolve(isMatch) // if success, isMatch==true
              else reject(err)
          })
      })
  }
}

// it will be executed for every data saving 
userSchema.pre('save', function(next){
  //console.log(this)
  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt, (err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      }) 

  })
})

// create user model with its schema
mongoose.model('User',userSchema)
