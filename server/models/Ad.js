const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("../server");

//Schema, like a structure of our Ad in MongoDB
const AdSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  pic: {
    data: Buffer,
    type: String,
    required: false,
  },
  pickup: {
    type: Boolean,
    required: false,
  },
  adress: {
    type: String,
    required: false,
  },
  delivery: {
    type: Boolean,
    required: false,
  },
  price: [{ type: Number, required: false }],
  terms: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  timeperiod: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Ad = mongoose.model("ads", AdSchema);
