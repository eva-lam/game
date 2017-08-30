class GameOver {

    create(){
        const endbackground = game.add.image(0,0,"endbackground");
        const gameover = game.add.image (0,0,"gameover");
            gameover.anchor.setTo(-0.3,-0.5);
            gameover.scale.setTo(0.7);
        const endimage = game.add.image(game.width / 2, 25, "endimage");
            endimage.anchor.setTo(0.45,-0.4);
        const seeScore = game.add.button(game.width / 2, game.height - 260, "highscore", this.startScore);
            seeScore.anchor.setTo(0.5);
            seeScore.anchor.setTo(0.5);
            seeScore.scale.setTo(0.4);
        const tween = game.add.tween(seeScore).to({
                width: 220,
                height: 150,
            }, 1900, "Back", true, 0, -3);
            tween.yoyo(true);    

        const tryAgain = game.add.button(game.width / 2, game.height - 120, "tryagain", this.startGame);
            tryAgain.anchor.setTo(0.5);
            tryAgain.scale.setTo(0.5); 
        const tween2 = game.add.tween(tryAgain).to({
                width: 220,
                height: 150,
            }, 1900, "Linear", true, 0, -3);
            tween2.yoyo(true);
            console.log("Game over");

    }

    startGame(){
        console.log("Restart button pressed");
        game.state.start("GameStart");

   }

    startScore(){
        console.log("High Score button pressed");
        game.state.start("GameHighScore");
    }
}
