const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDeOu6_PhUgehek68O3lbJCXxFd9fQPgGY";

async function getLocationFromAddress(address) {
  const result = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = result.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }

  const location = data.results[0].geometry.location;

  return location;
}

module.exports = getLocationFromAddress