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
		game.load.bitmapFont("font", "Assets/font.png","Assets/font.fnt");
        game.load.spritesheet("scoreboard", "Assets/score.png", 128, 128);
        game.load.spritesheet("door", "Assets/door.png", 98, 127);
        game.load.image('Wall', "Assets/Wall.png");
        game.load.spritesheet("instructions", "Assets/instructions.png", 767, 767);
        game.load.spritesheet("FacialExpression", "Assets/facialexpressions.png", 640, 640);
        game.load.spritesheet("Lolo", "Assets/LoLo.png", 96, 94);
        game.load.image("Beach", "Assets/beach.png");
        game.load.image("forest", "Assets/forest.png");
        game.load.image("Kiwi", "Assets/Kiwi.png");
        game.load.image("Desert", "Assets/desert.png");
        game.load.image("Sun", "Assets/sun.png");
        game.load.image("Water", "Assets/water.png");
        game.load.image("paused", "Assets/paused.jpg");
        game.load.image("arrow1", "Assets/arrow1.png");
        game.load.image("SpaceBK", "Assets/starfield.jpg");
        game.load.image("pausebutton", "Assets/pausebar.png");
        game.load.image("Fire", "Assets/sunPower.png");
        game.load.spritesheet("MovingPeter", "Assets/PeterMove.png", 301.25, 426);
    }
    create() {

    }
    update() {
        game.state.start("GameTitleScreen");
    }
}