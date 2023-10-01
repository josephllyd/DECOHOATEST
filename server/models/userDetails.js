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
      min: 6,
    },
    userType: String,
  },
  {collection: "UserInfo"},
  { timestamps: true}
);

mongoose.model("UserInfo", UserDetailsScehma);
