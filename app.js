const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const wsServer = require("./websockets");

app.post("/send-command", (req, res) => {
  const command = req.body.command;
  console.log(`Received command: ${command}`);
  console.log(command[0]);
  if (wsServer.getClient()) {
    wsServer.getClient().send(JSON.stringify(command));
    console.log("Command sent to WebSocket client");
  } else {
    console.log("No WebSocket client connected");
  }

  res.status(200).json({ message: "Command received successfully" });
});

const port = 8080;
app.listen(port, () => {
  console.log(`HTTP server is listening on port ${port}`);
});
