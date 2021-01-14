import { useEffect, useRef } from "react";
import { TumblerRamp } from "../logic/TumblerPart";
import { TumblerEvent } from "../logic/TumblerTypes";
import './Ramp.css';

interface RampProps {
    ramp: TumblerRamp,
}

export const Ramp : React.FC<RampProps> = ({ramp}) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`ramp event: ${TumblerEvent[evt]}`);
            
            if (imgRef.current) {
                imgRef.current.classList.add('part-tilt');
            }

            await new Promise(r => setTimeout(r, 500));

            if (imgRef.current) {
                imgRef.current.classList.remove('part-tilt');
            }
            return;
        }

        ramp.addObserver({reportEvent: onObserveEvent})
    }, [ramp]);

    let imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className={`ramp-outer ${!ramp.facingLeft ? 'reverse' : ''}`}>
            <img className={`ramp part`} src='./emptypart.png' alt='ramp' ref={imgRef}></img>
            <img className={`ramp part`} src='./ramp.png' alt='ramp' ref={imgRef}></img>
        </div>
    );
}
