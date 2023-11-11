import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo" // Reference to the User collection
    },
    vehicleName: String,
    parkingNo: String,
    plateNo: String,
    brand: String,
    description: String,
    date: Date,
    image: String,
  },
  { 
    collection: "Vehicle" },
  { 
    timestamps: true }
);

mongoose.model("Vehicle", VehicleSchema);
