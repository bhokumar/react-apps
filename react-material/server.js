'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//setting local environment
var express = require('express');
var app = express();
var fs = require('fs');
var http  = require('http');
var https = require('https');

var privateKey = fs.readFileSync('./ssl/server.key');
var publicKey = fs.readlinkSync('./ssl/public.key');

var credentials = {key:privateKey,cert:publicKey};

app.use(express.static(__dirname+'build'));

app.get('*',function(request,response){
    response.sendFile(__dirname + '/build/index.html');
});

var httpServer = https.createServer(app);
httpServer.listen(443);

console.log("ShellInABox UI server started on port",443);