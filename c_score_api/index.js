const socket = require("socket.io");
const cors = require("cors");
const logger = require("./startup/logging");
const config = require("config");
const devices = require("./routes/devices");
const matches = require("./routes/matches");
const users = require("./routes/users");
const { listenEvents } = require("./events/matchEvent");
const express = require("express");
const app = express();

require("./startup/db")();

app.use(cors());
app.use(express.json());
app.use("/api/devices", devices);
app.use("/api/matches", matches);
app.use("/api/users", users);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => logger.info(`Listening on ${port}...`));

var io = socket(server);
io.on("connection", async socket => {
  console.log("made socket connection", socket.id);

  listenEvents(socket, io);
});
