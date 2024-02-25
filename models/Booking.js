const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bid: {
        type: Number,
        unique: true,
        required: [true, 'Please add a Booking Id'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for Booking Id'
        }
    },
    uid: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    did: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dentist',
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);