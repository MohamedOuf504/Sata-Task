const app = require("./src/app");
const mongoose = require("mongoose");
const config = require("./src/configuration/config.service");
const databaseURL = config.dbURI;
const port = config.port;
let server;

mongoose
  .connect(
    databaseURL,
  )
  .then(async () => {
    console.log("Connected to DB");
    server = app.listen(port, async () => {
      console.log("Current Date: ", new Date().toLocaleString());
      console.log("server running on:", port);
    });
  })
  .catch((err) => console.log(err.reason));

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
