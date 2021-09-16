const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");

const app = express();

//BodyParser Middleware (BodyParser is deprececated, use express instead, works the same way)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cors());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);
