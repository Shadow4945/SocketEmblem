var stage;
var my_name;
var mouseX, mouseY;
var date = new Date();
var cacheVersion = date.getTime();
//replace date.getTime() above with the version number when ready to upload. This will prevent caching during development but will allow it for a particular version number when uploaded.
var jsEnd = ".js?a=" + cacheVersion;
manifest = [

    {
        src: "scripts/title" + jsEnd
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
    }
     , {
        src: "images/tankBbottom.png",
        id: "tankBbottom"
    }, {
        src: "images/tankBtop.png",
        id: "tankBtop"
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
}];
var walk, blocks, blockArray;
blockArray = [];
//This displays the sprites on the screen. Notice that I am putting clones of the blocks into an array. This is a really efficient way to duplicate sprite content and the preferred method.
function displaySprites() {
    //    walk.x = 100;
    //    walk.y = 200;
    //    walk.gotoAndPlay("walkRight");
    
    
    tankBbottom = new createjs.Bitmap(queue.getResult("tankBbottom"));
    tankBbottom.x = 100;
    tankBbottom.y = 100;
    tankPoint = tankBbottom.localToGlobal(0, 1);
    tankBbottom.y += (tankPoint.y - tankBbottom.y);
    tankBbottom.x += (tankPoint.x - tankBbottom.x);
    tankBbottom.regX = 21.5;
    tankBbottom.regY = 24;
    stage.addChild(tankBbottom);

    tankBtop = new createjs.Bitmap(queue.getResult("tankBtop"));
    tankTopPoint = tankBtop.localToGlobal(0, 1);
    tankBtop.x = tankBbottom.x;
    tankBtop.y = tankBbottom.y;
    tankBtop.regX = 13.5;
    tankBtop.regY = 35;
    stage.addChild(tankBtop);

    //This draws the objects the first time. It isn't really needed because we have a loop that redraws every frame.
    stage.update();
}

function loadComplete(evt) {
    titleScreen = new createjs.Bitmap(queue.getResult("title"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
    gamearea = new createjs.Bitmap(queue.getResult("gamearea"));
    gameover = new createjs.Bitmap(queue.getResult("gameover"));
    mouser = new createjs.Text(mouseX + "," + mouseY, "12px Arial", "#ffffff");
    // music = createjs.Sound.play("music", {
    //     loop: -1
    // });
    //This takes the images loaded from the sprite sheet and breaks it into the individual frames. I cut and pasted the 'frames' parameter from the .js file created by Flash when I exported in easelJS format. I didn't cut and paste anything except 'frames' because I am using preloadJS to load all the images completely before running the game. That's what the queue.getResult is all about.
    //I'm doing the same thing here. Notice I am reading this from the same sprite sheet. It is not reloading the sprite sheet though. It just copies it from memory since we already preloaded this image file. The 'animations' parameter is optional but it allows you to label a series of frames in order to play looping sprites. You can even control the playback speed in relation to the FPS. In the walk cycle, I used '.5' which means at 30 FPS, it plays at 15.
    var walkSheet = new createjs.SpriteSheet({
        images: [queue.getResult("mySprites")],
        frames: [[160, 0, 19, 49, 0, 10.05, 48.6], [179, 0, 34, 44, 0, 17.05, 43.6], [213, 0, 22, 46, 0, 9.05, 45.6], [235, 0, 17, 49, 0, 8.05, 48.6], [0, 49, 25, 49, 0, 10.05, 48.6], [25, 49, 31, 46, 0, 14.05, 45.6], [56, 49, 33, 44, 0, 16.05, 43.6], [89, 49, 30, 44, 0, 17.05, 43.6], [119, 49, 28, 46, 0, 17.05, 45.6], [147, 49, 19, 49, 0, 10.05, 48.6], [166, 49, 23, 49, 0, 14.05, 48.6], [189, 49, 31, 46, 0, 16.05, 45.6], [220, 49, 34, 44, 0, 17.05, 43.6], [0, 98, 19, 49, 0, 9.05, 48.6], [19, 98, 34, 44, 0, 17.05, 43.6], [53, 98, 22, 46, 0, 13.05, 45.6], [75, 98, 17, 49, 0, 9.05, 48.6], [92, 98, 25, 49, 0, 15.05, 48.6], [117, 98, 31, 46, 0, 17.05, 45.6], [148, 98, 33, 44, 0, 17.05, 43.6], [181, 98, 30, 44, 0, 13.05, 43.6], [211, 98, 28, 46, 0, 11.05, 45.6], [0, 147, 19, 49, 0, 9.05, 48.6], [19, 147, 23, 49, 0, 9.05, 48.6], [42, 147, 31, 46, 0, 15.05, 45.6], [73, 147, 34, 44, 0, 17.05, 43.6]],
        animations: {
            standRight: [0, 0, "standRight"],
            walkRight: [1, 12, "walkRight", .5],
            standLeft: [13, 13, "standLeft"],
            walkLeft: [14, 25, "walkLeft", .5]
        }
    });
    walk = new createjs.Sprite(walkSheet);
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
    console.log(" you");
    createjs.Sound.alternateExtensions = ["mp3"];
    queue = new createjs.LoadQueue(true, "assets/");
    queue.installPlugin(createjs.Sound);
    queue.on("complete", loadComplete, this);;
    queue.loadManifest(manifest);
}
$('document').ready(function () {
    var socket = io();

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

    socket.on('user joined', function (data) {
        $("#messages").prepend($('<li>').text(data + " has joined."));
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

    socket.on('addTank', function(tank){
        game.addTank(tank.id, tank.type, tank.isLocal, tank.x, tank.y);
    });


});

var player = {
    score: 0,
    x: ((Math.random() * 60) * 10) + 100,
    y: ((Math.random() * 60) * 10) + 100,
    score: 0
}

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 500;
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
    loadFiles();
    createPlayer();
}
if (!!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", main);
} else { //MSIE
    window.attachEvent("onload", main);
}