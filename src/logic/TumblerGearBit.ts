import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { TumblerGearPartBase } from "./TumblerGearPartBase";
import { IBallReceiver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerGearBit extends TumblerGearPartBase {

    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(TumblerPartType.GearBit, leftExit, rightExit, facingLeft);

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
        super.setGearPosition(set);

        let evtType = set ? TumblerEventType.Set : TumblerEventType.Reset;
        return this.reportEvent(new TumblerEvent(evtType, TumblerPartType.GearBit));
    }
}

