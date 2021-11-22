export class Phase{
    constructor(scene){
        this.relatedScene = scene;
        //this.createBackground();
        this.createLimits();
        this.createBox();
    }

    createBackground(){
        this.relatedScene.add.image(0, 135, 'backgroundB').setOrigin(0,0).setScale(1.1,1.1);
    }

    createLimits(){
        this.relatedScene.groundTop = this.relatedScene.physics.add.sprite(0,0, 'groundTop')
            .setImmovable(true).setOrigin(0, 0);
        this.relatedScene.groundBottom = this.relatedScene.physics.add.sprite(0,600, 'groundBottom')
            .setImmovable(true).setOrigin(0, 1);
    }

    createBox(){
        this.relatedScene.box = this.relatedScene.physics.add.sprite(1000 * (3/8), 300, 'box');
        this.relatedScene.box.body.gravity.y = 3500;
        this.relatedScene.physics.add.collider(this.relatedScene.box, this.relatedScene.groundBottom, this.relatedScene.resetJumpCount, null, this.relatedScene);
        this.relatedScene.physics.add.collider(this.relatedScene.box, this.relatedScene.groundTop, this.relatedScene.resetJumpCount, null, this.relatedScene);
    }

    createBricks(levelId){
        this.relatedScene.briks = this.relatedScene.physics.add.group();
        api.fetchBricks(levelId).then(response => {
            for(let brick of response){
                let positionX = 0;
                for(let i = 0; i < brick.quantity;i++){
                    let brickAux = this.relatedScene.briks.create((brick.seconds*700)+ positionX, brick.y_value, 'brickW').setOrigin(0,1).setImmovable(true);;
                    positionX += brickAux.width;
                }
            }
            this.relatedScene.briks.setVelocityX(-700);
            this.relatedScene.physics.add.collider(this.relatedScene.box, this.relatedScene.briks, this.relatedScene.onTouchBrick, null, this.relatedScene);
        });
    }

    createMusicLevel(levelId){
        this.relatedScene.musicSound = this.relatedScene.sound.add(`music${levelId}`);
        this.relatedScene.musicSound.play();
    }

    createPortals(levelId){
        this.createNormalPortals(levelId);
        this.createGravityPortals(levelId);
        this.createFlapPortals(levelId);
        //this.createFinalPortals(levelId)
    }
    createSpikes(levelId){
        this.createBottomSpikes(levelId);
        this.createMiddleSpikes(levelId);
        this.createTopSpikes(levelId);
    }

    createBottomSpikes(levelId){
        this.relatedScene.spikes = this.relatedScene.physics.add.group();
        api.fetchObstacles(levelId, 'BOTTOM')
        .then( response => {
            for(let spike of response){
                let positionX = 0;
                for(let i = 0; i < spike.quantity; i++){
                    let spikeAux = this.relatedScene.spikes.create((spike.seconds * 700) + positionX, spike.y_value, 'spikeBottom').setOrigin(0,1);
                    positionX = positionX + spikeAux.width;
                }
            }
            this.relatedScene.spikes.setVelocityX(-700);
            this.relatedScene.physics.add.collider(this.relatedScene.box, this.relatedScene.spikes, this.relatedScene.gameOver, null, this.relatedScene);
        }).catch(err => {
            console.log("error");
        });
    }
    createTopSpikes(levelId){
        this.relatedScene.spikes = this.relatedScene.physics.add.group();
        api.fetchObstacles(levelId, 'TOP')
        .then( response => {
            for(let spike of response){
                let positionX = 0;
                for(let i = 0; i < spike.quantity; i++){
                    let spikeAux = this.relatedScene.spikes.create((spike.seconds * 700) + positionX, spike.y_value, 'spikeTop').setOrigin(0,0);
                    positionX = positionX + spikeAux.width;
                }
            }
            this.relatedScene.spikes.setVelocityX(-700);
            this.relatedScene.physics.add.collider(this.relatedScene.box, this.relatedScene.spikes, this.relatedScene.gameOver, null, this.relatedScene);
        }).catch(err => {
            console.log("error");
        });
    }
    createMiddleSpikes(levelId){
        this.relatedScene.spikes = this.relatedScene.physics.add.group();
        api.fetchObstacles(levelId, 'MIDDLE')
        .then( response => {
            for(let spike of response){
                let positionX = 0;
                for(let i = 0; i < spike.quantity; i++){
                    let spikeAux = this.relatedScene.spikes.create((spike.seconds * 700) + positionX, spike.y_value, 'spikeSide').setOrigin(0,0);
                    positionX = positionX + spikeAux.width;
                }
            }
            this.relatedScene.spikes.setVelocityX(-700);
            this.relatedScene.physics.add.collider(this.relatedScene.box, this.relatedScene.spikes, this.relatedScene.gameOver, null, this.relatedScene);
        }).catch(err => {
            console.log("error");
        });
    }

    createNormalPortals(levelId){
        this.relatedScene.nPortals = this.relatedScene.physics.add.group();
        api.fetchPortals(levelId,"normal").then(response =>{
            for(let portal of response){
                this.relatedScene.nPortals.create(portal.seconds * 700, 465, 'portalNormal').setOrigin(0,1);
            }
            this.relatedScene.nPortals.setVelocityX(-700);
            this.relatedScene.physics.add.overlap(this.relatedScene.box, this.relatedScene.nPortals, this.relatedScene.onChangeToNormalGravity, null, this.relatedScene);
        });
    }
    createGravityPortals(levelId){
        this.relatedScene.gPortals = this.relatedScene.physics.add.group();
        api.fetchPortals(levelId,"gravity").then(response =>{
            for(let portal of response){
                this.relatedScene.gPortals.create(portal.seconds * 700, 465, 'portalGravity').setOrigin(0,1);
            }
            this.relatedScene.gPortals.setVelocityX(-700);
            this.relatedScene.physics.add.overlap(this.relatedScene.box, this.relatedScene.gPortals, this.relatedScene.onChangeToGravityInverted, null, this.relatedScene);
    
        });
    }
    createFlapPortals(levelId){
        this.relatedScene.fPortals = this.relatedScene.physics.add.group();
        api.fetchPortals(levelId,"flap").then(response =>{
            for(let portal of response){
                this.relatedScene.fPortals.create(portal.seconds * 700, 465, 'portalFlap').setOrigin(0,1);
            }
            this.relatedScene.fPortals.setVelocityX(-700);
            this.relatedScene.physics.add.overlap(this.relatedScene.box, this.relatedScene.fPortals, this.relatedScene.onChangeToFlap, null, this.relatedScene);
        });
    }

    createFinalPortals(levelId){
        this.relatedScene.finalPortals = this.relatedScene.physics.add.group();
        api.fetchPortals(levelId,"final").then(response =>{
            for(let portal of response){
                this.relatedScene.finalPortals.create(portal.seconds * 700, 465, 'portalFinal').setOrigin(0,1);
            }
            this.relatedScene.finalPortals.setVelocityX(-700);
            this.relatedScene.physics.add.collider(this.relatedScene.box, this.relatedScene.finalPortals, this.relatedScene.endLevel, null, this.relatedScene);
        });
    }

    endGame(parameter){

    }

}