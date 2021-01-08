import React, { useEffect, useState } from 'react';
import { BallDispenser, IBallReleaser } from '../logic/BallDispenser';


interface DispenserProps {
    dispenser: BallDispenser
}

export const Dispenser : React.FC<DispenserProps> = ({dispenser}) => {

    const onClick = () => {
        dispenser.addBalls(1);
    }

    return (
        <button onClick={onClick}>Add ball</button>
    );
}
