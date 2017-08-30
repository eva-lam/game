var data = [];

class GameScoreboard {
    preload() {
        game.load.json('Score', './scoreboard.json');
        $(function() {
            $.ajax({
                url: "./scoreboard.json"
            }).done(function(data) {
                $.each(data, function(key,value) {
                    data.push(value);
                });
            });
        });
        data.sort((a, b) => {return b - a;});
    }
    create() {

        console.log(data);

        this.a = game.cache.getJSON("Score");

        this.a.forEach(function(item) {
            data.push(item.score);
        }, this);

        data = data.sort(function(a,b) {
            return b - a;
        });

        var score = game.add.text(0,100, data);
    }
}
