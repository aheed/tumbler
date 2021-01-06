export enum TumblerBallColor {
    Blue = 0,
    Red
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
    None
}

export interface IBallReceiver {
    putBall: (color : TumblerBallColor) => Promise<TumblerResult>
}


export interface ITumblerPartObserver {
    reportEvent: (evt: TumblerEvent) => Promise<void>
}
