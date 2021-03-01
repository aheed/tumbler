import { useEffect, useRef } from "react";
import { TumblerCrossover } from "../logic/TumblerCrossover";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerBallColor } from "../logic/TumblerTypes";
import './Crossover.css';

interface CrossoverProps {
    crossover: TumblerCrossover,
}

export const Crossover : React.FC<CrossoverProps> = ({crossover}) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`crossover event: ${TumblerEventType[evt.eventType]}`);

            ballRef.current?.classList.add(evt.ballColor === TumblerBallColor.Blue ? 'ball-blue' : 'ball-red');
            ballRef.current?.classList.add('transit-across');
            if (!evt.enterLeft) {
                ballRef.current?.classList.add('reverse');
            }

            await new Promise(r => setTimeout(r, 350));

            ballRef.current?.classList.remove('transit-across');
            ballRef.current?.classList.remove('reverse');
            ballRef.current?.classList.remove('ball-blue');
            ballRef.current?.classList.remove('ball-red');
            
            return;
        }

        crossover.addObserver({reportEvent: onObserveEvent})
    }, [crossover]);

    let ballRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`crossover-outer`}>
            <div className='ball-outer' ref={ballRef}>
                <svg className='ball' height="100" width="100">
                    <circle className='ball-circle' cx="15" cy="15" r="7" stroke="black" strokeWidth="1" fill="red" />
                </svg>
            </div>
            <img className={`crossover`} src='./crossover.png' alt='crossover'></img>
        </div>
    );
}
