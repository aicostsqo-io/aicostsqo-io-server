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
const httpStatus = require("http-status");

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  loginUser(req.body)
    .then((user) => {
      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "User not found" });

      user = user.toObject();
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;

      user = {
        ...user,
        tokens: {
          access_token: generateAccessToken({ name: user.email, ...user }),
          refresh_token: generateRefreshToken({ name: user.email, ...user }),
        },
      };

      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const index = (req, res) => {
  list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res) => {
  modify({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "Internal Server Error" });
    });
};

const deleteUser = (req, res) => {
  if (!req.params?.id)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "ID field is required" });

  remove(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "User not found " });
      res.status(httpStatus.OK).send(deletedUser);
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "Internal Server Error" });
    });
};

module.exports = {
  create,
  index,
  login,
  update,
  deleteUser,
};
