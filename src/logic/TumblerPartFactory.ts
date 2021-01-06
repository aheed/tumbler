import { EmptyTumblerPart, TumblerCrossover, TumblerPart, TumblerRamp } from "./TumblerPart";
import { IBallReceiver, TumblerPartType } from "./TumblerTypes";


export class TumblerPartFactory {
    static createPart  = (partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft?: boolean): TumblerPart => {
        switch(partType) {
            case TumblerPartType.Ramp:
                return new TumblerRamp(leftExit, rightExit, facingLeft ?? true);
            case TumblerPartType.Crossover:
                return new TumblerCrossover(leftExit, rightExit);
            case TumblerPartType.Bit:
            case TumblerPartType.GearBit:
            case TumblerPartType.Gear:
            case TumblerPartType.Interceptor:
                throw new Error("Not implemented");
            case TumblerPartType.NoPart:
            case TumblerPartType.EmptyPartPeg:
            case TumblerPartType.EmptyGearPeg:
            default:
                return new EmptyTumblerPart(partType, leftExit, rightExit);
        }
    }
}