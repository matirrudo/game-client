export class StartButton {
    constructor(scene) {
      this.relatedScene = scene;
    }
  
    preload() {
      this.relatedScene.load.spritesheet('buttonJugar', '../../assets/images/buttons/botonJugar.png', { frameWidth: 190, frameHeight: 50 });
    }
  
    create() {
      this.startButton = this.relatedScene.add.sprite(500, 400, 'buttonJugar').setInteractive();
  
      this.startButton.on('pointerover', () => {
        this.startButton.setFrame(1);
      });
      this.startButton.on('pointerout', () => {
        this.startButton.setFrame(0);
      });
      this.startButton.on('pointerdown', () => {
        this.relatedScene.scene.start('Game');
      });
    }
  }