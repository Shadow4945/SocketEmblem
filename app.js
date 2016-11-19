var clients = [];
var peopleInGame = 0;
var chatRooms = ['main room', 'extra room'];


var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/public/index.html");
});
var people = 0;

io.on("connection", function (socket) {
    console.log(socket.id + " user has connected");
    if (peopleInGame < 3) {
        console.log("Main Room");
        socket.room = 'main room';
        socket.join('main room');
        console.log(io.sockets.adapter.rooms['main room']);
        peopleInGame += 1;
    } else {
        console.log("Extra room")
        socket.room = 'extra room';
        socket.join('extra room');
    }

    socket.nickname = 'Guest';
    socket.on("disconnect", function () {
        peopleInGame -= 1;
        clients.splice(clients.indexOf(socket.nickname), 1);
        console.log(clients.indexOf(socket.nickname) + " user has disconnected");
        //io.to(socket.room).emit('list clients', clients);
        io.to(socket.room).emit('user left', socket.nickname);
        console.log(peopleInGame);

        //Try catch in case there are no people in the extra room
        try{
            if (io.sockets.adapter.rooms['extra room'].length >= 1) {
            var peopleInQueue = (Object.keys(io.sockets.adapter.rooms['extra room'].sockets));

            io.sockets.connected[peopleInQueue[0]].emit('move room', {
                message: "Leaving room"
            });
            peopleInGame += 1;
        }
        }catch(err){
            console.log("No users in extra room");
        }



    });
    //Makes user at 0 in extra room join main room
    socket.on('leave room', function () {
        socket.leave('extra room');
        socket.room = 'main room';
        socket.join('main room');
        io.to(socket.room).emit('user joined', socket.nickname);
    });

    socket.on('add user', function (username) {
        socket.nickname = username;
        clients.push(socket.nickname);
        console.log(clients);
        io.to(socket.room).emit('user joined', socket.nickname);
    });

    socket.on("chat message", function (msg) {
        console.log(socket.room);

        io.to(socket.room).emit('chat received', {
            message: msg.msg,
            sid: socket.id,
            name: socket.nickname,
            score: msg.score,
            x: msg.x,
            y: msg.y
        });
    });

    if (peopleInGame > 3) {
        console.log("check players");

    }

    socket.on("get clients", function (msg) {
        console.log('sending clients');
        //io.emit('list clients', clients);
        //console.log(io.sockets.adapter);

        io.to(socket.room).emit('list clients', clients);
    });

});
app.use(express.static('public'));

http.listen(process.env.PORT || 3000, function () {
    console.log("listening on port 3000");
});
