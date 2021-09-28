const express = require("express");
const mongoDB = require("mongodb");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const ads = require("./routes/api/ads");
const assert = require("assert");
const fs = require("fs");
const busboy = require("connect-busboy");

const app = express();

//DB Config
const dbUri = require("./config/keys").mongoURI;
const db = require("./db");
db.connect(dbUri);

module.exports = client = new mongoDB.MongoClient(dbUri);
// const db = client.db("Database");
client.connect(function (error) {
  assert.ifError(error);
  const db = client.db("Database");
  // const collection = db.collection("ads");
  // const bucket = new mongoDB.GridFSBucket(db);
  // fs.createReadStream("./jon.jpg")
  //   .pipe(bucket.openUploadStream("jon.jpg"))
  //   .on("error", function (error) {
  //     assert.ifError(error);
  //   })
  //   .on("finish", function () {
  //     console.log("done");
  //     process.exit(0);
  //   });
  console.log("succesfully init and connected");
});

//CORS middleware
app.use(cors());

// app.use(busboy);

//BodyParser Middleware (BodyParser is deprececated, use express instead, works the same way)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/ads", ads);
app.options("/api/ads/add", cors());
app.post("/api/ads/add", cors());

app.get("/", (req, res) => res.send({ Working: "true" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);

//heroku restart -a
