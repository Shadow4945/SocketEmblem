var clients = [];
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
        clients.splice(clients.indexOf(socket.nickname),1);
        console.log(clients.indexOf(socket.nickname) + " user has disconnected");
        io.emit('list clients', clients);
        io.emit('user left', socket.nickname);
        console.log(clients);
    });

    socket.on('add user',function(username){
        socket.nickname = username;
        clients.push(socket.nickname);
        console.log(clients);
        io.emit('list clients', clients);
        io.emit('user joined', socket.nickname);
    });
    
    socket.on("chat message", function(msg){
       // console.log(msg.x);
        //console.log(io.sockets.clients());
        io.emit('chat received', {
            message: msg.msg,
            sid: socket.id,
            name: socket.nickname,
            score: msg.score,
            x: msg.score,
            y: msg.score
        });
    });

    if (peopleInGame > 3) {
        console.log("check players");

    }

    socket.on("get clients", function (msg) {
        console.log('sending clients');
        //console.log(io.sockets.adapter);
        
        io.emit('list clients', clients);
    });

});

app.use(express.static('public'));

http.listen(process.env.PORT || 3000, function () {
    console.log("listening on port 3000");
});