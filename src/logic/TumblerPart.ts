import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerEvent, TumblerPartType, TumblerResult } from "./TumblerTypes";


export abstract class TumblerPart {
    public leftEntrance: IBallReceiver;
    public rightEntrance: IBallReceiver;
    public leftExit: IBallReceiver;
    public rightExit: IBallReceiver;
    private observers: ITumblerPartObserver[] = [];
    public partType: TumblerPartType;
    
    constructor(partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver) {
        this.partType = partType;
        this.leftExit = leftExit;
        this.rightExit = rightExit;
        this.leftEntrance = this.rightEntrance = {putBall: async (c) => TumblerResult.Error};
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

export class EmptyTumblerPart extends TumblerPart {
    constructor(partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver) {
        super(partType, leftExit, rightExit);
    }
}

export class TumblerRamp extends TumblerPart {
    private facingLeft: boolean;

    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
        super(TumblerPartType.Ramp, leftExit, rightExit);
        this.facingLeft = facingLeft;

        this.leftEntrance = this.rightEntrance = {
            putBall: async (color : TumblerBallColor): Promise<TumblerResult> => {
                let evt = this.facingLeft ? TumblerEvent.RampLeft : TumblerEvent.RampRight;
                await this.reportEvent(evt);
                let currentExit = this.facingLeft ? this.leftExit : this.rightExit;
                return currentExit.putBall(color);
            }
        }
    }
}

export class TumblerCrossover extends TumblerPart {
    constructor(leftExit: IBallReceiver, rightExit: IBallReceiver) {
        super(TumblerPartType.Crossover, leftExit, rightExit);

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
