import { Game } from "./scenes/game.js";
const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    parent: 'myGame',
    backgroundColor: "#065C8E",
    render:{
        pixelArt:true
    },
    physics:{
        default:"arcade",
        arcade:{
            debug:false
        }
    },
    scene: Game
};

var game = new Phaser.Game(config);