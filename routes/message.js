const router = require('express').Router()
const Room = require('../models/room.model')
const User = require('../models/user.model')
const mongoose = require('mongoose')
const Message = require('../models/message.model')

router.post('/sync', async (req, res) => {
    const meId = req.body.meId
    const recipientId = req.body.recipientId

    // Find room by id
    const room = await Room.findOne({participants: mongoose.Types.ObjectId(meId), participants: mongoose.Types.ObjectId(recipientId)}).populate('messages')
    
    res.status(200).send(room)
})

router.post('/rooms', async (req, res) => {
    const meId = req.body.meId

    // Find all of my rooms
    const room = await User.findById(meId).populate('rooms')
    
    res.status(200).send(room)
})

router.post('/all', async (req, res) => {
    const meId = req.body.meId

    // Find room by id
    const messages = await Message.find({$or: [{senderId: mongoose.Types.ObjectId(meId)},{recipientId: mongoose.Types.ObjectId(meId)}]})
    
    res.status(200).send(messages)
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