const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
    },
    photo: {
        type: String,
        default: ''
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Room'
        }
    ]
}, {
    timestamps: true,
})

function modelAreadyDeclared() {
    try {
        const User = mongoose.model('User')
        module.exports = User
        return true
    } catch (e) {
        return false
    }
}

if (!modelAreadyDeclared()) {
    const User = mongoose.model('User', userSchema);
    module.exports = User;
}