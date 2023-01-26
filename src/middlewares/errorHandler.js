const config = require("../configuration/config.service");
const AppError = require("../utils/appError");

const handleRequestBodyError = (err) =>
  new AppError(`Request body JSON error: ${err.message} `, 400);

const handleNotFound = (err) => {
  const message = err.message || `${err.path} Not Found`;
  return new AppError(message, 404);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(
    (el) => `${el.dataPath + " : " + el.message}`
  );

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  let errors;

  if (err.errors[0]) {
    errors = Object.values(err.errors).map(
      (el) => `${el.dataPath + ":" + el.message}`
    );
  } else {
    errors = Object.values(err.errors).map((el) => `${el.message}`);
  }

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path} ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational && err.statusCode !== 500) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error 💥", err);

    return res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (config.env === "development") sendErrorDev(err, res);
  else if (config.env === "production" || "test") {
    if (err.name === "CastError") err = handleCastError(err);
    else if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    else if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    else if (err.statusCode === 404) err = handleNotFound(err);
    else if (Array.isArray(err.errors)) err = handleValidationError(err);
    else if (err.type === "entity.parse.failed")
      err = handleRequestBodyError(err);
    sendErrorProd(err, res);
  }
};
