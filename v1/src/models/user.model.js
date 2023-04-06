const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema(
  {
    full_name: String,
    password: String,
    email: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("users", UserSchema);
