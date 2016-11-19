 var GAMESTATE = "started";
 var rotateTopRight = false;
 var rotateTopLeft = false;
 var moveForward = false;
 var moveBackward = false;
 var turnRight = false;
 var turnLeft = false;
 var isShooting = false;

 function loop() {
     switch (GAMESTATE) {
     case "started":

         titleScreen.visible = true;
         instructionScreen.visible = false;
         gamearea.visible = false;
         walk.visible = false;
         btnPlay.visible = true;
         btnIns.visible = true;
         btnTitle.visible = false;
         Title.visible = false;
         Ins.visible = true;
         play.visible = true;
         score.visible = false;
         break;
     case "startgame":
         movement();
         shooting();
         titleScreen.visible = false;
         instructionScreen.visible = false;
         gamearea.visible = true;
         walk.visible = true;
         btnPlay.visible = false;
         btnIns.visible = false;
         btnTitle.visible = false;
         Title.visible = false;
         Ins.visible = false;
         play.visible = false;
         score.visible = true;
         timerStart();
         updateVisuals();
         break;
     case "instructions":
         titleScreen.visible = false;
         instructionScreen.visible = true;
         gamearea.visible = false;
         walk.visible = false;
         btnPlay.visible = true;
         btnIns.visible = false;
         btnTitle.visible = true;
         Title.visible = true;
         Ins.visible = false;
         score.visible = false;
         play.visible = true;
         break;
     case "gameover":
         reset();
         titleScreen.visible = false;
         instructionScreen.visible = false;
         gamearea.visible = false;
         gameover.visible = true;
         walk.visible = false;
         btnPlay.visible = false;
         btnIns.visible = false;
         btnTitle.visible = true;
         Title.visible = true;
         Ins.visible = false;
         play.visible = false;
         score.visible = true;

         break;
     }
     stage.update();
 }

 function startLoop() {
     var FPS = 30;
     createjs.Ticker.addEventListener('tick', loop);
     createjs.Ticker.setFPS(FPS);
 }

 function movement() {
     if (rotateTopRight === true) {
         tankBtop.rotation += 3;
     } else if (rotateTopLeft === true) {
         tankBtop.rotation -= 3;
     }

     if (moveForward === true) {
         tankBbottom.regX = 0;
         tankBbottom.regY = 0;
         tankPoint = tankBbottom.localToGlobal(0, 3);
         tankBbottom.y -= (tankPoint.y - tankBbottom.y);
         tankBbottom.x -= (tankPoint.x - tankBbottom.x);
         tankBbottom.regX = 21.5;
         tankBbottom.regY = 24;

         tankTopPoint = tankBbottom.localToGlobal(0, 3);
         tankBtop.y = tankBbottom.y;
         tankBtop.x = tankBbottom.x;
     } else if (moveBackward === true) {
         tankBbottom.regX = 0;
         tankBbottom.regY = 0;
         tankPoint = tankBbottom.localToGlobal(0, 3);
         tankBbottom.y += (tankPoint.y - tankBbottom.y);
         tankBbottom.x += (tankPoint.x - tankBbottom.x);
         tankBbottom.regX = 21.5;
         tankBbottom.regY = 24;

         tankTopPoint = tankBbottom.localToGlobal(0, 1);
         tankBtop.y = tankBbottom.y;
         tankBtop.x = tankBbottom.x;
     }

     if (turnRight === true) {
         tankBbottom.rotation += 2;
     } else if (turnLeft === true) {
         tankBbottom.rotation -= 2;
     }
 }

 function shoot() {
     tankBbullet = new createjs.Bitmap(queue.getResult("tankBbullet"));
     tankBtop.regX = 0;
     tankBtop.regY = 0;
     tankTopPoint = tankBtop.localToGlobal(0, 3);
     tankBbullet.x += (tankTopPoint.x);
     tankBbullet.y += (tankTopPoint.y);
     tankBbullet.regX = 8;
     tankBbullet.regY = 90;
     tankBbullet.rotation = tankBtop.rotation;
     tankBtop.regX = 13.5;
     tankBtop.regY = 35;
     //     console.log((tankTopPoint.x - tankBtop.x));
     tankBbullet.scaleX = 0.5;
     tankBbullet.scaleY = 0.5;
     isShooting = true;

     stage.addChild(tankBbullet);
 }

 var timePerShot = 300;

 function shooting() {
     if (isShooting === true) {
         tankBbullet.regX = 0;
         tankBbullet.regY = 0;
         tankBulletPoint = tankBbullet.localToGlobal(0, 13);
         tankBbullet.x -= (tankBulletPoint.x - tankBbullet.x);
         tankBbullet.y -= (tankBulletPoint.y - tankBbullet.y);
         tankBbullet.regX = 8;
         tankBbullet.regY = 90;

         if (tankBbullet.x < 0 || tankBbullet.y < 0 || tankBbullet.x > 750 || tankBbullet.y > 500) {
             console.log("Reloaded");
             isShooting= false;
             stage.removeChild(tankBbullet);
         }
     }
 }