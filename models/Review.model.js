const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: String,
    
   rating: {
   type: Number,
   min: 0,
   max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
