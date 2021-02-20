import { useEffect } from "react";
import { TumblerCrossover } from "../logic/TumblerCrossover";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";

interface CrossoverProps {
    crossover: TumblerCrossover,
}

export const Crossover : React.FC<CrossoverProps> = ({crossover}) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`crossover event: ${TumblerEventType[evt.eventType]}`);

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
