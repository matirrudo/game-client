import { Congratulations } from "./scenes/congratulations.js";
import { Game } from "./scenes/game.js";
import { Game2 } from "./scenes/game2.js"
import { Game3 } from "./scenes/game3.js";
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
    scene: [Game,Game2,Game3,Congratulations]
};

var game = new Phaser.Game(config);