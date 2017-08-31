class GameHighScore {

    create(){
        const endbackground = game.add.image(0,0,"endbackground");
        const highscore = game.add.image (0,0,"highscore");
        highscore.anchor.setTo(-0.3,-0.5);
        highscore.scale.setTo(0.4);

        var scoreText;
        
        //  Testing Ajax Post method
          
            // $.ajax({
        
            //     method: "POST",
            //     url: "/data.json",
            //     data: JSON.stringify({ 1: "30000", 2: "25000" })
        
            //     });
        
                //     $.ajax({
                //     url:"http://127.0.0.1:8080/data.json",
                //     beforeSend:function(xhr){
                //         // This function will be run before sending ajax.
                //         console.log("Stanley");
                //     },
                //     type: "POST",
                //      data: {
                //         attr1: "value1",
                //         attr2: 10 }
                    
                // }).done(function(data){
                //     console.log("This function will be run if the ajax is successful");
                // }).fail(function(data){
                //     console.log("This function will be run if the ajax if failed");
                // }).always(function(data){
                //     console.log("This function runs no matter success or fail.");
                // });  
        
        $.get("./data.json", function(data) //Ajax call to get JSON data and display them on the screen
        {  
            scoreText = game.add.text(250, 250, "1. " + data[1], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 300, "2. " + data[2], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 350, "3. " + data[3], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 400, "4. " + data[4], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 450, "5. " + data[5], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 500, "6. " + data[6], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 550, "7. " + data[7], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 600, "8. " + data[8], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 650, "9. " + data[9], { fontSize: '32px', fill: '#000' });
            scoreText = game.add.text(250, 700, "10. " + data[10], { fontSize: '32px', fill: '#000' });
        
        });

        const tryAgain = game.add.button(game.width / 2, game.height - 120, "tryagain", this.startGame);
        tryAgain.anchor.setTo(0.5);
        tryAgain.scale.setTo(0.5); 
        const tween2 = game.add.tween(tryAgain).to({
            width: 220,
            height: 150,
        }, 1900, "Linear", true, 0, -3);
        tween2.yoyo(true);
        console.log("Game over");

    }       

        startGame(){
        console.log("Restart button pressed");
        game.state.start("GameStart");
        }
    


}
     
            //Testing localStorage
        
            //var scoreArray = []; 
            
            // if (typeof(Storage) !== "undefined") {
            //     localStorage.setItem(1, '35000');
            //     localStorage.setItem(2, '25000');
            //     localStorage.setItem(3, '20000');
            //     localStorage.setItem(4, '15000');
            //     localStorage.setItem(5, '10000');
            //     localStorage.setItem(6, '9999');
            //     localStorage.setItem(7, '8888');
            //     localStorage.setItem(8, '7777');
            //     localStorage.setItem(9, '6666');
            //     localStorage.setItem(10, '5555');
            // }
        
            //Testing localStorage
                // var currentScore;
                // for (var i = 1; i <= 10; i++) {
                //     if (currentScore > localStorage.getItem(i)) {
                //         localStorage.setItem(i, currentScore);
                //         console.log(localStorage.getItem(i));
                //         break;
                //     }
                //}
        
            // for (var i = 0; i < 10; i++) { //Retrieving and displaying the scores in the array
            //     scoreArray[i] = localStorage.getItem(i + 1);
            // }


