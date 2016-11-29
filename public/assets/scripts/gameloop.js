var total = 0;
var rounds = 1;
var winner;
var health = 100;
var rockArray = [];




function showGameArea() {
    winner = new createjs.Text("Winner is " + player.name, "20px Arial", "#ffffff"); //creates text object
    winner.x = 400;
    winner.y = 250;
    stage.addChild(winner)
    stage.addChild(gamearea);
    score = new createjs.Text("Score: " + total, "12px Arial", "#ffffff"); //creates text object
    score.x = score.y = 30;
    stage.addChild(score);
    round = new createjs.Text("Round: " + rounds, "12px Arial", "#ffffff"); //creates text object
    round.x = 30;
    round.y = 40;
    stage.addChild(round)
    healthbar = new createjs.Shape();
    healthbar.graphics.beginFill('#f00').drawRect(100, 50, health, 10);
    stage.addChild(healthbar);
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
    healthbar.graphics.clear().beginFill('#f00').drawRect(100, 50, health, 10).endFill();
    if (health === 0) {
        rounds += 1;
        health = 100;
        reset();
    }
    if (rounds === 6) {
        GAMESTATE = "gameover";
        round = 0;

    }
    score.text = "Score:" + total;
    round.text = "Round:" + rounds;

}

function reset() {
    tankB.tankbottom.x = 100;
    tankB.tankbottom.y = 100;
    tankB.tanktop.x = tankB.tanktop.y = tankB.tankbottom.x;
    tankR.tankbottom.x = 400;
    tankR.tankbottom.y = 100;
    tankR.tanktop.x = tankR.tankbottom.x;
    tankR.tanktop.y = tankR.tankbottom.y;
    tankG.tankbottom.x = 700;
    tankG.tankbottom.y = 100;
    tankG.tanktop.x = tankG.tankbottom.x;
    tankG.tanktop.y = tankG.tankbottom.y;
    health = 100;

    total = 0;
    rockArray[0].x = 250
    rockArray[0].y = 200;
    rockArray[1].x = 250;
    rockArray[1].y = 400;
    rockArray[2].x = 450;
    rockArray[2].y = 200;
    rockArray[3].x = 450;
    rockArray[3].y = 400;
}
