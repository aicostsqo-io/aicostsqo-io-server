const Mongoose = require("mongoose");

const SiteSchema = Mongoose.Schema(
  {
    customerId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: String,
    numberOfVertex: {
      type: Number,
      min: 3,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("sites", SiteSchema);
