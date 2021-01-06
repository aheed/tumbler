import { IBallReceiver, TumblerBallColor, TumblerResult } from "./TumblerTypes";

export interface IBallReleaser {
    release: () => Promise<TumblerResult>;
}

export class BallDispenser implements IBallReleaser {
    color: TumblerBallColor;
    balls: number;
    exit: IBallReceiver;

    constructor(color: TumblerBallColor, exit: IBallReceiver) {
        this.color = color;
        this.balls = 0;
        this.exit = exit;
    }

    addBalls = (balls: number) => this.balls += balls;

    release = async (): Promise<TumblerResult> => {
        if (this.balls < 1) {
            return this.color === TumblerBallColor.Blue ?
                TumblerResult.BlueDispenserEmpty :
                TumblerResult.RedDispenserEmpty;
        }
        
        --this.balls;
        return await this.exit.putBall(this.color);
    }
}

