import { StartButton } from "../components/start-button.js";
import { LevelsButton } from "../components/levels-button.js";

export class Pausa extends Phaser.Scene {
  constructor() {
    super({ key: 'Pausa' });
  }

  preload() {
    this.load.image('menu', '../../assets/images/backgrounds/MenuPausa.png');
  }
  
  create() {
    this.congratsImage = this.add.image(0, 600, 'menu').setOrigin(0,1);
  }

  update(){

  }
}