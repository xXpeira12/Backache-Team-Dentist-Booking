const express = require("express");
const { getBookings } = require("../controllers/bookings");

const router = express.Router((mergeParams = true));

router.route("/").get(getBookings);

module.exports = router;
