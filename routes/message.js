const router = require('express').Router()
const Room = require('../models/room.model')
const mongoose = require('mongoose')
const Message = require('../models/message.model')

router.get('/sync/:id', async (req, res) => {
    const id = req.params.id

    // Find room by id
    const room = await Room.findById(id).populate('messages')
    
    res.status(200).send(room)
})

router.post('/all', async (req, res) => {
    const meId = req.body.meId

    // Find room by id
    Message.find({$or: [{senderId: mongoose.Types.ObjectId(meId)},{recipientId: mongoose.Types.ObjectId(meId)}]})
    .then(messages => {
        if(messages){
            return res.status(200).send(messages)
        }

        res.status(400).send({msg: "Messages not found"})
    })
})

router.post('/new',  async (req, res) => {
    const recipientId = req.body.recipientId
    const meId = req.body.meId
    const message = req.body.message

    // Find room
    const ourRoom = await Room.findOne({participants: mongoose.Types.ObjectId(recipientId), participants: mongoose.Types.ObjectId(meId)})

    if(!ourRoom){
        res.status(400).send({msg: "Room not found"})
    }

    // Add message to room
    const newMessage = await Message.create({
        message: message,
        roomId: ourRoom._id,
        senderId: meId,
        recipientId: recipientId,
        read: false
    })

    await ourRoom.messages.push(newMessage._id);
    await ourRoom.save();

    res.status(201).send(ourRoom)

})

module.exports = router;