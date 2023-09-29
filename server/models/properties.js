import mongoose from "mongoose";

const PropertiesSchema = new mongoose.Schema(
  {
   name: String,
   price: Number,
   description: String,
   category: String,
   owner: String
  },
  {collection: "Properties"},
  { timestamps: true}
);

mongoose.model("Properties", PropertiesSchema);