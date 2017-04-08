var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var path = require('path');
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'static')))

http.listen(3000, function() {
    console.log('Listering on *:3000');
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket) {
    console.log('user connected');

    socket.on('chat message', function(from, msg) {
        io.emit('broadcast', from, msg)
    });

    socket.on('join', function(new_user) {
        io.emit('notifyJoin', new_user)
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
