import { Phase } from './phase.js'

export class Phase2 extends Phase {
    create(){
        let levelId = 2;
        this.createSpikes(levelId);
        this.createBricks(levelId);
        this.createPortals(levelId);
        this.createMusicLevel(levelId);
    }

}