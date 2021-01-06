import { EmptyReceiver, TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerBallColor, TumblerEvent, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerInterceptor extends TumblerPart {

    constructor() {
        super(TumblerPartType.Ramp, new EmptyReceiver(), new EmptyReceiver());

        this.leftEntrance = this.rightEntrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                await this.reportEvent(TumblerEvent.Interception);
                return color === TumblerBallColor.Blue ? TumblerResult.BlueBallIntercepted : TumblerResult.RedBallIntercepted;
            }
        }
    }
}