const express = require("express");
const { getBookings } = require("../controllers/bookings");

const router = express.Router((mergeParams = true));

module.exports = router;
