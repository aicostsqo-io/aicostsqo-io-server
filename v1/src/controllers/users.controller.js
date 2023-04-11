const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");
const {
  insert,
  list,
  loginUser,
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

const login = async (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  let user = await loginUser(req.body);
  user = user.toObject();
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  res.send({
    ...user,
    success: true,
    message: "User logged in successfully",
    tokens: {
      access_token: generateAccessToken({ name: user.email, ...user }),
      refresh_token: generateRefreshToken({ name: user.email, ...user }),
    },
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

const deleteUser = (req, res) => {
  if (!req.params?.id) throw new Error("ID field is required");
  const deletedUser = remove(req.params.id);
  if (!deletedUser) throw new Error("User not found");
  res.send(deletedUser);
};

module.exports = {
  create,
  index,
  login,
  update,
  deleteUser,
};
