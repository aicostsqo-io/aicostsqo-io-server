const User = require("../models/user.model");


const insert = async (data) => {
  const { email } = data;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User Already Exists");
  }

  const user = await User.create(data);
  return user;
};

const list = () => {
  return User.find({});
};

const loginUser = (loginData) => {
  return User.findOne(loginData);
};

const modify = (where, data) => {
  // const updateData = Object.keys(data).reduce((obj, key) => {
  //   if (key !== "password") obj[key] = data[key];
  //   return obj;
  // }, {});
  return User.findOneAndUpdate(where, data, { new: true });
};

const remove = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  insert,
  list,
  loginUser,
  modify,
  remove,
};
