const io =require('socket.io')();
const Message = require('./models/chatapp')
const socketapi = {
    io:io
}
// lOgic
io.on('connection',async function(socket){
    console.log("new user conneted");
    const messages = await Message.find().sort({timestamp:1}).limit(50);

    messages.forEach(msg=>{
        socket.emit('incomingMessage',msg.content);
    })

    socket.on('newmsg',async msg=>{
        // console.log(msg);
        socket.broadcast.emit('incomingMessage',msg)

         // save to mongodb
    const message = new Message({content:msg})
    await message.save();
    })
   
})
module.exports = socketapi;