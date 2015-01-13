#!/usr/bin/env node --harmony
'use strict';
const log = require('npmlog'),
      app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http);

// route logic
app.get('/', function(req,res){
  log.info('GET /');
  res.sendFile(__dirname + '/index.html');
});

// socket logic
io.on('connection',function (socket) {
  log.info('door', 'a user connected');

  socket.broadcast.emit('chat message', 'new user has joined');

  socket.on('chat message', function (msg) {
    log.info('message', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function () {
      io.emit('chat message', 'a user has left');
      log.info('door', 'a user disconnected');
  });
});


// boot server
http.listen(3000,function () {
  log.info('listening on *:3000');
});
