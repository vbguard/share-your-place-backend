const router = require("express").Router();
const { check } = require("express-validator");
const {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById
} = require("../controllers/places.controller");

router
  .get("/:pid", getPlaceById)
  .get("/user/:uid", getPlaceByUserId)
  .post(
    "/",
    [
      check("title")
        .not()
        .isEmpty(),
      check("description").isLength({ min: 5 }),
      check("address").isEmpty
    ],
    createPlace
  )
  .patch("/:pid", check(), updatePlaceById)
  .delete("/:pid", deletePlaceById);

module.exports = router;
