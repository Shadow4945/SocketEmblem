var Rtotal = Btotal = Gtotal = 0;
rounds = 1;
var winner;
var Bhealth = Ghealth = Rhealth = 200;
var rockArray = [];




function showGameArea() {

    winner = new createjs.Text("Winner is " + player.name, "20px Arial", "#ffffff"); //creates text object
    winner.x = 400;
    winner.y = 250;

    playerHighscore = new createjs.Text('Your personal highscore in this game is ' + localStorage.getItem("highScore"), "20px Arial", "#ffffff");
    playerHighscore.x = 100;
    playerHighscore.y = 280;
    stage.addChild(playerHighscore);
    stage.addChild(winner);
    stage.addChild(gamearea);
    score = new createjs.Text("Red Score: " + Rtotal + " Blue Score: " + Btotal + " Green Score: " + Gtotal, "12px Arial", "#ffffff"); //creates text object
    score.x = score.y = 30;

    stage.addChild(score);
    round = new createjs.Text("Round: " + rounds, "12px Arial", "#ffffff"); //creates text object
    round.x = 30;
    round.y = 40;
    stage.addChild(round)
    Bhealthbar = new createjs.Shape();
    Bhealthbar.graphics.beginFill('#00f').drawRect(500, 10, Bhealth, 10);
    stage.addChild(Bhealthbar);
    Rhealthbar = new createjs.Shape();
    Rhealthbar.graphics.beginFill('#f00').drawRect(500, 30, Rhealth, 10);
    stage.addChild(Rhealthbar);
    Ghealthbar = new createjs.Shape();
    Ghealthbar.graphics.beginFill('#0f0').drawRect(500, 50, Ghealth, 10);
    stage.addChild(Ghealthbar);
    for (i = 0; i < 4; i++) {
        rock.scaleX = rock.scaleY = .5;
        rockArray.push(rock.clone());
    }
    for (j = 0; j < 4; j++) {
        stage.addChild(rockArray[j]);
    };
    rockArray[0].x = 250
    rockArray[0].y = 200;
    rockArray[1].x = 250;
    rockArray[1].y = 400;
    rockArray[2].x = 450;
    rockArray[2].y = 200;
    rockArray[3].x = 450;
    rockArray[3].y = 400;
}

function updateVisuals() {
    Bhealthbar.graphics.clear().beginFill('#00f').drawRect(500, 10, Bhealth, 10).endFill();
    Rhealthbar.graphics.clear().beginFill('#f00').drawRect(500, 30, Rhealth, 10).endFill();
    Ghealthbar.graphics.clear().beginFill('#0f0').drawRect(500, 50, Ghealth, 10).endFill();
    if (Bhealth === 0 || Rhealth === 0 || Ghealth === 0) {
        rounds += 1;
        Bhealth = Ghealth = Rhealth = 200;
        reset();
    }
    if (rounds === 6) {
        Bhealth = Ghealth = Rhealth = 200;
        console.log("Round is: " + round);
        rounds = 1;
        round.text = "Round:" + rounds;
        console.log("Round is: " + round);
        if (Rtotal > Gtotal && Rtotal > Btotal) {
            winner.text = "Red wins with " + Rtotal;
        }
        if (Gtotal > Rtotal && Gtotal > Btotal) {
            winner.text = "Green wins with " + Gtotal;
        }
        if (Btotal > Gtotal && Btotal > Rtotal) {
            winner.text = "Blue wins with " + Btotal;
        }

        if (typeof (Storage) !== "undefined") {

            if (playerId === 1) {
                if (localStorage.highScore <= Btotal) {
                    localStorage.highScore = Btotal;
                    console.log("Yo Yo Blue guy");
                }
            } else if (playerId === 2) {
                if (localStorage.highScore <= Rtotal) {
                    localStorage.highScore = Rtotal;
                    console.log("Yo Yo Red guy");
                }
            } else if (playerId === 3) {
                if (localStorage.highScore <= Gtotal) {
                    localStorage.highScore = Gtotal;
                    console.log("Yo Yo Green guy");
                }
            }
        } else {
            console.log('Sorry! No Web Storage support..');
        }

        Rtotal = Btotal = Gtotal = 0;
        stage.update();
        GAMESTATE = "gameover";
        Bhealth = Ghealth = Rhealth = 100;
        round = 0;
        Rtotal = Btotal = Gtotal = 0;

        console.log(document.cookie);
    }
    score.text = "Red Score: " + Rtotal + " Blue Score: " + Btotal + " Green Score: " + Gtotal;
    round.text = "Round:" + rounds;
    playerHighscore.text = 'Your personal highscore in this game is ' + localStorage.getItem("highScore");

}

function reset() {
    peopleInGame = 0;
    tankB.tankbottom.x = 100;
    tankB.tankbottom.y = 100;
    tankB.tankbottom.rotation = 0;
    tankB.tanktop.rotation = 0;
    tankB.tanktop.x = tankB.tanktop.y = tankB.tankbottom.x;
    tankR.tankbottom.x = 400;
    tankR.tankbottom.y = 100;
    tankR.tankbottom.rotation = 0;
    tankR.tanktop.rotation = 0;
    tankR.tanktop.x = tankR.tankbottom.x;
    tankR.tanktop.y = tankR.tankbottom.y;
    tankG.tankbottom.x = 700;
    tankG.tankbottom.y = 100;
    tankG.tankbottom.rotation = 0;
    tankG.tanktop.rotation = 0;
    tankG.tanktop.x = tankG.tankbottom.x;
    tankG.tanktop.y = tankG.tankbottom.y;
    health = 100;


    rockArray[0].x = 250
    rockArray[0].y = 200;
    rockArray[1].x = 250;
    rockArray[1].y = 400;
    rockArray[2].x = 450;
    rockArray[2].y = 200;
    rockArray[3].x = 450;
    rockArray[3].y = 400;
}