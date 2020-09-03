const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    }
  })
);

function validateUser(user) {
  const scheme = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    username: Joi.string()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(user, scheme);
}

exports.User = User;
exports.validate = validateUser;
