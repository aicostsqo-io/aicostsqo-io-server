const Mongoose = require("mongoose");

const CompanyCustomerSchema = Mongoose.Schema(
  {
    customerId: {
      type: Mongoose.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    companyName: String,
    industry: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("companyCustomers", CompanyCustomerSchema);
