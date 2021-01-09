export enum TumblerBallColor {
    Blue = 0,
    Red
}

export enum TumblerPartType {
    NoPart = 0,
    EmptyPartPeg,
    EmptyGearPeg,
    Ramp,
    Crossover,
    Bit,
    GearBit,
    Gear,
    Interceptor
}

export enum TumblerResult {
    BlueBallIntercepted = 0,
    RedBallIntercepted,
    BlueDispenserEmpty,
    RedDispenserEmpty,
    BlueBallDropped,
    RedBallDropped,
    Error
}

export enum TumblerEvent {    
    RampLeft = 0,
    RampRight,
    CrossoverLeft,
    CrossoverRight,
    BitSet,
    BitReset,
    GearbitSet,
    GearbitSetByBall,
    GearbitReset,
    GearbitResetByBall,
    GearCW,
    GearCCW,
    Interception,
    DispenserEmpty,
    BallDispensed,
    BallAddedToDispenser,
    BallCollected,
    BallDropped,
    None
}

export interface IBallReceiver {
    putBall: (color : TumblerBallColor) => Promise<TumblerResult>
}


export interface ITumblerPartObserver {
    reportEvent: (evt: TumblerEvent) => Promise<void>
}
