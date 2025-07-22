const io =require('socket.io')();
const Message = require('./models/chatapp')
const socketapi = {
    io:io
}
// lOgic
io.on('connection',async function(socket){
    console.log("new user conneted");
    socket.on("sony",(msg)=>{
        console.log(msg)
        socket.broadcast.to(msg.roomName).emit('incomingMessage',msg)
    })
    socket.on('joinRoom',roomName=>{
        socket.join(roomName);
    })
})
module.exports = socketapi;