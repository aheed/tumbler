import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { ITumblerObservable, TumblerObservable } from "./TumblerObservable";
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export interface IBallSink {
    getBalls: () => TumblerBallColor[];
}

export class BallSink implements IBallReceiver, ITumblerObservable, IBallSink {
    
    private observableImplementation: TumblerObservable;
    private balls: TumblerBallColor[];

    constructor() {
        this.observableImplementation = new TumblerObservable();
        this.balls = [];
    }

    public addObserver = (obs: ITumblerPartObserver) => this.observableImplementation.addObserver(obs);

    putBall = async (color : TumblerBallColor) : Promise<TumblerResult> => {
        this.balls.push(color);
        await this.observableImplementation.reportEvent(new TumblerEvent(TumblerEventType.BallSinkUpdated, TumblerPartType.NoPart, color));
        return TumblerResult.NoResult;
    }

    getBalls = (): TumblerBallColor[] => this.balls;
}