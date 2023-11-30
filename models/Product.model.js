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
    size: String,
    color: {
        type: String,
        enum: ['black', 'white', 'green', 'yellow', 'grey', 'orange', 'pink', 'grey', 'brown', 'purple', 'red']
    }, 
    image_url: String,
    category:{
        type: String,
        enum: ['skirts', 'dresses', 'suits', 'shirts', 'trousers', 'jeans', 'sport', 'coats', 'sweaters and jackets', 'accessories']

    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;