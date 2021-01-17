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

            if (ballRef.current) {
                ballRef.current.classList.add('in-transit');
            }

            await new Promise(r => setTimeout(r, 500));

            if (imgRef.current) {
                imgRef.current.classList.remove('part-tilt');
            }

            if (ballRef.current) {
                ballRef.current.classList.remove('in-transit');
            }

            return;
        }

        ramp.addObserver({reportEvent: onObserveEvent})
    }, [ramp]);

    let imgRef = useRef<HTMLImageElement>(null);
    let ballRef = useRef<SVGSVGElement>(null);

    return (
        <div className={`ramp-outer ${!ramp.facingLeft ? 'reverse' : ''}`}>
            <svg className='ball' height="100" width="100" ref={ballRef}>
                <circle cx="15" cy="15" r="7" stroke="black" strokeWidth="1" fill="red" />
            </svg>
            <img className={`ramp part`} src='./emptypart.png' alt='empty'></img>
            <img className={`ramp part`} src='./ramp.png' alt='ramp' ref={imgRef}></img>
        </div>
    );
}
