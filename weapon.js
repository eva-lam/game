
function preload() {
    
game.load.image('archer', 'assets/sprites/bullet.png');

}

var sprite;
var weapon;
var cursors;
var fireButton;

function create (){

     //  Creates 1 single arrow, using the 'bullet' graphic
     weapon = game.add.weapon(1, 'archer');
 
     //  The bullet will be automatically killed when it leaves the world bounds
     weapon.archerKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
 
     //  Because our bullet is drawn facing up, we need to offset its rotation:
     weapon.archerAngleOffset = 90;
 
     //  The speed at which the bullet is fired
     weapon.archerSpeed = 400;
 
     sprite = this.add.sprite(320, 500, 'ship');
 
     game.physics.arcade.enable(sprite);
 
     //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
     weapon.trackSprite(sprite, 14, 0);
 
     cursors = this.input.keyboard.createCursorKeys();
 
     fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
 
 }
 //set the keyboard input keys for sprite movements 
 function update() { 
 
     sprite.body.velocity.x = 0;
 
     if (cursors.left.isDown)
     {
         sprite.body.velocity.x = -200;
     }
     else if (cursors.right.isDown)
     {
         sprite.body.velocity.x = 200;
     }
 
     if (fireButton.isDown)
     {
         weapon.fire();
     }

 }
 
 function render() {
 
     weapon.debug();
 
 }

