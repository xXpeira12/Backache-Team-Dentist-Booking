const Booking = require("../models/Booking");
const Dentist = require("../models/Dentist");

//@desc     GET all bookings
//@route    GET /api/v1/bookings
//@access   Public
exports.getBookings = async (req, res, next) => {
  let query;

  //General user can see only his/her bookings
  if (req.user.role !== "admin") {
    query = Booking.find({ user: req.user.id }).populate({
      path: "dentist",
      select: "name year_exp clinic",
    });
  } else {
    //   Admin can see all bookings
    // If admin want to see bookings filtered by dentist
    if (req.params.dentistId) {
      console.log(req.params.dentistId);
      query = Booking.find({ dentist: req.params.dentistId }).populate({
        path: "dentist",
        select: "name year_exp clinic",
      });
    } else {
      //Admin want to see all bookings
      query = Booking.find().populate({
        path: "dentist",
        select: "name year_exp clinic",
      });
    }
  }

  try {
    const bookings = await query;
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Cannot find bookings",
    });
  }
};

//@desc     GET single booking
//@route    GET /api/v1/bookings/:id
//@access   Public
exports.getBooking = async (req, res, next) => {
  try {
    let query = Booking.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: `No Booking with the id of ${req.params.id}`,
      });
    }

    //add user Id to req.body
    req.body.user = req.user.id;

    //Check for existed booking
    const existedBookings = await Booking.find({ user: req.user.id });

    //If the user is not admin, and the user did not see own booking
    if (req.user.role !== "admin" && existedBookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User ${req.user.id} is not authorized to access this Booking`,
      });
    }

    const booking = await query;
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, error: "Cannot find booking" });
  }
};

//@desc     Add booking
//@route    POST /api/v1/dentists/:dentistId/bookings
//@access   Private
exports.addBooking = async (req, res, next) => {
  try {
    req.body.dentist = req.params.dentistId;

    const dentist = await Dentist.findById(req.params.dentistId);
    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: `No dentist with the id of ${req.params.dentistId}`,
      });
    }

    //add user Id to req.body
    req.body.user = req.user.id;
    // console.log(req.body);

    //Check for existed booking
    const existedBookings = await Booking.findOne({
      dentist: req.params.dentistId,
      bookDate: req.body.bookDate,
    });
    // console.log(existedBookings);

    //If the user is not admin, and the user can book only date and dentist is a unique
    if (req.user.role !== "admin" && existedBookings) {
      return res.status(404).json({
        success: false,
        message: "Cannot book at the same time",
      });
    }

    //Check millisecond of date
    const milli = req.body.bookDate.slice(19);
    if (milli !== ".000Z") {
      return res.status(404).json({
        success: false,
        message:
          "Invalid date format Please use YYYY-MM-DDTHH:00:00 with no millisecond",
      });
    }

    const booking = await Booking.create(req.body);

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error:
        "Cannot create booking or Invalid date format Please use YYYY-MM-DDTHH:00:00",
    });
  }
};

//@desc     Update booking
//@route    PUT /api/v1/bookings/:id
//@access   Private
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    //Check for existed booking
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.id}`,
      });
    }

    //Make sure user is booking owner
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} not authorized to update booking`,
      });
    }

    //Update booking
    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Cannot update booking",
    });
  }
};

//@desc     Delete booking
//@route    DELETE /api/v1/bookings/:id
//@access   Private
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    //Check for existed booking
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.id}`,
      });
    }

    //Make sure user is booking owner
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} not authorized to delete booking`,
      });
    }

    //Delete booking
    await booking.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Cannot delete booking",
    });
  }
};
