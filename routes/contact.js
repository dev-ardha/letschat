const router = require('express').Router();
const User = require('../models/user.model');
const Room = require('../models/room.model');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

router.post('/add',  async (req, res) => {
    const recipientEmail = req.body.recipient
    const meId = req.body.meId

    // Find me
    const me = await User.findById(meId)

    // Find recipient
    const recipient = await User.findOne({email: recipientEmail})

    if(!recipient){
        res.status(404).send({msg: 'User not found'})
    }

    // Add to Contact
    await me.contacts.push(recipient._id);
    await me.save();

    // Check if room is already exist
    Room.findOne({ participants: { $eq: ObjectId(meId), $eq: ObjectId(recipient._id) } })
    .then( async (room) => {
        // If Room exist
        if(room){
            return res.status(201).send({contact: recipient});
        }

        // If Room doesn't exist
        // Create room for new contact
        const newRoom = await Room.create({})
        await newRoom.participants.push(recipient._id)
        await newRoom.save()
        await newRoom.participants.push(meId)
        await newRoom.save()
    
        // Add room for me
        await me.rooms.push(newRoom._id);
        await me.save();
        // Add room for new contact
        await recipient.rooms.push(newRoom._id);
        await recipient.save()
    
        // Populate the room's participants messages
        const getRoom = await Room.findById(newRoom._id).populate('participants messages')
    
        res.status(201).send({room: getRoom, contact: recipient});
    }).catch( () => {
        res.status(400).send({msg: "There's a problem adding the user to your contact list"})
    })

})

router.post('/remove',  async (req, res) => {
    const contactId = req.body.contactId
    const meId = req.body.meId

    // Find me
    const me = await User.findById(meId)

    // Remove from contact
    await me.contacts.pull(contactId);
    await me.save();

    res.status(201).send(me.contacts);
})

module.exports = router;