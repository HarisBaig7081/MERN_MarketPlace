const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID Error

  if (err.name === "CastError") {
    const message = `Resource not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate Key

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Extended`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Error

  if (err.name === "JSONWebTokenError") {
    const message = `JSON Web Token is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire Error

  if (err.name === "JSONWebTOkenExpireError") {
    const message = `JSON Web Token is Expired, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: true,
    message: err.message,
  });
};
