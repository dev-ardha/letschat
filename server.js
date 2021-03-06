const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const socket = require('socket.io')
const http = require('http')
require('dotenv').config();
const Room = require('./models/room.model')
const Message = require('./models/message.model')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }).then(() => {
        console.log('Database connected')
    }).catch((err) => console.log('Unable to connect to the database. Please start the server. Error:', err))

// const db = mongoose.connection;

app.use(cors());
app.use(express.json());

// Express router
const messageRouter = require('./routes/message')
const authRouter = require('./routes/auth')
const contactRouter = require('./routes/contact');

app.use('/api/v1/message', messageRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', contactRouter)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('letschat-client/build'));
    
    app.get('*', (req, res)=>{
            res.sendFile(path.resolve(__dirname, 'letschat-client', 'build', 'index.html'));
    });

}

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('userOnline', id => {
        socket.on('isTyping', msg => {
            io.to(id).emit('typing', msg)
        })
        
        socket.on('notTyping', msg => {
            io.to(id).emit('unTyping', msg)
        })
    })

    // When user send a new message
    socket.on('chat', async (chat) => {

        // Find room
        const myRoom = await Room.findById(chat.roomId)

        if(myRoom){
            const newMessage = await Message.create(chat)
    
            if(newMessage){
                await myRoom.messages.push(newMessage._id);
                await myRoom.save();
                
                io.to(id).emit('sendMessage', newMessage)
                io.to(chat.recipientId).emit('newMessage', newMessage)
            }
        }
    })

    socket.on('disconnect', () => {
        // When user dissconnected
        
    })
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));