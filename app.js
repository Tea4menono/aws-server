const express = require("express");
const cors = require("cors");
const db = require("./db");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(cors());
const wsServer = require("./websockets");

app.post("/send-command", (req, res) => {
  const command = req.body.command;
  let sql = `INSERT INTO commands (command) VALUES ('${JSON.stringify(
    command
  )}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    if (wsServer.getClient()) {
      wsServer.getClient().send(JSON.stringify(command));
      console.log("Command sent to WebSocket client");
    } else {
      console.log("No WebSocket client connected");
    }

    res.status(200).json({ message: "Command received successfully" });
  });
});

app.get("/get-current-position", (req, res) => {
  // Query the database
  let sql = "SELECT * FROM positions ORDER BY id DESC LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

app.get("/get-drone-log", (req, res) => {
  fs.readFile("../drone-log/logfile.log", "utf8", (err, data) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(data);
  });
});

app.get("/get-aws-log", (req, res) => {
  fs.readFile("../aws-log/logfile.log", "utf8", (err, data) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(data);
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`HTTP server is listening on port ${port}`);
});
