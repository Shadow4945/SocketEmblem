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
      //  console.log("left pressed");
        return false;
    case KEYCODE_RIGHT:
      //  console.log("right pressed");
        return false;
    case KEYCODE_UP:
      //  console.log("up pressed");
        return false;
    case KEYCODE_DOWN:
      //  console.log("down pressed");
        return false;
    case KEYCODE_W:
        tankBbottom.regX = 0;
        tankBbottom.regY = 0;
        tankPoint = tankBbottom.localToGlobal(0, 1);
        tankBbottom.y += (tankPoint.y - tankBbottom.y);
        tankBbottom.x += (tankPoint.x - tankBbottom.x);
        tankBbottom.regX = 21.5;
        tankBbottom.regY = 24;
        break;
    case KEYCODE_S:
        tankBbottom.regX = 0;
        tankBbottom.regY = 0;
        tankPoint = tankBbottom.localToGlobal(0, 1);
        tankBbottom.y -= (tankPoint.y - tankBbottom.y);
        tankBbottom.x -= (tankPoint.x - tankBbottom.x);
        tankBbottom.regX = 21.5;
        tankBbottom.regY = 24;
        break;
    case KEYCODE_A:
        tankBbottom.rotation += 2;
        break;
    case KEYCODE_D:
        tankBbottom.rotation -= 2;
        break;
    case KEYCODE_SPACE:
      //  console.log("space pressed");
      health-=50;
        break;
    }
}

function handleKeyUp(evt) {
    if (!evt) {
        var evt = window.event;
    } //browser compatibility
    switch (evt.keyCode) {
    case KEYCODE_LEFT:
        //console.log("left released");
        break;
    case KEYCODE_RIGHT:
      //  console.log("right released");
        break;
    case KEYCODE_UP:
      //  console.log("up released");
        break;
    case KEYCODE_DOWN:
      //  console.log("down released");
        break;
    case KEYCODE_W:
        //console.log("w released");
        break;
    case KEYCODE_S:
      //  console.log("s released");
        break;
    case KEYCODE_A:
      //  console.log("a released");
        break;
    case KEYCODE_D:
      //  console.log("d released");
        break;
    case KEYCODE_SPACE:
      //  console.log("space released");
        break;
    }
}
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
