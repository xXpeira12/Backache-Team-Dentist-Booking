const mongoose = require("mongoose");

const DentistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    year_exp: {
      type: Number,
      required: [true, "Please add a Year Experience"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value for Dentist Id",
      },
    },
    clinic: {
      type: String,
      required: [true, "Please add a clinic"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Cascade delete bookings when a dentist is deleted
DentistSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Bookings being removed from dentist ${this._id}`);
    await this.model("Booking").deleteMany({ dentist: this._id });
    next();
  }
);

//Reverse populate with virtuals
DentistSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "dentist",
  justOne: false,
});

module.exports = mongoose.model("Dentist", DentistSchema);
