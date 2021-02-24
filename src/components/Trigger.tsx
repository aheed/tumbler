import React from 'react';
import { IBallReceiver, TumblerBallColor } from '../logic/TumblerTypes';


interface TriggerProps {
    receiver: IBallReceiver
    releaseButtonText: string
}

export const Trigger : React.FC<TriggerProps> = ({receiver, releaseButtonText}) => {

    const onTrig = () => {
        receiver.putBall(TumblerBallColor.Blue);
    }

    return (
        <button onClick={onTrig}>{releaseButtonText}</button>
    );
}