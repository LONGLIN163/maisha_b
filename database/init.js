const mongoose = require('mongoose')
//const db = "mongodb://localhost/userdb"
const db = "mongodb+srv://developerlin:Long2021...@cluster0.r4ghm.mongodb.net/maishadb?retryWrites=true&w=majority"

const glob = require('glob') 
const {resolve} = require('path')

exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = ()=>{
    
    mongoose.connect(db)

    let maxConnectTimes = 0 

    return  new Promise((resolve,reject)=>{

        //add db event listoners
        //if just disconnected
        mongoose.connection.on('disconnected',()=>{
            console.log("*********disconnected***********")
            //reconnect 
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)    
            }else{
                reject()
                throw new Error('***db connect failed, can not reconnect, please repair it manually asap!***')
            }
        })
    
        //if err occurs
        mongoose.connection.on('error',err=>{
            console.log("*********error***********")
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)   
            }else{
                reject(err)
                throw new Error('***db connect failed, can not reconnect, please repair it manually asap!***')
            }
        })
    
        //when connect at first time
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!')
            resolve()  // ****dont forget this ***
        })

    })

}