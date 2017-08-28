let Peter;
let icecreams;
let icecreamSpeed = 350 + Math.random() * 100;
let HotTeaSpeed = 350 + Math.random() * 100;
let icecreamLimit = 200;
let HotTeaLimit = 200;
let sunSpeed = 100;
let sunLimit = 700;
var speed = 5;
var cursors;
var score = 0;
var myHealthBar;
var width;
var barConfig;
var health;
var healthNum;
var Kiwi;
let sun;
let Water;
let scorebar;
let pausebutton;
let faces;

class GameStart {
    
    preload() {
        game.load.image("Street", "Assets/Street.png");
        game.load.image("forest", "Assets/forest.png");
        game.load.image("Kiwi", "Assets/Kiwi.png");
        game.load.image("Desert", "Assets/desert.png");
        game.load.image("Sun", "Assets/sun.png");
        game.load.image("Water", "Assets/water.png");
        game.load.image("paused", "Assets/paused.jpg");
        game.load.image("pausebutton", "Assets/pausebar.png");
    }
    
    create() {

          

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.BK = this.game.add.tileSprite(160, 0, 480, 960, 'Street');
        this.BK = this.game.add.sprite(160, 0,'Street');

        var wall = game.add.tileSprite(0, 0, 160, game.height, "Wall");
        wall.tint = 0x131715;

        Peter = game.add.sprite(220, 880, "Peter");
        Peter.anchor.setTo(0.5);
        Peter.scale.setTo(0.2);
        Peter.animations.add('walk', [0,1,2,3]);
        Peter.animations.play('walk', 10, true);
        game.physics.enable(Peter);
        Peter.body.collideWorldBounds = true;

        this.kiwis = game.add.group();
        this.kiwis.enablebody = true;
        game.physics.enable(this.kiwis);

        Kiwi = this.kiwis.create(game.rnd.between(180, 600), -Math.floor(Math.random()+1000), "Kiwi");
        game.physics.enable(Kiwi);
        Kiwi.anchor.setTo(0.5);
        Kiwi.scale.setTo(0.2);
        Kiwi.events.onKilled.add(this.kiwiOut,this);

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

        Water = this.waters.create(game.rnd.between(180, 620), -Math.floor(Math.random()+1000), "Water");
        game.physics.enable(Water);
        Water.anchor.setTo(0.5);
        Water.scale.setTo(0.08);
        Water.events.onKilled.add(this.waterOut,this);
        
        barConfig = {x: 45, y: 880, width:75, height: 80};
        myHealthBar = new HealthBar(this.game, barConfig);
        myHealthBar.setBarColor("#D31010");
        cursors = game.input.keyboard.createCursorKeys();

        health = barConfig.width / (150/100);

        healthNum = game.add.text(5, 790, "Health: " +  health, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});

        /* game.time.events.add(Phaser.Timer.SECOND*10, this.forest, this); */

        scorebar = game.add.text(20, 500, "Score: \n" + score, {fontStyle: "bold", fill: "#FFFFFF", font: '20pt Arial'});
    
        pausebutton = game.add.sprite(80, 100, 'pausebutton');
        pausebutton.inputEnabled = true;
        pausebutton.events.onInputUp.add(this.stop, this);
        pausebutton.scale.setTo(0.5);
        pausebutton.anchor.setTo(0.5);
        
        faces = game.add.sprite(10,330,"FacialExpression");
        faces.anchor.setTo(0);
        faces.scale.setTo(0.2);
        faces.frame = 2;
        

    }
    
    stop() {
        game.paused = true;
        game.input.onDown.add(this.start, this);
        this.pausebar = game.add.image(game.world.centerX, game.world.centerY, "paused");
        this.pausebar.anchor.setTo(0.5);
        
    }
    start() {
        game.paused = false;
        this.pausebar.kill();
    }

    /* forest() {
        this.BK.loadTexture("forest");
        Kiwi.body.velocity.y = 600;

        icecreamLimit = 10;
        icecreamSpeed = 1000 + Math.random() * 100;
        HotTeaSpeed = 1000 + Math.random() * 100;
        HotTeaLimit = 10;

        if(health > 75) {
            icecreamLimit = 50;
            icecreamSpeed = 800 + Math.random() * 100;
            HotTeaSpeed = 1000 + Math.random() * 100;
            HotTeaLimit = 150;
        } else if (health < 30) {
            icecreamLimit = 200;
            icecreamSpeed = 400 + Math.random() * 100;
            HotTeaSpeed = 800 + Math.random() * 100;
            HotTeaLimit = 100;
        } 
         else {
            icecreamLimit = 10;
            icecreamSpeed = 700 + Math.random() * 100;
            HotTeaSpeed = 700 + Math.random() * 100;
            HotTeaLimit = 10;
        }
    }*/

    kiwiOut() {
        Kiwi.reset(game.rnd.between(180, 600), -Math.floor(Math.random()+1000));
        Kiwi.body.velocity.y = 600;
    }
    waterOut() {
        Water.reset(game.rnd.between(180, 600), -Math.floor(Math.random()+800));
        Water.body.velocity.y = 600;
    }
    
    
    update() {

        game.physics.arcade.overlap(Peter, Kiwi, function() {
            Kiwi.kill();
            score += 1000;
            scorebar.text = "Score: \n" + score;
            faces.frame = 1;
        });

        game.physics.arcade.overlap(Peter, Water, function() {
            Water.kill();
            score += 3000;
            myHealthBar.setWidth(width + 40);
            barConfig.width += 40;
            health = Math.floor(barConfig.width / 1.5);
            healthNum.text = "Health: " + health;
            scorebar.text = "Score: \n" + score;
            faces.frame = 1;
        });

        if(Kiwi.y > 960) {
            Kiwi.kill();
        }

        if(Water.y > 960) {
            Water.kill();
        }
    
        width = barConfig.width;
        
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
        });
 
            if(health > 75) {
                icecreamLimit = 80;
                icecreamSpeed = 600 + Math.random() * 100;
                HotTeaSpeed = 150 + Math.random() * 100;
                HotTeaLimit = 200;
                faces.frame = 0;
    
            } 
            else if (health < 30 && health > 0) {
                icecreamLimit = 300;
                icecreamSpeed = 300 + Math.random() * 100;
                HotTeaSpeed = 600 + Math.random() * 100;
                HotTeaLimit = 100;
                faces.frame = 3;
            } 
            else if (health > 30 && health < 75) {
                icecreamLimit = 100;
                icecreamSpeed = 350 + Math.random() * 100;
                HotTeaSpeed = 350 + Math.random() * 100;
                HotTeaLimit = 100;
                
            } 
            else if (health <= 0) {
                faces.frame = 5;
            }
        
        
        if(score > 7000) {
            
            this.BK.loadTexture("forest");
            Kiwi.body.velocity.y = 600;
    
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
            speed = 10;
            this.BK.loadTexture("Desert");
            icecreamSpeed = 0;
            HotTeaSpeed = 0;
            Kiwi.body.velocity.y = 0;
            Kiwi.y = -100;
            sunSpeed = 600;
            sunLimit = 50;
            Water.body.velocity.y = 600;
            if(cursors.up.isDown) {
                Peter.y -= speed;
            }
            if (cursors.down.isDown) {
                Peter.y += speed;
            }
            if(Peter.y < 80) {
                Peter.y = 80;
            }
            if(Peter.y > 880) {
                Peter.y = 880;
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
        super(game, positions, -100, "Sun");
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
