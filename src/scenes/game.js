import { PhaseConstructor } from '../components/phase-constructor.js';

export class Game extends Phaser.Scene{
    constructor(){
        super({key:'game'});
    }

    init(){
        this.box = null;
        this.phaseConstructor = new PhaseConstructor(this);
        this.groundBottom=null;
        this.groundTop=null;
        this.jumpCount=0;
        this.isGravityInverted = false;
        this.spikes = null;
        this.briks = null;
        this.nPortals = null;
        this.fPortals = null;
        this.gPortals = null;
        this.portalFlap = null;
        this.explodeSound = null;
        this.portalSound = null;
        this.musicSound = null;
        this.isFlapMode = false;
        this.rotateAnim = null;
        this.rotateAnimGI = null;

        this.finalPortals = null;
    }

    preload(){
        this.load.image('box','../../assets/box.png');
        this.load.image('box2','../../assets/box2.png');
        this.load.image('rocket','../../assets/rocket.png');
        this.load.image('groundBottom','../../assets/groundBottom-white.png');
        this.load.image('groundTop','../../assets/groundTop-white.png');
        this.load.image('groundBottomB','../../assets/groundBottom-black.png');
        this.load.image('groundTopB','../../assets/groundTop-black.png');
        this.load.image('groundFlap','../../assets/groundFlap.png');
        this.load.image('spikeTop','../../assets/spikeTop.png');
        this.load.image('spikeBottom','../../assets/spikeBottom.png');
        this.load.image('spikeSide','../../assets/spikeSide.png');
        this.load.image('portalFinal', '../../assets/portalFinal.png');
        this.load.image('portalFlap', '../../assets/portalFlap.png');
        this.load.image('portalGravity', '../../assets/portalGravity.png');
        this.load.image('portalNormal', '../../assets/portalNormal.png');
        this.load.image('brick', '../../assets/brick.png');
        this.load.image('brickW', '../../assets/brickW.png');
        this.load.image('brickB', '../../assets/brickB.png');
        this.load.image('backgroundW', '../../assets/backGroundW.png');
        this.load.image('backgroundB', '../../assets/backGroundB.png');

        this.load.audio('explode', '../../assets/sounds/hit.ogg');
        this.load.audio('music1', '../../assets/sounds/music-level1.mp3');
        this.load.audio('music2', '../../assets/sounds/music-level2.mp3');
        this.load.audio('music3', '../../assets/sounds/music-level3.mp3');
        this.load.audio('portalSound', '../../assets/sounds/portal.wav');
    }

    create(){
        this.game.sound.stopAll();
        this.phaseConstructor.create()
        this.input.on('pointerdown', this.onAction , this);
        this.explodeSound = this.sound.add('explode');
        this.portalSound = this.sound.add('portalSound');
        
    }

    update(){
        if(this.isFlapMode && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown){
            this.onAction();
        }

        if(this.isFlapMode && this.input.activePointer.isDown){
            this.onAction();
        }
    }

    onAction(){
        if(this.isFlapMode){
            this.box.body.velocity.y = -400;
            return;
        }
        if(this.jumpCount >=2){
            return;
        }
        this.jumpCount++;

        if(this.isGravityInverted){
            this.box.body.velocity.y = 850;
            this.rotate(-360);
        }else{
            this.box.body.velocity.y = -850;
            this.rotate(360);
        }
    }

    rotate(angleValue){
        if(!this.rotateAnim){
            this.rotateAnim = this.tweens.add({
                targets:this.box,
                angle:angleValue,
                duration:480,
                ease:'Linear'
            });
        }else{
            this.rotateAnim.play();
        }
    }

    resetJumpCount(){
        this.jumpCount = 0;
    }

    gameOver(){
        this.physics.pause();
        this.box.visible = false;
        this.explodeSound.play();
        this.musicSound.pause();
        this.restart();
    }
    restart(){
        this.time.addEvent({
            delay:1000,
            callback:()=>{
                this.scene.restart();
            },
            lopp:false
        });
    }

    restart2(){
        this.time.addEvent({
            delay:1000,
            callback:()=>{
                this.scene.restart();
            },
            lopp:false
        });
    }

    onChangeToFlap(){
        this.isFlapMode = true;
        this.isGravityInverted = false;
        this.box.setTexture('rocket');
        this.box.setBodySize(this.box.width, this.box.height, false);
        this.box.body.gravity.y = 2000;
        this.tweens.add({
            targets: this.box,
            angle: 0,
            duration: 0,
            ease: "Linear"
        });
        this.groundBottom.setTexture('groundFlap');
        this.groundTop.setTexture('groundFlap');
        this.portalSound.play();
    }

    onChangeToGravityInverted(){
        this.isFlapMode = false;
        this.isGravityInverted = true;
        this.box.setTexture('box2');
        this.box.setBodySize(this.box.width, this.box.height, false);
        this.box.body.gravity.y = -3500;
        this.groundBottom.setTexture('groundBottomB');
        this.groundTop.setTexture('groundTopB');
        //this.briks.setTexture('brickW');
        this.portalSound.play();
    }

    onChangeToNormalGravity(){
        this.isFlapMode = false;
        this.isGravityInverted = false;
        this.box.setTexture('box');
        this.box.setBodySize(this.box.width, this.box.height, false);
        this.box.body.gravity.y = 3500;
        this.groundBottom.setTexture('groundBottom');
        this.groundTop.setTexture('groundTop');
        //this.briks.setTexture('brickW');
        this.portalSound.play();
    }

    changeLevel(Scene){
        this.phaseConstructor.nextLevel();
        
        this.physics.pause();
        this.box.visible = false;
        this.explodeSound.play();
        this.musicSound.pause();
        this.time.addEvent({
            delay:1000,
            callback:()=>{
                this.scene.restart();
            },
            lopp:false
        });
    }

    onTouchBrick(){
        if(this.box.body.touching.right){
            this.gameOver();
        }else if(this.box.body.touching.up || this.box.body.touching.down) {
            this.resetJumpCount();            
        }
    }
    
}