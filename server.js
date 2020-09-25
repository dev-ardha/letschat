const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const socket = require('socket.io')
const http = require('http')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true },
    function(err, db){
        if (err) {
            console.log('Unable to connect to the database. Please start the server. Error:', err);
        } else {
            console.log('Connected to database successfully!');
        }
} )

// const db = mongoose.connection;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello")
})

// Express router
const messageRouter = require('./routes/message')
const authRouter = require('./routes/auth')
const contactRouter = require('./routes/contact')

app.use('/api/v1/message', messageRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', contactRouter)

const server = http.createServer(app);
const io = socket(server);
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

io.on('connection', (socket) => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('disconnect', () => {
        // When user dissconnected
        io.emit('msg', 'a user has disconnected')
    })
});