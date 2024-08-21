// server.js
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });

  ws.send('Welcome to the chat!');
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
