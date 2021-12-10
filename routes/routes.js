const express = require("express");
const router = express.Router();

const bookingController = require("../controller/booking.controller");
router.get(
  "/get-booking/:id/:timestamp",
  bookingController.getBooking
);
module.exports = router;
