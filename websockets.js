const WebSocket = require("ws");

let wsClient = null;

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("New client connected");
  wsClient = ws;

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
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
