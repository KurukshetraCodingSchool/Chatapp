const io =require('socket.io')();
const socketapi = {
    io:io
}
// lOgic
io.on('connection',function(socket){
    socket.on('newmsg',msg=>{
        console.log(msg);
        socket.broadcast.emit('incomingMessage',msg)
        
    })
})

module.exports = socketapi;