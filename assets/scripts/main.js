/**
 * Created by David on 31/12/2015.
 */

var game;

game = new Phaser.Game(300, 400, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Menu');