'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .get('/start', (req, res) => {
    wss.clients.forEach((client) => {
      client.send("start");
      res.send("Started...")
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      console.log("Message: " + message)
      client.send(message);
    });
  })
});
