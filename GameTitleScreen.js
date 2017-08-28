class GameTitleScreen{
    
      create(){
        var background = game.add.image(0,0,"background");
        var text = game.add.image (0,0,"text");
            text.anchor.setTo(-0.3,-0.5);
            var title = game.add.image(game.width / 2, 25, "title");
                title.anchor.setTo(0.45,-0.4);
            var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
            playButton.anchor.setTo(0.5);
            playButton.scale.setTo(0.5);
            var tween = game.add.tween(playButton).to({
                width: 220,
                height:150,
            }, 1900, "Bounce", true, 0, -1);
            tween.yoyo(true);
            console.log("titlescreen started");
        }
        
      startGame(){
            console.log("playButton pressed");
            game.state.start("GameStart");
    
        }
    }