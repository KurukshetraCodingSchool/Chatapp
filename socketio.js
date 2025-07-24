const io = require('socket.io')();
const Message = require('./models/chatapp')
const socketapi = {
    io: io
}
// lOgic
io.on('connection', async function (socket) {
    console.log("new user conneted");

    socket.on('joinRoom', async (roomName) => {
        socket.join(roomName);
        // sends past 100 msg 
        const messages = await Message.find({ roomName }).sort({ timestamp: 1 }).limit(100);
        messages.forEach((msg) => {
            1
            socket.emit('incomingMessage', msg);// send the history to joined user
        });
    });

    socket.on('deleteMessage', async (msgId) => {
        try {
            await Message.findByIdAndDelete(msgId);
            console.log('messagedelete',msgId);
            
            // aall user show that
            socket.broadcast.emit("messageDeleted", msgId)

        } catch (error) {
            console.error("error of Deleteing Msg", error);
        }
    })


    socket.on("sony", async (msg) => {
        // console.log(msg)
        // save the messages
        const newmsg = new Message(msg);
        await newmsg.save();

        socket.broadcast.to(msg.roomName).emit('incomingMessage', msg)
    })
})
module.exports = socketapi;