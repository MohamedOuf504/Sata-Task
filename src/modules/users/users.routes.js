const { register, login } = require("./users.auth");

const usersRoute = require("express").Router();

usersRoute.post("/register", register);

usersRoute.post("/login", login);

module.exports = {
  usersRoute,
};
