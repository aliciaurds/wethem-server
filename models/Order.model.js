const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    products: [
      
     {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
          required: true,
        }
        
      
      
    ],
    totalPrice: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;