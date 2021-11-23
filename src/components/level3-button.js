export class Level3 {
    constructor(scene) {
      this.relatedScene = scene;
    }
  
    preload() {
      this.relatedScene.load.spritesheet('buttonLevel3', '../../assets/images/buttons/botonNivel3.png', { frameWidth: 190, frameHeight: 50 });
    }
  
    create() {
      this.level3Button = this.relatedScene.add.sprite(500, 500, 'buttonLevel3').setInteractive();
  
      this.level3Button.on('pointerover', () => {
        this.level3Button.setFrame(1);
      });
      this.level3Button.on('pointerout', () => {
        this.level3Button.setFrame(0);
      });
      this.level3Button.on('pointerdown', () => {
        this.relatedScene.scene.start('Game3');
      });
    }
  }