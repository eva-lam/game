const TUNNEL_WIDTH = 256;
const SHIP_HORIZONTAL_SPEED = 100;
const SHIP_MOVE_DELAY = 0;
const SHIP_VERTICAL_SPEED = 15000;
const SWIPE_DISTANCE = 10;
const BARRIER_SPEED = 280; 
const BARRIER_GAP = 120;
const SHIP_INVISIBILITY_TIME = 1000;
const BARRIER_INCREASE_SPEED = 1.1;
const SCORE_HEIGHT = 100;
const SCORE_SEGMENTS = [100, 50, 25, 10, 5, 2, 1];
const FRIENDLY_BAR_RATIO = 2;
var score= 0; 
var scoreHeight=0;

class PlayGame{

//create method 
	create(){
		this.bgMusic = game.add.audio("bgmusic");
		this.bgMusic.loopFull(1);
		var tintColor = BG_COLORS[game.rnd.between(0, BG_COLORS.length - 1)]
		var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");
		tunnelBG.tint = tintColor;
		var leftWallBG = game.add.tileSprite(- TUNNEL_WIDTH / 2, 0, game.width /2, game.height, "wall");
		leftWallBG.tint = tintColor;
		var rightWallBG = game.add.tileSprite((game.width + TUNNEL_WIDTH) / 2, 0, game.width / 2, game.height, "wall");
		rightWallBG.tint = tintColor;
		console.log("playgame started");

		//set ship position

		this.shipPositions = [(game.width - TUNNEL_WIDTH) / 2 + 32, (game.width + TUNNEL_WIDTH) / 2 - 32];
		this.ship = game.add.sprite(this.shipPositions[0], 860, "ship");
		this.ship.side = 0;
		this.ship.anchor.set(0.5);
		this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
		this.ship.canMove = true;
		game.input.onDown.add(this.moveShip, this);
		

		//set swipe distance and set its properties 
		
		this.ship.canSwipe = false;
		this.ship.anchor.set(0.5);
		game.physics.enable(this.ship, Phaser.Physics.ARCADE);
		game.input.onDown.add(this.moveShip, this);
		game.input.onUp.add(function(){
			this.ship.canSwipe = false;
		}, this);

		//smokeEmitter properties

		this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 10, 20);
		this.smokeEmitter.makeParticles("smoke");
		this.smokeEmitter.setXSpeed(-15, 15);
		this.smokeEmitter.setYSpeed(50, 150);
		this.smokeEmitter.setAlpha(0.5, 1);
		this.smokeEmitter.start(false, 1000, 40);
		this.verticalTween=game.add.tween(this.ship).to({
			y:0
		},SHIP_VERTICAL_SPEED, Phaser.Easing.Linear.None, true); 

		//barrier 

		this.barrierSpeed=BARRIER_SPEED; 
		this.barrierGroup = game.add.group();
		var barrier = new Barrier (game, BARRIER_SPEED, tintColor,this);

		game.add.existing(barrier);
		this.barrierGroup.add(barrier); 
		//animation for death of ship 
		this.ship.destroyed = false;

		//seperator and labels to show segments 
		for(let i = 1; i <= SCORE_SEGMENTS.length; i++){
			let leftSeparator = game.add.sprite((game.width - TUNNEL_WIDTH) / 2, SCORE_HEIGHT * i, "separator");
			leftSeparator.tint = tintColor;
			leftSeparator.anchor.set(1, 0)
			let rightSeparator = game.add.sprite((game.width + TUNNEL_WIDTH) / 2, SCORE_HEIGHT * i, "separator");
			rightSeparator.tint = tintColor;
			let posX = (game.width - TUNNEL_WIDTH) / 2 - leftSeparator.width / 2;
			if(i % 2 == 0){
				posX = (game.width + TUNNEL_WIDTH) / 2 + leftSeparator.width / 2;
			}
			game.add.bitmapText(posX, SCORE_HEIGHT * (i - 1) + SCORE_HEIGHT / 2 - 18 , "font", SCORE_SEGMENTS[i - 1].toString(), 36).anchor.x = 0.5;
		}
		this.shipPositions = [(game.width - TUNNEL_WIDTH) / 2 + 32, (game.width + TUNNEL_WIDTH) / 2 - 32];
		this.highlightBar = game.add.tileSprite(game.width / 2, 0, TUNNEL_WIDTH, SCORE_HEIGHT, "smoke");
		this.highlightBar.anchor.set(0.5, 0);
		this.highlightBar.alpha = 0.1;
		this.highlightBar.visible = false;

		// add scoreText 
		this.scoreText = game.add.bitmapText(20, game.height - 90 , "font", "0", 48);
		game.time.events.loop(250, this.updateScore, this);
	}
	
//moveship method 
	moveShip(){
		this.ship.canSwipe = true;
		if(this.ship.canMove){
			this.ship.canMove = false;
			this.ship.side = 1 - this.ship.side;
			var horizontalTween = game.add.tween(this.ship).to({
				x: this.shipPositions[this.ship.side]
			}, SHIP_HORIZONTAL_SPEED, Phaser.Easing.Linear.None, true);
			horizontalTween.onComplete.add(function(){
				game.time.events.add(SHIP_MOVE_DELAY, function(){
						this.ship.canMove = true;   //callback fnction within the tween
				  }, this);
				}, this);
        //add sprite 
		let ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship");
		ghostShip.alpha = 0.5;
		ghostShip.anchor.set(0.5);
		let ghostTween = game.add.tween(ghostShip).to({
			alpha: 0
		}, 350, Phaser.Easing.Linear.None, true);
		ghostTween.onComplete.add(function(){
			ghostShip.destroy();
		});   

	  }

	}
	
 //update of class playgame
update(){
		this.smokeEmitter.x=this.ship.x; 
		this.smokeEmitter.y=this.ship.y; 
		if(this.ship.canSwipe){
			if(Phaser.Point.distance(game.input.activePointer.positionDown,
			  	game.input.activePointer.position)>SWIPE_DISTANCE){
					  this.restartShip(); 
				  }
			}
		//collision of barriers	
			 
 game.physics.arcade.collide(this.ship, this.barrierGroup, function(s, b){         
		
		if(!b.friendly){
            console.log("collision between ship and barrier");
            if(!this.ship.destroyed && this.ship.alpha == 1){ 
			if(this.ship.y < SCORE_HEIGHT * SCORE_SEGMENTS.length){
				this.highlightBar.visible = true;
				var row = Math.floor(this.ship.y / SCORE_HEIGHT);
				this.highlightBar.y = row * SCORE_HEIGHT;
				}

				this.highlightBar.visible = false;
				this.ship.destroyed = true
				this.smokeEmitter.destroy();
				let destroyTween = game.add.tween(this.ship).to({
					x: this.ship.x + game.rnd.between(-100, 100),
					y: this.ship.y - 100,
					rotation: 10
				}, 1000, Phaser.Easing.Linear.None, true);

				destroyTween.onComplete.add(function(){
					this.bgMusic.stop();
					var explosionSound = game.add.audio("explosion");
					explosionSound.play();
					let explosionEmitter = game.add.emitter(this.ship.x,
						this.ship.y, 200);
					explosionEmitter.makeParticles("smoke");
					explosionEmitter.setAlpha(0.5, 1);
					explosionEmitter.minParticleScale = 0.5;
					explosionEmitter.maxParticleScale = 2;
					explosionEmitter.start(true, 2000, null, 200);
					this.ship.destroy();
					//initialize GameOverScreen 
					game.time.events.add(Phaser.Timer.SECOND * 2, function(){
						game.state.start("GameOverScreen");
					});
				}, this);

			}
		}	

		else{
			if(b.alpha == 1){
				let barrierTween = game.add.tween(b).to({
					alpha:0
				}, 200, Phaser.Easing.Bounce.Out, true);
				if(this.ship.y < scoreHeight * SCORE_SEGMENTS.length){
					let row = Math.floor(this.ship.y / scoreHeight);
					score += SCORE_SEGMENTS[row] * 5;
					this.scoreText.text = score.toString();
				}
			}
		}

	}, null, this)
}



//})

    restartShip(){
		this.highlightBar.visible = false; 
		if(!this.ship.destroyed && this.ship.alpha == 1){
			this.barrierSpeed *= BARRIER_INCREASE_SPEED;
			for(let i = 0; i < this.barrierGroup.length; i++){
				this.barrierGroup.getChildAt(i).body.velocity.y = this.barrierSpeed;}

		        this.ship.canSwipe=false; 
		        this.verticalTween.stop();
		        this.ship.alpha = 0.5;
		        this.verticalTween = game.add.tween(this.ship).to({
			       y:860
		      },100,Phaser.Easing.Linear.None, true);
		     this.verticalTween.onComplete.add(function(){
			 this.verticalTween = game.add.tween(this.ship).to({
					y:0
			 },SHIP_VERTICAL_SPEED,Phaser.Easing.Linear.None, true); 
			 var alphaTween = game.add.tween(this.ship).to({
				alpha: 1
			}, SHIP_INVISIBILITY_TIME, Phaser.Easing.Bounce.In, true);
		   
			},this)
		  }
		}
	


	addBarrier(group,tintColor){
		  let barrier = new Barrier(game, BARRIER_SPEED, tintColor,this);
		  game.add.existing(barrier);
		  group.add(barrier); 
	   }
		 

	updateScore(){
		if(this.ship.alpha == 1 && !this.ship.destroyed){
			if(this.ship.y < SCORE_HEIGHT * SCORE_SEGMENTS.length){
				var row = Math.floor(this.ship.y / SCORE_HEIGHT);
				score += SCORE_SEGMENTS[row];
				this.scoreText.text = score.toString();
			}
		}
        if(this.ship.y < scoreHeight * SCORE_SEGMENTS.length){
			let row = Math.floor(this.ship.y / scoreHeight);
			score += SCORE_SEGMENTS[row] * 5;
			this.scoreText.text = score.toString();
		}

	}


 }//closing bracket of class playgame
   
	




class Barrier extends Phaser.Sprite{

		constructor(game, speed, tintColor,playGame) {
			let positions = [(game.width - TUNNEL_WIDTH) / 2, (game.width + TUNNEL_WIDTH) / 2];
			let position = game.rnd.between(0, 1);
			super(game, positions[position], -100, "barrier");
			var cropRect = new Phaser.Rectangle(0, 0, TUNNEL_WIDTH / 2, 24);
			this.crop(cropRect);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.anchor.set(position, 0.5);
			this.tint = tintColor;
			//add bonus 

			if(game.rnd.between(0, FRIENDLY_BAR_RATIO)!=0){
				this.tint = tintColor;
				this.friendly = false;
			}
			else{
				this.friendly = true;
			}
            //velocity 
			this.body.velocity.y = speed;
			this.placeBarrier=true; 
			this.playGame = playGame;
			this.body.immovable = true;


		};

      //update method of class Barrier 
        update(){
			if(this.placeBarrier && this.y > BARRIER_GAP){
				this.placeBarrier = false;
				this.playGame.addBarrier(this.parent, this.tint);
				}
			if(this.y > game.height){
				this.destroy();
			}
			

			}
			
		}

		











