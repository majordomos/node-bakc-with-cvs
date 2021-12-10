const amenityController = require("../controller/amenity.controller");
const reservationsController = require("../controller/reservations.controller");
const bookingController = {
  getBooking: getBooking,
};
async function getBooking(req, res) {
  const dateEquality = (reservationDate, timestampDate) => {
    return (
      new Date(timestampDate).getTime() ==
      new Date(parseInt(reservationDate, 10)).getTime()
    );
  };
  const calculateDuration = (start_time, end_time) => {
    const startTimeToNumber = parseInt(start_time, 10);
    const endTimeToNumber = parseInt(end_time, 10);
    const duration = endTimeToNumber - startTimeToNumber;
    return duration;
  };
  const convertMinutesToHours = (value) => {
    const valueToNumber = parseInt(value, 10);
    const h = Math.floor(valueToNumber / 60);
    const m = valueToNumber / 60 - h;
    return `${h}:${m}0`;
  };
  const compareDates = (firstDate, secondDate) => {
    if (firstDate.start_time < secondDate.start_time) {
      return 1;
    }
    if (firstDate.start_time > secondDate.start_time) {
      return -1;
    }
    return 0;
  };

  const bookings = [];
  const reservations = await reservationsController.readReservations();
  const amenities = await amenityController.readAmenities();
  if (
    req.params.id > amenities.length ||
    req.params.id < 1 ||
    !Number.isInteger(parseInt(req.params.id, 10))
  ) {
    return res.status(404).send("Invalid Amenity ID");
  }
  for (reservation of reservations) {
    for (amenity of amenities) {
      if (
        reservation.amenity_id == amenity.id &&
        reservation.amenity_id == req.params.id &&
        dateEquality(reservation.date, req.params.timestamp)
      ) {
        reservation.amenity_id = amenity.name;
        const booking = {
          reservation_id: reservation.id,
          user_id: reservation.user_id,
          start_time: convertMinutesToHours(reservation.start_time),
          duration: calculateDuration(
            reservation.start_time,
            reservation.end_time
          ),
          amenity_name: amenity.name,
        };
        bookings.push(booking);
      }
    }
  }
  res.status(200).json(bookings.sort(compareDates));
}

module.exports = bookingController;
