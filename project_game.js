let game;
const BG_COLORS = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 
0x7c786a, 0x588c73, 0x8c4646, 0x2a5b84, 0x73503c,0xff69b4];

window.onload = () => {
	game = new Phaser.Game(640, 960);
	game.state.add("Boot", Boot);
	game.state.add("Preload", Preload);
    game.state.start("Boot");
    game.state.add("Titlescreen", TitleScreen);
    game.state.add("PlayGame",PlayGame);
    game.state.add("GameOverScreen",GameOverScreen);
}

class Boot{
    preload(){
        game.load.image("loading","assets/sprites/loading.png");
        game.load.image("background","assets/sprites/background.jpg")
    }

    create(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.start("Preload");
    }
}