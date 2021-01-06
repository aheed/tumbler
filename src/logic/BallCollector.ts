import { IBallReleaser } from "./BallDispenser";
import { IBallReceiver, TumblerBallColor, TumblerResult } from "./TumblerTypes";


export class BallCollector implements IBallReceiver {
    ballReleaser?: IBallReleaser;

    constructor(ballReleaser?: IBallReleaser) {
        this.ballReleaser = ballReleaser;
    }

    setReleaseer = (ballReleaser: IBallReleaser) => {
        this.ballReleaser = ballReleaser;
    }

    putBall = async (_ : TumblerBallColor) : Promise<TumblerResult> => {
        return this.release();
    }

    pressStartButton = async () : Promise<TumblerResult> => {
        return this.release();
    }

    private release = async () : Promise<TumblerResult> => {
        if (!this.ballReleaser) {
            return TumblerResult.Error;
        }
        return await this.ballReleaser.release();
    }
}