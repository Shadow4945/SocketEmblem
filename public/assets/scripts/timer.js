var seconds = tenth = whole = 0;
var time = 0.0;

function addtimer() {
    timer = new createjs.Text(time, "20px", "#fff");
    timer.x = timer.y = 100
    //stage.addChild(timer);
}

function timerStart() {
    seconds += .05
    if (seconds == .1 || seconds > .1) {
        seconds = 0;
        tenth++;
        if (tenth == 10) {
            whole++;
            tenth = 0;
        }
        time = whole + "." + tenth;
        //timer.text = time;
    }
    if (time >= 60) {
        whole = tenth = seconds = time = 0;
        //rounds++;
        total+=50;
        }
        if(total==200){

        GAMESTATE = 'gameover';
        }
}
