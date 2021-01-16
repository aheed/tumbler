import { useEffect, useRef } from "react";
import { TumblerBit } from "../logic/TumblerBit";
import { TumblerEvent } from "../logic/TumblerTypes";
import './Bit.css';

interface BitProps {
    bit: TumblerBit,
}

export const Bit : React.FC<BitProps> = ({bit}) => {

    useEffect(() => {
        const updateBitState = () => {
            if (imgRef.current) {
                if (bit.set) {
                    imgRef.current.classList.add('bit-tilt');
                }
                else {
                    imgRef.current.classList.remove('bit-tilt');
                }
            }
        }

        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`bit event: ${TumblerEvent[evt]}`);
            
            updateBitState();

            await new Promise(r => setTimeout(r, 500));
            
            return;
        }

        updateBitState();
        bit.addObserver({reportEvent: onObserveEvent})
    }, [bit]);

    let imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className={`bit-outer`}>
            <img className={`bit`} src='./emptypart.png' alt='empty'></img>
            <img className={`bit`} src='./bit.png' alt='bit' ref={imgRef}></img>
        </div>
    );
}
