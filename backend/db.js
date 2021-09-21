const mongoose = require("mongoose");

const mongoose_uri = "mongodb://localhost:27017/iNotebook";

const connectToMongo = () => {
  mongoose
    .connect(mongoose_uri)
    .then(() => {
      console.log("connected to database successfully.");
    })
    .catch((error) => {
      console.log(error.reason);
    });
};

module.exports = connectToMongo;
