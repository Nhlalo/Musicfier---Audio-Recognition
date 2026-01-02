import Geonames from "geonames.js";

const geonames = new Geonames({
  username: "TheBoy", // Replace with your username
  lan: "en",
});

async function getLocation(location) {
  try {
    const response = await geonames.search({
      q: location,
      style: "SHORT",
      maxRows: 6,
    });

    //The values are transformed in to a Country, city (London, United Kingdom) format
    const locationResult = response.geonames.map((place) => {
      return `${place.name}, ${place.countryName}`;
    });

    return locationResult;
  } catch (error) {
    return [];
  }
}
