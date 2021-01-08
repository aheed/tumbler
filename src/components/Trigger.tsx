import React, { useEffect, useState } from 'react';
import { IBallReceiver, TumblerBallColor } from '../logic/TumblerTypes';


interface TriggerProps {
    receiver: IBallReceiver
}

export const Trigger : React.FC<TriggerProps> = ({receiver}) => {

    const onTrig = () => {
        receiver.putBall(TumblerBallColor.Blue);
    }

    return (
        <button onClick={onTrig}>Release</button>
    );
}