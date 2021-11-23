export class LevelBehavior{
    constructor(scene) {
        this.relatedScene = scene;
      }

      onChangeToGravityInverted(){
        this.relatedScene.isFlapMode = false;
        this.relatedScene.isGravityInverted = true;
        this.relatedScene.box.setTexture('box2');
        this.relatedScene.box.setBodySize(this.box.width, this.box.height, false);
        this.relatedScene.box.body.gravity.y = -3500;
        this.relatedScene.groundBottom.setTexture('groundBottomB');
        this.relatedScene.groundTop.setTexture('groundTopB');
        this.relatedScene.portalSound.play();
    }
    
}