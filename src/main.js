class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }

    init(){
        this.box = null;
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
    }

    preload(){
        this.load.image('box','./assets/box.png');
        this.load.image('box2','./assets/box2.png');
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('groundBottom','./assets/groundBottom-white.png');
        this.load.image('groundTop','./assets/groundTop-white.png');
        this.load.image('groundBottomB','./assets/groundBottom-black.png');
        this.load.image('groundTopB','./assets/groundTop-black.png');
        this.load.image('spikeTop','./assets/spikeTop.png');
        this.load.image('spikeBottom','./assets/spikeBottom.png');
        this.load.image('spikeSide','./assets/spikeSide.png');
        this.load.image('portalFlap', './assets/portalFlap.png');
        this.load.image('portalGravity', './assets/portalGravity.png');
        this.load.image('portal', './assets/portal.png');
        this.load.image('brick', './assets/brick.png');
        this.load.audio('explode', './assets/sounds/hit.ogg');
        this.load.audio('music', './assets/sounds/music-level3.mp3');
        this.load.audio('portalSound', './assets/sounds/portal.wav')
    }

    create(){
        this.box = this.physics.add.sprite(1000 * (3/8), 300, 'box');
        this.createLimits();
        this.createBoxPhysics();
        this.createSpikes();
        this.createBricks();
        this.createPortals();
        this.input.on('pointerdown', this.onAction , this);
        this.explodeSound = this.sound.add('explode');
        this.portalSound = this.sound.add('portalSound');
        this.musicSound = this.sound.add('music');
        this.musicSound.play();

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
        if(!this.musicSound){
            this.musicSound.play();
            this.musicSound.pause();
            this.musicSound.destroy();
        }
        this.musicSound.pause();
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
            targets:this.box,
            angle:0,
            duration:100,
            ease:'Linear'
        })
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
        this.portalSound.play();
    }

    onTouchBrick(){
        if(this.box.body.touching.right){
            this.gameOver();
        }else if(this.box.body.touching.up || this.box.body.touching.down) {
            this.resetJumpCount();            
        }
    }

    createSpikes(){
        this.spikes = this.physics.add.group();
        api.fetchObstacles(1, 'BOTTOM')
        .then( response => {
            for(let spike of response){
                let positionX = 0;
                for(let i = 0; i < spike.quantity; i++){
                    let spikeAux = this.spikes.create((spike.seconds * 700) + positionX, spike.y_value, 'spikeBottom').setOrigin(0,1);
                    positionX = positionX + spikeAux.width;
                }
            }
            this.spikes.setVelocityX(-700);
            this.physics.add.collider(this.box, this.spikes, this.gameOver, null, this);
        }).catch(err => {
            console.log("error");
        });
    }

    createBricks(){
        this.briks = this.physics.add.group();
        api.fetchBricks(1).then(response => {
            for(let brick of response){
                let positionX = 0;
                for(let i = 0; i < brick.quantity;i++){
                    let brickAux = this.briks.create((brick.seconds*700)+ positionX, brick.y_value, 'brick').setOrigin(0,1).setImmovable(true);;
                    positionX += brickAux.width;
                }
            }
            this.briks.setVelocityX(-700);
            this.physics.add.collider(this.box, this.briks, this.onTouchBrick, null, this);
        });
    }

    createPortals(){
        this.createNormalPortals();
        this.createGravityPortals();
        this.createFlapPortals();
    }

    createNormalPortals(){
        this.nPortals = this.physics.add.group();
        api.fetchPortals(1,"normal").then(response =>{
            for(let portal of response){
                this.nPortals.create(portal.seconds * 700, 465, 'portal').setOrigin(0,1);
            }
            this.nPortals.setVelocityX(-700);
            this.physics.add.overlap(this.box, this.nPortals, this.onChangeToNormalGravity, null, this);
        });
    }
    createGravityPortals(){
        this.gPortals = this.physics.add.group();
        api.fetchPortals(1,"gravity").then(response =>{
            for(let portal of response){
                this.gPortals.create(portal.seconds * 700, 465, 'portalGravity').setOrigin(0,1);
            }
            this.gPortals.setVelocityX(-700);
            this.physics.add.overlap(this.box, this.gPortals, this.onChangeToGravityInverted, null, this);
    
        });
    }
    createFlapPortals(){
        this.fPortals = this.physics.add.group();
        api.fetchPortals(1,"flap").then(response =>{
            for(let portal of response){
                this.fPortals.create(portal.seconds * 700, 465, 'portalFlap').setOrigin(0,1);
            }
            this.fPortals.setVelocityX(-700);
            this.physics.add.overlap(this.box, this.fPortals, this.onChangeToFlap, null, this);
        });
    }

    createLimits(){
        this.groundTop = this.physics.add.sprite(0,0, 'groundTop')
            .setImmovable(true).setOrigin(0, 0);
        this.groundBottom = this.physics.add.sprite(0,600, 'groundBottom')
            .setImmovable(true).setOrigin(0, 1);
    }
    createBoxPhysics(){
        this.box.body.gravity.y = 3500;
        this.physics.add.collider(this.box, this.groundBottom, this.resetJumpCount, null, this);
        this.physics.add.collider(this.box, this.groundTop, this.resetJumpCount, null, this);
    }
    
}

const config = {
    type: Phaser.AUTO,
    parent: 'myGame',
    width: 1000,
    height: 600,
    backgroundColor: "#065C8E",
    render:{
        pixelArt:true
    },
    physics:{
        default:"arcade",
        arcade:{
        }
    },
    scene: MainScene
};

new Phaser.Game(config);