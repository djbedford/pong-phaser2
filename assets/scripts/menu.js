/**
 * Created by David on 31/12/2015.
 */

var Menu = {
    create: function () {
        var fontStyle = {font: "30px Arial", fill: "#FFF", align: "center"},
            titleText = game.add.text(game.world.centerX, 100, 'PONG', {font: "40px Arial", fill: "#FFF", align: "center"}),
            introText = game.add.text(game.world.centerX, 250, 'Play', fontStyle);

        titleText.anchor.set(0.5);
        introText.anchor.set(0.5);

        introText.inputEnabled = true;
        introText.events.onInputDown.add(this.startGame, this);
    },

    startGame: function () {
        this.state.start('Game');
    }
};