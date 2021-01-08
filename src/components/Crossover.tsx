import { useEffect, useRef } from "react";
import { TumblerCrossover } from "../logic/TumblerPart";
import { TumblerEvent } from "../logic/TumblerTypes";

interface CrossoverProps {
    crossover: TumblerCrossover,
}

export const Crossover : React.FC<CrossoverProps> = ({crossover}) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`crossover event: ${TumblerEvent[evt]}`);

            await new Promise(r => setTimeout(r, 400));
            
            return;
        }

        crossover.addObserver({reportEvent: onObserveEvent})
    }, [crossover]);

    return (
        <div className={`crossover-outer`}>
            <img className={`crossover`} src='./crossover.png' alt='crossover'></img>
        </div>
    );
}
