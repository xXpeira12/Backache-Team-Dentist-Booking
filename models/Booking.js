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
    validate: {
      validator: function (value) {
        // Check if the date is a valid Date object
        return value instanceof Date && !isNaN(value);
      },
      message: "Invalid date format. Please provide a valid Date object.",
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound unique index on bookDate and dentist fields
BookingSchema.index({ bookDate: 1, dentist: 1 }, { unique: true });

// Add a pre-save hook to format the bookDate before saving
BookingSchema.pre("save", function (next) {
  // Check if bookDate is a valid Date object
  if (this.bookDate instanceof Date && !isNaN(this.bookDate)) {
    // Format the date as "YYYY-MM-DDTxx:00:00"
    const formattedDate = `${this.bookDate.toISOString().slice(0, 16)}:00:00`;
    this.bookDate = formattedDate;
    next();
  } else {
    // If bookDate is not a valid Date, throw a validation error
    next(new Error("Invalid date format. Please provide a valid Date object."));
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
