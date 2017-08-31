class GameTitleScreen{


    create(){

    var background = game.add.image(0,0,"background");

    var text = game.add.image (0,0,"text");
    text.anchor.setTo(-0.3,-0.5);

    var title = game.add.image(game.width / 2, 25, "title");
    title.anchor.setTo(0.45,-0.4);

    this.playButton = game.add.button(game.width / 2, game.height - 150, "door", this.startGame);
    this.playButton.animations.add("open", [0,1]);
    this.playButton.anchor.setTo(0.5);
    this.playButton.scale.setTo(1);
    this.playButton.inputEnabled = true;
    this.playButton.events.onInputOver.add(this.playOn, this);
    this.playButton.events.onInputOut.add(this.playOut, this);

    this.scoreboard = game.add.button(game.width / 4 - 30, game.height - 150, "scoreboard", this.gameScoreboard);
    this.scoreboard.animations.add("move", [0,1,2]);
    this.scoreboard.anchor.setTo(0.5);
    this.scoreboard.scale.setTo(1);
    this.scoreboard.inputEnabled = true;
    this.scoreboard.events.onInputOver.add(this.scoreboardOn, this);
    this.scoreboard.events.onInputOut.add(this.scoreboardOut, this);

    this.instruction = game.add.button((game.width / 2) + game.width/2/2 + 30, game.height - 150, "instructions", this.gameInstruction);
    this.instruction.anchor.setTo(0.5);
    this.instruction.scale.setTo(0.15);
    this.instruction.inputEnabled = true;
    this.instruction.animations.add("change", [0,1,2,3,4,5,6]);
    this.instruction.events.onInputOver.add(this.instructionOn, this);
    this.instruction.events.onInputOut.add(this.instructionOut, this);
    this.instructionWidth = this.instruction.width;
    this.instructionHeight = this.instruction.height;

    }
    
    update() {
        
    }

    gameScoreboard() {
        game.state.start("GameScoreboard");
    }

    

    playOn() {
        this.playButton.animations.play("open", 5, true);
        this.tween1 = game.add.tween(this.playButton).to({
            width: 150,
            height: 150,
        }, 1900, "Bounce", true, 0, -1);
        this.tween1.yoyo(true);
    }

    playOut() {
        this.playButton.animations.stop();
        this.playButton.frame = 0;
        this.playButton.width = 98;
        this.playButton.height = 127;
        this.tween1.stop();
        
    }

    scoreboardOn() {
        this.scoreboard.animations.play("move", 1, true);
        this.tween2 = game.add.tween(this.scoreboard).to({
            width: 150,
            height: 150,
        }, 1900, "Bounce", true, 0, -1);
        this.tween2.yoyo(true);
    }
    scoreboardOut() {
        this.scoreboard.animations.stop();
        this.tween2.stop();
    }

    instructionOn() {
        this.instruction.animations.play("change", 5, true);
        this.tween3 = game.add.tween(this.instruction).to({
            width: 150,
            height: 150,
        }, 1900, "Bounce", true, 0, -1);
        this.tween3.yoyo(true);
    }

    instructionOut() {
        this.instruction.animations.stop();
        this.instruction.frame = 0;
        this.instruction.width = this.instructionWidth;
        this.instruction.height = this.instructionHeight;
        this.tween3.stop();
    }

    startGame(){
        console.log("playButton pressed");
        game.state.start("GameStart");
    }
    gameInstruction() {
        game.state.start("GameInstruction");
    }

}

