import { Phase } from './phase.js'

export class Phase1 extends Phase {
    create(){
        let levelId = 1;
        this.createSpikes(levelId);
        this.createBricks(levelId);
        this.createPortals(levelId);
        this.createMusicLevel(levelId);
    }

}