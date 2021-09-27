const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const ads = require("./routes/api/ads");
const grid = require("gridfs-stream");

const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

module.exports = gfs = grid(db, mongoose.mongo);

//Connect
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

//CORS middleware
app.use(cors());

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
