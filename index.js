#!/usr/bin/env node --harmony
'use strict';
const log = require('npmlog'), app = require('express')(), http = require('http').Server(app);

log.level('dev');

app.get('/', function(req,res){
  log.info('GET /');
  res.send('<h1>Hello world</h1>');
});

http.listen(3000,function () {
  log.info('listening on *:3000');
});
