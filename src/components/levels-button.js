export class LevelsButton {
    constructor(scene) {
      this.relatedScene = scene;
    }
  
    preload() {
      this.relatedScene.load.spritesheet('buttonLevel', '../../assets/images/buttons/botonNiveles.png', { frameWidth: 190, frameHeight: 50 });
    }
  
    create() {
      this.level1Button = this.relatedScene.add.sprite(500, 300, 'buttonLevel').setInteractive();
  
      this.level1Button.on('pointerover', () => {
        this.level1Button.setFrame(1);
      });
      this.level1Button.on('pointerout', () => {
        this.level1Button.setFrame(0);
      });
      this.level1Button.on('pointerdown', () => {
        this.relatedScene.scene.start('Levels');
      });
    }
  }