const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");
const {
  insert,
  list,
  modify,
  remove,
} = require("../services/user.service");

const create = async (req, res) => {
  req.body.password = passwordToHash(req.body.password);

  await insert(req.body);
  res.send({
    success: true,
    message: "User created successfully",
  });
};



const index = async (req, res) => {
  const users = await list();
  res.send(users);
};

const update = async (req, res) => {
  const updatedUser = await modify({ _id: req.user?._id }, req.body);
  res.send(updatedUser);
};

const deleteUser = async (req, res) => {
  if (!req.params?.id) throw new Error("ID field is required");
  const deletedUser = await remove(req.params.id);
  if (!deletedUser) throw new Error("User not found");
  res.send(deletedUser);
};

module.exports = {
  create,
  index,
  update,
  deleteUser,
};
