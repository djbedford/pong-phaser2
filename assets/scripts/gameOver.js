/**
 * Created by David on 31/12/2015.
 */

var winner,
    playText,
    gameOverText;

var GameOver = {
    init: function (who) {
        this.winner = who;
    },

    create: function () {
        var fontStyle = {font: "30px Arial", fill: "#FFF", align: "center"};

        if (this.winner === 'player') {
            gameOverText = game.add.text(game.world.centerX, 100, 'You Won!', fontStyle);
        } else {
            gameOverText = game.add.text(game.world.centerX, 100, 'You Lost!', fontStyle);
        }

        gameOverText.anchor.setTo(0.5, 0.5);

        playText = game.add.text(game.world.centerX, 250, 'Play Again', fontStyle);
        playText.anchor.setTo(0.5, 0.5);
        playText.inputEnabled = true;
        playText.events.onInputDown.add(this.startGame, this);
    },

    startGame: function () {
        this.state.start('Game');
    }
};