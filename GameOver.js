
class GameOverScreen {
    preload(){
		game.load.image("background","Assets/sprites/background.jpg");
		
	}

    create(){
		
		var background = game.add.image(0,0,"background");
		var text = game.add.image (0,0,"gameovertext");
		text.anchor.setTo(-0.3,-0.5);
	
		this.boss = game.add.sprite(200, 100, "Lolo");
		this.boss.anchor.setTo(-0.2,-1);
		this.boss.scale.setTo(1.5,1.5);
		this.boss.animations.add('walk', [0,1,2,3,4]);
        this.boss.animations.play('walk', 10, true);
        game.physics.enable(this.boss);
	    
		text = game.add.text(game.world.width / 2, game.world.height / 2, "Your Score is "+score);
		
				//Center align
				text.anchor.set(0.5);
				text.align = 'center';
			
				//	Font style
				text.font = 'Arial Black';
				text.fontSize = 40;
				text.fontWeight = 'bold';
			
				//	Stroke color and thickness
				text.stroke = '#000000';
				text.strokeThickness = 6;
				text.fill = '#43d637';

		this.playButton = game.add.button(game.width / 2, game.height - 150, "door", this.startGame);
		this.playButton.animations.add("open", [0,1]);
		this.playButton.anchor.setTo(0.5);
		this.playButton.scale.setTo(1);
		this.playButton.inputEnabled = true;
		this.playButton.events.onInputOver.add(this.playOn, this);
		this.playButton.events.onInputOut.add(this.playOut, this);
	
		this.scoreboard = game.add.button(game.width / 4 - 30, game.height - 150, "scoreboard", this.openScore);
		this.scoreboard.animations.add("move", [0,1,2]);
		this.scoreboard.anchor.setTo(0.5);
		this.scoreboard.scale.setTo(1);
		this.scoreboard.inputEnabled = true;
		this.scoreboard.events.onInputOver.add(this.scoreboardOn, this);
		this.scoreboard.events.onInputOut.add(this.scoreboardOut, this);
		
		this.home = game.add.button(game.width / 4 - 30, game.height - 150, "home", this.homePage);
		this.home.anchor.setTo(-1.7,0.5);
		this.home.scale.setTo(0.5);
	    this.home.inputEnabled = true;
		
		}
		
		update() {
			
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
	
	
	
		startGame(){
			console.log("playButton pressed");
			game.state.start("GameStart");
	
		}

		openScore(){
			console.log("open score!");
			game.state.start("GameScoreboard");
	
		}

		homePage (){
			console.log("go to titlescreen!");
			game.state.start("GameTitleScreen");
		}
		
	}

/*
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
*/