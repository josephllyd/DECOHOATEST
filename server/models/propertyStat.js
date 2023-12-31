import mongoose from "mongoose";

const PropertyStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      }
    ],
  },
  {collection: "PropertyStat"},
  { timestamps: true}
);

mongoose.model("PropertyStat", PropertyStatSchema);