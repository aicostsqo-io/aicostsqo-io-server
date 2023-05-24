const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");
const { loginUser } = require("../services/user.service");

const login = async (req, res) => {
  try {
    req.body.password = passwordToHash(req.body.password);
    let user = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });
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
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  login,
};
