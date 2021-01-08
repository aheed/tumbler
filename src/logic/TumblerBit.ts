import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerBallColor, TumblerEvent, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerBit extends TumblerPart {
    set: boolean;

    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(TumblerPartType.Bit, leftExit, rightExit);
        this.set = facingLeft;

        this.leftEntrance = this.rightEntrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                let evt = this.set ? TumblerEvent.BitReset : TumblerEvent.BitSet;
                await this.reportEvent(evt);
                let currentExit = this.set ? this.leftExit : this.rightExit;
                this.set = !this.set;
                return currentExit.putBall(color);
            }
        }
    }
}
