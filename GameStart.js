let icecreamSpeed = 350 + Math.random() * 100;
let HotTeaSpeed = 350 + Math.random() * 100;
let icecreamLimit = 200;
let HotTeaLimit = 200;
let sunSpeed = 100;
let sunLimit = 700;
let score = 0;
let fireSpeed = 400;
let fireLimit = 280 + Math.random()*1000;
var speed = 5;
var cursors;
let health;

class GameStart {
    
    preload() {
        //audio 
        game.load.audio("level1music","Assets/sounds/level1.mp3");
        game.load.audio("level2","Assets/sounds/level2.mp3");
        game.load.audio("level3","Assets/sounds/level3.mp3");
        game.load.audio("Sip","Assets/sounds/sip.wav");
        game.load.audio("Slurp","Assets/sounds/slurp.wav");
        game.load.audio("lick","Assets/sounds/lick.wav");
        game.load.audio("kiwi","Assets/sounds/kiwi.wav");
        game.load.audio("ouch","Assets/sounds/ouch.wav");
        game.load.audio("hurt","Assets/sounds/hurt.wav");
        game.load.audio("shooting","Assets/sounds/shooting.wav");
        game.load.audio("destroy","Assets/sounds/destroy.wav");
        game.load.audio("gameover","Assets/sounds/gameover.wav");
        game.load.audio("door","Assets/sounds/door.wav");
        game.load.audio("bossstage","Assets/sounds/bossstage.wav");
        
        game.load.image("Beach", "Assets/sprites/beach.png");
        game.load.image("forest", "Assets/sprites/forest.png");
        game.load.image("Kiwi", "Assets/sprites/Kiwi.png");
        game.load.image("Desert", "Assets/sprites/desert.png");
        game.load.image("Sun", "Assets/sprites/sun.png");
        game.load.image("Water", "Assets/sprites/water.png");
        game.load.image("paused", "Assets/sprites/paused.jpg");
        game.load.image("arrow1", "Assets/sprites/arrow1.png");
        game.load.image("SpaceBK", "Assets/sprites/starfield.jpg");
        game.load.image("pausebutton", "Assets/sprites/pausebar.png");
        game.load.image("Fire", "Assets/sprites/sunPower.png");
        game.load.image("gameoversign","Assets/sprites/gameoversign.jpg");
        game.load.image("background","Assets/sprites/gameoversign.jpg");
        game.load.image("loading","Assets/sprites/loading.png")
    }
    
    create() {
        var background = game.add.image(0,0,"background");
        this.level1music = game.add.audio("level1music");
        this.level1music.play('',0,0.5);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.BK = this.game.add.tileSprite(160, 0, 480, 960, 'Beach');
        

        var wall = game.add.tileSprite(0, 0, 160, game.height, "Wall");
        wall.tint = 0x131715;

        this.Peter = game.add.sprite(220, 880, "Peter");
        this.Peter.anchor.setTo(0.5);
        this.Peter.scale.setTo(0.2);
        this.Peter.animations.add('walk', [0,1,2,3]);
        this.Peter.animations.play('walk', 10, true);
        game.physics.enable(this.Peter);
        this.Peter.body.collideWorldBounds = true;

        this.kiwis = game.add.group();
        this.kiwis.enablebody = true;
        game.physics.enable(this.kiwis);

        this.Kiwi = this.kiwis.create(game.rnd.between(180, 600), -Math.floor(Math.random()+1000), "Kiwi");
        game.physics.enable(this.Kiwi);
        this.Kiwi.anchor.setTo(0.5);
        this.Kiwi.scale.setTo(0.2);
        this.Kiwi.events.onKilled.add(this.kiwiOut,this);

        this.icecreamSpeed = icecreamSpeed;
        this.icecreamGroup = game.add.group();
        this.addIcecream(this.icecreamGroup);

        this.HotTeaSpeed = HotTeaSpeed;
        this.HotTeaGroup = game.add.group();
        this.addHotTea(this.HotTeaGroup);

        this.sunSpeed = sunSpeed;
        this.sunGroup = game.add.group();
        this.addSun(this.sunGroup);
        
        this.waters = game.add.group();
        this.waters.enablebody = true;
        game.physics.enable(this.waters);

        this.Water = this.waters.create(game.rnd.between(180, 620), -Math.floor(Math.random()+1000), "Water");
        game.physics.enable(this.Water);
        this.Water.anchor.setTo(0.5);
        this.Water.scale.setTo(0.08);
        this.Water.events.onKilled.add(this.waterOut,this);
        
        this.barConfig = {x: 45, y: 880, width:75, height: 80};
        this.myHealthBar = new HealthBar(this.game, this.barConfig);
        this.myHealthBar.setBarColor("#D31010");
        cursors = game.input.keyboard.createCursorKeys();

        health = this.barConfig.width / (150/100);

        this.healthNum = game.add.text(5, 790, "Health: " +  health, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});

        
        
        score = 0;
        // console.log(this.score);
        this.scorebar = game.add.text(20, 500, "Score: \n" + score, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});
        console.log(this.score);
        this.pausebutton = game.add.sprite(80, 100, 'pausebutton');
        this.pausebutton.inputEnabled = true;
        this.pausebutton.events.onInputUp.add(this.pausing, this);
        this.pausebutton.scale.setTo(0.5);
        this.pausebutton.anchor.setTo(0.5);
        this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.pauseKey.onDown.add(this.pausing, this);
        

// weapons 
       //  Creates the bullets, using the 'arrows' graphic
        this.weapon = game.add.weapon(6, 'arrow1');
    
        //  The bullet will be automatically killed when it leaves the world bounds
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    
        //  Bullets live for 2 seconds
        this.weapon.bulletLifespan = 2000;
    
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon.bulletAngleOffset = 90;
    
        //  The speed at which the bullet is fired
        this.weapon.bulletSpeed = 600;
    
       
        this.faces = game.add.sprite(10,330,"FacialExpression");
        this.faces.anchor.setTo(0);
        this.faces.scale.setTo(0.2);
        this.faces.frame = 2;
        
        this.Lolo = game.add.sprite(200, 100, "Lolo");
        this.Lolo.anchor.setTo(0.5);
        this.Lolo.scale.setTo(1.5);
        this.Lolo.animations.add("throw", [0,1,2]);
        this.Lolo.animations.play("throw", 10, true);
        game.physics.enable(this.Lolo);
        this.Lolo.body.velocity.x = 100;
        this.Lolo.visible = false;
        this.Lolo.health = 20;

        this.fireSpeed = fireSpeed;
        this.fireGroup = game.add.group();    
        this.addFire(this.fireGroup);
        

    }
    
    pausing() {
        if(game.paused === false) {
            game.paused = true;
            this.pausebar = game.add.image(game.world.centerX, game.world.centerY, "paused");
            this.pausebar.anchor.setTo(0.5);
        } else if (game.paused === true) {
            game.paused = false;
            this.pausebar.kill();
        }
    };

    kiwiOut() {
        this.Kiwi.reset(game.rnd.between(200, 600), -Math.floor(Math.random()+1000));
        this.Kiwi.body.velocity.y = 600;
    }

    waterOut() {
        this.Water.reset(game.rnd.between(200, 600), -Math.floor(Math.random()+800));
        this.Water.body.velocity.y = 600;
    }
    
//update 
update() {

        let width = this.barConfig.width;
        var Peter = this.Peter;
        var faces = this.faces;
        var Kiwi = this.Kiwi;
        var myHealthBar = this.myHealthBar;
        var healthNum = this.healthNum;
        var Water = this.Water;
        var scorebar = this.scorebar;
        var weapon = this.weapon;
        var barConfig = this.barConfig;
        var Lolo = this.Lolo;
        var sungroup = this.sunGroup;
        var firegroup = this.fireGroup;
        
    
        if(this.Lolo.x > 580) {
            this.Lolo.body.velocity.x = -100;
        } else if (this.Lolo.x < 200) {
            this.Lolo.body.velocity.x = 100;
        }
        
        game.physics.arcade.overlap(this.Peter, Kiwi, function() {
            Kiwi.kill();
            var snd = game.add.audio("kiwi");
            snd.play();
            score += 1000;
            scorebar.text = "Score: \n" + score;
            faces.frame = 1;
        });

        game.physics.arcade.overlap(this.Peter, Water, function() {
            Water.kill();
            var slurp = game.add.audio("slurp");
            slurp.play();
            score += 3000;
            myHealthBar.setWidth(width + 40);
            barConfig.width += 40;
            health = Math.floor(barConfig.width / 1.5);
            healthNum.text = "Health: " + health;
            scorebar.text = "Score: \n" + score;
            faces.frame = 1;
        });

        if(this.Kiwi.y > 960) {
            this.Kiwi.kill();
        }

        if(this.Water.y > 960) {
            this.Water.kill();
        }
       
        if(cursors.right.isDown) {
            this.Peter.x += speed;
        }
        if (cursors.left.isDown) {
            this.Peter.x -= speed;
        }
        if(this.Peter.x < 200) {
            this.Peter.x = 200;
        }
        if(this.Peter.x > 620) {
            this.Peter.x = 620;
        }

        if(health > 75) {
            icecreamLimit = 80;
            icecreamSpeed = 500 + Math.random() * 100;
            HotTeaSpeed = 150 + Math.random() * 100;
            HotTeaLimit = 200;
            this.faces.frame = 0;

        } 
        else if (health < 30 && health > 0) {
            icecreamLimit = 300;
            icecreamSpeed = 300 + Math.random() * 100;
            HotTeaSpeed = 500 + Math.random() * 100;
            HotTeaLimit = 100;
            this.faces.frame = 3;
        } 
        else if (health > 30 && health < 75) {
            icecreamLimit = 100;
            icecreamSpeed = 350 + Math.random() * 100;
            HotTeaSpeed = 350 + Math.random() * 100;
            HotTeaLimit = 100;
            
        } 
        else if (health <= 0) {
            this.faces.frame = 5;
        }
        

        this.icecreamGroup.forEach(function(icecream) {
            game.physics.arcade.overlap(Peter, icecream, function() {
                icecream.destroy();
                var lick = game.add.audio("lick");
                lick.play();
                score += 500;
                myHealthBar.setWidth(width + 10);
                barConfig.width += 10;
                health = Math.floor(barConfig.width / 1.5);
                healthNum.text = "Health: " + health;
                scorebar.text = "Score: \n" + score;
                faces.frame = 1;
                if(barConfig.width > 150) {
                    console.log(score);
                }
            });
            
        });
        this.HotTeaGroup.forEach(function(tea) {
            game.physics.arcade.overlap(Peter, tea, function() {
                tea.destroy();
                var ouch = game.add.audio("ouch");
                ouch.play('',0,0.5);
                score -= 300;
                
                myHealthBar.setWidth(width - 15);
                barConfig.width -= 15;
                health = Math.floor(barConfig.width / 1.5);
                healthNum.text = "Health: " + health;
                scorebar.text = "Score: \n" + score;
                faces.frame = 4;
                if(barConfig.width <= 0) {
                    console.log("3");
                }
            });
        });

        this.sunGroup.forEach(function(sun) {
            game.physics.arcade.overlap(Peter, sun, function() {
                sun.destroy();
                var hurt = game.add.audio("hurt");
                hurt.play('',0,0.5);
                myHealthBar.setWidth(width - 20);
                barConfig.width -= 20;
                health = Math.floor(barConfig.width / 1.5);
                healthNum.text = "Health: " + health;
                scorebar.text = "Score: \n" + score;
                faces.frame = 4;
                if(barConfig.width <= 0) {
                    console.log("3");
                }
            });
            weapon.forEach(function(weapons) {
                game.physics.arcade.overlap(weapons, sun, function() {
                    sun.damage(1);
                    weapons.kill();
                    var destroy = game.add.audio("destroy");
                    destroy.play('',0,0.5);
                    if(sun.health === 0) {
                        score += 900;
                        myHealthBar.setWidth(width + 5);
                        barConfig.width += 5;
                        health = Math.floor(barConfig.width / 1.5);
                        healthNum.text = "Health: " + health;
                        scorebar.text = "Score: \n" + score;
                    }
                });
            });
        });
        

        this.fireGroup.forEach(function(fire) {
            game.physics.arcade.overlap(fire, Peter, function() {
                fire.kill();
                myHealthBar.setWidth(width - 20);
                barConfig.width -= 20;
                health = Math.floor(barConfig.width / 1.5);
                healthNum.text = "Health: " + health;
            });
            weapon.forEach(function(weapons) {
                game.physics.arcade.overlap(weapons, fire, function(){
                    weapons.kill();
                    health = Math.floor(barConfig.width / 1.5);
                    healthNum.text = "Health: " + health;
                });
            });
     });
 
     weapon.forEach(function(weapons) {
         game.physics.arcade.overlap(weapons, Lolo, function() {
             Lolo.damage(2);
             weapons.kill();
             score += 2000;
             scorebar.text = "Score: \n" + score;
             health = Math.floor(barConfig.width / 1.5);
             healthNum.text = "Health: " + health;
             if(Lolo.health === 0) {
                 score += 15000;
                 scorebar.text = "Score: \n" + score;
                 Lolo.destroy();
                 firegroup.destroy();
                 health = Math.floor(barConfig.width / 1.5);
                 healthNum.text = "Health: " + health;
                 Water.destroy();
             }
         });
     });

        
        
        if(score > 7000 && score < 15000) {
            
            this.BK.loadTexture("forest");
            
            this.Kiwi.body.velocity.y = 600;
            icecreamLimit = 100;
            icecreamSpeed = 500 + Math.random() * 100;
            HotTeaSpeed = 500 + Math.random() * 100;
            HotTeaLimit = 100;
    
        }
        
        if(score > 15000 && score < 20000) {
            
            this.sprite = this.add.sprite(this.Peter.x, this.Peter.y);
            game.physics.arcade.enable(this.sprite);
            weapon.trackSprite(this.sprite, 0, 0); 
            weapon.fireRate = 100;
            weapon.multiFire = true;
            cursors = this.input.keyboard.createCursorKeys();
            this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
            this.sprite.body.velocity.x = 0;
            
            if (cursors.left.isDown) {
                this.sprite.body.velocity.x = -200;
            }
            else if (cursors.right.isDown) {
                this.sprite.body.velocity.x = 200;
            }
            if (this.fireButton.isDown) {
                weapon.fireOffset(0, 0);
            }

            speed = 10;
            this.BK.loadTexture("Desert");
            icecreamSpeed = 0;
            HotTeaSpeed = 0;
            this.Kiwi.body.velocity.y = 0;
            this.Kiwi.y = -100;
            sunSpeed = 550;
            sunLimit = 80;
            this.Water.body.velocity.y = 500;
        }

        if (score > 20000) {

            this.space = this.BK.loadTexture("SpaceBK");
            this.BK.tilePosition.y += 2;
            this.Lolo.visible = true;
            var snd = game.add.audio("bossstage");
            snd.play();
            this.fire.visible = true;
            sunSpeed = 0;
            this.sunGroup.destroy();

            this.sprite = this.add.sprite(this.Peter.x, this.Peter.y);
            game.physics.arcade.enable(this.sprite);
            weapon.trackSprite(this.sprite, 0, 0); 
            weapon.fireRate = 100;
            weapon.multiFire = true;
            cursors = this.input.keyboard.createCursorKeys();
            this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
            this.sprite.body.velocity.x = 0;
            
            if (cursors.left.isDown) {
                this.sprite.body.velocity.x = -200;
            }
            else if (cursors.right.isDown) {
                this.sprite.body.velocity.x = 200;
            }
            if (this.fireButton.isDown) {
                weapon.fireOffset(0, 0);
            }
            
        }

//gameover transition 
   

    if (health <=0) {
            var snd = game.add.audio("gameover");
            snd.play();
            game.paused = true;  
            this.gameoversign = game.add.image(game.world.centerX, game.world.centerY, "gameoversign");
            this.gameoversign.anchor.setTo(0.5);

            game.paused = false;
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
                game.state.start("GameOverScreen");
                
            })
    
        }

        // this.score = 0;
        // console.log(this.score);
        // this.scorebar = game.add.text(20, 500, "Score: \n" + this.score, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});
        // console.log(this.score);

    }//update bracket ends
    //gameover transition ends

    addIcecream(group) {
        let icecreams = new Icecream(game, icecreamSpeed, this);
        game.add.existing(icecreams);
        group.add(icecreams);
    }

    addHotTea(group) {
        let hotTea = new HotTea(game, HotTeaSpeed, this);
        game.add.existing(hotTea);
        group.add(hotTea);
    }
    addSun(group) {
        this.sun = new Sun(game, sunSpeed, this);
        this.sun.health = 3;
        game.add.existing(this.sun);
        group.add(this.sun);
    }
    addFire(group) {
        this.fire = new Fire(game, fireSpeed, this);
        this.fire.health = 2;
        game.add.existing(this.fire);
        group.add(this.fire);
        this.fire.visible = false;
    }

    
}

class Icecream extends Phaser.Sprite{
    constructor(game, speed, GameStart) {
        var positions = game.rnd.between(200, 620);
        super(game, positions, -100, "icecream");
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5);
        this.scale.setTo(0.15);
        this.body.velocity.y = icecreamSpeed;
        this.placeBarrier = true;
        this.start = GameStart;
    }

    update() {
        if(this.placeBarrier && this.y > icecreamLimit){
            this.placeBarrier = false;
            this.start.addIcecream(this.parent);
        } 
        if(this.y > 960){
            this.destroy();
        }
    }

}

class HotTea extends Phaser.Sprite {
    constructor(game, speed, GameStart) {
        var positions = game.rnd.between(200, 620);
        super(game, positions, -100, "HotTea");
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5);
        this.scale.setTo(0.2);
        this.body.velocity.y = HotTeaSpeed;
        this.placeBarrier = true;
        this.start = GameStart;
    }

    update() {
        if(this.placeBarrier && this.y > HotTeaLimit){
            this.placeBarrier = false;
            this.start.addHotTea(this.parent);
        } 
        if(this.y > 960){
            this.destroy();
        }
    }

}

class Sun extends Phaser.Sprite {
    constructor(game, speed, GameStart) {
        var positions = game.rnd.between(200, 600);
        super(game, positions, 0, "Sun");
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5);
        this.scale.setTo(0.03);
        this.body.velocity.y = sunSpeed;
        this.placeBarrier = true;
        this.start = GameStart;
        
    }

    update() {
        if(this.placeBarrier && this.y > sunLimit){
            this.placeBarrier = false;
            this.start.addSun(this.parent);
        } 
        if(this.y > 960){
            this.destroy();
        }
    }

}

class Fire extends Phaser.Sprite {
    constructor(game, speed, GameStart) {
        var positions = GameStart.Lolo.x;
        super(game, positions, GameStart.Lolo.y + 10, "Fire");
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5);
        this.scale.setTo(0.15);
        this.body.velocity.y = fireSpeed;
        this.placeBarrier = true;
        this.start = GameStart;
    }
    update() {
        if(this.placeBarrier && this.y > fireLimit){
            this.placeBarrier = false;
            this.start.addFire(this.parent);
        } 
        if(this.y > 960){
            this.destroy();
        }
    }
}



