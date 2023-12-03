const mongoose = require("mongoose");
const Product = require("../models/Product.model")
const allProducts = require("./product.json");

mongoose
  .connect("mongodb://127.0.0.1:27017/wethem-server")
  .then(() => {
    console.log("Connected to DB");
    return Product.insertMany(allProducts);
  })
  .then(() => {
    console.log("added");
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("Disconnected from DB");
  })
  .catch((err) => {
    console.log(err);
  });
