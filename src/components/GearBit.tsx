import { useEffect, useRef } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerGearBit } from "../logic/TumblerGearBit";
import { TumblerBallColor } from "../logic/TumblerTypes";
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
            
            if ( (evt.eventType === TumblerEventType.Set) || (evt.eventType === TumblerEventType.Reset) ) {
                updateBitState();    
                await new Promise(r => setTimeout(r, 500));
            }
            else if (evt.eventType === TumblerEventType.BallAtPart) {

                ballRef.current?.classList.add(evt.ballColor === TumblerBallColor.Blue ? 'ball-blue' : 'ball-red');
                let transitClass = evt.enterLeft === evt.exitLeft ? 'transit-down' : 'transit-across';
                ballRef.current?.classList.add(transitClass);
                if (!evt.enterLeft) {
                    ballRef.current?.classList.add('reverse');
                }

                await new Promise(r => setTimeout(r, 350));

                ballRef.current?.classList.remove('in-transit');
                ballRef.current?.classList.remove('transit-down');
                ballRef.current?.classList.remove('transit-across');
                ballRef.current?.classList.remove('reverse');
                ballRef.current?.classList.remove('ball-blue');
                ballRef.current?.classList.remove('ball-red');
            }
        }

        updateBitState();

        bit.addObserver({reportEvent: onObserveEvent})
    }, [bit]);

    let imgRef = useRef<HTMLImageElement>(null);
    let ballRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`gearbit-outer`}>
            <div className='ball-outer' ref={ballRef}>
                <svg className='ball' height="80" width="80">
                    <circle className='ball-circle' cx="15" cy="15" r="7" stroke="black" strokeWidth="1" fill="red" />
                </svg>
            </div>
            <img className={`gearbit-background`} src='./emptypart.png' alt='empty'></img>
            <img className={`gearbit`} src='./gearbit.png' alt='gearbit' ref={imgRef}></img>
        </div>
    );
}
