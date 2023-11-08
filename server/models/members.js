import mongoose from "mongoose";

const MembersInfoScehma = new mongoose.Schema(
  {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo" // Reference to the User collection
      },
    fname: String,
    lname: String,
    ownerRel: String,
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+63",
    },
  },
  {collection: "MembersInfo"},
  { timestamps: true}
);

mongoose.model("MembersInfo", MembersInfoScehma);
