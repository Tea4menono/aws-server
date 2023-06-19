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
      const payload = JSON.parse(message);
      switch (payload.type) {
        case "position":
          let sql = `UPDATE positions SET lat = ${payload.data.lat}, lon = ${payload.data.lon}, alt = ${payload.data.alt},timestamp = CURRENT_TIMESTAMP WHERE id = 1;`;
          db.query(sql, (err, result) => {
            if (err) throw err;
          });
          break;
        case "log":
          handleLogData(payload.data);
          break;
        default:
          console.log(`Unknown payload type: ${payload.type}`);
      }
    } catch (error) {
      console.log(`Error parsing message: ${error}`);
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
