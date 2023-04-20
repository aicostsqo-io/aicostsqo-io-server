const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("users", UserSchema);
