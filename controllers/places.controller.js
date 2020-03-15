const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getLocationFromAddress = require("../utils/location");

const getPlaceById = (req, res, next) => {
  const pid = req.params.pid;

  const place = null;

  if (!place) {
    throw new HttpError(
      "Could not find a place for the provided place id.",
      404
    );
  }

  res.json({ place: pid });
};

const getPlaceByUserId = (req, res, next) => {
  const uid = req.params.uid;

  const place = null;

  if (!place) {
    return next(
      new Error("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ place: uid });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log("errors :", errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, decsription, address, creator } = req.body;
 
  let location
  try {
    location = await getLocationFromAddress(address);
  } catch (error) {
    return next(error)
  }
  
  const createdPlace = {
    title,
    decsription,
    location,
    address,
    creator
  };

  res.status(201).json({ palce: createdPlace });
};

const updatePlaceById = (req, res) => {
  const pid = req.params.pid;
  const {} = req.body;
};

const deletePlaceById = (req, res) => {
  const pid = req.params.pid;

  res.status(200).json({ message: `Place ${pid} removed` });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
