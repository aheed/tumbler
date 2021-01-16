import { EmptyReceiver, TumblerPart } from "./TumblerPart";
import { TumblerBallColor, TumblerEvent, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerInterceptor extends TumblerPart {

    constructor() {
        super(TumblerPartType.Interceptor, new EmptyReceiver(), new EmptyReceiver());

        this.leftEntrance = this.rightEntrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                await this.reportEvent(TumblerEvent.Interception);
                return color === TumblerBallColor.Blue ? TumblerResult.BlueBallIntercepted : TumblerResult.RedBallIntercepted;
            }
        }
    }
}