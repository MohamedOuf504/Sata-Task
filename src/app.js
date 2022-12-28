const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/errorHandler");
const categoryRoute = require("./modules/category/category.routes");
const AppError = require("./utils/appError");
const path = require("path");
const sponsorRoute = require("./modules/sponsor/sponsor.routes");
const advertisementRoute = require("./modules/advertisement/advertisement.routes");
const { sliderRoute } = require("./modules/slider/slider.routes");
const app = express();
const limiter = rateLimit({
  windowMs: 60,
  max: 12,
});

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter);
app.use(
  cors({
    origin: "*",
  }),
  express.json()
);
app.use(
  "/public/uploads/",
  express.static(path.join(__dirname, "/public/uploads"))
);

app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/sponsor", sponsorRoute);
app.use("/api/v1/ads", advertisementRoute);
app.use("/api/v1/slider", sliderRoute);

app.get("/", (req, res) => {

  res.json({ message: "it is work " });
  
});

app.all("*", (req, res, next) => {

  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
