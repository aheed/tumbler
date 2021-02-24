import React, { useEffect, useState } from 'react';
import { BallDispenser } from '../logic/BallDispenser';
import { TumblerEvent, TumblerEventType } from '../logic/TumblerEvent';


interface DispenserProps {
    dispenser: BallDispenser
    addButtonText: string
}

export const Dispenser : React.FC<DispenserProps> = ({dispenser, addButtonText}) => {

    const [nofBalls, setNofBalls] = useState(dispenser.getBalls());

    const onClick = () => {
        dispenser.addBalls(1);
    }    

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`dispenser event: ${TumblerEventType[evt.eventType]}`);
            console.log(`balls: ${dispenser.getBalls()}`);
            setNofBalls(dispenser.getBalls());

            if (evt.eventType === TumblerEventType.BallDispensed) {
                await new Promise(r => setTimeout(r, 100));
            }
            else if (evt.eventType === TumblerEventType.BallAddedToDispenser) {
            }            
            
            return;
        }

        setNofBalls(dispenser.getBalls());
        dispenser.addObserver({reportEvent: onObserveEvent})
    }, [dispenser]);

    return (
        <>
        <div className='dispenser'>
            <button onClick={onClick}>{addButtonText}</button>
            <div>{nofBalls}</div>
        </div>
        </>
    );
}
