import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerPartType } from "./TumblerTypes";

export class TumblerGearPartBase extends TumblerPart {

    gearSet?: boolean;

    constructor(partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(partType, leftExit, rightExit);

        this.setGearPosition(facingLeft);
    }

    async setGearPosition(set: boolean) {
        if (set === this.gearSet) {
            return;
        }

        this.gearSet = set;

        this.n.setGearPosition(set);
        this.s.setGearPosition(set);
        this.e.setGearPosition(set);
        this.w.setGearPosition(set);
    }
}

