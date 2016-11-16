 var GAMESTATE = "started";

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
         console.log(btnTitle.visible)
         break;
     }
     stage.update();
 }

 function startLoop() {
     var FPS = 30;
     createjs.Ticker.addEventListener('tick', loop);
     createjs.Ticker.setFPS(FPS);
 }
