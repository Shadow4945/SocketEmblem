var stage;
var my_name;

$('document').ready(function () {
    var socket = io();

    $('#client_info').submit(function (evt) {
        evt.preventDefault();
        var temp = '';
        socket.emit('get clients', temp);
    });

    socket.on("list clients", function (data) {
        $("#connected-users").html("");
        for(var c in data){
            $("#connected-users").prepend($('<li>').text(data[c]));
        }
        console.log(data);
    });

    socket.on("peopleNum", function (peopleNum) {
        if (peopleNum > 3) {
            $('#name_form').hide();
            $('#warning').text("Sorry but there are already three players. You are a spectator now.");
        }
    });

    $('#message_form').hide();
    $('#name_form').submit(function (evt) {
        evt.preventDefault();
        my_name = $('#name').val();
        $('#name').val("");
        $('#name_holder').html('<h3>' + my_name + '</h3>');
        $('#message_form').show();
        
        socket.emit('add user', my_name);
    });


    $('#message_form').submit(function (evt) {
        evt.preventDefault();
        player.score += 3;
        player.x += player.score;
        var temp = {
            name: my_name,
            msg: $('#msg').val(),
            score: player.score,
            x: player.x,
            y: player.y
        }
        socket.emit('chat message', temp);
        $('#msg').val("");
    });

    socket.on('user joined', function(data){
        $("#messages").prepend($('<li>').text(data + " has joined."));
    });

    socket.on('user left', function(data){
        $("#messages").prepend($('<li>').text(data + " has left."));
    });

    socket.on("chat received", function (data) {
        $('#messages').prepend($('<li>').text(data.name + ' score is: ' + data.score));
        $('#messages').prepend($('<li>').text(data.name + ' has an x and y value of ' + data.x + ", " + data.y));
        $('#messages').prepend($('<li>').text(data.name + ' says: ' + data.message));
    });

    socket.on("check players", function (data) {
        $('#name_form').hide();
        $('#warning').append('<p>').text("Sorry there are too many people. But you can watch.");
    });

    main();

});

var player = {
    score: 0,
    x: ((Math.random()*60) * 10)+100,
    y: 20
}

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 400;
    stage = new createjs.Stage(canvas); //makes stage object from the canvas
}

function createPlayer() {
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("#447").drawRect(0, 0, 20, 20);
    myText = new createjs.Text(my_name, "12px Arial", "#ffffff"); //creates text object
    myText.x = 0;
    myText.y = 0;
}

function main() {
    setupCanvas();
    createPlayer();
}