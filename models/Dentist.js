const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
    did: {
        type: Number,
        unique: true,
        required: [true, 'Please add a Dentist Id'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for Dentist Id'
        }
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    year_exp: {
        type: Number,
        required: [true, 'Please add a Year Experience'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for Dentist Id'
        }
    },
    clinic: {
        type: String,
        required: [true, 'Please add a clinic']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Dentist', DentistSchema);