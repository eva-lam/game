let icecreamSpeed = 350 + Math.random() * 100;
let HotTeaSpeed = 350 + Math.random() * 100;
let icecreamLimit = 200;
let HotTeaLimit = 200;
let sunSpeed = 100;
let sunLimit = 700;
let score = 0;
var speed = 5;
var cursors;

class GameStart {
    
    preload() {
        game.load.image("Beach", "Assets/beach.png");
        game.load.image("forest", "Assets/forest.png");
        game.load.image("Kiwi", "Assets/Kiwi.png");
        game.load.image("Desert", "Assets/desert.png");
        game.load.image("Sun", "Assets/sun.png");
        game.load.image("Water", "Assets/water.png");
        game.load.image("paused", "Assets/paused.jpg");
        game.load.image("arrow1", "Assets/arrow1.png");
        
        game.load.image("pausebutton", "Assets/pausebar.png");
    }
    
    create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.BK = this.game.add.tileSprite(160, 0, 480, 960, 'Beach');
        this.BK = this.game.add.sprite(160, 0,'Beach');

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

        this.health = this.barConfig.width / (150/100);

        this.healthNum = game.add.text(5, 790, "Health: " +  this.health, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});


        score = 0;
        this.scorebar = game.add.text(20, 500, "Score: \n" + score, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});
    
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
        this.weapon.bulletSpeed = 800;
    
       
        this.faces = game.add.sprite(10,330,"FacialExpression");
        this.faces.anchor.setTo(0);
        this.faces.scale.setTo(0.2);
        this.faces.frame = 2;
        


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
        
        
    }

    kiwiOut() {
        this.Kiwi.reset(game.rnd.between(200, 600), -Math.floor(Math.random()+1000));
        this.Kiwi.body.velocity.y = 600;
    }
    waterOut() {
        this.Water.reset(game.rnd.between(200, 600), -Math.floor(Math.random()+800));
        this.Water.body.velocity.y = 600;
    }
    
    
    update() {

        let width = this.barConfig.width;
        var Peter = this.Peter;
        var faces = this.faces;
        var Kiwi = this.Kiwi;
        var myHealthBar = this.myHealthBar;
        var health = this.health;
        var healthNum = this.healthNum;
        var Water = this.Water;
        var scorebar = this.scorebar;
        var weapon = this.weapon;
        var barConfig = this.barConfig;
    
        

        game.physics.arcade.overlap(this.Peter, Kiwi, function() {
            Kiwi.kill();
            score += 1000;
            scorebar.text = "Score: \n" + score;
            faces.frame = 1;
        });

        game.physics.arcade.overlap(this.Peter, Water, function() {
            Water.kill();
            this.score += 3000;
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
                    if(sun.health === 0) {
                        score += 4000;
                        scorebar.text = "Score: \n" + score;
                    }
                });
            });
        });


            if(health > 75) {
                icecreamLimit = 80;
                icecreamSpeed = 600 + Math.random() * 100;
                HotTeaSpeed = 150 + Math.random() * 100;
                HotTeaLimit = 200;
                this.faces.frame = 0;
    
            } 
            else if (health < 30 && health > 0) {
                icecreamLimit = 300;
                icecreamSpeed = 300 + Math.random() * 100;
                HotTeaSpeed = 600 + Math.random() * 100;
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
        
        
        if(score > 7000) {
            
            this.BK.loadTexture("forest");
            this.Kiwi.body.velocity.y = 600;
    
            icecreamLimit = 100;
            icecreamSpeed = 600 + Math.random() * 100;
            HotTeaSpeed = 600 + Math.random() * 100;
            HotTeaLimit = 100;
    
            if(health > 75) {
                icecreamLimit = 200;
                icecreamSpeed = 800 + Math.random() * 100;
                HotTeaSpeed = 600 + Math.random() * 100;
                HotTeaLimit = 200;
            } else if (health < 30) {
                icecreamLimit = 200;
                icecreamSpeed = 600 + Math.random() * 100;
                HotTeaSpeed = 800 + Math.random() * 100;
                HotTeaLimit = 200;
            } 
             else {
                icecreamLimit = 100;
                icecreamSpeed = 600 + Math.random() * 100;
                HotTeaSpeed = 600 + Math.random() * 100;
                HotTeaLimit = 100;
            }
        }
        
        if(score > 15000) {

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
            Water.body.velocity.y = 600;

            if(cursors.up.isDown) {
                this.Peter.y -= speed;
            }
            if (cursors.down.isDown) {
                this.Peter.y += speed;
            }
            if(this.Peter.y < 80) {
                this.Peter.y = 80;
            }
            if(this.Peter.y > 880) {
                this.Peter.y = 880;
            }
        }
    }


    addIcecream(group){
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
        let sun = new Sun(game, sunSpeed, this);
        sun.health = 3;
        game.add.existing(sun);
        group.add(sun);
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

//weapons 

