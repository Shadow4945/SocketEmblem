 var GAMESTATE = "started";
 var rotateTopRight = false;
 var rotateTopLeft = false;
 var moveForward = false;
 var moveBackward = false;
 var turnRight = false;
 var turnLeft = false;
 var isShooting = false;
 var collisionMethod = ndgmr.checkPixelCollision;
 var pt1;
 var tankBbullet;
 function loop() {
     switch (GAMESTATE) {
     case "started":
          winner.visible=false;
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
         tankBtop.visible=false;
         tankBbottom.visible=false;
         rockArray[0].visible=false;
         rockArray[1].visible=false;
         rockArray[2].visible=false;
         rockArray[3].visible=false;
         score.visible = false;
         break;
     case "startgame":
         movement();
         shooting();
                   winner.visible=false;
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
         tankBtop.visible=true;
         tankBbottom.visible=true;
         rockArray[0].visible=true;
         rockArray[1].visible=true;
         rockArray[2].visible=true;
         rockArray[3].visible=true;
         timerStart();
         updateVisuals();
         break;
     case "instructions":
               winner.visible=false;
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
         tankBtop.visible=false;
         tankBbottom.visible=false;
         rockArray[0].visible=false;
         rockArray[1].visible=false;
         rockArray[2].visible=false;
         rockArray[3].visible=false;
         break;
     case "gameover":
         reset();
                   winner.visible=true;
         tankBtop.visible=false;
         tankBbottom.visible=false;
                rockArray.visible=false;
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
         rockArray[0].visible=false;
         rockArray[1].visible=false;
         rockArray[2].visible=false;
         rockArray[3].visible=false;
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
         pt1 = collisionMethod(tankBbullet, rockArray[0], 0);
         pt2 = collisionMethod(tankBbullet, rockArray[1], 0);
         pt3 = collisionMethod(tankBbullet, rockArray[2], 0);
         pt4 = collisionMethod(tankBbullet, rockArray[3], 0);

         if (tankBbullet.x < 0 || tankBbullet.y < 0 || tankBbullet.x > 750 || tankBbullet.y > 500) {
             console.log("Reloaded");
             isShooting= false;
             stage.removeChild(tankBbullet);
         }
         if(pt1||pt2||pt3||pt4){
           switch (pt1||pt2||pt3||pt4) {
             case pt1:
             console.log("hits")
             isShooting=false;
              // stage.removeChild(rockArray[0]);
               rockArray[0].x=-50;
               stage.removeChild(tankBbullet);
   tankBbullet.x=-50;
               break;
               case pt2:
                // stage.removeChild(rockArray[1]);
                 stage.removeChild(tankBbullet);
                    rockArray[1].x=-50;
                       tankBbullet.x=-50;
                 break;
                 case pt3:
                  // stage.removeChild(rockArray[2]);
                   tankBbullet.x=-50;
                   stage.removeChild(tankBbullet);
                      rockArray[2].x=-50;
                   break;
                   case pt4:
                  //   stage.removeChild(rockArray[3]);
                     stage.removeChild(tankBbullet);
                          rockArray[3].x=-50;
                             tankBbullet.x=-50;
                     break;
             default:
               break;
           }
         }
     }
 }
