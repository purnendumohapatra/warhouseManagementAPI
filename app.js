const express = require("express");
const app = express(); //storing the instance of express in app variable.
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const signupRoute = require("./routes/signUpRoute");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Middlewares are the function which has the access to both the req and response object and helps
//in effective communication in the request and response cycle.

app.use(express.json());
app.use(express.static(`${__dirname}/public/warehouseIndex.html`));
app.use("/warehouse/api/v1/products", productRoute);
app.use("/warehouse/api/v1/users", userRoute);
app.use("/warehouse/api/v1/users/signup", signupRoute);

if (process.env.NODE_ENV === "development") {
  console.log(`Hey You are in development mode...`);
  app.use(morgan("dev"));
} else {
  console.log(`Hey you are in production Mode`);
}

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} on the server`, 404)); //in this the arguments
  //goes to the next middle ware and that's why it directly gets passed to the globalerrorhandler.
});

app.use(globalErrorHandler);

module.exports = app;
