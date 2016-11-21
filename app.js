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

function GameServer(){
    this.tanks = [];
    this.balls = [];
    this.lastBallId = 0;
}

GameServer.prototype = {

    addTank: function(tank){
        this.tanks.push(tank);
    },

    addBall: function(ball){
        this.balls.push(ball);
    },

    removeTank: function(tankId){
        this.tanks = this.tanks.filter(function(t){return t.id != tankId});
    },

    syncTank: function(newTankData){
        this.tanks.forEach(function (tank){
            if(tank.id == newTankData.id){
                tank.x = newTankData.x;
                tank.y = newTankData.y;
                tank.baseAngle = newTankData.baseAngle;
                tank.cannonAngle = newTankData.cannonAngle;
            }
        });
    },

    syncBalls: function(){
        var self = this;

        this.balls.forEach(function(ball){
            self.detectCollision(ball);

            if(ball.x < 0 || ball.x > WIDTH || ball.y < 0 || ball.y > HEIGHT){
                ball.out = true;
            }else{
                ball.fly();
            }
        });
    },

    detectCollision: function(ball){
        var self = this;

        this.tank.forEach(function(tank){
            if(tank.id != ball.ownderId && Math.abs(tank.x - ball.x) < 30 && Math.abs(tank.y - ball.y) < 30){
                self.hurtTank(tank);
                ball.out = true;
            }
        });
    },

    hurtTank: function(tank){
        tank.hp -= 2;
    },

    getData: function(){
        var gameData = {};
        gameData.tanks = this.tanks;
        gameData.balls = this.balls;

        return gameData;
    },

    cleadDeadTanks: function(){
        this.tanks = this.tanks.filter(function(t){
            return t.hp > 0;
        });
    },

    cleanDeadBalls: function(){
        this.balls = this.balls.filter(function(ball){
            return !ball.out;
        });
    },

    increaseLastBallId: function(){
        this.lastBallId ++;
        if(this.lastBallId > 1000){
            this.lastBallId = 0;
        }
    }
}

var game = new GameServer();

io.on("connection", function (socket) {
    console.log(socket.id + " user has connected");
    if (io.sockets.adapter.rooms['extra room'].length < 3) {
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

    io.on('sync', function(data){
        if(data.tank != undefined){
            game.syncTank(data.tank);
        }

        game.syncBalls();

        io.emit('sync', game.getData());
        io.broadcast.emit('sync', game.getData());

        game.cleadDeadTanks();
        game.cleanDeadBalls();
        counter ++;
    });

    io.on('shoot', function(ball){
        var ball = new Ball(ball.ownderId, ball.alpha, ball.x, ball.y);
        game.addBall(ball);
    });

    io.on('leaveGame', function(tankId){
        game.removeTank(tankId);
        client.broadcast.emit('removeTank', tankId);
    });


    //Makes user at 0 in extra room join main room
    socket.on('leave room', function () {
        socket.leave('extra room');
        socket.room = 'main room';
        socket.join('main room');
        io.to(socket.room).emit('user joined', socket.nickname);
    });

    socket.on('add user', function (username) {
        var isMainRoom = true;
        socket.nickname = username;
        clients.push(socket.nickname);
        console.log(clients);
        if(socket.room === 'main room'){
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

    socket.on("get clients", function (msg) {
        console.log('sending clients');
        //io.emit('list clients', clients);
        //console.log(io.sockets.adapter);

        io.to(socket.room).emit('list clients', clients);
    });

   

    function getTank(user){
        var startX = getRandomInt(40,700);
        var startY = getRandomInt(40,400);
        user.emit('addTank',{id: user.id, type: tank.type, isLocal: true, x: startX, y: startY, hp: 100 });
        user.broadcast.emit('addTank', {id: user.id, type: tank.type, isLocal: false, x: startX, y:startY, hp: 100});
        game.addTank({id: user.id, type: tank.type, hp:100});
    }

});

function Ball(ownderId, alpha, x, y){
    this.id = game.lastBallId;
    game.increaseLastBallId();
    this.ownerId = ownerId;
    this.alpha = alpha;
    this.x = x;
    this.y = y;
    this.out = false;
};

Ball.prototype = {
    fly: function(){
        var speedX = BALL_SPEED * Math.sin(this.alpha);
        var speedY = -BALL_SPEED * Math.cos(this.alpha);
        this.x += speedX;
        this.y += speedY;
    }
}

 function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }



app.use(express.static('public'));

http.listen(process.env.PORT || 3000, function () {
    console.log("listening on port 3000");
});
