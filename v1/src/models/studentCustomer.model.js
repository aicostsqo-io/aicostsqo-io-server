const Mongoose = require("mongoose");

const StudentCustomerSchema = Mongoose.Schema(
  {
    customerId: {
      type: Mongoose.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    university: String,
    major: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("studentCustomers", StudentCustomerSchema);
