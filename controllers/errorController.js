const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const sendErrProd = (err, req, res) => {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

const sendDevErr = (err, req, res) => {
  console.log("---------------");
  res.status(err.statusCode).json({
    status: err.status,
    eror: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    sendDevErr(err, req, res);
  } else {
    sendErrProd(err, req, res);
  }
};
