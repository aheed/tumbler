import React, { useEffect, useRef } from 'react';
import { TumblerEvent, TumblerEventType } from '../logic/TumblerEvent';
import { TumblerPart } from '../logic/TumblerPart';
import './EmptyPart.css'

interface EmptyPartProps {
    part: TumblerPart
}

export const EmptyPartInteractor : React.FC<EmptyPartProps> = ({part}: EmptyPartProps) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`empty part event: ${TumblerEventType[evt.eventType]}`);

            imgRef.current?.classList.add('animation');
            await new Promise(r => setTimeout(r, 250));
            imgRef.current?.classList.remove('animation');
        }

        part.addObserver({reportEvent: onObserveEvent})
    }, [part]);

    let imgRef = useRef<HTMLImageElement>(null);

    return (
        <>
        <img className={`empty-part-anim`} src='./explosion.png' alt='kaboom' ref={imgRef}></img>
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
        </>
    );
}
