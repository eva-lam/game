let Peter;
let icecreams;
let icecreamSpeed = 200 + Math.random() * 100;
let chiliSpeed = 300 + Math.random() * 100;
let icecreamLimit = 400;
let chiliLimit = 300;
var speed = 5;
var cursors;
var score = 0;
var myHealthBar;
var width;
var barConfig;

class GameStart {
    preload() {

    }
    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var BK = game.add.tileSprite(0, 0, 640, 960,"BK2");
        BK.scale.setTo(1.5,2);

        var wall = game.add.tileSprite(0, 0, 160, game.height, "Wall");
        wall.tint = 0x131715;

        Peter = game.add.sprite(220, 880, "Peter");
        Peter.anchor.setTo(0.5);
        Peter.scale.setTo(0.2);
        Peter.animations.add('walk', [0,1,2,3]);
        Peter.animations.play('walk', 10, true);
        game.physics.enable(Peter);
        Peter.body.collideWorldBounds = true;

        this.icecreamSpeed = icecreamSpeed;
        this.icecreamGroup = game.add.group();
        this.addIcecream(this.icecreamGroup);

        this.chiliSpeed = chiliSpeed;
        this.chiliGroup = game.add.group();
        this.addChili(this.chiliGroup);


        
        barConfig = {x: 45, y: 880, width:75, height: 80};
        myHealthBar = new HealthBar(this.game, barConfig);
        myHealthBar.setBarColor("#D31010");
        cursors = game.input.keyboard.createCursorKeys();

    }
    update() {
        width = barConfig.width;
        if(cursors.right.isDown) {
            Peter.x += speed;
        }
        if (cursors.left.isDown) {
            Peter.x -= speed;
        }
        if(Peter.x < 220) {
            Peter.x = 220;
        }
        if(Peter.x > 600) {
            Peter.x = 600;
        }
        this.icecreamGroup.forEach(function(icecream) {
            game.physics.arcade.overlap(Peter, icecream, function() {
                icecream.destroy();
                score += 50;
                myHealthBar.setWidth(width + 7.5);
                barConfig.width += 7.5;
                if(barConfig.width > 150) {
                    console.log("u")
                }
            });
        });
        this.chiliGroup.forEach(function(chili) {
            game.physics.arcade.overlap(Peter, chili, function() {
                chili.destroy();
                score -= 100;
                myHealthBar.setWidth(width - 11.25);
                barConfig.width -= 11.25;
                if(barConfig.width <= 0) {
                    console.log("3")
                }
            })
        });
    }

    addIcecream(group){
        let icecreams = new Icecream(game, icecreamSpeed, this);
        game.add.existing(icecreams);
        group.add(icecreams);
    }

    addChili(group) {
        let chili = new Chili(game, chiliSpeed, this);
        game.add.existing(chili);
        group.add(chili);
    }
}

class Icecream extends Phaser.Sprite{
    constructor(game, speed, GameStart) {
        var positions = game.rnd.between(220, 620);
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

class Chili extends Phaser.Sprite {
    constructor(game, speed, GameStart) {
        var positions = game.rnd.between(220, 620);
        super(game, positions, -100, "chili");
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5);
        this.scale.setTo(0.5);
        this.body.velocity.y = chiliSpeed;
        this.placeBarrier = true;
        this.start = GameStart;
    }

    update() {
        if(this.placeBarrier && this.y > chiliLimit){
            this.placeBarrier = false;
            this.start.addChili(this.parent);
        } 
        if(this.y > 960){
            this.destroy();
        }
    }

}