import { IBallReleaser } from "./BallDispenser";
import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { ITumblerObservable, TumblerObservable } from "./TumblerObservable";
import { IBallReceiver, IReleaseButton, ITumblerPartObserver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";


export class BallCollector implements IBallReceiver, ITumblerObservable, IReleaseButton {
    ballReleaser: IBallReleaser;
    ballSinkReceiver: IBallReceiver;
    private observableImplementation: TumblerObservable;
    

    constructor(ballReleaser: IBallReleaser, ballSinkReceiver: IBallReceiver) {
        this.ballReleaser = ballReleaser;
        this.ballSinkReceiver = ballSinkReceiver;
        this.observableImplementation = new TumblerObservable();
    }

    public addObserver = (obs: ITumblerPartObserver) => this.observableImplementation.addObserver(obs);

    setReleaseer = (ballReleaser: IBallReleaser) => {
        this.ballReleaser = ballReleaser;
    }

    putBall = async (color : TumblerBallColor) : Promise<TumblerResult> => {
        await this.ballSinkReceiver.putBall(color);
        return this.release();
    }

    buttonPressed = async () : Promise<TumblerResult> => {
        await this.observableImplementation.reportEvent(new TumblerEvent(TumblerEventType.BallReleased, TumblerPartType.Collector));
        return this.release();
    }

    private release = async () : Promise<TumblerResult> => {
        if (!this.ballReleaser) {
            return TumblerResult.Error;
        }        
        return await this.ballReleaser.release();
    }
}