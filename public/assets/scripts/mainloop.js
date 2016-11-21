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
 var socket = io();
 myTank = {
     tankId: socket.id,
     tankBtop: this.tankBtop,
     tankBbottom: this.tankBbottom,
     tankBbullet: this.tankBbullet,
     tankPoint: this.tankPoint,
     tankTopPoint: this.tankTopPoint,
     tankBulletPoint: this.tankBulletPoint,     
     isShooting: this.isShooting
 }
 

 function loop() {
     switch (GAMESTATE) {
     case "started":
          winner.visible=false;
         titleScreen.visible = true;
         instructionScreen.visible = false;
         gamearea.visible = false;

         btnPlay.visible = true;
         btnIns.visible = true;
         btnTitle.visible = false;
         Title.visible = false;
         Ins.visible = true;
         play.visible = true;
         myTank.tankBtop.visible=false;
         myTank.tankBbottom.visible=false;
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

         btnPlay.visible = false;
         btnIns.visible = false;
         btnTitle.visible = false;
         Title.visible = false;
         Ins.visible = false;
         play.visible = false;
         score.visible = true;
         myTank.tankBtop.visible=true;
         myTank.tankBbottom.visible=true;
         rockArray[0].visible=true;
         rockArray[1].visible=true;
         rockArray[2].visible=true;
         rockArray[3].visible=true;
         timerStart();
         updateVisuals();
         socket.emit('get clients');
         break;
     case "instructions":
               winner.visible=false;
         titleScreen.visible = false;
         instructionScreen.visible = true;
         gamearea.visible = false;

         btnPlay.visible = true;
         btnIns.visible = false;
         btnTitle.visible = true;
         Title.visible = true;
         Ins.visible = false;
         score.visible = false;
         play.visible = true;
         myTank.tankBtop.visible=false;
         myTank.tankBbottom.visible=false;
         rockArray[0].visible=false;
         rockArray[1].visible=false;
         rockArray[2].visible=false;
         rockArray[3].visible=false;
         break;
     case "gameover":
         reset();
                   winner.visible=true;
         myTank.tankBtop.visible=false;
         myTank.tankBbottom.visible=false;
                rockArray.visible=false;
         titleScreen.visible = false;
         instructionScreen.visible = false;
         gamearea.visible = false;
         gameover.visible = true;

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

 socket.on('recieve clients',function(){
    var dataToSend = {
        myTank,
        rockArray
    }
    socket.emit('sendBack', dataToSend);
 });

 socket.on('client data', function(dataRecieved){
     console.log("This is "+ dataRecieved);
 });

 function startLoop() {
     var FPS = 30;
     createjs.Ticker.addEventListener('tick', loop);
     createjs.Ticker.setFPS(FPS);
     //socket.emit('get clients', "from game");
 }

 function movement() {
     if (rotateTopRight === true) {
         myTank.tankBtop.rotation += 3;
     } else if (rotateTopLeft === true) {
         myTank.tankBtop.rotation -= 3;
     }

     if (moveForward === true) {
         myTank.tankBbottom.regX = 0;
         myTank.tankBbottom.regY = 0;
         myTank.tankPoint = myTank.tankBbottom.localToGlobal(0, 3);
         myTank.tankBbottom.y -= (myTank.tankPoint.y - myTank.tankBbottom.y);
         myTank.tankBbottom.x -= (myTank.tankPoint.x - myTank.tankBbottom.x);
         myTank.tankBbottom.regX = 21.5;
         myTank.tankBbottom.regY = 24;

         myTank.tankTopPoint = myTank.tankBbottom.localToGlobal(0, 3);
         myTank.tankBtop.y = myTank.tankBbottom.y;
         myTank.tankBtop.x = myTank.tankBbottom.x;
     } else if (moveBackward === true) {
         myTank.tankBbottom.regX = 0;
         myTank.tankBbottom.regY = 0;
         myTank.tankPoint = myTank.tankBbottom.localToGlobal(0, 3);
         myTank.tankBbottom.y += (myTank.tankPoint.y - myTank.tankBbottom.y);
         myTank.tankBbottom.x += (myTank.tankPoint.x - myTank.tankBbottom.x);
         myTank.tankBbottom.regX = 21.5;
         myTank.tankBbottom.regY = 24;

         myTank.tankTopPoint = myTank.tankBbottom.localToGlobal(0, 1);
         myTank.tankBtop.y = myTank.tankBbottom.y;
         myTank.tankBtop.x = myTank.tankBbottom.x;
     }

     if (turnRight === true) {
         myTank.tankBbottom.rotation += 2;
     } else if (turnLeft === true) {
         myTank.tankBbottom.rotation -= 2;
     }
    
 }

 function shoot() {
     myTank.tankBbullet = new createjs.Bitmap(queue.getResult("tankBbullet"));
     myTank.tankBtop.regX = 0;
     myTank.tankBtop.regY = 0;
     myTank.tankTopPoint = myTank.tankBtop.localToGlobal(0, 3);
     myTank.tankBbullet.x += (myTank.tankTopPoint.x);
     myTank.tankBbullet.y += (myTank.tankTopPoint.y);
     myTank.tankBbullet.regX = 8;
     myTank.tankBbullet.regY = 90;
     myTank.tankBbullet.rotation = myTank.tankBtop.rotation;
     myTank.tankBtop.regX = 13.5;
     myTank.tankBtop.regY = 35;
     //     console.log((tankTopPoint.x - tankBtop.x));
     myTank.tankBbullet.scaleX = 0.5;
     myTank.tankBbullet.scaleY = 0.5;
     myTank.isShooting = true;

     stage.addChild(myTank.tankBbullet);
 }

 var timePerShot = 300;

 function shooting() {
     if (myTank.isShooting === true) {
         myTank.tankBbullet.regX = 0;
         myTank.tankBbullet.regY = 0;
         myTank.tankBulletPoint = myTank.tankBbullet.localToGlobal(0, 13);
         myTank.tankBbullet.x -= (myTank.tankBulletPoint.x - myTank.tankBbullet.x);
         myTank.tankBbullet.y -= (myTank.tankBulletPoint.y - myTank.tankBbullet.y);
         myTank.tankBbullet.regX = 8;
         myTank.tankBbullet.regY = 90;
         pt1 = collisionMethod(myTank.tankBbullet, rockArray[0], 0);
         pt2 = collisionMethod(myTank.tankBbullet, rockArray[1], 0);
         pt3 = collisionMethod(myTank.tankBbullet, rockArray[2], 0);
         pt4 = collisionMethod(myTank.tankBbullet, rockArray[3], 0);

         if (myTank.tankBbullet.x < 0 || myTank.tankBbullet.y < 0 || myTank.tankBbullet.x > 750 || myTank.tankBbullet.y > 500) {
             console.log("Reloaded");
             myTank.isShooting= false;
             stage.removeChild(myTank.tankBbullet);
         }
         if(pt1||pt2||pt3||pt4){
           switch (pt1||pt2||pt3||pt4) {
             case pt1:
             console.log("hits")
             myTank.isShooting=false;
              // stage.removeChild(rockArray[0]);
               rockArray[0].x=-50;
               stage.removeChild(myTank.tankBbullet);
   myTank.tankBbullet.x=-50;
               break;
               case pt2:
                // stage.removeChild(rockArray[1]);
                 stage.removeChild(myTank.tankBbullet);
                    rockArray[1].x=-50;
                       myTank.tankBbullet.x=-50;
                 break;
                 case pt3:
                  // stage.removeChild(rockArray[2]);
                   myTank.tankBbullet.x=-50;
                   stage.removeChild(myTank.tankBbullet);
                      rockArray[2].x=-50;
                   break;
                   case pt4:
                  //   stage.removeChild(rockArray[3]);
                     stage.removeChild(myTank.tankBbullet);
                          rockArray[3].x=-50;
                             myTank.tankBbullet.x=-50;
                     break;
             default:
               break;
           }
         }
     }
 }
