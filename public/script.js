var stage;
var my_name;
var mouseX, mouseY;
var date = new Date();
var cacheVersion = date.getTime();
var selectedTank = 1;
var tankName = '';
var ROTATION_SPEED = 5;
var socket;
var mainRoom = false;
var socket = io();

//replace date.getTime() above with the version number when ready to upload. This will prevent caching during development but will allow it for a particular version number when uploaded.
var jsEnd = ".js?a=" + cacheVersion;
manifest = [

    {
        src: "scripts/title" + jsEnd
   }, {
        src: "scripts/ndgmr.collision" + jsEnd
    }
    , {
        src: "scripts/mouse" + jsEnd
   }

    , {
        src: "scripts/gameover" + jsEnd
    }
    , {
        src: "scripts/keycomands" + jsEnd
    }
    , {
        src: "scripts/gameloop" + jsEnd
    }
    , {
        src: "scripts/mainloop" + jsEnd
    }
    , {
        src: "scripts/buttons" + jsEnd
    }
    , {
        src: "scripts/timer" + jsEnd
    }, {
        src: "images/tankBbottom.png",
        id: "tankBbottom"
    }, {
        src: "images/tankBtop.png",
        id: "tankBtop"
    }, {
        src: "images/tankBbullet.png",
        id: "tankBbullet"
    }, {
        src: "images/title.jpg",
        id: "title"
    }
     , {
        src: "images/instructions.jpg",
        id: "instructions"
    }
       , {
        src: "images/gamearea.jpg",
        id: "gamearea"
    }
    , {
        src: "images/sprites.png",
        id: "mySprites"
    }

, {
        src: "images/GameOver.jpg",
        id: "gameover"
}, {
        src: "images/Rock.png",
        id: "Rock"
}];

//This displays the sprites on the screen. Notice that I am putting clones of the blocks into an array. This is a really efficient way to duplicate sprite content and the preferred method.
function displaySprites() {
    //    walk.x = 100;
    //    walk.y = 200;
    //    walk.gotoAndPlay("walkRight");


    myTank.tankBbottom = new createjs.Bitmap(queue.getResult("tankBbottom"));
    myTank.tankBbottom.x = getRandomInt(10, 700);
    myTank.tankBbottom.y = getRandomInt(10, 400);
    myTank.tankPoint = myTank.tankBbottom.localToGlobal(0, 1);
    myTank.tankBbottom.y += (myTank.tankPoint.y - myTank.tankBbottom.y);
    myTank.tankBbottom.x += (myTank.tankPoint.x - myTank.tankBbottom.x);
    myTank.tankBbottom.regX = 21.5;
    myTank.tankBbottom.regY = 24;
    stage.addChild(myTank.tankBbottom);

    myTank.tankBtop = new createjs.Bitmap(queue.getResult("tankBtop"));
    myTank.tankTopPoint = myTank.tankBtop.localToGlobal(0, 1);
    myTank.tankBtop.x = myTank.tankBbottom.x;
    myTank.tankBtop.y = myTank.tankBbottom.y;
    myTank.tankBtop.regX = 13.5;
    myTank.tankBtop.regY = 35;
    stage.addChild(myTank.tankBtop);

    //This draws the objects the first time. It isn't really needed because we have a loop that redraws every frame.
    //stage.update();
}

function loadComplete(evt) {
    titleScreen = new createjs.Bitmap(queue.getResult("title"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
    gamearea = new createjs.Bitmap(queue.getResult("gamearea"));
    gameover = new createjs.Bitmap(queue.getResult("gameover"));
    mouser = new createjs.Text(mouseX + "," + mouseY, "12px Arial", "#ffffff");
    music = createjs.Sound.play("music", {
        loop: -1
    });
    rock = new createjs.Bitmap(queue.getResult("Rock"))
        //This takes the images loaded from the sprite sheet and breaks it into the individual frames. I cut and pasted the 'frames' parameter from the .js file created by Flash when I exported in easelJS format. I didn't cut and paste anything except 'frames' because I am using preloadJS to load all the images completely before running the game. That's what the queue.getResult is all about.
        //I'm doing the same thing here. Notice I am reading this from the same sprite sheet. It is not reloading the sprite sheet though. It just copies it from memory since we already preloaded this image file. The 'animations' parameter is optional but it allows you to label a series of frames in order to play looping sprites. You can even control the playback speed in relation to the FPS. In the walk cycle, I used '.5' which means at 30 FPS, it plays at 15.

    showGameOver();
    showGameArea();
    addtimer();
    showInstructions();
    showTitle();
    buttons();
    displaySprites();
    stage.addChild(mouser);
    mouseInit();
    startLoop();
}

function loadFiles() {
    //    console.log(" you");
    createjs.Sound.alternateExtensions = ["mp3"];
    queue = new createjs.LoadQueue(true, "assets/");
    queue.installPlugin(createjs.Sound);
    queue.on("complete", loadComplete, this);;
    queue.loadManifest(manifest);
}
$('document').ready(function () {

    $('#client_info').submit(function (evt) {
        evt.preventDefault();
        var temp = '';
        socket.emit('get clients', temp);
    });

    socket.on("list clients", function (data) {
        $("#connected-users").html("");
        for (var c in data) {
            $("#connected-users").prepend($('<li>').text(data[c]));
        }
        //        console.log(data);
    });

    socket.on("peopleNum", function (peopleNum) {
        if (peopleNum > 3) {
            $('#name_form').hide();
            $('#warning').text("Sorry but there are already three players. You are a spectator now.");
        }
    });

    $('#game').hide();
    $('#message_form').hide();
    $('#name_form').submit(function (evt) {
        evt.preventDefault();
        my_name = $('#name').val();
        $('#name').val("");
        $('#name_holder').html('<h3>' + my_name + '</h3>');
        $('#message_form').show();

        console.log(socket.room);
        socket.emit('add user', my_name);
    });

    //Variables should work now
    $('#message_form').submit(function (evt) {
        evt.preventDefault();
        player.score += 3;
        player.x += player.score;
        var temp = {
            name: my_name,
            msg: $('#msg').val(),
            score: player.score,
            x: Math.floor(player.x),
            y: player.y
        }
        socket.emit('chat message', temp);
        $('#msg').val("");
    });

    socket.on('user joined', function (data, isMainRoom) {
        $("#messages").prepend($('<li>').text(data + " has joined."));
        mainRoom = isMainRoom;
        if (mainRoom) {
            $('#game').show();
        }
    });

    socket.on('user left', function (data) {
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


    socket.on('move room', function (data) {
        $("#messages").prepend($('<li>').text(data.message));
        socket.emit('leave room');
    });

    

   

});


var player = {
    score: 0,
    x: ((Math.random() * 60) * 10) + 100,
    y: ((Math.random() * 60) * 10) + 100,
    name: "player 1"
}

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 500;
    stage = new createjs.Stage(canvas); //makes stage object from the canvas
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function main() {
    setupCanvas();
    loadFiles();



}
if (!!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", main);
} else { //MSIE
    window.attachEvent("onload", main);
}