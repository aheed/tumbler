import React, { useEffect } from 'react';
import { TumblerEvent, TumblerEventType } from '../logic/TumblerEvent';
import { TumblerPart } from '../logic/TumblerPart';

interface EmptyPartProps {
    part: TumblerPart
}

export const EmptyPartInteractor : React.FC<EmptyPartProps> = ({part}: EmptyPartProps) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`empty part event: ${TumblerEventType[evt.eventType]}`);
        }

        part.addObserver({reportEvent: onObserveEvent})
    }, [part]);

    return (
        <>
        </>
    );
}

export const NoPart : React.FC = () => {
    return (
        <img src='./nopart.png' alt='nopart'></img>
    );
}

export const EmptyPart : React.FC<EmptyPartProps> = ({part}: EmptyPartProps) => {
    return (
        <>
        <img src='./emptypart.png' alt='empty'></img>
        <EmptyPartInteractor part={part}></EmptyPartInteractor>
        </>
    );
}

export const EmptyGearPart : React.FC<EmptyPartProps> = ({part}: EmptyPartProps) => {
    return (
        <>
        <img src='./emptygearpart.png' alt='empty'></img>
        <EmptyPartInteractor part={part}></EmptyPartInteractor>
        </>
    );
}
