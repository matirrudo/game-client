import { Phase1 } from './phase1.js'
import { Phase2 } from './phase2.js';
import { Phase3 } from './phase3.js';

export class PhaseConstructor {
    constructor(scene){
        this.relatedScene = scene;
        this.phases = [
            Phase3,
            Phase2,
            Phase1
        ];
    }

    create(){
        let CurrentPhaseClass = this.phases.pop();
        this.currentPhase = new CurrentPhaseClass(this.relatedScene);
        return this.currentPhase.create();
    }
}