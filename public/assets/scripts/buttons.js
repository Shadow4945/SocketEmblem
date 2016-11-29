function buttons() {
    btnPlay = new createjs.Shape();
    btnPlay.graphics.beginFill("#447").drawRect(200, 353, 150, 30);
    stage.addChild(btnPlay);
    play = new createjs.Text("Waiting for 3 players...", "12px Arial", "#ffffff"); //creates text object
    play.x = 220; //positions the text
    play.y = 360;
    stage.addChild(play); //adds the text object to the stage
    // btnPlay.on("click", function (evt) {
    //     GAMESTATE = "startgame";
    // });
    btnIns = new createjs.Shape();
    btnIns.graphics.beginFill("#447").drawRect(200, 400, 100, 30);
    stage.addChild(btnIns);
    Ins = new createjs.Text("Instructions", "12px Arial", "#ffffff"); //creates text object
    Ins.x = 220; //positions the text
    Ins.y = 410;
    stage.addChild(Ins); //adds the text object to the stage
    btnIns.on("click", function (evt) {
        GAMESTATE = "instructions";
    });
    btnTitle = new createjs.Shape();
    btnTitle.graphics.beginFill("#447").drawRect(200, 400, 100, 30);
    stage.addChild(btnTitle);
    Title = new createjs.Text("Title", "12px Arial", "#ffffff"); //creates text object
    Title.x = 220; //positions the text
    Title.y = 410;
    stage.addChild(Title); //adds the text object to the stage
    btnTitle.on("click", function (evt) {
        peopleInGame += 1;
        GAMESTATE = "started";
    });
    btnMute = new createjs.Shape();
    btnMute.graphics.beginFill("#447").drawRect(10, 450, 50, 30);
    stage.addChild(btnMute);
    Mute = new createjs.Text("Mute", "12px Arial", "#ffffff"); //creates text object
    Mute.x = 15; //positions the text
    Mute.y = 460;
    stage.addChild(Mute); //adds the text object to the stage
    unMute = new createjs.Text("Unmute", "12px Arial", "#ffffff"); //creates text object
    btnunMute = new createjs.Shape();
    btnunMute.graphics.beginFill("#447").drawRect(60, 450, 50, 30);
    stage.addChild(btnunMute);
    btnunMute.visible = false;
    unMute.x = 65; //positions the text
    unMute.y = 460;
    unMute.visible = false;
    stage.addChild(unMute); //adds the text object to the stage
    btnunMute.on("click", function (evt) {
        music.play();
        btnMute.visible = true;
        btnunMute.visible = false;
        Mute.visible = true;
        unMute.visible = false;
    });
    btnMute.on("click", function (evt) {
        music.stop();
        Mute.visible = false;
        btnunMute.visible = true;
        btnMute.visible = false;
        unMute.visible = true;
    });
}
