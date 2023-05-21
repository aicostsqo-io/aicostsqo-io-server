const { passwordToHash } = require("../scripts/utils/helper");
const {
  insertUser,
  listUsers,
  modifyUser,
  removeUser,
} = require("../services/user.service");

const create = async (req, res) => {
  req.body.password = passwordToHash(req.body.password);

  await insertUser(req.body);
  res.send({
    success: true,
    message: "User created successfully",
  });
};

const index = async (req, res) => {
  const users = await listUsers();
  res.send(users);
};

const update = async (req, res) => {
  const updatedUser = await modifyUser({ _id: req.user?._id }, req.body);
  res.send(updatedUser);
};

const deleteUser = async (req, res) => {
  if (!req.params?.id) throw new Error("ID field is required");
  const deletedUser = await removeUser(req.params.id);
  if (!deletedUser) throw new Error("User not found");
  res.send(deletedUser);
};

module.exports = {
  create,
  index,
  update,
  deleteUser,
};
