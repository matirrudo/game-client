import { RestartButton } from "../components/restart-button.js";

export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'Congratulations' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('congratulations', '../../assets/congratulations.png');
    this.restartButton.preload();
  }
  
  create() {
    this.restartButton.create();
    this.congratsImage = this.add.image(500, 250, 'congratulations');
  }
}