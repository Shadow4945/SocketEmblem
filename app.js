var peopleInGame = 0;

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function (socket) {
    console.log(socket.id + " user has connected");
    peopleInGame += 1;
    if (peopleInGame > 3) {
        socket.emit('peopleNum', peopleInGame);
    }

    socket.nickname = 'Guest';
    socket.on("disconnect", function () {
        peopleInGame -= 1;
        console.log(socket.id + "user has disconnected");
    });

    socket.on("chat message", function (msg) {
        console.log(msg.msg);
        //console.log(io.sockets.clients());
        io.emit('chat received', {
            message: msg.msg,
            sid: socket.id,
            name: msg.name
        });
    });

    if (peopleInGame > 3) {
        console.log("check players");

    }

    socket.on("get clients", function (msg) {
        console.log('sending clients');
        console.log(io.sockets.clients());
        io.emit('list clients', io.sockets.clients().adapter.sids);
    });
});

app.use(express.static('public'));

http.listen(3000, function () {
    console.log("listening on port 3000");
});