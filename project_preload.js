class Preload{
	preload(){
		var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
		loadingBar.anchor.setTo(0.5);
		game.load.setPreloadSprite(loadingBar);
		game.load.image("background","assets/sprites/desert.png");
		game.load.image("text","assets/sprites/text.png");
		game.load.image("title", "assets/sprites/heatstroke.png");
		game.load.image("playbutton","assets/sprites/button.png")
		game.load.bitmapFont("font", "assets/fonts/font.png",
		"assets/fonts/font.fnt");
		game.load.audio("bgmusic", ["assets/sounds/bgmusic.mp3", "assets/sounds/bgmusic.ogg"]);
		game.load.audio("explosion", ["assets/sounds/explosion.mp3", "assets/sounds/explosion.ogg"]);
		
	}
	create(){
		console.log("preload started");
		game.state.start("Titlescreen");
	}
}
