const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Room Schema
const roomSchema = new Schema({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref:'User' }
    ],
    messages: [
        { type: mongoose.Schema.Types.ObjectId, ref:'Message' }
    ]
}, {
    timestamps: true
})

function modelAreadyDeclared() {
    try {
        const Room = mongoose.model('Room')
        module.exports = Room
        return true
    } catch (e) {
        return false
    }
}

if (!modelAreadyDeclared()) {
    const Room = mongoose.model('Room', roomSchema);
    module.exports = Room;
}