const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,           
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large']
    },
    color: {
        type: String,
        enum: ['black', 'white', 'green', 'yellow', 'grey', 'orange', 'pink', 'brown', 'purple', 'red', 'blue']
    }, 
    image: String,
    category:{
        type: String,
        enum: ['skirts', 'dresses', 'suits', 'shirts', 'trousers', 'jeans', 'sport', 'coats', 'jackets', 'hoodies', 'accessories']

    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;