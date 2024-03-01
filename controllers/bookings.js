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
    const bookingExists = await Booking.exists({
      dentist: req.params.dentistId,
      bookDate: req.body.bookDate,
    });
    // console.log(bookingExists);

    //If the user is not admin, and the user can book only date and dentist is a unique
    if (req.user.role !== "admin" && bookingExists) {
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

    //Check for booking time
    const bookHour = req.body.bookDate.slice(11, 13);

    if (
      !(
        (9 <= parseInt(bookHour) && parseInt(bookHour) <= 11) ||
        (13 <= parseInt(bookHour) && parseInt(bookHour) <= 16)
      )
    ) {
      // console.log(parseInt(bookHour));
      return res.status(404).json({
        success: false,
        message: "Invalid time. Please book between 9-11 or 13-16",
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

    // Check new dentist already has booking at the same time
    if (req.body.dentist !== null && req.body.bookDate === null) {
      const bookingExists = await Booking.exists({
        dentist: req.body.dentist,
        bookDate: booking.bookDate,
      });

      if (bookingExists) {
        return res.status(404).json({
          success: false,
          message: "This dentist already has a booking at this time.",
        });
      }
    }

    //Check new bookDate with the same dentist
    if (req.body.bookDate !== null && req.body.dentist === null) {
      //Check millisecond of date
      const milli = req.body.bookDate.slice(19);
      if (milli !== ".000Z") {
        return res.status(404).json({
          success: false,
          message:
            "Invalid date format Please use YYYY-MM-DDTHH:00:00 with no millisecond",
        });
      }

      //Check for booking time
      const bookHour = req.body.bookDate.slice(11, 13);

      if (
        !(
          (9 <= parseInt(bookHour) && parseInt(bookHour) <= 11) ||
          (13 <= parseInt(bookHour) && parseInt(bookHour) <= 16)
        )
      ) {
        // console.log(parseInt(bookHour));
        return res.status(404).json({
          success: false,
          message: "Invalid time. Please book between 9-11 or 13-16",
        });
      }

      // Check dentist already has booking at new time
      const bookingExists = await Booking.exists({
        dentist: booking.dentist,
        bookDate: req.body.bookDate,
      });

      if (bookingExists) {
        return res.status(404).json({
          success: false,
          message: "This dentist already has a booking at this time.",
        });
      }
    }

    //Check new bookDate with the new dentist
    if (req.body.bookDate !== null && req.body.dentist !== null) {
      //Check millisecond of date
      const milli = req.body.bookDate.slice(19);
      if (milli !== ".000Z") {
        return res.status(404).json({
          success: false,
          message:
            "Invalid date format Please use YYYY-MM-DDTHH:00:00 with no millisecond",
        });
      }

      //Check for booking time
      const bookHour = req.body.bookDate.slice(11, 13);

      if (
        !(
          (9 <= parseInt(bookHour) && parseInt(bookHour) <= 11) ||
          (13 <= parseInt(bookHour) && parseInt(bookHour) <= 16)
        )
      ) {
        // console.log(parseInt(bookHour));
        return res.status(404).json({
          success: false,
          message: "Invalid time. Please book between 9-11 or 13-16",
        });
      }

      const bookingExists = await Booking.exists({
        dentist: req.body.dentist,
        bookDate: req.body.bookDate,
      });

      if (bookingExists) {
        return res.status(404).json({
          success: false,
          message: "This dentist already has a booking at this time.",
        });
      }
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
      error:
        "Cannot update booking or Invalid date format Please use YYYY-MM-DDTHH:00:00",
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
