class GameInstruction {
    create() {
        game.stage.backgroundColor = "#123456";
        
        this.title = game.add.bitmapText(game.world.centerX, 100, "font", "Instructions", 90);
        this.title.tint = 0xF12F11;
        this.title.anchor.setTo(0.5);

        this.icecream = game.add.sprite(80, 250, 'icecream');
        this.icecream.anchor.setTo(0.5);
        this.icecream.scale.setTo(0.2);

        this.kiwi = game.add.sprite(160, 250, "Kiwi");
        this.kiwi.anchor.setTo(0.5);
        this.kiwi.scale.setTo(0.2);

        this.water = game.add.sprite(240, 250, "Water");
        this.water.anchor.setTo(0.5);
        this.water.scale.setTo(0.12);

        this.plus = game.add.bitmapText(450, 250, "font", "HP+  S+", 70);
        this.plus.tint = 0xCCDCD4;
        this.plus.anchor.setTo(0.5);

        this.sun = game.add.sprite(160, 400, "Sun");
        this.sun.anchor.setTo(0.5);
        this.sun.scale.setTo(0.03);

        this.hotTea = game.add.sprite(80, 400, "HotTea");
        this.hotTea.anchor.setTo(0.5);
        this.hotTea.scale.setTo(0.2);

        this.fire = game.add.sprite(240, 400, "Fire");
        this.fire.anchor.setTo(0.5);
        this.fire.scale.setTo(0.15);

        this.minus = game.add.bitmapText(450, 400, "font", "HP-  S-", 70);
        this.minus.tint = 0xCCDCD4;
        this.minus.anchor.setTo(0.5);

        this.guideline1 = game.add.bitmapText(100, 520, "font", "Move", 50);
        this.guideline1.anchor.setTo(0.5);
        this.guideline1.tint = 0xCCDCD4;

        this.guideline1key = game.add.bitmapText(420, 520, "font", "Arrows / Tile", 50);
        this.guideline1key.anchor.setTo(0.5);
        this.guideline1key.tint = 0xCCDCD4;

        this.guideline2 = game.add.bitmapText(100, 580, "font", "Shoot", 50);
        this.guideline2.anchor.setTo(0.5);
        this.guideline2.tint = 0xCCDCD4;

        this.guideline2key = game.add.bitmapText(420, 580, "font", "Spacebar / Tap", 50);
        this.guideline2key.anchor.setTo(0.5);
        this.guideline2key.tint = 0xCCDCD4;

        this.word1 = game.add.bitmapText(game.world.centerX, 660, "font", "Save the planet from being too hot", 35);
        this.word1.lineSpacing = 50;
        this.word1.anchor.setTo(0.5);
        this.word1.tint = 0xEDDFEA;

        this.word2 = game.add.bitmapText(game.world.centerX, 710, "font", "The world destiny is on your hand", 35);
        this.word2.lineSpacing = 50;
        this.word2.anchor.setTo(0.5);
        this.word2.tint = 0xEDDFEA;

        this.word1 = game.add.bitmapText(game.world.centerX, 760, "font", "Remember maintain HP between 1 - 99", 35);
        this.word1.lineSpacing = 50;
        this.word1.anchor.setTo(0.5);
        this.word1.tint = 0xEDDFEA;

        this.Peter = game.add.button(50, 850, "MovingPeter", this.startGame);
        this.Peter.anchor.setTo(0.5);
        this.Peter.scale.setTo(0.3);
        this.Peter.frame = 5;
        this.Peter.animations.add("walkRight", [5,4]);
        this.Peter.animations.play("walkRight", 5, true);  
    }
    update() {
        this.Peter.x += 3;
        if (this.Peter.x > 640) {
            this.Peter.x = 50;
        }
        this.fire.angle += 2;
    }
    startGame() {
        game.state.start("GameStart");
    }
}