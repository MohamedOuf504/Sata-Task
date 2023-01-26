const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./users.model");
const config = require("../../configuration/config.service");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const saltRounds = 10;
const signToken = (data) => {
  const { password, ...rest } = data;
  return jwt.sign(rest, config.jwt_secret, {
    expiresIn: config.jwt_expires_in || "1d",
  });
};

async function comparePassword(plaintextPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  return isMatch;
}

const register = catchAsync(async (req, res, next) => {
  const { email, password, username } = req.body;
  const checkEmail = await User.findOne({ email: email });

  if (checkEmail) return next(new AppError("Email is ready  exist", 400));

  const hash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    username: username,
    email: email,
    password: hash,
  });
  res.status(200).json({ status: "success", data: signToken(user) });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).lean(true);
  if (!user) {
    return next(new AppError("Incorrect email !", 400));
  }

  if (!(await comparePassword(password, user.password))) {
    return next(new AppError("Incorrect password !", 400));
  }

  res.status(200).json({ status: "success", data: signToken(user) });
});

module.exports = {
  register,
  login,
  signToken,
  comparePassword,
};
