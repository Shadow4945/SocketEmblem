function mouseInit() {
    stage.on("stagemousemove", function (evt) {
        //creates text object
        mouseX = Math.floor(evt.stageX);
        mouseY = Math.floor(evt.stageY);
        //creates text object
        mouser.x = 150; //positions the text
        mouser.y = 100;
        //adds the text object to the stage    
        mouser.text = mouseX + "," + mouseY;
    });
}