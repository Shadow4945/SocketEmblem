var express = require('express')
    , app = express()
    , http = require('http').Server(app)
    , io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
var people = 0;
io.on("connection", function (socket) {
    console.log(socket.id + " user has connected");
    socket.nickname = 'Guest';
    socket.on("disconnect", function () {

        console.log(socket.id + "user has disconnected");
    });
    socket.on("chat message", function (msg) {
        console.log(msg.msg);
        console.log(msg.name)
        //console.log(io.sockets.clients());
        io.emit('chat received', {
            message: msg.msg
            , sid: socket.id
            , name: msg.name,
            score:msg.score,
            y :msg.y,
            x:msg.x,
        });
    });
    socket.on("get clients", function (msg) {
        io.emit('list clients', io.sockets.clients().adapter.sids);
    });
});
app.use(express.static('public'));
http.listen(3000, function () {
    console.log("listening on port 3000");
})
