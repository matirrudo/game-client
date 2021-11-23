export class Level1 {
    constructor(scene) {
      this.relatedScene = scene;
    }
  
    preload() {
      this.relatedScene.load.spritesheet('buttonLevel1', '../../assets/images/buttons/botonNivel1.png', { frameWidth: 190, frameHeight: 50 });
    }
  
    create() {
      this.level1Button = this.relatedScene.add.sprite(500, 300, 'buttonLevel1').setInteractive();
  
      this.level1Button.on('pointerover', () => {
        this.level1Button.setFrame(1);
      });
      this.level1Button.on('pointerout', () => {
        this.level1Button.setFrame(0);
      });
      this.level1Button.on('pointerdown', () => {
        this.relatedScene.scene.start('Game');
      });
    }
  }