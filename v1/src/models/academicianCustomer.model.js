const Mongoose = require("mongoose");

const AcademicianCustomerSchema = Mongoose.Schema(
  {
    customerId: {
      type: Mongoose.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    institution: String,
    department: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model(
  "academicianCustomers",
  AcademicianCustomerSchema
);
