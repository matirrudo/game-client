export class VolveAJugarButton {
    constructor(scene) {
      this.relatedScene = scene;
    }
  
    preload() {
      this.relatedScene.load.spritesheet('buttonVolverAJugar', '../../assets/images/buttons/botonVolverAJugar.png', { frameWidth: 190, frameHeight: 50 });
      this.relatedScene.load.image('scenePause','../../assets/images/backgrounds/MenuPausa.png');
    }
  
    create() {
        this.relatedScene.physics.pause();
        this.relatedScene.box.visible = false;
        this.relatedScene.musicSound.pause();
        this.relatedScene.pauseImage = this.relatedScene.add.image(0, 600, 'scenePause').setOrigin(0,1);
        this.volverAJugarButton = this.relatedScene.add.sprite(500, 300, 'buttonVolverAJugar').setInteractive();
  
      this.volverAJugarButton.on('pointerover', () => {
        this.volverAJugarButton.setFrame(1);
      });
      this.volverAJugarButton.on('pointerout', () => {
        this.volverAJugarButton.setFrame(0);
      });
      this.volverAJugarButton.on('pointerdown', () => {
        this.resumeScene();
      });
    }

    resumeScene(){
        this.relatedScene.volverAMenuButton.resume();
        this.relatedScene.pauseImage.setVisible(false);
        this.volverAJugarButton.setVisible(false);
        this.relatedScene.isPaused = false;
        this.relatedScene.physics.resume();
        this.relatedScene.box.visible = true;
        this.relatedScene.musicSound.resume();
    }
  }