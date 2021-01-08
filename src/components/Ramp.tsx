import { useEffect } from "react";
import { TumblerRamp } from "../logic/TumblerPart";
import { TumblerEvent } from "../logic/TumblerTypes";

interface RampProps {
    ramp: TumblerRamp,
}

export const Ramp : React.FC<RampProps> = ({ramp}) => {

    const onObserveEvent = async (evt: TumblerEvent) => {
        console.log(`ramp event: ${TumblerEvent[evt]}`);
    }

    useEffect(() => {
        ramp.addObserver({reportEvent: onObserveEvent})
    }, [ramp]);

    return (
        <img src='./ramp.png' alt='ramp'></img>
    );
}
