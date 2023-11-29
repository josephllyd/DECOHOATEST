import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    image: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://t3.ftcdn.net/jpg/01/77/54/02/360_F_177540231_SkxuDjyo8ECrPumqf0aeMbean2Ai1aOK.jpg",
    },
    phone: {
      type: String,
      default: "+63",
    },
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    collection: "UserInfo", 
  }
);

mongoose.model("UserInfo", UserDetailsSchema);
