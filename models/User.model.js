const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName:{
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },  
    dateOfBirth: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    wishlist:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
      }
      
    ],
 
    profilePic: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
