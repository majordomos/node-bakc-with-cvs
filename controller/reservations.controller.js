const fs = require("fs");
const csv = require("csv-parser");

const reservationsController = {
  readReservations: readReservations
};

function readReservations() {
  const reservations = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream("./data/Reservations.csv")
      .on("error", (error) => {
        reject(error);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => {
        reservations.push(data);
      })
      .on("end", () => {
        resolve(reservations);
      });
  });
}

module.exports = reservationsController;
