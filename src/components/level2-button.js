export class Level2 {
    constructor(scene) {
      this.relatedScene = scene;
    }
  
    preload() {
      this.relatedScene.load.spritesheet('buttonLevel2', '../../assets/images/buttons/botonNivel2.png', { frameWidth: 190, frameHeight: 50 });
    }
  
    create() {
      this.level2Button = this.relatedScene.add.sprite(500, 400, 'buttonLevel2').setInteractive();
  
      this.level2Button.on('pointerover', () => {
        this.level2Button.setFrame(1);
      });
      this.level2Button.on('pointerout', () => {
        this.level2Button.setFrame(0);
      });
      this.level2Button.on('pointerdown', () => {
        this.relatedScene.scene.start('Game2');
      });
    }
  }