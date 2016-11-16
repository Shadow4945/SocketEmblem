var total = 300;

function showGameArea() {
    stage.addChild(gamearea);
    score = new createjs.Text("Score:" + total, "12px Arial", "#ffffff"); //creates text object
    score.x = score.y = 30;
    stage.addChild(score)
}