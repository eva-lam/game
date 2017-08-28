//phaser animation methods

#spritesheet 

e.g.   game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

#animationeve

anim = mummy.animations.add('walk');

    anim.onStart.add(animationStarted, this);
    anim.onLoop.add(animationLooped, this);
    anim.onComplete.add(animationStopped, this);

#changeFrame

https://phaser.io/examples/v2/animation/change-frame

#group 

https://phaser.io/examples/v2/animation/group-creation
var group = game.add.group();

    for (var i = 0; i < 6; i++)
    {
        //  They are evenly spaced out on the X coordinate, with a random Y coordinate
        sprite = group.create(120 * i, game.rnd.integerInRange(100, 400), 'seacreatures', 'octopus0000');
    }

    //  These are the frame names for the octopus animation. We use the generateFrames function to help create the array.
    var frameNames = Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4);

#atlas 

spritesheets tend to use more space both in memory and bandwidth because they don’t pack frame data as efficiently as a texture atlas does.
Not all frames have to be the same size when using an atlas.
It’s easier to refer to frames by name rather than by index

#bodyscale 


#advancedtween

#multiplayer?

#inputkeyboard 

#tween 
tween.to({ x: 800 }, 5000, 'Linear', true, 0);

//music 

#fadeIn
#loop 

//game 

#starstruck 
https://phaser.io/examples/v2/games/starstruck