let game;

window.onload = function() {
    game = new Phaser.Game(640,960);
    game.state.add("Boot", Boot);
    game.state.add("GameTitleScreen", GameTitleScreen);
    game.state.add("GameStart", GameStart);
    game.state.add("GamePreload", GamePreload);
    game.state.start("Boot");
    game.state.add("GameOverScreen",GameOverScreen);
    game.state.add("GameInstruction", GameInstruction);
    game.state.add("GameScoreboard", GameScoreboard);
}
class Boot {
    preload(){
        game.load.image("loading","Assets/sprites/loading.png");
    }
	create() {
        game.stage.backgroundColor = "#C4EE99";
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start("GamePreload");
	}
}



