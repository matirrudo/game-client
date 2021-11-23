import { StartButton } from "../components/start-button.js";
import { LevelsButton } from "../components/levels-button.js";

export class Pausa extends Phaser.Scene {
  constructor() {
    super({ key: 'Pausa' });
    this.startButton = new StartButton(this);
    this.levelsButton = new LevelsButton(this);
  }

  preload() {
    this.load.image('menu', '../../assets/images/backgrounds/MenuPausa.png');
    this.startButton.preload();
    this.levelsButton.preload();
  }
  
  create() {
    this.congratsImage = this.add.image(0, 600, 'menu').setOrigin(0,1);
    this.startButton.create();
    this.levelsButton.create();
  }
}