const WebSocket = require("ws");
const db = require("./db");

let wsClient = null;

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("New client connected");
  wsClient = ws;

  ws.on("message", (message) => {
    try {
      // Try to parse the incoming message as JSON
      const data = JSON.parse(message);
      // Log the received data
      console.log(`Received data: ${data}`);
      let sql = `INSERT INTO positions (latitude longitude altitude) VALUES (${data.lat} ${data.lon} ${data.alt});`;
      db.query(sql, (err, result) => {
        if (err) throw err;
      });
    } catch (error) {
      console.log(`Error parsing message: ${message}`);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    wsClient = null;
  });
});

function getClient() {
  return wsClient;
}

module.exports = { getClient };
