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
		game.load.audio("bgmusic", ["assets/sounds/bgmusic.mp3", "assets/sounds/bgmusic.ogg"]);
		game.load.audio("explosion", ["assets/sounds/explosion.mp3", "assets/sounds/explosion.ogg"]);
    }
    create() {

    }
    update() {
        game.state.start("GameTitleScreen");
    }
}