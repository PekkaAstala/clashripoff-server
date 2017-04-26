'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .get('/start', (req, res) => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type: "start"
      }));
      res.send("Started...")
    });
  })
  .get('/spawn/:team', (req, res) => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type: "spawn",
        team: req.params.team
      }));
      res.send("Spawned " + req.params.teams)
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type: message
      }));
    });
  })
});
