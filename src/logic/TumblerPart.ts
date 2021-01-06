import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerEvent, TumblerResult } from "./TumblerTypes";


export abstract class TumblerPart {
    protected leftExit: IBallReceiver;
    protected rightExit: IBallReceiver;
    private observers: ITumblerPartObserver[] = [];
    
    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver) {
        this.leftExit = leftExit;
        this.rightExit = rightExit;    
    }

    public addObserver = (obs: ITumblerPartObserver) => this.observers.push(obs);
    
    protected reportEvent = async (evt: TumblerEvent) => this.observers.forEach(async (obs) => await obs.reportEvent(evt));
}

export class EmptyReceiver implements IBallReceiver {
    putBall = async (color : TumblerBallColor): Promise<TumblerResult> => {
        return color === TumblerBallColor.Blue ? 
            TumblerResult.BlueBallDropped : 
            TumblerResult.RedBallDropped;
    }
}

export abstract class SingleInputTumblerPart extends TumblerPart {

    public entrance: IBallReceiver;
    
    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver) {
        super(leftExit, rightExit);
        this.entrance = new EmptyReceiver();
    }

}

export abstract class DualInputTumblerPart extends TumblerPart {

    public leftEntrance: IBallReceiver;
    public rightEntrance: IBallReceiver;
    
    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver) {
        super(leftExit, rightExit);
        this.leftEntrance = this.rightEntrance = {putBall: async (c) => TumblerResult.Error};
    }
}

export class EmptyTumblerPart extends SingleInputTumblerPart {
    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver) {
        super(leftExit, rightExit);
    }
}

export class TumblerRamp extends SingleInputTumblerPart {
    private facingLeft: boolean;

    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(leftExit, rightExit);
        this.facingLeft = facingLeft;

        this.entrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                let evt = this.facingLeft ? TumblerEvent.RampLeft : TumblerEvent.RampRight;
                await this.reportEvent(evt);
                let currentExit = this.facingLeft ? this.leftExit : this.rightExit;
                return currentExit.putBall(color);
            }
        }
    }
}

export class TumblerCrossover extends DualInputTumblerPart {
    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver) {
        super(leftExit, rightExit);

        this.leftEntrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                await this.reportEvent(TumblerEvent.CrossoverRight);
                return await this.rightExit.putBall(color);
            }
        };

        this.rightEntrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                await this.reportEvent(TumblerEvent.CrossoverLeft);
                return this.leftExit.putBall(color);
            }
        };
    }
}
