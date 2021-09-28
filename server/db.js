mongoose = require("mongoose");
// const dbUri = require("./config/keys").mongoURI;
module.exports = {
  connect: (URI) => {
    // mongoose.set("useNewUrlParser", true);
    // mongoose.set("useFindAndModify", false);
    // mongoose.set("useCreateIndex", true);
    // mongoose.set("useUnifiedTopology", true);
    mongoose.connect(URI);

    mongoose.connection.once("open", () => {
      console.log("connected");
    });

    //Log an error if we fail to connect
    mongoose.connection.on("error", (err) => {
      console.error(err);
      console.log("MongoDB connection failed: " + DB_URL);

      process.exit();
    });
  },

  //close the connection
  close: () => {
    mongoose.connection.close();
  },
};
