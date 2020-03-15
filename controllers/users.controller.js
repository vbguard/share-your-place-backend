const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getUsers = (req, res) => {
  res.status(200).json({ users: [] });
};

const signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const createdUser = {
    name,
    email,
    password
  };

  res.status(201).json({ user: createdUser });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const identifiedUser = { email, password };

  if (!identifiedUser) {
    throw new HttpError(
      "Could not identity user, credentials seem to be wrong!",
      401
    );
  }

  res.status(200).json({ message: "Logged in" });
};

const logout = (req, res) => {
  const identifiedUser = { email, password };

  if (!identifiedUser) {
    throw new HttpError(
      "Could not identity user, credentials seem to be wrong!",
      401
    );
  }

  res.status(200).json({ message: "User success logout" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.logout = logout;
