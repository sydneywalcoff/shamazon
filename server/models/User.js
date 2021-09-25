const { Schema, Types, model } = require('mongoose');
const bcrypt = require('bcrypt');
// const { Order } = require('../models')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    orders: [
        {
            type: Types.ObjectId,
            ref: 'Order'
        }
    ]
});

// saving new or modified passwords
userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;