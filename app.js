var clients = [];
var peopleInGame = 0;
var chatRooms = ['main room', 'extra room'];
var WIDTH = 800;
var HEIGHT = 500;
var BALL_SPEED = 10;




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
    try {
        if (io.sockets.adapter.rooms['main room'].length < 3) {
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
    } catch (err) {
          console.log("Main Room");
            socket.room = 'main room';
            socket.join('main room');
            console.log(io.sockets.adapter.rooms['main room']);
            peopleInGame += 1;
    }
    
    
        
    

    // if (io.sockets.adapter.rooms['main room'].length > 3) {
    //     console.log("Main Room");
    //     socket.room = 'main room';
    //     socket.join('main room');
    //     console.log(io.sockets.adapter.rooms['main room']);
    //     peopleInGame += 1;
    // } else {
    //     console.log("Extra room")
    //     socket.room = 'extra room';
    //     socket.join('extra room');
    // }

    socket.nickname = 'Guest';
    io.to(socket.room).emit('updatePeopleInGame', peopleInGame);
    socket.on("disconnect", function () {
        peopleInGame -= 1;
        clients.splice(clients.indexOf(socket.nickname), 1);
        console.log(clients.indexOf(socket.nickname) + " user has disconnected");
        //io.to(socket.room).emit('list clients', clients);
        io.to(socket.room).emit('user left', socket.nickname);
        console.log(peopleInGame);

        //Try catch in case there are no people in the extra room
        try {
            if (io.sockets.adapter.rooms['extra room'].length >= 1) {
                var peopleInQueue = (Object.keys(io.sockets.adapter.rooms['extra room'].sockets));

                io.sockets.connected[peopleInQueue[0]].emit('move room', {
                    message: "Leaving room"
                });
                peopleInGame += 1;
            }
        } catch (err) {
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
        var isMainRoom = false;
        socket.nickname = username;
        clients.push(socket.nickname);
        console.log(clients);
        if (socket.room === 'main room') {
            isMainRoom = true;
        }
        io.to(socket.room).emit('user joined', socket.nickname, isMainRoom);
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
        console.log("There are more than three people.");

    }

    socket.on("get clients", function () {
        //console.log('sending clients');
        //io.emit('list clients', clients);
      

        socket.broadcast.to(socket.room).emit('recieve clients');
    });

    socket.on('sendBack', function(dataFromClients){
        socket.broadcast.to(socket.room).emit('clientData', dataFromClients);
    });
    
    socket.on("sendRotate",function(data){
        console.log("tankrotate: "+ data.tankRotate);
       io.sockets.in('main room').emit("rotate",{
         tankRotate: data.tankRotate
       });
    });



    function getTank(user) {
        var startX = getRandomInt(40, 700);
        var startY = getRandomInt(40, 400);
        user.emit('addTank', { id: user.id, type: tank.type, isLocal: true, x: startX, y: startY, hp: 100 });
        user.broadcast.emit('addTank', { id: user.id, type: tank.type, isLocal: false, x: startX, y: startY, hp: 100 });
        game.addTank({ id: user.id, type: tank.type, hp: 100 });
    }

});

function Ball(ownderId, alpha, x, y) {
    this.id = game.lastBallId;
    game.increaseLastBallId();
    this.ownerId = ownerId;
    this.alpha = alpha;
    this.x = x;
    this.y = y;
    this.out = false;
};

Ball.prototype = {
    fly: function () {
        var speedX = BALL_SPEED * Math.sin(this.alpha);
        var speedY = -BALL_SPEED * Math.cos(this.alpha);
        this.x += speedX;
        this.y += speedY;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



app.use(express.static('public'));

http.listen(process.env.PORT || 4000, function () {
    console.log("listening on port 4000");
});
