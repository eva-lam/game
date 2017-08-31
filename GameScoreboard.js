var data =[];

class GameScoreboard {
    preload () {
		game.load.json('core', 'scoreboard.json');
        // $(function(){ 
        //     $.ajax ({
        //         url:"scoreboard.json"
        //     }) 
        //     .done(function(data){   
        //         $.each(data, function(key,value){
		// 		data.push(value);
		// 		data.sort((a,b) =>{return b.score-a.score;});
		// 		console.log(data);
		// 		//use for loop to loop through array to print data 
		// 		for (var i=0; i<data.length; i++){			
		// 		}
		// 		newtext = game.add.text(3,-3,data);
        //         });
        //     })
		// });
		data.sort((a,b) => {return b.score-a.score;});
		
    }

    create(){
		
		this.a = game.cache.getJSON("core");

		console.log(this.a)

		var score = game.add.text(0,100,data); 
		
		var background = game.add.image(0,0,"background");

		var text = game.add.image (0,0,"scoreboardtext");
		text.anchor.setTo(-0.3,-0.5);
      
		this.playButton = game.add.button(game.width / 2, game.height - 150, "door", this.startGame);
		this.playButton.animations.add("open", [0,1]);
		this.playButton.anchor.setTo(0.5);
		this.playButton.scale.setTo(1);
		this.playButton.inputEnabled = true;
		this.playButton.events.onInputOver.add(this.playOn, this);
		this.playButton.events.onInputOut.add(this.playOut, this);

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
	
		startGame(){
			console.log("playButton pressed");
			game.state.start("GameStart");
	
		}

		homePage (){
			console.log("go to titlescreen!");
			game.state.start("GameTitleScreen");
		}
    }

/*
var data = [];

class GameScoreboard {
    preload() {
        game.load.json('Score', './scoreboard.json');
        $(function() {
            $.ajax({
                url: "./scoreboard.json"
            }).done(function(data) {
                $.each(data, function(key,value) {
                    data.push(value);
                });
            });
        });
        data.sort((a, b) => {return b - a;});
    }
    create() {

        console.log(data);

        this.a = game.cache.getJSON("Score");

        this.a.forEach(function(item) {
            data.push(item.score);
        }, this);

        data = data.sort(function(a,b) {
            return b - a;
        });

        var score = game.add.text(0,100, data);
    }
}
*/