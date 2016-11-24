var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_W = 87;
var KEYCODE_S = 83;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_SPACE = 32;

function handleKeyDown(evt) {
    if (!evt) {
        var evt = window.event;
    } //browser compatibility
    switch (evt.keyCode) {
    case KEYCODE_LEFT:
        rotateTopLeft = true;
        break;
    case KEYCODE_RIGHT:
        rotateTopRight = true;
        break;
    case KEYCODE_UP:
        if (playerId === 1) {
            socket.emit("shoot", {
                shootId: "blue"
            });
            if (tankB.isShooting === false) {
                shoot("blue");
            }
        } else if (playerId === 2) {
            socket.emit("shoot", {
                shootId: "red"
            });
            if (tankR.isShooting === false) {
                shoot("red");
            }
        } else if (playerId === 3) {
            socket.emit("shoot", {
                shootId: "green"
            });
            if (tankG.isShooting === false) {
                shoot("green");
            }
        }
        //        console.log("Pew Pew");
        break;
    case KEYCODE_DOWN:
        break;
    case KEYCODE_W:
        moveForward = true;
        break;
    case KEYCODE_S:
        moveBackward = true;
        break;
    case KEYCODE_A:
        turnLeft = true;
        break;
    case KEYCODE_D:
        turnRight = true;
        break;
    case KEYCODE_SPACE:
        health -= 50;
        break;
    }
}

function handleKeyUp(evt) {
    if (!evt) {
        var evt = window.event;
    } //browser compatibility
    switch (evt.keyCode) {
    case KEYCODE_LEFT:
        rotateTopLeft = false;
        break;
    case KEYCODE_RIGHT:
        rotateTopRight = false;
        break;
    case KEYCODE_UP:
        //  console.log("up released");
        break;
    case KEYCODE_DOWN:
        //  console.log("down released");
        break;
    case KEYCODE_W:
        moveForward = false;
        break;
    case KEYCODE_S:
        moveBackward = false;
        break;
    case KEYCODE_A:
        turnLeft = false;
        break;
    case KEYCODE_D:
        turnRight = false;
        break;
    case KEYCODE_SPACE:
        //  console.log("space released");
        break;
    }
}
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;