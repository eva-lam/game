let icecreamSpeed = 350 + Math.random() * 100;
let HotTeaSpeed = 350 + Math.random() * 100;
let icecreamLimit = 200;
let HotTeaLimit = 200;
let sunSpeed = 100;
let sunLimit = 700;
let score = 0;
let fireSpeed = 400;
let fireLimit = 150 + Math.random()*1000;
var speed = 5;
var cursors;
let health;
let Peter;
let playerName;
let Kiwijai;




class GameStart {
    
    preload() {
        playerName = prompt("What is your name?");
    }
    
    create() {
        console.log(playerName);
        this.upbeat = game.add.audio("upbeat");
        this.upbeat.loopFull(0.6);
        // this.upbeat.play('',0,0.5);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.BK = this.game.add.tileSprite(160, 0, 480, 960, 'Beach');

        var wall = game.add.tileSprite(0, 0, 160, game.height, "Wall");
        wall.tint = 0x131715;

        Peter = game.add.sprite(220, 880, "Peter");
        Peter.anchor.setTo(0.5);
        Peter.scale.setTo(0.2);
        Peter.animations.add('walk', [0,1,2,3]);
        Peter.animations.play('walk', 10, true);
        game.physics.enable(Peter);
        Peter.body.collideWorldBounds = true;
        Peter.body.velocity.x = 0;

        this.kiwis = game.add.group();
        this.kiwis.enablebody = true;
        game.physics.enable(this.kiwis);

        this.Kiwijai = this.kiwis.create(game.rnd.between(180, 600), -Math.floor(Math.random()+1000), "Kiwi");
        game.physics.enable(this.Kiwijai);
        this.Kiwijai.anchor.setTo(0.5);
        this.Kiwijai.scale.setTo(0.2);
        this.Kiwijai.events.onKilled.add(this.kiwiOut,this);

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

        this.Waterjai = this.waters.create(game.rnd.between(180, 620), -Math.floor(Math.random()+1000), "Water");
        game.physics.enable(this.Waterjai);
        this.Waterjai.anchor.setTo(0.5);
        this.Waterjai.scale.setTo(0.08);
        this.Waterjai.events.onKilled.add(this.waterOut,this);
        
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
        this.Lolo.health = 30;

        this.fireSpeed = fireSpeed;
        this.fireGroup = game.add.group();    
        this.addFire(this.fireGroup);

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.peterMove, true);
        }

    }


    peterMove(e) {
        var x = e.gamma;
        Peter.body.velocity.x += x * 20;
        if(Peter.x < 50) {
            Peter.x = 50;
        }
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
        this.Kiwijai.reset(game.rnd.between(200, 600), -Math.floor(Math.random()+1000));
        this.Kiwijai.body.velocity.y = 600;
    }

    waterOut() {
        this.Waterjai.reset(game.rnd.between(200, 600), -Math.floor(Math.random()+800));
        this.Waterjai.body.velocity.y = 600;
    }
    
//update 
update() {

        let width = this.barConfig.width;
        var faces = this.faces;
        var myHealthBar = this.myHealthBar;
        var healthNum = this.healthNum;
        var Waterjai = this.Waterjai;
        var scorebar = this.scorebar;
        var weapon = this.weapon;
        var barConfig = this.barConfig;
        var Lolo = this.Lolo;
        var sungroup = this.sunGroup;
        var firegroup = this.fireGroup;
        var Kiwijai = this.Kiwijai;
        
        this.sprite = this.add.sprite(Peter.x, Peter.y);
        game.physics.arcade.enable(this.sprite);
        weapon.trackSprite(this.sprite, 0, 0); 
        weapon.fireRate = 100;
        weapon.multiFire = true;
        cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.sprite.body.velocity.x = 0;

        if(this.Lolo.x > 580) {
            this.Lolo.body.velocity.x = -100;
        } else if (this.Lolo.x < 200) {
            this.Lolo.body.velocity.x = 100;
        }
        
        game.physics.arcade.overlap(Peter, Kiwijai, function() {
            Kiwijai.kill();
            score += 750;
            scorebar.text = "Score: \n" + score;
            faces.frame = 1;
        });

        game.physics.arcade.overlap(Peter, Waterjai, function() {
            Waterjai.kill();
            score += 500;
            myHealthBar.setWidth(width + 40);
            barConfig.width += 40;
            health = Math.floor(barConfig.width / 1.5);
            healthNum.text = "Health: " + health;
            scorebar.text = "Score: \n" + score;
            faces.frame = 1;
        });

        if(Kiwijai.y > 960) {
            Kiwijai.kill();
        }

        if(this.Waterjai.y > 960) {
            this.Waterjai.kill();
        }
       
        if(cursors.right.isDown) {
            Peter.x += speed;
        }
        if (cursors.left.isDown) {
            Peter.x -= speed;
        }
        if(Peter.x < 200) {
            Peter.x = 200;
        }
        if(Peter.x > 620) {
            Peter.x = 620;
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
                    if(sun.health <= 0) {
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

     if (health <=0 || health >= 100 || this.Lolo.health <= 0) {
        
                this.sunGroup.destroy();
                this.icecreamGroup.destroy();
                this.fireGroup.destroy();
                this.HotTeaGroup.destroy();
                this.kiwis.destroy();
                this.waters.destroy();
                
                var snd2 = game.add.audio("gameover");
                snd2.play();
                
                this.gameoversign = game.add.image(game.world.centerX, game.world.centerY, "gameoversign");
                this.gameoversign.anchor.setTo(0.5);
        
                game.paused = false;
                game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
                    game.state.start("GameOverScreen", true, false); 
                    $(function() {
                        var input = JSON.stringify({"playerName" : playerName, "score" : score});
                        $.ajax({
                            type: "POST",
                            url: "https://accelerate-game.firebaseio.com/scoreboards/PeterIce.json",
                            data: input,
                            datatype: "json"
                        }).done(function() {
                            console.log('HI');
                        });
                    });
                });
            
            } else if(score > 7000 && score < 15000) {
            
            this.BK.loadTexture("forest");
            if(Kiwi.destroy !== true || (Peter.health > 0 && Peter.health < 100)) {
                Kiwi.body.velocity.y = 600;
            }
            
            icecreamLimit = 100;
            icecreamSpeed = 500 + Math.random() * 100;
            HotTeaSpeed = 500 + Math.random() * 100;
            HotTeaLimit = 100;
    
        } else if(score > 15000 && score < 40000) {
            if(this.kiwis.destroy !== true) {
                Kiwi.body.velocity.y = 0;
            }

            if (cursors.left.isDown) {
                this.sprite.body.velocity.x = -200;
            }
            else if (cursors.right.isDown) {
                this.sprite.body.velocity.x = 200;
            }
            if (this.fireButton.isDown) {
                weapon.fireOffset(0, 0);
            }
            this.game.input.onTap.add(function(game) {
                weapon.fireOffset(0, 0);
                weapon.fireRate = 50;
            });

            speed = 10;
            this.BK.loadTexture("Desert");
            icecreamSpeed = 0;
            HotTeaSpeed = 0;
            
            sunSpeed = 550;
            sunLimit = 100;
            if(this.waters.destroy !== true || (Peter.health > 0 && Peter.health < 100)) {
                this.Water.body.velocity.y = 500;
            }
            
        } else if (score > 40000) {

            this.space = this.BK.loadTexture("SpaceBK");
            this.BK.tilePosition.y += 2;
            this.Lolo.visible = true;
            this.fire.visible = true;
            sunSpeed = 0;
            this.sunGroup.destroy();
            
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

        this.game.input.onTap.add(function(game) {
            weapon.fireOffset(0, 0);
            weapon.fireRate = 10;
        });

//gameover transition 
   

   

        // this.score = 0;
        // console.log(this.score);
        // this.scorebar = game.add.text(20, 500, "Score: \n" + this.score, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});
        // console.log(this.score);

    }//update bracket ends
    //gameover transition ends

    addIcecream(group) {
        this.icecreams = new Icecream(game, icecreamSpeed, this);
        game.add.existing(this.icecreams);
        group.add(this.icecreams);
    }

    addHotTea(group) {
        this.hotTea = new HotTea(game, HotTeaSpeed, this);
        game.add.existing(this.hotTea);
        group.add(this.hotTea);
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



