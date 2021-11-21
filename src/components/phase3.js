import { Phase } from './phase.js'

export class Phase3 extends Phase {
    create(){
        let levelId = 3;
        this.createSpikes(levelId);
        this.createBricks(levelId);
        this.createPortals(levelId);
        this.createMusicLevel(levelId);
    }

}