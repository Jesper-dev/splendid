const express = require("express");
const router = express.Router();
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

  const newAd = new Ad({
    category: req.body.category,
    title: req.body.title,
    desc: req.body.desc,
    pic: req.body.pic,
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
