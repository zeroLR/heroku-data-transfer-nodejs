require("dotenv").config();
const net = require("net");
const express = require("express");
const app = express();
const cors = require("cors");
const userController = require("./src/controllers/user.controller");

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 6000;

app.use(cors());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Unkown Error, detail: " + err.stack);
});

// create socket server
const socketServer = net.createServer((socket) => {
  socket.on("data", async (data) => {
    try {
      if (process.env.DEBUG_RAW === "true") console.log(data);

      if (data instanceof Uint8Array) {
        userController(data);
      }
    } catch (error) {
      console.error(error);
    }
  });
});

// Use API routes
// require("./src/routes/user.routes")(app);

app.listen(PORT, () => {
  console.log(`start api server on port ${PORT}`);
});

socketServer.listen(SOCKET_PORT, () => {
  console.log(`start socket server on port ${SOCKET_PORT}`);
});
