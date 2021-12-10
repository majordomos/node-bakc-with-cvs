const fs = require("fs");
const csv = require("csv-parser");
const amenityController = {
  readAmenities: readAmenities,
  getAmenities: getAmenities,
};

function readAmenities() {
  const amenities = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream("./data/Amenity.csv")
      .on("error", (error) => {
        reject(error);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => {
        amenities.push(data);
      })
      .on("end", () => {
        resolve(amenities);
      });
  });
}

async function getAmenities(req, res) {
  const amenities = await readAmenities();
  res.status(200).json(amenities);
}

module.exports = amenityController;
