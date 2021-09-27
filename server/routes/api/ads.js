const express = require("express");
const router = express.Router();
const fs = require("fs");
const gfs = require("../../server");
//LOAD ADS MODEL
const Ad = require("../../models/Ad");

router.post("/get", (req, res) => {
  Ad.find({}, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/add", (req, res) => {
  if (req.method === "OPTIONS") {
    res.status(200);
  }

  const file = req.body.pic;
  const tempfile = req.file.filename;
  const writeStream = gfs.createWriteStream({ filename: file });

  fs.createReadStream(tempfile)
    .on("end", function () {
      res.send("OK");
    })
    .on("error", function () {
      res.send("ERR");
    })
    .pipe(writeStream);

  const newAd = new Ad({
    category: req.body.category,
    title: req.body.title,
    desc: req.body.desc,
    pic: writeStream,
    pickup: req.body.pickup,
    adress: req.body.adress,
    delivery: req.body.delivery,
    price: req.body.price,
    terms: req.body.terms,
    value: req.body.value,
  });

  newAd
    .save()
    .then((add) => res.json(add))
    .catch((err) => console.log(err));
});

module.exports = router;
