var total = 0;
var rounds=0;
var health=100;
function showGameArea() {
    stage.addChild(gamearea);
    score = new createjs.Text("Score: " + total, "12px Arial", "#ffffff"); //creates text object
    score.x = score.y = 30;
    stage.addChild(score)
    round = new createjs.Text("Round: " + rounds, "12px Arial", "#ffffff"); //creates text object
    round.x =  30;
    round.y =40;
    stage.addChild(round)
    healthbar = new createjs.Shape();
    healthbar.graphics.beginFill('#f00').drawRect(100, 400, health, 10);
    stage.addChild(healthbar);
}
function updateVisuals(){
    score.text="Score:" + total;
    round.text="Round:" + rounds;
    healthbar.graphics.clear().beginFill('#f00').drawRect(100, 400, health, 10).endFill();
    if(health==0){
      GAMESTATE="gameover";
    }
}
function reset(){
  health=100;
  rounds=0;
  total=0;
}
