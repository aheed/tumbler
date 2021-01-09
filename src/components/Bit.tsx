import { useEffect, useRef } from "react";
import { TumblerBit } from "../logic/TumblerBit";
import { TumblerEvent } from "../logic/TumblerTypes";
import './Bit.css';

interface BitProps {
    bit: TumblerBit,
}

export const Bit : React.FC<BitProps> = ({bit}) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`bit event: ${TumblerEvent[evt]}`);
            
            if (imgRef.current) {
                if (evt == TumblerEvent.BitSet) {
                    imgRef.current.classList.add('bit-tilt');
                }
                else {
                    imgRef.current.classList.remove('bit-tilt');
                }
            }

            await new Promise(r => setTimeout(r, 500));
            
            return;
        }

        bit.addObserver({reportEvent: onObserveEvent})
    }, [bit]);

    let imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className={`bit-outer`}>
            <img className={`bit`} src='./bit.png' alt='bit' ref={imgRef}></img>
        </div>
    );
}
