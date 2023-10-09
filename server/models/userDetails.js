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
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+63",
    },
    userType: String,
  },
  {collection: "UserInfo"},
  { timestamps: true}
);

mongoose.model("UserInfo", UserDetailsScehma);
