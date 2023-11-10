import mongoose from "mongoose";

const SupportSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo" // Reference to the User collection
    },
    supportSubj: String,
    supportType: String,
    description: String,
    image: String,
  },
  { 
    collection: "Support" },
  { 
    timestamps: true }
);

mongoose.model("Support", SupportSchema);
