const mongoose = require('mongoose')
const { Schema } = mongoose;
let ObjectId = Schema.Types.ObjectId // destructure main key type

// create user schema
const userSchema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  password:String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
})

// create user model with its schema
mongoose.model('User',userSchema)
