const Joi = require("joi");
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  status: {
    type: String,
    enum: ["NOT_STARTED", "FIRST_INNINGS", "SECOND_INNINGS", "END"],
    default: "NOT_STARTED"
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  team1: {
    type: new mongoose.Schema({
      name: {
        type: String,
        maxlength: 50,
        required: true
      },
      run: {
        type: Number,
        default: 0,
        required: true
      },
      wicket: {
        type: Number,
        default: 0
      },
      over: {
        type: Number,
        default: 0
      }
    }),
    required: true
  },
  team2: {
    type: new mongoose.Schema({
      name: {
        type: String,
        maxlength: 50
      },
      run: {
        type: Number,
        default: 0
      },
      wicket: {
        type: Number,
        default: 0
      },
      over: {
        type: Number,
        default: 0
      }
    }),
    required: true
  }
});

const Match = mongoose.model("Match", matchSchema);

exports.matchSchema = matchSchema;
exports.Match = Match;
