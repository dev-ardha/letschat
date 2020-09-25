const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    recipientId: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

function modelAreadyDeclared() {
    try {
        const Message = mongoose.model('Message')
        module.exports = Message
        return true
    } catch (e) {
        return false
    }
}

if (!modelAreadyDeclared()) {
    const Message = mongoose.model('Message', messageSchema);
    module.exports = Message;
}