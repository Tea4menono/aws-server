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
      let sql = `UPDATE positions SET lat = ${data.lat}, lon = ${
        data.lon
      }, alt = ${data.alt} timestamp = ${new Date().getTime()} WHERE id = 1;`;
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
