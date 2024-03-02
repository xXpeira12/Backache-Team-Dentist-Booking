const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  dentist: {
    type: mongoose.Schema.ObjectId,
    ref: "Dentist",
    required: true,
  },
  bookDate: {
    type: Date,
    required: true,
    validate: {
      validator: isValidDateFormat,
      message: "Invalid date format. Please use YYYY-MM-DDTHH:00:00",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:00:00$/;
  newDate = dateString.toISOString().slice(0, 19);
  // console.log("dataString" + newDate);
  return regex.test(newDate);
}

module.exports = mongoose.model("Booking", BookingSchema);
