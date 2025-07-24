const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0/chatappRoom').then(()=>{
    console.log("mongodb Connected✅");
})

const chatappSchema = mongoose.Schema({
    username:String,
    msg:String,
    roomName:String,
    timestamp:{
        type:Date,
        default:Date.now
    }
})
module.exports =mongoose.model('Chats',chatappSchema);