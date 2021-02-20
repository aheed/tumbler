import { useEffect, useRef } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerGearBit } from "../logic/TumblerGearBit";
import './GearBit.css';

interface GearBitProps {
    bit: TumblerGearBit,
}

export const GearBit : React.FC<GearBitProps> = ({bit}) => {

    useEffect(() => {
        const updateBitState = () => {
            if (imgRef.current) {
                if (bit.gearSet) {
                    imgRef.current.classList.add('gearbit-tilt');
                }
                else {
                    imgRef.current.classList.remove('gearbit-tilt');
                }
            }
        }

        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`gearbit event: ${TumblerEventType[evt.eventType]}`);
            
            updateBitState();    

            await new Promise(r => setTimeout(r, 500));
            
            return;
        }

        updateBitState();

        bit.addObserver({reportEvent: onObserveEvent})
    }, [bit]);

    let imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className={`gearbit-outer`}>
            <img className={`gearbit-background`} src='./emptypart.png' alt='empty'></img>
            <img className={`gearbit`} src='./gearbit.png' alt='gearbit' ref={imgRef}></img>
        </div>
    );
}
