var data =[];

class GameScoreboard {
    preload () {
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
        this.data = [];
        $(function() {
            $.ajax({
                url: "./Scoreboard.json"
            }).done(function(data) {
                $.each(data, function(item) {
                    console.log(data[item].score);
                    data.push(data[item].score);
                });
            });
        }); 
        this.game.load.text("Scoreboard", "./Scoreboard.json");

		
    }

    create(){

        
	
		
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
    this.home.anchor.setTo(0.5,0.5);
    this.home.scale.setTo(0.5);
    this.home.inputEnabled = true;

    this.instruction = game.add.button((game.width / 2) + game.width/2/2 + 30, game.height - 150, "instructions", this.gameInstruction);
    this.instruction.anchor.setTo(0.5);
    this.instruction.scale.setTo(0.15);
    this.instruction.inputEnabled = true;
    this.instruction.animations.add("change", [0,1,2,3,4,5,6]);
    this.instruction.events.onInputOver.add(this.instructionOn, this);
    this.instruction.events.onInputOut.add(this.instructionOut, this);
    this.instructionWidth = this.instruction.width;
    this.instructionHeight = this.instruction.height;


    this.rank = JSON.parse(this.game.cache.getText("Scoreboard"));
    
    this.rank.forEach(function(item) {
        data.push([item.name, item.score] );
    }, this);

    data.sort((a, b) => {return b - a;});

        
    var score1 = game.add.text(200,300, data[0][0] + "   " + data[0][1]);
    var score2 = game.add.text(200,400, data[1][0] + "   " + data[1][1]);
    var score3 = game.add.text(200,500, data[2][0] + "   " + data[2][1]);
    var score4 = game.add.text(200,600, data[3][0] + "   " + data[3][1]);
    var score5 = game.add.text(200,700, data[4][0] + "   " + data[4][1]);
		
	
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

    instructionOn() {
        this.instruction.animations.play("change", 5, true);
        this.tween3 = game.add.tween(this.instruction).to({
            width: 150,
            height: 150,
        }, 1900, "Bounce", true, 0, -1);
        this.tween3.yoyo(true);
    }

    instructionOut() {
        this.instruction.animations.stop();
        this.instruction.frame = 0;
        this.instruction.width = this.instructionWidth;
        this.instruction.height = this.instructionHeight;
        this.tween3.stop();
    }
    gameInstruction() {
        game.state.start("GameInstruction");
    }

}

/*
var data = [];

class GameScoreboard {
    preload() {
        
        game.load.json('Score', './scoreboard.json');
        this.data = [];
        $(function() {
            $.ajax({
                url: "./scoreboard.json"
            }).done(function(data) {
                $.each(data, function(item) {
                    console.log(data[item].score);
                    data.push(data[item].score);
                });
            });
        }); 
        this.game.load.text("Score", "./scoreboard.json");

       
    }
    create() {

            this.rank = JSON.parse(this.game.cache.getText("Score"));
        
            this.rank.forEach(function(item) {
                data.push([item.name, item.score] );
            }, this);

            data.sort((a, b) => {return b - a;});

        
        var score1 = game.add.text(0,100, data[0][0] + "   " + data[0][1]);
        var score2 = game.add.text(0,200, data[1][0] + "   " + data[1][1]);
        var score3 = game.add.text(0,300, data[2][0] + "   " + data[2][1]);
        var score4 = game.add.text(0,400, data[3][0] + "   " + data[3][1]);
        var score5 = game.add.text(0,500, data[4][0] + "   " + data[4][1]);

    }
}
*/