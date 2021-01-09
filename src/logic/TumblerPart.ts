import { IGearInteractor, NullGearInteractor } from "./TumblerGearPart";
import { TumblerObservable } from "./TumblerObservable";
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerEvent, TumblerPartType, TumblerResult } from "./TumblerTypes";


export abstract class TumblerPart implements IGearInteractor {
    public leftEntrance: IBallReceiver;
    public rightEntrance: IBallReceiver;
    public leftExit: IBallReceiver;
    public rightExit: IBallReceiver;
    public partType: TumblerPartType;
    private observableImplementation: TumblerObservable;
    n: IGearInteractor;
    s: IGearInteractor;
    e: IGearInteractor;
    w: IGearInteractor;
    gearSet: boolean;
    
    constructor(partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver) {
        this.partType = partType;
        this.leftExit = leftExit;
        this.rightExit = rightExit;
        this.leftEntrance = this.rightEntrance = {putBall: async (c) => TumblerResult.Error};
        this.observableImplementation =  new TumblerObservable();
        this.n = this.s = this.w = this.e = new NullGearInteractor();
        this.gearSet = false;
    }

    public addObserver = (obs: ITumblerPartObserver) => this.observableImplementation.addObserver(obs);

    protected reportEvent = async (evt: TumblerEvent) => this.observableImplementation.reportEvent(evt);

    setGearPosition = (set: boolean) => {
        if (set === this.gearSet) {
            return;
        }

        this.gearSet = set;

        this.n.setGearPosition(set);
        this.s.setGearPosition(set);
        this.e.setGearPosition(set);
        this.w.setGearPosition(set);
    }
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
        this.leftEntrance = this.rightEntrance = {
            putBall: async (c) => c === TumblerBallColor.Blue ? TumblerResult.BlueBallDropped : TumblerResult.RedBallDropped
        };
    }
}

export class TumblerRamp extends TumblerPart {
    facingLeft: boolean;

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
