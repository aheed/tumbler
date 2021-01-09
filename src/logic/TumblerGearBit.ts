import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerBallColor, TumblerEvent, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerGearBit extends TumblerPart {

    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(TumblerPartType.GearBit, leftExit, rightExit);

        this.leftEntrance = this.rightEntrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                
                let currentExit = this.gearSet ? this.leftExit : this.rightExit;
                await this.setGearPosition(!this.gearSet);
                return currentExit.putBall(color);
            }
        }

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
