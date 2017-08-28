let game;


window.onload = function() {
    game = new Phaser.Game(640,960);
    game.state.add("Boot", Boot);
    game.state.add("GameTitleScreen", GameTitleScreen);
    game.state.add("GameStart", GameStart);
    game.state.add("GamePreload", GamePreload);
	game.state.start("Boot");
}
class Boot {
    preload(){
        game.load.image('Wall', "Assets/Wall.png");
        game.load.image("loading","Assets/loading.png");
    }
	create() {
        game.stage.backgroundColor = "#999999";
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start("GamePreload");
	}
}



