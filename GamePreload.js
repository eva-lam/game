class GamePreload {
    preload() {
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
		loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        game.load.bitmapFont("font", "Assets/sprites/face.png","Assets/sprites/font.fnt");

        game.load.spritesheet("scoreboard", "Assets/sprites/score.png", 128, 128);
        game.load.spritesheet("door", "Assets/sprites/door.png", 98, 127);
        game.load.spritesheet("Peter", "Assets/sprites/Peter.png", 340, 450);
        game.load.spritesheet("instructions", "Assets/sprites/instructions.png", 767, 767);
        game.load.spritesheet("FacialExpression", "Assets/sprites/facialexpressions.png", 640, 640);
        game.load.spritesheet("Lolo", "Assets/sprites/LoLo.png", 96, 94);

        game.load.image("HotTea", "Assets/sprites/HotTea.png");
        game.load.image("background", "Assets/sprites/background.jpg");
		game.load.image("text","Assets/sprites/text.png");
		game.load.image("title", "Assets/sprites/heatstroke.png");
        game.load.image("icecream", "Assets/sprites/icecream.png");
        game.load.image('Wall', "Assets/sprites/Wall.png");
        game.load.image("playagain", "Assets/sprites/playagain.png");
        game.load.image("gameoversign","Assets/sprites/gameoversign.jpg");
        game.load.image("gameovertext","Assets/sprites/gameovertext.png");
        game.load.image("scoreboardtext","Assets/sprites/scoreboardtext.png");
        game.load.image("home","Assets/sprites/home.png");

        game.load.audio("level1music","Assets/sounds/level1.mp3");
        game.load.audio("level2","Assets/sounds/level2.mp3");
        game.load.audio("level3","Assets/sounds/level3.mp3");
        game.load.audio("Sip","Assets/sounds/sip.wav");
        game.load.audio("Slurp","Assets/sounds/slurp.wav");
        game.load.audio("lick","Assets/sounds/lick.wav");
        game.load.audio("kiwi","Assets/sounds/kiwi.wav");
        game.load.audio("ouch","Assets/sounds/ouch.wav");
        game.load.audio("hurt","Assets/sounds/hurt.wav");
        game.load.audio("shooting","Assets/sounds/shooting.wav");
        game.load.audio("destroy","Assets/sounds/destroy.wav");
        game.load.audio("gameover","Assets/sounds/gameover.wav");
        game.load.audio("door","Assets/sounds/door.wav");
        game.load.audio("bossstage","Assets/sounds/bossstage.wav");
    }
    create() {

    }
    update() {
        game.state.start("GameTitleScreen");
    }
}