import { VolverAMenu } from "../components/volver-a-menu-button.js";

export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'Congratulations' });
    this.volverAMenuButton = new VolverAMenu(this);
  }

  preload() {
    this.load.image('congratulations', '../../assets/images/backgrounds/MenuVictoria.png');
    this.volverAMenuButton.preload();
  }
  
  create() {
    this.congratsImage = this.add.image(0, 600, 'congratulations').setOrigin(0,1);
    this.volverAMenuButton.create();
  }
}