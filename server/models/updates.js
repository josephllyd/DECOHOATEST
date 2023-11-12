import mongoose from "mongoose";

const UpdatesSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo" // Reference to the User collection
    },
    updateSubj: String,
    updateType: String,
    description: String,
    date: Date,
    image: String,
  },
  { 
    collection: "Updates" },
  { 
    timestamps: true }
);

mongoose.model("Updates", UpdatesSchema);
