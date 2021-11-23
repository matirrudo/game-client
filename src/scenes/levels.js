import { Level1 } from "../components/level1-button.js";
import { Level2 } from "../components/level2-button.js";
import { Level3 } from "../components/level3-button.js";

export class Levels extends Phaser.Scene {
  constructor() {
    super({ key: 'Levels' });
    this.level1Button = new Level1(this);
    this.level2Button = new Level2(this);
    this.level3Button = new Level3(this);
  }

  preload() {
    this.load.image('menuLevels', '../../assets/images/backgrounds/MenuInicio.png');
    this.level1Button.preload();
    this.level2Button.preload();
    this.level3Button.preload();
  }
  
  create() {
    this.congratsImage = this.add.image(0, 600, 'menuLevels').setOrigin(0,1);
    this.level1Button.create();
    this.level2Button.create();
    this.level3Button.create();
  }
}