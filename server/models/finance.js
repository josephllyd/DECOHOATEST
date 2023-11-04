import mongoose from "mongoose";

const FinanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo" // Reference to the User collection
    },
    name: String,
    property: String,
    amount: Number, // Total amount paid for the property
    paymentType: String, // Type of payment (e.g., cash, check, credit card)
    date: Date, // Date of the payment
    receipt: String, // This can be a file path or a URL to the uploaded receipt
    image: String,
  },
  { collection: "Finance" },
  { timestamps: true }
);

mongoose.model("Finance", FinanceSchema);

  /*  totalPayments: { 
      type: Number, 
      default: 0 
    }, // Total number of payments made for the property
    remainingAmount: {
      type: Number,
      default: function () {
        return this.property.price - this.amount;
      }
    }, // Remaining amount to be paid for the property
    monthsLeft: {
      type: Number,
      default: function () {
        const currentDate = new Date();
        const remainingAmount = this.property.price - this.amount;
        const monthlyPayment = remainingAmount / this.property.monthlyInstallments;
        const monthsLeft = Math.ceil(remainingAmount / monthlyPayment);
        return monthsLeft;
      }
    } // Number of months left to complete the payment */