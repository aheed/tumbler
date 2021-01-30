import React, { useEffect, useState } from 'react';
import { BallDispenser } from '../logic/BallDispenser';
import { TumblerEvent } from '../logic/TumblerTypes';


interface DispenserProps {
    dispenser: BallDispenser
}

export const Dispenser : React.FC<DispenserProps> = ({dispenser}) => {

    const [nofBalls, setNofBalls] = useState(dispenser.getBalls());

    const onClick = () => {
        dispenser.addBalls(1);
    }    

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`dispenser event: ${TumblerEvent[evt]}`);
            console.log(`balls: ${dispenser.getBalls()}`);
            setNofBalls(dispenser.getBalls());

            if (evt === TumblerEvent.BallDispensed) {
                await new Promise(r => setTimeout(r, 100));
            }
            else if (evt === TumblerEvent.BallAddedToDispenser) {

            }            
            
            return;
        }

        setNofBalls(dispenser.getBalls());
        dispenser.addObserver({reportEvent: onObserveEvent})
    }, [dispenser]);

    return (
        <>
        <button onClick={onClick}>Add ball</button>
        <div>{nofBalls}</div>
        </>
    );
}
