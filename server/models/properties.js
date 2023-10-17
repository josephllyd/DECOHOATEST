import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo" // Reference to the User collection
    },
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String 
  },
  { collection: "Properties" },
  { timestamps: true }
);

mongoose.model("Properties", PropertySchema);
