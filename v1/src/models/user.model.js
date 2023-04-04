const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema(
  {
    password: String,
    email: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("users", UserSchema);
