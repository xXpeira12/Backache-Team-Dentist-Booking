const Booking = require("../models/Booking");

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

//@desc     ...
//@route    ... /api/v1/...
//@access   ...
