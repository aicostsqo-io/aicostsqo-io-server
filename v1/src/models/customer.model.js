const Mongoose = require("mongoose");

const CustomerSchema = Mongoose.Schema(
  {
    userId: {
      type: Mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: String,
    sites: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "sites",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("customers", CustomerSchema);
