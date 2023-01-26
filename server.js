const app = require("./src/app");
const mongoose = require("mongoose");
const config = require("./src/configuration/config.service");
const databaseURL = config.dbURI;
let port = config.port;

mongoose
  .connect(databaseURL)
  .then(async () => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err.reason));

const server = app.listen(port, async () => {
  console.log("Current Date: ", new Date().toLocaleString());
  console.log("server running on:", port);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
