// // ----------- Check new dentist with the same bookDate ----------------------
// if (req.body.dentist !== null && req.body.bookDate === null) {
//   console.log("case: 1");
//   const bookingExists = await Booking.exists({
//     dentist: req.body.dentist,
//     bookDate: booking.bookDate,
//   });

//   if (bookingExists) {
//     return res.status(404).json({
//       success: false,
//       message: "This dentist already has a booking at this time.",
//     });
//   }

//   //Check this user has already booked at this time or not
//   const bookingExistuser = await Booking.exists({
//     user: req.params.user,
//     bookDate: req.body.bookDate,
//   });

//   //If this user is not admin, and this user can book one date for one dentist
//   if (req.user.role !== "admin" && bookingExistuser) {
//     return res.status(404).json({
//       success: false,
//       message: "Cannot book at the same time",
//     });
//   }
// }
// //------------------------------------------------------------------------------

// //-------------- Check new bookDate with the same dentist -------------------------
// if (req.body.bookDate !== null && req.body.dentist === null) {
//   console.log("case: 2");
//   // Check dentist already has booking at new time
//   const bookingExists = await Booking.exists({
//     dentist: booking.dentist,
//     bookDate: req.body.bookDate,
//   });

//   if (bookingExists) {
//     return res.status(404).json({
//       success: false,
//       message: "This dentist already has a booking at this time.",
//     });
//   }

//   //Check this user has already booked at this time or not
//   const bookingExistuser = await Booking.exists({
//     user: req.params.user,
//     bookDate: req.body.bookDate,
//   });

//   //If this user is not admin, and this user can book one date for one dentist
//   if (req.user.role !== "admin" && bookingExistuser) {
//     return res.status(404).json({
//       success: false,
//       message: "Cannot book at the same time",
//     });
//   }

//   //Check millisecond of date
//   const milli = req.body.bookDate.slice(19);
//   if (milli !== ".000Z") {
//     return res.status(404).json({
//       success: false,
//       message:
//         "Invalid date format Please use YYYY-MM-DDTHH:00:00 with no millisecond",
//     });
//   }

//   //Check for booking time
//   const bookHour = req.body.bookDate.slice(11, 13);

//   if (
//     !(
//       (9 <= parseInt(bookHour) && parseInt(bookHour) <= 11) ||
//       (13 <= parseInt(bookHour) && parseInt(bookHour) <= 16)
//     )
//   ) {
//     // console.log(parseInt(bookHour));
//     return res.status(404).json({
//       success: false,
//       message: "Invalid time. Please book between 9-11 or 13-16",
//     });
//   }
// }
// //---------------------------------------------------------------------

// // ------------ Check new bookDate with the new dentist ---------------
// if (req.body.bookDate !== null && req.body.dentist !== null) {
//   console.log("case: 3");
//   const bookingExists = await Booking.exists({
//     dentist: req.body.dentist,
//     bookDate: req.body.bookDate,
//   });

//   if (bookingExists) {
//     return res.status(404).json({
//       success: false,
//       message: "This dentist already has a booking at this time.",
//     });
//   }

//   //Check this user has already booked at this time or not
//   const bookingExistuser = await Booking.exists({
//     user: req.params.user,
//     bookDate: req.body.bookDate,
//   });

//   //If this user is not admin, and this user can book one date for one dentist
//   if (req.user.role !== "admin" && bookingExistuser) {
//     return res.status(404).json({
//       success: false,
//       message: "Cannot book at the same time",
//     });
//   }

//   //Check millisecond of date
//   const milli = req.body.bookDate.slice(19);
//   if (milli !== ".000Z") {
//     return res.status(404).json({
//       success: false,
//       message:
//         "Invalid date format Please use YYYY-MM-DDTHH:00:00 with no millisecond",
//     });
//   }

//   //Check for booking time
//   const bookHour = req.body.bookDate.slice(11, 13);

//   if (
//     !(
//       (9 <= parseInt(bookHour) && parseInt(bookHour) <= 11) ||
//       (13 <= parseInt(bookHour) && parseInt(bookHour) <= 16)
//     )
//   ) {
//     // console.log(parseInt(bookHour));
//     return res.status(404).json({
//       success: false,
//       message: "Invalid time. Please book between 9-11 or 13-16",
//     });
//   }
// }

// // -----------------------------------------------------------------
// //
