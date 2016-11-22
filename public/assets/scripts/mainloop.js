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
 var tankbullet;
 tankB = {
     tankId: null,
     tanktop: this.tanktop,
     tankbottom: this.tankbottom,
     tankbullet: this.tankbullet,
     tankPoint: this.tankPoint,
     tankTopPoint: this.tankTopPoint,
     tankulletPoint: this.tankulletPoint,
     isShooting: this.isShooting
 }

 tankR = {
     tankId: null,
     tanktop: this.tanktop,
     tankbottom: this.tankbottom,
     tankbullet: this.tankbullet,
     tankPoint: this.tankPoint,
     tankTopPoint: this.tankTopPoint,
     tankulletPoint: this.tankulletPoint,
     isShooting: this.isShooting
 }

 tankG = {
     tankId: null,
     tanktop: this.tanktop,
     tankbottom: this.tankbottom,
     tankbullet: this.tankbullet,
     tankPoint: this.tankPoint,
     tankTopPoint: this.tankTopPoint,
     tankulletPoint: this.tankBulletPoint,
     isShooting: this.isShooting
 }


 function loop() {
     switch (GAMESTATE) {
     case "started":
         winner.visible = false;
         titleScreen.visible = true;
         instructionScreen.visible = false;
         gamearea.visible = false;

         btnPlay.visible = true;
         btnIns.visible = true;
         btnTitle.visible = false;
         Title.visible = false;
         Ins.visible = true;
         play.visible = true;
         tankB.tanktop.visible = false;
         tankB.tankbottom.visible = false;
         tankG.tankbottom.visible = false;
         tankG.tanktop.visible = false;
         tankR.tanktop.visible = false;
         tankR.tankbottom.visible = false;
         rockArray[0].visible = false;
         rockArray[1].visible = false;
         rockArray[2].visible = false;
         rockArray[3].visible = false;
         score.visible = false;

         play.text = "Waiting for " + (3 - peopleInGame) + " players...";
         if (peopleInGame >= 3) {
             GAMESTATE = "startgame";
         }
         break;
     case "startgame":
         movement();
         shooting();
         winner.visible = false;
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
         tankB.tanktop.visible = true;
         tankB.tankbottom.visible = true;
         tankG.tankbottom.visible = true;
         tankG.tanktop.visible = true;
         tankR.tanktop.visible = true;
         tankR.tankbottom.visible = true;
         rockArray[0].visible = true;
         rockArray[1].visible = true;
         rockArray[2].visible = true;
         rockArray[3].visible = true;
         timerStart();
         updateVisuals();
         break;
     case "instructions":
         winner.visible = false;
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
         tankB.tanktop.visible = false;
         tankB.tankbottom.visible = false;
         tankG.tankbottom.visible = false;
         tankG.tanktop.visible = false;
         tankR.tanktop.visible = false;
         tankR.tankbottom.visible = false;
         rockArray[0].visible = false;
         rockArray[1].visible = false;
         rockArray[2].visible = false;
         rockArray[3].visible = false;
         break;
     case "gameover":
         reset();
         winner.visible = true;
         tankB.tanktop.visible = false;
         tankB.tankbottom.visible = false;
         tankG.tankbottom.visible = false;
         tankG.tanktop.visible = false;
         tankR.tanktop.visible = false;
         tankR.tankbottom.visible = false;
         rockArray.visible = false;
         titleScreen.visible = false;
         instructionScreen.visible = false;
         gamearea.visible = false;
         gameover.visible = true;


         btnIns.visible = false;
         btnTitle.visible = true;
         Title.visible = true;
         Ins.visible = false;

         score.visible = true;
         rockArray[0].visible = false;
         rockArray[1].visible = false;
         rockArray[2].visible = false;
         rockArray[3].visible = false;
         break;
     }
     stage.update();
 }

 socket.on('recieve clients', function () {
     var dataToSend = {
         tankB,
         rockArray
     }
     socket.emit('sendBack', dataToSend);
 });

 socket.on('client data', function (dataRecieved) {
     console.log("This is " + dataRecieved);
 });

 function startLoop() {
     var FPS = 30;
     createjs.Ticker.addEventListener('tick', loop);
     createjs.Ticker.setFPS(FPS);
     //socket.emit('get clients', "from game");
 }

 function movement() {

     if (rotateTopRight === true) {
         if (playerId === 1) {
             tankB.tanktop.rotation += 3;
             //         console.log(tankB.tanktop.rotation);
             socket.emit("sendTurretRotate", {
                 turretRotate: tankB.tanktop.rotation
             });
         }
     } else if (rotateTopLeft === true) {
         if (playerId === 1) {
             tankB.tanktop.rotation -= 3;
             //         console.log(tankB.tanktop.rotation);
             socket.emit("sendTurretRotate", {
                 turretRotate: tankB.tanktop.rotation
             });
         }
     }

     if (moveForward === true) {
         if (playerId === 1) {
             tankB.tankbottom.regX = 0;
             tankB.tankbottom.regY = 0;
             tankB.tankPoint = tankB.tankbottom.localToGlobal(0, 3);
             tankB.tankbottom.y -= (tankB.tankPoint.y - tankB.tankbottom.y);
             tankB.tankbottom.x -= (tankB.tankPoint.x - tankB.tankbottom.x);
             tankB.tankbottom.regX = 21.5;
             tankB.tankbottom.regY = 24;

             tankB.tankTopPoint = tankB.tankbottom.localToGlobal(0, 3);
             tankB.tanktop.y = tankB.tankbottom.y;
             tankB.tanktop.x = tankB.tankbottom.x;

             socket.emit("sendTankMove", {
                 tankX: tankB.tankbottom.x,
                 tankY: tankB.tankbottom.y,
                 tankTopX: tankB.tanktop.x,
                 tankTopY: tankB.tanktop.y
             });
         }
     } else if (moveBackward === true) {
         if (playerId === 1) {
             tankB.tankbottom.regX = 0;
             tankB.tankbottom.regY = 0;
             tankB.tankPoint = tankB.tankbottom.localToGlobal(0, 3);
             tankB.tankbottom.y += (tankB.tankPoint.y - tankB.tankbottom.y);
             tankB.tankbottom.x += (tankB.tankPoint.x - tankB.tankbottom.x);
             tankB.tankbottom.regX = 21.5;
             tankB.tankbottom.regY = 24;

             tankB.tankTopPoint = tankB.tankbottom.localToGlobal(0, 1);
             tankB.tanktop.y = tankB.tankbottom.y;
             tankB.tanktop.x = tankB.tankbottom.x;

             socket.emit("sendTankMove", {
                 tankX: tankB.tankbottom.x,
                 tankY: tankB.tankbottom.y,
                 tankTopX: tankB.tanktop.x,
                 tankTopY: tankB.tanktop.y
             });
         }
     }
     if (tankB.tankbottom.x <= 1) {
         tankB.tankbottom.x = 1;
         tankB.tanktop.x = tankB.tankbottom.x;
     }
     if (tankB.tankbottom.x >= 799) {
         tankB.tankbottom.x = 799;
         tankB.tanktop.x = tankB.tankbottom.x;
     }
     if (tankB.tankbottom.y <= 1) {
         tankB.tankbottom.y = 1;
         tankB.tanktop.y = tankB.tankbottom.y;
     }
     if (tankB.tankbottom.y >= 499) {
         tankB.tankbottom.y = 499;
         tankB.tanktop.y = tankB.tankbottom.y;
     }
     if (turnRight === true) {
         if (playerId === 1) {
             tankB.tankbottom.rotation += 2;
             socket.emit("sendTankRotate", {
                 tankRotate: tankB.tankbottom.rotation
             });
         }
     } else if (turnLeft === true) {
         if (playerId === 1) {
             tankB.tankbottom.rotation -= 2;
             socket.emit("sendTankRotate", {
                 tankRotate: tankB.tankbottom.rotation
             });
         }
     }

 }

 function shoot() {
     if (playerId === 1) {
         tankB.tankbullet = new createjs.Bitmap(queue.getResult("tankBbullet"));
         tankB.tanktop.regX = 0;
         tankB.tanktop.regY = 0;
         tankB.tankTopPoint = tankB.tanktop.localToGlobal(0, 3);
         tankB.tankbullet.x += (tankB.tankTopPoint.x);
         tankB.tankbullet.y += (tankB.tankTopPoint.y);
         tankB.tankbullet.regX = 8;
         tankB.tankbullet.regY = 90;
         tankB.tankbullet.rotation = tankB.tanktop.rotation;
         tankB.tanktop.regX = 13.5;
         tankB.tanktop.regY = 35;
         tankB.tankbullet.scaleX = 0.5;
         tankB.tankbullet.scaleY = 0.5;
         tankB.isShooting = true;

         stage.addChild(tankB.tankbullet);
     }
 }

 var timePerShot = 300;

 function shooting() {
     if (tankB.isShooting === true) {
         tankB.tankbullet.regX = 0;
         tankB.tankbullet.regY = 0;
         tankB.tankBulletPoint = tankB.tankbullet.localToGlobal(0, 13);
         tankB.tankbullet.x -= (tankB.tankBulletPoint.x - tankB.tankbullet.x);
         tankB.tankbullet.y -= (tankB.tankBulletPoint.y - tankB.tankbullet.y);
         tankB.tankbullet.regX = 8;
         tankB.tankbullet.regY = 90;
         pt1 = collisionMethod(tankB.tankbullet, rockArray[0], 0);
         pt2 = collisionMethod(tankB.tankbullet, rockArray[1], 0);
         pt3 = collisionMethod(tankB.tankbullet, rockArray[2], 0);
         pt4 = collisionMethod(tankB.tankbullet, rockArray[3], 0);

         if (tankB.tankbullet.x < 0 || tankB.tankbullet.y < 0 || tankB.tankbullet.x > 750 || tankB.tankbullet.y > 500) {
             //             console.log("Reloaded");
             tankB.isShooting = false;
             stage.removeChild(tankB.tankbullet);
         }
         if (pt1 || pt2 || pt3 || pt4) {
             switch (pt1 || pt2 || pt3 || pt4) {
             case pt1:
                 //                 console.log("hits")
                 tankB.isShooting = false;
                 // stage.removeChild(rockArray[0]);
                 rockArray[0].x = -50;
                 stage.removeChild(tankB.tankbullet);
                 tankB.tankbullet.x = -50;
                 break;
             case pt2:
                 // stage.removeChild(rockArray[1]);
                 stage.removeChild(tankB.tankbullet);
                 rockArray[1].x = -50;
                 tankB.tankbullet.x = -50;
                 break;
             case pt3:
                 // stage.removeChild(rockArray[2]);
                 tankB.tankbullet.x = -50;
                 stage.removeChild(tankB.tankbullet);
                 rockArray[2].x = -50;
                 break;
             case pt4:
                 //   stage.removeChild(rockArray[3]);
                 stage.removeChild(tankB.tankbullet);
                 rockArray[3].x = -50;
                 tankB.tankbullet.x = -50;
                 break;
             default:
                 break;
             }
         }
     }
 }

 socket.on("rotateTurret", function (data) {
     tankB.tanktop.rotation = data.turretRotation;
     //     console.log(data.turretRotation);
 });

 socket.on("rotateTank", function (data) {
     tankB.tankbottom.rotation = data.tankRotation;
 });

 socket.on("moveTank", function (data) {
     tankB.tankbottom.regX = 0;
     tankB.tankbottom.regY = 0;
     tankB.tankPoint = tankB.tankbottom.localToGlobal(0, 3);
     tankB.tankbottom.y = data.tankY;
     tankB.tankbottom.x = data.tankX;
     tankB.tankbottom.regX = 21.5;
     tankB.tankbottom.regY = 24;

     tankB.tankTopPoint = tankB.tankbottom.localToGlobal(0, 3);
     tankB.tanktop.y = data.tankTopY;
     tankB.tanktop.x = data.tankTopX;

 });

 socket.on("shootIt", function (data) {
     shoot();
 });