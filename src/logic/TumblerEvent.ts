import { TumblerPartType } from "./TumblerTypes";

export enum TumblerEventType {    
    BallAtPart,
    Set,
    Reset,
    DispenserEmpty,
    BallDispensed,
    BallAddedToDispenser,
    BallCollected,
    BallDropped,
    None
}

export class TumblerEvent {
    eventType: TumblerEventType;
    partType?: TumblerPartType;
    enterLeft?: boolean;
    exitLeft?: boolean;

    constructor(eventType: TumblerEventType, partType: TumblerPartType, enterLeft?: boolean, exitLeft?: boolean) {
        this.eventType = eventType;
        this.partType = partType;
        this.enterLeft = enterLeft;
        this.exitLeft = exitLeft;
    }
}
