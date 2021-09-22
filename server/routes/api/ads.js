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
  const newAd = new Ad({
    category: req.body.category,
    title: req.body.title,
    desc: req.body.desc,
    pickup: req.body.pickup,
    addres: req.body.adress,
    delivery: req.body.delivery,
    price: req.body.price,
    // price1: req.body.price1,
    // price2: req.body.price2,
    // price3: req.body.price3,
    terms: req.body.terms,
    value: req.body.value,
  });

  newAd
    .save()
    .then((add) => res.json(add))
    .catch((err) => console.log(err));
});

module.exports = router;
