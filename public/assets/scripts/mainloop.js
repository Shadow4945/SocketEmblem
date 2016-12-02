var GAMESTATE = "started";
var rotateTopRight = false;
var rotateTopLeft = false;
var moveForward = false;
var moveBackward = false;
var turnRight = false;
var turnLeft = false;
var isShooting = false;
var emptyPortArrayLength = 3;
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
        waitingSign.visible = false;

        break;
    case "waiting":
        winner.visible = false;
        titleScreen.visible = true;
        instructionScreen.visible = false;
        gamearea.visible = false;

        btnPlay.visible = false;
        btnIns.visible = false;
        btnTitle.visible = false;
        Title.visible = false;
        Ins.visible = false;
        play.visible = false;
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
        waitingSign.visible = true;


        waitingSign.text = "Waiting for " + (3 - peopleInGame) + " players...";
        if (emptyPortArrayLength === 0) {
            GAMESTATE = "startgame";
        }
        socket.emit('updateOthers', peopleInGame);
        break;
    case "startgame":
        movement();
        shooting();
        winner.visible = false;
        titleScreen.visible = false;
        instructionScreen.visible = false;
        gamearea.visible = true;

        Bhealthbar.visible = true;
        Ghealthbar.visible = true;
        Rhealthbar.visible = true;

        btnPlay.visible = false;
        btnIns.visible = false;
        btnTitle.visible = false;
        Title.visible = false;
        Ins.visible = false;
        play.visible = false;
        score.visible = true;
        waitingSign.visible = false;
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
        waitingSign.visible = false;
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
        Bhealthbar.visible = false;
        Ghealthbar.visible = false;
        Rhealthbar.visible = false;
        btnIns.visible = false;
        btnTitle.visible = true;
        Title.visible = true;
        Ins.visible = false;
        waitingSign.visible = false;

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

    // tt1 = collisionMethod(tankB.tankBbottom, rockArray[0], 0);
    // tt2 = collisionMethod(tankB.tankBbottom, rockArray[1], 0);
    // tt3 = collisionMethod(tankB.tankBbottom, rockArray[2], 0);
    // tt4 = collisionMethod(tankB.tankBbottom, rockArray[3], 0);

    if (rotateTopRight === true) {
        if (playerId === 1) {
            tankB.tanktop.rotation += 3;
            //         console.log(tankB.tanktop.rotation);
            socket.emit("sendTurretRotate", {
                turretRotate: tankB.tanktop.rotation,
                playerId: playerId,
                tankColor: "blue"
            });
        } else if (playerId === 2) {
            tankR.tanktop.rotation += 3;
            socket.emit("sendTurretRotate", {
                turretRotate: tankR.tanktop.rotation,
                playerId: playerId,
                tankColor: "red"
            });
        } else if (playerId === 3) {
            tankG.tanktop.rotation += 3;
            socket.emit("sendTurretRotate", {
                turretRotate: tankG.tanktop.rotation,
                playerId: playerId,
                tankColor: "green"
            });
        }
    } else if (rotateTopLeft === true) {
        if (playerId === 1) {
            tankB.tanktop.rotation -= 3;
            //         console.log(tankB.tanktop.rotation);
            socket.emit("sendTurretRotate", {
                turretRotate: tankB.tanktop.rotation,
                playerId: playerId,
                tankColor: "blue"
            });
        } else if (playerId === 2) {
            tankR.tanktop.rotation -= 3;
            socket.emit("sendTurretRotate", {
                turretRotate: tankR.tanktop.rotation,
                playerId: playerId,
                tankColor: "red"
            });
        } else if (playerId === 3) {
            tankG.tanktop.rotation -= 3;
            socket.emit("sendTurretRotate", {
                turretRotate: tankG.tanktop.rotation,
                playerId: playerId,
                tankColor: "green"
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
                tankTopY: tankB.tanktop.y,
                playerId: playerId,
                tankColor: "blue"
            });
        } else if (playerId === 2) {
            tankR.tankbottom.regX = 0;
            tankR.tankbottom.regY = 0;
            tankR.tankPoint = tankR.tankbottom.localToGlobal(0, 3);
            tankR.tankbottom.y -= (tankR.tankPoint.y - tankR.tankbottom.y);
            tankR.tankbottom.x -= (tankR.tankPoint.x - tankR.tankbottom.x);
            tankR.tankbottom.regX = 21.5;
            tankR.tankbottom.regY = 24;

            tankR.tankTopPoint = tankR.tankbottom.localToGlobal(0, 3);
            tankR.tanktop.y = tankR.tankbottom.y;
            tankR.tanktop.x = tankR.tankbottom.x;

            socket.emit("sendTankMove", {
                tankX: tankR.tankbottom.x,
                tankY: tankR.tankbottom.y,
                tankTopX: tankR.tanktop.x,
                tankTopY: tankR.tanktop.y,
                playerId: playerId,
                tankColor: "red"
            });
        } else if (playerId == 3) {
            tankG.tankbottom.regX = 0;
            tankG.tankbottom.regY = 0;
            tankG.tankPoint = tankG.tankbottom.localToGlobal(0, 3);
            tankG.tankbottom.y -= (tankG.tankPoint.y - tankG.tankbottom.y);
            tankG.tankbottom.x -= (tankG.tankPoint.x - tankG.tankbottom.x);
            tankG.tankbottom.regX = 21.5;
            tankG.tankbottom.regY = 24;

            tankG.tankTopPoint = tankG.tankbottom.localToGlobal(0, 3);
            tankG.tanktop.y = tankG.tankbottom.y;
            tankG.tanktop.x = tankG.tankbottom.x;

            socket.emit("sendTankMove", {
                tankX: tankG.tankbottom.x,
                tankY: tankG.tankbottom.y,
                tankTopX: tankG.tanktop.x,
                tankTopY: tankG.tanktop.y,
                playerId: playerId,
                tankColor: "green"
            });
        }
    } else if (moveBackward === true) {
        //         if (playerId === 1) {
        //             tankB.tankbottom.regX = 0;
        //             tankB.tankbottom.regY = 0;
        //             tankB.tankPoint = tankB.tankbottom.localToGlobal(0, 3);
        //             tankB.tankbottom.y += (tankB.tankPoint.y - tankB.tankbottom.y);
        //             tankB.tankbottom.x += (tankB.tankPoint.x - tankB.tankbottom.x);
        //             tankB.tankbottom.regX = 21.5;
        //             tankB.tankbottom.regY = 24;
        //
        //             tankB.tankTopPoint = tankB.tankbottom.localToGlobal(0, 1);
        //             tankB.tanktop.y = tankB.tankbottom.y;
        //             tankB.tanktop.x = tankB.tankbottom.x;
        //
        //             socket.emit("sendTankMove", {
        //                 tankX: tankB.tankbottom.x,
        //                 tankY: tankB.tankbottom.y,
        //                 tankTopX: tankB.tanktop.x,
        //                 tankTopY: tankB.tanktop.y
        //             });
        //         }

        if (playerId === 1) {
            tankB.tankbottom.regX = 0;
            tankB.tankbottom.regY = 0;
            tankB.tankPoint = tankB.tankbottom.localToGlobal(0, 3);
            tankB.tankbottom.y += (tankB.tankPoint.y - tankB.tankbottom.y);
            tankB.tankbottom.x += (tankB.tankPoint.x - tankB.tankbottom.x);
            tankB.tankbottom.regX = 21.5;
            tankB.tankbottom.regY = 24;

            tankB.tankTopPoint = tankB.tankbottom.localToGlobal(0, 3);
            tankB.tanktop.y = tankB.tankbottom.y;
            tankB.tanktop.x = tankB.tankbottom.x;

            socket.emit("sendTankMove", {
                tankX: tankB.tankbottom.x,
                tankY: tankB.tankbottom.y,
                tankTopX: tankB.tanktop.x,
                tankTopY: tankB.tanktop.y,
                playerId: playerId,
                tankColor: "blue"
            });
        } else if (playerId === 2) {
            tankR.tankbottom.regX = 0;
            tankR.tankbottom.regY = 0;
            tankR.tankPoint = tankR.tankbottom.localToGlobal(0, 3);
            tankR.tankbottom.y += (tankR.tankPoint.y - tankR.tankbottom.y);
            tankR.tankbottom.x += (tankR.tankPoint.x - tankR.tankbottom.x);
            tankR.tankbottom.regX = 21.5;
            tankR.tankbottom.regY = 24;

            tankR.tankTopPoint = tankR.tankbottom.localToGlobal(0, 3);
            tankR.tanktop.y = tankR.tankbottom.y;
            tankR.tanktop.x = tankR.tankbottom.x;

            socket.emit("sendTankMove", {
                tankX: tankR.tankbottom.x,
                tankY: tankR.tankbottom.y,
                tankTopX: tankR.tanktop.x,
                tankTopY: tankR.tanktop.y,
                playerId: playerId,
                tankColor: "red"
            });
        } else if (playerId == 3) {
            tankG.tankbottom.regX = 0;
            tankG.tankbottom.regY = 0;
            tankG.tankPoint = tankG.tankbottom.localToGlobal(0, 3);
            tankG.tankbottom.y += (tankG.tankPoint.y - tankG.tankbottom.y);
            tankG.tankbottom.x += (tankG.tankPoint.x - tankG.tankbottom.x);
            tankG.tankbottom.regX = 21.5;
            tankG.tankbottom.regY = 24;

            tankG.tankTopPoint = tankG.tankbottom.localToGlobal(0, 3);
            tankG.tanktop.y = tankG.tankbottom.y;
            tankG.tanktop.x = tankG.tankbottom.x;

            socket.emit("sendTankMove", {
                tankX: tankG.tankbottom.x,
                tankY: tankG.tankbottom.y,
                tankTopX: tankG.tanktop.x,
                tankTopY: tankG.tanktop.y,
                playerId: playerId,
                tankColor: "green"
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
    if (tankR.tankbottom.x <= 1) {
        tankR.tankbottom.x = 1;
        tankR.tanktop.x = tankR.tankbottom.x;
    }
    if (tankR.tankbottom.x >= 799) {
        tankR.tankbottom.x = 799;
        tankR.tanktop.x = tankR.tankbottom.x;
    }
    if (tankR.tankbottom.y <= 1) {
        tankR.tankbottom.y = 1;
        tankR.tanktop.y = tankR.tankbottom.y;
    }
    if (tankR.tankbottom.y >= 499) {
        tankR.tankbottom.y = 499;
        tankR.tanktop.y = tankR.tankbottom.y;
    }
    if (tankG.tankbottom.x <= 1) {
        tankG.tankbottom.x = 1;
        tankG.tanktop.x = tankG.tankbottom.x;
    }
    if (tankG.tankbottom.x >= 799) {
        tankG.tankbottom.x = 799;
        tankG.tanktop.x = tankG.tankbottom.x;
    }
    if (tankG.tankbottom.y <= 1) {
        tankG.tankbottom.y = 1;
        tankG.tanktop.y = tankG.tankbottom.y;
    }
    if (tankG.tankbottom.y >= 499) {
        tankG.tankbottom.y = 499;
        tankG.tanktop.y = tankG.tankbottom.y;
    }

    if (turnRight === true) {
        if (playerId === 1) {
            tankB.tankbottom.rotation += 2;
            socket.emit("sendTankRotate", {
                tankRotate: tankB.tankbottom.rotation,
                playerId: playerId,
                tankColor: "blue"
            });
        } else if (playerId === 2) {
            tankR.tankbottom.rotation += 2;
            socket.emit("sendTankRotate", {
                tankRotate: tankR.tankbottom.rotation,
                playerId: playerId,
                tankColor: "red"
            });
        } else if (playerId === 3) {
            tankG.tankbottom.rotation += 2;
            socket.emit("sendTankRotate", {
                tankRotate: tankG.tankbottom.rotation,
                playerId: playerId,
                tankColor: "green"
            });
        }
    } else if (turnLeft === true) {
        if (playerId === 1) {
            tankB.tankbottom.rotation -= 2;
            socket.emit("sendTankRotate", {
                tankRotate: tankB.tankbottom.rotation,
                playerId: playerId,
                tankColor: "blue"
            });
        } else if (playerId === 2) {
            tankR.tankbottom.rotation -= 2;
            socket.emit("sendTankRotate", {
                tankRotate: tankR.tankbottom.rotation,
                playerId: playerId,
                tankColor: "red"
            });
        } else if (playerId === 3) {
            tankG.tankbottom.rotation -= 2;
            socket.emit("sendTankRotate", {
                tankRotate: tankG.tankbottom.rotation,
                playerId: playerId,
                tankColor: "green"
            });
        }
    }

}

function shoot(shootId) {
    if (shootId === "blue") {
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
    } else if (shootId === "red") {
        tankR.tankbullet = new createjs.Bitmap(queue.getResult("tankRbullet"));
        tankR.tanktop.regX = 0;
        tankR.tanktop.regY = 0;
        tankR.tankTopPoint = tankR.tanktop.localToGlobal(0, 3);
        tankR.tankbullet.x += (tankR.tankTopPoint.x);
        tankR.tankbullet.y += (tankR.tankTopPoint.y);
        tankR.tankbullet.regX = 8;
        tankR.tankbullet.regY = 90;
        tankR.tankbullet.rotation = tankR.tanktop.rotation;
        tankR.tanktop.regX = 13.5;
        tankR.tanktop.regY = 35;
        tankR.tankbullet.scaleX = 0.5;
        tankR.tankbullet.scaleY = 0.5;
        tankR.isShooting = true;

        stage.addChild(tankR.tankbullet);
    } else if (shootId === "green") {
        tankG.tankbullet = new createjs.Bitmap(queue.getResult("tankGbullet"));
        tankG.tanktop.regX = 0;
        tankG.tanktop.regY = 0;
        tankG.tankTopPoint = tankG.tanktop.localToGlobal(0, 3);
        tankG.tankbullet.x += (tankG.tankTopPoint.x);
        tankG.tankbullet.y += (tankG.tankTopPoint.y);
        tankG.tankbullet.regX = 8;
        tankG.tankbullet.regY = 90;
        tankG.tankbullet.rotation = tankG.tanktop.rotation;
        tankG.tanktop.regX = 13.5;
        tankG.tanktop.regY = 35;
        tankG.tankbullet.scaleX = 0.5;
        tankG.tankbullet.scaleY = 0.5;
        tankG.isShooting = true;

        stage.addChild(tankG.tankbullet);
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
        pt5 = collisionMethod(tankB.tankbullet, tankR.tankbottom, 0);
        pt6 = collisionMethod(tankB.tankbullet, tankG.tankbottom, 0);

        if (tankB.tankbullet.x < 0 || tankB.tankbullet.y < 0 || tankB.tankbullet.x > 750 || tankB.tankbullet.y > 500) {
            //             console.log("Reloaded");
            tankB.isShooting = false;
            stage.removeChild(tankB.tankbullet);
        }
        if (pt1 || pt2 || pt3 || pt4 || pt5 || pt6) {
            switch (pt1 || pt2 || pt3 || pt4 || pt5 || pt6) {
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
            case pt5:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankB.tankbullet);
                socket.emit("tankHit", {
                    tankshootingColor: "blue",
                    tankshotColor: "red"
                });
                //                 Btotal += 10;
                //                 Rhealth -= 50;
                tankB.tankbullet.x = -50;
                break;
            case pt6:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankB.tankbullet);
                socket.emit("tankHit", {
                    tankshootingColor: "blue",
                    tankshotColor: "green"
                });
                //                 Btotal += 10;
                //                 Ghealth -= 50;
                tankB.tankbullet.x = -50;
                break;
            default:
                break;
            }
        }
    }
    if (tankR.isShooting === true) {
        tankR.tankbullet.regX = 0;
        tankR.tankbullet.regY = 0;
        tankR.tankBulletPoint = tankR.tankbullet.localToGlobal(0, 13);
        tankR.tankbullet.x -= (tankR.tankBulletPoint.x - tankR.tankbullet.x);
        tankR.tankbullet.y -= (tankR.tankBulletPoint.y - tankR.tankbullet.y);
        tankR.tankbullet.regX = 8;
        tankR.tankbullet.regY = 90;
        pt1 = collisionMethod(tankR.tankbullet, rockArray[0], 0);
        pt2 = collisionMethod(tankR.tankbullet, rockArray[1], 0);
        pt3 = collisionMethod(tankR.tankbullet, rockArray[2], 0);
        pt4 = collisionMethod(tankR.tankbullet, rockArray[3], 0);
        pt5 = collisionMethod(tankR.tankbullet, tankB.tankbottom, 0);
        pt6 = collisionMethod(tankR.tankbullet, tankG.tankbottom, 0);
        if (tankR.tankbullet.x < 0 || tankR.tankbullet.y < 0 || tankR.tankbullet.x > 750 || tankR.tankbullet.y > 500) {
            //             console.log("Reloaded");
            tankR.isShooting = false;
            stage.removeChild(tankR.tankbullet);
        }
        if (pt1 || pt2 || pt3 || pt4 || pt5 || pt6) {
            switch (pt1 || pt2 || pt3 || pt4 || pt5 || pt6) {
            case pt1:
                //                 console.log("hits")
                tankR.isShooting = false;
                // stage.removeChild(rockArray[0]);
                rockArray[0].x = -50;
                stage.removeChild(tankR.tankbullet);
                tankR.tankbullet.x = -50;
                break;
            case pt2:
                // stage.removeChild(rockArray[1]);
                stage.removeChild(tankR.tankbullet);
                rockArray[1].x = -50;
                tankR.tankbullet.x = -50;
                break;
            case pt3:
                // stage.removeChild(rockArray[2]);
                tankR.tankbullet.x = -50;
                stage.removeChild(tankR.tankbullet);
                rockArray[2].x = -50;
                break;
            case pt4:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankR.tankbullet);
                rockArray[3].x = -50;
                tankR.tankbullet.x = -50;
                break;
            case pt5:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankR.tankbullet);
                socket.emit("tankHit", {
                    tankshootingColor: "red",
                    tankshotColor: "blue"
                });
                //                 Bhealth -= 50;
                //                 Rtotal += 10;
                tankR.tankbullet.x = -50;
                break;
            case pt6:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankR.tankbullet);
                socket.emit("tankHit", {
                    tankshootingColor: "red",
                    tankshotColor: "green"
                });
                //                 Ghealth -= 50;
                //                 Rtotal += 10;
                tankR.tankbullet.x = -50;
                break;
            default:
                break;
            }
        }
    }
    if (tankG.isShooting === true) {
        tankG.tankbullet.regX = 0;
        tankG.tankbullet.regY = 0;
        tankG.tankBulletPoint = tankG.tankbullet.localToGlobal(0, 13);
        tankG.tankbullet.x -= (tankG.tankBulletPoint.x - tankG.tankbullet.x);
        tankG.tankbullet.y -= (tankG.tankBulletPoint.y - tankG.tankbullet.y);
        tankG.tankbullet.regX = 8;
        tankG.tankbullet.regY = 90;
        pt1 = collisionMethod(tankG.tankbullet, rockArray[0], 0);
        pt2 = collisionMethod(tankG.tankbullet, rockArray[1], 0);
        pt3 = collisionMethod(tankG.tankbullet, rockArray[2], 0);
        pt4 = collisionMethod(tankG.tankbullet, rockArray[3], 0);
        pt5 = collisionMethod(tankG.tankbullet, tankB.tankbottom, 0);
        pt6 = collisionMethod(tankG.tankbullet, tankR.tankbottom, 0);
        if (tankG.tankbullet.x < 0 || tankG.tankbullet.y < 0 || tankG.tankbullet.x > 750 || tankG.tankbullet.y > 500) {
            //             console.log("Reloaded");
            tankG.isShooting = false;
            stage.removeChild(tankG.tankbullet);
        }
        if (pt1 || pt2 || pt3 || pt4 || pt5 || pt6) {
            switch (pt1 || pt2 || pt3 || pt4 || pt5 || pt6) {
            case pt1:
                //                 console.log("hits")
                tankG.isShooting = false;
                // stage.removeChild(rockArray[0]);
                rockArray[0].x = -50;
                stage.removeChild(tankG.tankbullet);
                tankG.tankbullet.x = -50;
                break;
            case pt2:
                // stage.removeChild(rockArray[1]);
                stage.removeChild(tankG.tankbullet);
                rockArray[1].x = -50;
                tankG.tankbullet.x = -50;
                break;
            case pt3:
                // stage.removeChild(rockArray[2]);
                tankG.tankbullet.x = -50;
                stage.removeChild(tankG.tankbullet);
                rockArray[2].x = -50;
                break;
            case pt4:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankG.tankbullet);
                rockArray[3].x = -50;
                tankG.tankbullet.x = -50;
                break;
            case pt5:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankG.tankbullet);
                socket.emit("tankHit", {
                    tankshootingColor: "green",
                    tankshotColor: "blue"
                });
                //                 Bhealth -= 50;
                //                 Gtotal += 10;
                tankG.tankbullet.x = -50;
                break;
            case pt6:
                //   stage.removeChild(rockArray[3]);
                stage.removeChild(tankG.tankbullet);
                socket.emit("tankHit", {
                    tankshootingColor: "green",
                    tankshotColor: "red"
                });
                //                 Rhealth -= 50;
                //                 Gtotal += 10;
                tankG.tankbullet.x = -50;
                break;
            default:
                break;
            }
        }
    }
}




socket.on("rotateTurret", function (data) {
    if (data.tankColor === "blue") {
        tankB.tanktop.rotation = data.turretRotation;
    } else if (data.tankColor === "red") {
        tankR.tanktop.rotation = data.turretRotation;
    } else if (data.tankColor === "green") {
        tankG.tanktop.rotation = data.turretRotation;
    }
    //     console.log(data.turretRotation);
});

socket.on("rotateTank", function (data) {
    if (data.tankColor === "blue") {
        tankB.tankbottom.rotation = data.tankRotation;
    } else if (data.tankColor === "red") {
        tankR.tankbottom.rotation = data.tankRotation;
    } else if (data.tankColor === "green") {
        tankG.tankbottom.rotation = data.tankRotation;
    }
});

socket.on("moveTank", function (data) {
    if (data.tankColor === "blue") {
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
    } else if (data.tankColor === "red") {
        tankR.tankbottom.regX = 0;
        tankR.tankbottom.regY = 0;
        tankR.tankPoint = tankR.tankbottom.localToGlobal(0, 3);
        tankR.tankbottom.y = data.tankY;
        tankR.tankbottom.x = data.tankX;
        tankR.tankbottom.regX = 21.5;
        tankR.tankbottom.regY = 24;

        tankR.tankTopPoint = tankR.tankbottom.localToGlobal(0, 3);
        tankR.tanktop.y = data.tankTopY;
        tankR.tanktop.x = data.tankTopX;
    } else if (data.tankColor === "green") {
        tankG.tankbottom.regX = 0;
        tankG.tankbottom.regY = 0;
        tankG.tankPoint = tankG.tankbottom.localToGlobal(0, 3);
        tankG.tankbottom.y = data.tankY;
        tankG.tankbottom.x = data.tankX;
        tankG.tankbottom.regX = 21.5;
        tankG.tankbottom.regY = 24;

        tankG.tankTopPoint = tankG.tankbottom.localToGlobal(0, 3);
        tankG.tanktop.y = data.tankTopY;
        tankG.tanktop.x = data.tankTopX;
    }
});

socket.on("shootIt", function (data) {
    shoot(data.shootId);
});

socket.on("tankHasBeenHit", function (data) {
    //     console.log(data.tankshootingColor);
    if (data.tankshootingColor === "blue") {
        Btotal += 10;
        tankB.tankbullet.x = -50;
        if (data.tankshotColor === "red") {
            Rhealth -= 50;
        } else {
            Ghealth -= 50;
        }
    } else if (data.tankshootingColor === "red") {
        Rtotal += 10;
        tankR.tankbullet.x = -50;
        if (data.tankshotColor === "blue") {
            Bhealth -= 50;
        } else {
            Ghealth -= 50;
        }
    } else {
        Gtotal += 10;
        tankG.tankbullet.x = -50;
        if (data.tankshotColor === "blue") {
            Bhealth -= 50;
        } else {
            Rhealth -= 50;
        }
    }
});