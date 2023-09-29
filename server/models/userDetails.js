/* import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true },
  { collection : "User" }
);

const User = mongoose.model("User", UserSchema);
export default User; */

import mongoose from "mongoose";

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { 
      type: String, 
      unique: true },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    userType: String,
  },
  {collection: "UserInfo"},
  { timestamps: true}
);

mongoose.model("UserInfo", UserDetailsScehma);
