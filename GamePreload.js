class GamePreload {
    preload() {
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
		loadingBar.anchor.setTo(0.5);
		game.load.setPreloadSprite(loadingBar);
        game.load.image("icecream", "Assets/icecream.png");
        game.load.spritesheet("Peter", "Assets/Peter.png", 340, 450);
        game.load.image("HotTea", "Assets/HotTea.png");
        game.load.image("background", "Assets/background.jpg");
		game.load.image("text","Assets/text.png");
		game.load.image("title", "Assets/heatstroke.png");
		game.load.image("playbutton","Assets/button.png");
		game.load.bitmapFont("font", "Assets/face.png","Assets/font.fnt");
        game.load.spritesheet("scoreboard", "Assets/score.png", 128, 128);
        game.load.spritesheet("door", "Assets/door.png", 98, 127);
        game.load.image('Wall', "Assets/Wall.png");
        game.load.spritesheet("instructions", "Assets/instructions.png", 767, 767);
        game.load.spritesheet("FacialExpression", "Assets/facialexpressions.png", 640, 640);
        game.load.image("endbackground", "Assets/endbackground.jpg");
        game.load.image("gameover", "Assets/gameover.png");
        game.load.image("endimage", "Assets/endimage.png");
        game.load.image("tryagain","Assets/tryagain.png");
        game.load.image("highscore","Assets/highscore.png");
    }
    create() {

    }
    update() {
        game.state.start("GameTitleScreen");
    }
}