import { useEffect, useRef } from "react";
import { TumblerGear } from "../logic/TumblerGear";
import { TumblerEvent } from "../logic/TumblerTypes";
import './Gear.css';

interface GearProps {
    gear: TumblerGear,
}

export const Gear : React.FC<GearProps> = ({gear}) => {

    useEffect(() => {

        const updateBitState = () => {
            if (imgRef.current) {
                if (gear.gearSet) {
                    imgRef.current.classList.add('gear-tilt');
                }
                else {
                    imgRef.current.classList.remove('gear-tilt');
                }
            }
        }

        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`gear event: ${TumblerEvent[evt]}`);
            
            updateBitState();

            await new Promise(r => setTimeout(r, 500));

            return;
        }

        updateBitState();
        gear.addObserver({reportEvent: onObserveEvent});
    }, [gear]);

    let imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className={`gear-outer`}>
            <img className={`gear part`} src='./gear.png' alt='gear' ref={imgRef}></img>
        </div>
    );
}
