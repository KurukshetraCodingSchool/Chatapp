const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0/chataapp').then(()=>{
    console.log("mongodb Connected✅");
})

const chatappSchema = mongoose.Schema({
    content:String,
    timestamp:{
        type:Date,
        default:Date.now
    }
})
module.exports =mongoose.model('Chatapp',chatappSchema);