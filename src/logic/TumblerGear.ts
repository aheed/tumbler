import { TumblerGearPartBase } from "./TumblerGearPartBase";
import { IBallReceiver, TumblerEvent, TumblerPartType } from "./TumblerTypes";

export class TumblerGear extends TumblerGearPartBase {

    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(TumblerPartType.Gear, leftExit, rightExit, facingLeft);

        this.setGearPosition(facingLeft);
    }

    async setGearPosition(set: boolean) {
        super.setGearPosition(set);

        let evt = set ? TumblerEvent.GearbitSet : TumblerEvent.GearbitReset;
        return this.reportEvent(evt);
    }
}

