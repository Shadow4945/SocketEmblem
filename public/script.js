var stage;
var my_name;
var mouseX, mouseY;
var date = new Date();
var cacheVersion = date.getTime();
var selectedTank = 1;
var tankName = '';
var mainRoom = false;
var playerId = null;
var socket = io();
peopleInGame = 0;

socket.on('getPlayerId', function (data) {
    playerId = data.userId;
    //        console.log("getplayerid: "+playerId);
});


//replace date.getTime() above with the version number when ready to upload. This will prevent caching during development but will allow it for a particular version number when uploaded.
var jsEnd = ".js?a=" + cacheVersion;
manifest = [

    {
        src: "scripts/title" + jsEnd
   }, {
        src: "scripts/ndgmr.collision" + jsEnd
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
        src: "images/tankRbottom.png",
        id: "tankRbottom"
    }, {
        src: "images/tankRtop.png",
        id: "tankRtop"
    }, {
        src: "images/tankRbullet.png",
        id: "tankRbullet"
    }, {
        src: "images/tankGbottom.png",
        id: "tankGbottom"
    }, {
        src: "images/tankGtop.png",
        id: "tankGtop"
    }, {
        src: "images/tankGbullet.png",
        id: "tankGbullet"
    }, {
        src: "images/title.jpg",
        id: "title"
    }
     , {
        src: "images/instructions.jpg",
        id: "instructions"
    }
       , {
        src: "images/background2.png",
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
}, {
        src: "sounds/Sniper_Rifle-Kibblesbob-2053709564.mp3",
        id: "shootSound"
}, {
        src: "sounds/Hitman.mp3",
        id: "music"
}];

//This displays the sprites on the screen. Notice that I am putting clones of the blocks into an array. This is a really efficient way to duplicate sprite content and the preferred method.
function displaySprites() {
    //    walk.x = 100;
    //    walk.y = 200;
    //    walk.gotoAndPlay("walkRight");


    tankB.tankbottom = new createjs.Bitmap(queue.getResult("tankBbottom"));
    tankB.tankbottom.x = 100;
    tankB.tankbottom.y = 100;
    tankB.tankPoint = tankB.tankbottom.localToGlobal(0, 1);
    tankB.tankbottom.y += (tankB.tankPoint.y - tankB.tankbottom.y);
    tankB.tankbottom.x += (tankB.tankPoint.x - tankB.tankbottom.x);
    tankB.tankbottom.regX = 21.5;
    tankB.tankbottom.regY = 24;
    stage.addChild(tankB.tankbottom);

    tankB.tanktop = new createjs.Bitmap(queue.getResult("tankBtop"));
    tankB.tankTopPoint = tankB.tanktop.localToGlobal(0, 1);
    tankB.tanktop.x = tankB.tankbottom.x;
    tankB.tanktop.y = tankB.tankbottom.y;
    tankB.tanktop.regX = 13.5;
    tankB.tanktop.regY = 35;
    stage.addChild(tankB.tanktop);

    tankR.tankbottom = new createjs.Bitmap(queue.getResult("tankRbottom"));
    tankR.tankbottom.x = 400;
    tankR.tankbottom.y = 100;
    tankR.tankPoint = tankR.tankbottom.localToGlobal(0, 1);
    tankR.tankbottom.y += (tankR.tankPoint.y - tankR.tankbottom.y);
    tankR.tankbottom.x += (tankR.tankPoint.x - tankR.tankbottom.x);
    tankR.tankbottom.regX = 21.5;
    tankR.tankbottom.regY = 24;
    stage.addChild(tankR.tankbottom);

    tankR.tanktop = new createjs.Bitmap(queue.getResult("tankRtop"));
    tankR.tankTopPoint = tankR.tanktop.localToGlobal(0, 1);
    tankR.tanktop.x = tankR.tankbottom.x;
    tankR.tanktop.y = tankR.tankbottom.y;
    tankR.tanktop.regX = 13.5;
    tankR.tanktop.regY = 35;
    stage.addChild(tankR.tanktop);

    tankG.tankbottom = new createjs.Bitmap(queue.getResult("tankGbottom"));
    tankG.tankbottom.x = 700;
    tankG.tankbottom.y = 100;
    tankG.tankPoint = tankG.tankbottom.localToGlobal(0, 1);
    tankG.tankbottom.y += (tankG.tankPoint.y - tankG.tankbottom.y);
    tankG.tankbottom.x += (tankG.tankPoint.x - tankG.tankbottom.x);
    tankG.tankbottom.regX = 21.5;
    tankG.tankbottom.regY = 24;
    stage.addChild(tankG.tankbottom);

    tankG.tanktop = new createjs.Bitmap(queue.getResult("tankGtop"));
    tankG.tankTopPoint = tankG.tanktop.localToGlobal(0, 1);
    tankG.tanktop.x = tankG.tankbottom.x;
    tankG.tanktop.y = tankG.tankbottom.y;
    tankG.tanktop.regX = 13.5;
    tankG.tanktop.regY = 35;
    stage.addChild(tankG.tanktop);

    //This draws the objects the first time. It isn't really needed because we have a loop that redraws every frame.
    //stage.update();
}

function loadComplete(evt) {
    titleScreen = new createjs.Bitmap(queue.getResult("title"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
    gamearea = new createjs.Bitmap(queue.getResult("gamearea"));
    gameover = new createjs.Bitmap(queue.getResult("gameover"));

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

    socket.on('user joined', function (data, isMainRoom, id) {
        //        console.log("user joined: "+id.userId);
        //        socket.emit("sendPlayerId", {
        //            playerId: id.userId
        //        });
        $("#messages").prepend($('<li>').text(data + " has joined."));
        player.name = data;
        mainRoom = isMainRoom;
        if (mainRoom) {
            $('#game').show();
        }
    });


    socket.on('user left', function (data, isMainRoom) {
        if(isMainRoom){
            peopleInGame -= 1;
        }
        socket.playerId = null;
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

    socket.on('updatePeopleInGame', function (newNum) {
        console.log(newNum);
        if(peopleInGame <= newNum){
            peopleInGame = newNum;
        }
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
