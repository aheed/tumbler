import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerEvent, TumblerPartType } from "./TumblerTypes";

export class TumblerGear extends TumblerPart {

    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(TumblerPartType.Gear, leftExit, rightExit);

        this.setGearPosition(facingLeft);
    }

    async setGearPosition(set: boolean) {
        if (set === this.gearSet) {
            return;
        }
        
        super.setGearPosition(set);

        let evt = set ? TumblerEvent.GearbitSet : TumblerEvent.GearbitReset;
        return this.reportEvent(evt);
    }
}

