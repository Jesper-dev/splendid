const express = require("express");
const router = express.Router();
//LOAD ADS MODEL
const Ad = require("../../models/Ad");

router.get("/get", (req, res) => {
  Ad.find({}, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
