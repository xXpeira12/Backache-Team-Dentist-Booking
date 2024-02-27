const Dentist = require("../models/Dentist");

//@desc     ...
//@route    ... /api/v1/...
//@access   ...

//Include other resource routers             // Game
const bookingRouter = require("./bookings"); // Game

//Re-route into other resource routers             // Game
router.use("/:dentistId/bookings", bookingRouter); // Game

//TODO!     Do chapter 9 page 22      // Game

//TODO!     Do chapter 9 page 26      // Game
