const Booking = require("../models/Booking");
const Dentist = require("../models/Dentist");

//@desc     ...
//@route    ... /api/v1/...
//@access   ...

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
        message: `No hospital with the id of ${req.params.id}`,
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
        message: "Cannot access this Booking",
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
