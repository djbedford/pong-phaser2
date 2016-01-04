/**
 * Created by David on 31/12/2015.
 */

var GAME_PLAYING = false,
    WIN_CONDITION = 5;

var playerPaddle,
    playerScore,
    playerText,
    aiPaddle,
    aiScore,
    aiText,
    ball,
    introText;

var Game = {
    preload: function () {
        game.load.image('pitch', 'assets/images/playingfield.png');
        game.load.image('paddle', 'assets/images/paddle.png');
        game.load.image('ball', 'assets/images/ball.png');
    },
    
    create: function () {
        playerScore = 0;
        aiScore = 0;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.checkCollision.up = false;
        game.physics.arcade.checkCollision.down = false;

        var background = game.add.sprite(0, 0, 'pitch');

        playerPaddle = game.add.sprite(game.world.centerX, 380, 'paddle');
        playerPaddle.anchor.setTo(0.5, 0.5);

        game.physics.enable(playerPaddle, Phaser.Physics.ARCADE);

        playerPaddle.body.collideWorldBounds = true;
        playerPaddle.body.bounce.set(1);
        playerPaddle.body.immovable = true;

        aiPaddle = game.add.sprite(game.world.centerX, 20, 'paddle');
        aiPaddle.anchor.setTo(0.5, 0.5);

        game.physics.enable(aiPaddle, Phaser.Physics.ARCADE);

        aiPaddle.body.collideWorldBounds = true;
        aiPaddle.body.bounce.set(1);
        aiPaddle.body.immovable = true;

        ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
        ball.anchor.setTo(0.5, 0.5);
        ball.checkWorldBounds = true;

        game.physics.enable(ball, Phaser.Physics.ARCADE);

        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);

        ball.events.onOutOfBounds.add(this.ballLost, this);

        var fontStyle = {font: "30px Arial", fill: "#FFF", align: "center"};

        playerText = game.add.text(275, 225, '0', fontStyle);
        playerText.anchor.setTo(0.5, 0.5);

        aiText = game.add.text(25, 175, '0', fontStyle);
        aiText.anchor.setTo(0.5, 0.5);

        introText = game.add.text(game.world.centerX, 250, 'Click to Start', fontStyle);
        introText.anchor.set(0.5);

        background.inputEnabled = true;
        background.events.onInputDown.add(this.releaseBall, this);
    },
    
    update: function () {
        playerPaddle.x = game.input.x;
        //aiPaddle.x = ball.x;

        if (playerPaddle.x < 25) {
            playerPaddle.x = 25;
        } else if (playerPaddle.x > game.width - 25) {
            playerPaddle.x = game.width - 25;
        }

        if (aiPaddle.x < 25) {
            aiPaddle.x = 25;
        } else if (aiPaddle.x > game.width - 25) {
            aiPaddle.x = game.width - 25;
        }

        if (aiPaddle.x < ball.x - 10) {
            aiPaddle.x += 3;
        } else if (aiPaddle.x > ball.x + 10) {
            aiPaddle.x += -3;
        }

        game.physics.arcade.collide(ball, playerPaddle, this.ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, aiPaddle, this.ballHitPaddle, null, this);
    },

    ballLost: function () {
        GAME_PLAYING = false;

        if (ball.y < 0) {
            playerScore += 1;
            playerText.text = playerScore;
        } else {
            aiScore += 1;
            aiText.text = aiScore;
        }

        if (playerScore === 5) {
            this.state.start('GameOver', true, false, 'player');
        } else if (aiScore === 5) {
            this.state.start('GameOver', true, false, 'ai');
        }

        ball.reset(game.world.centerX, game.world.centerY);
        ball.anchor.setTo(0.5, 0.5);
    },

    releaseBall: function () {
        if (GAME_PLAYING === false) {
            GAME_PLAYING = true;

            introText.visible = false;

            if (Math.round(Math.random())) {
                ball.body.velocity.x = Math.round((Math.random() + 1) * 200);

                if (Math.round(Math.random())) {
                    ball.body.velocity.y = Math.round((Math.random() + 1) * 200);
                } else {
                    ball.body.velocity.y = -Math.round((Math.random() + 1) * 200);
                }
            } else {
                ball.body.velocity.x = -Math.round((Math.random() + 1) * 200);

                if (Math.round(Math.random())) {
                    ball.body.velocity.y = Math.round((Math.random() + 1) * 200);
                } else {
                    ball.body.velocity.y = -Math.round((Math.random() + 1) * 200);
                }
            }
        }
    },

    ballHitPaddle: function (_ball, _paddle) {
        var diff = 0;

        if (_ball.x < _paddle.x) {
            diff = _paddle.x - _ball.x;

            _ball.body.velocity.x = (-10 * diff);
        } else if (_ball.x > _paddle.x) {
            diff = _ball.x - _paddle.x;

            _ball.body.velocity.x = (10 * diff);
        } else {
            _ball.body.velocity.x = 2 + Math.random() * 8;
        }

        _ball.body.velocity.y *= 1.02;
    }
};