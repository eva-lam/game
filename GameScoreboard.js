var data = [];

class GameScoreboard {
    preload() {
        
        /* game.load.json('Score', './scoreboard.json'); */
        /* this.data = [];
        $(function() {
            $.ajax({
                url: "./scoreboard.json"
            }).done(function(data) {
                $.each(data, function(item) {
                    console.log(data[item].score);
                    data.push(data[item].score);
                });
            });
        }); */
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
