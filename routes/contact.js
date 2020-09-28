const router = require('express').Router()
const User = require('../models/user.model')
const Room = require('../models/room.model')

router.post('/add',  async (req, res) => {
    const recipientEmail = req.body.recipient
    const meId = req.body.meId

    // Find me
    const me = await User.findById(meId)

    // Find recipient
    const recipient = await User.findOne({email: recipientEmail})

    // Add to Contact (TEST PASSED)
    await me.contacts.push(recipient._id);
    await me.save();

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

    res.status(201).send(newRoom);
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