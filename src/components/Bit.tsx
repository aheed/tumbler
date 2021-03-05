import { useEffect, useRef, useState } from "react";
import { TumblerBit } from "../logic/TumblerBit";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { ITumblerPartObserver, TumblerBallColor } from "../logic/TumblerTypes";
import './Bit.css';

interface BitProps {
    bit: TumblerBit,
    delayTime: number
}

export const Bit : React.FC<BitProps> = ({bit, delayTime}) => {

    const [observer] = useState<ITumblerPartObserver>({reportEvent: async () => {}});

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
            console.log(`bit event: ${TumblerEventType[evt.eventType]}`);

            ballRef.current?.classList.add(evt.ballColor === TumblerBallColor.Blue ? 'ball-blue' : 'ball-red');
            let transitClass = evt.enterLeft === evt.exitLeft ? 'transit-down' : 'transit-across';
            ballRef.current?.classList.add(transitClass);
            if (!evt.enterLeft) {
                ballRef.current?.classList.add('reverse');
            }
            
            updateBitState();

            const delayDiff = 50;
            const delay = delayTime <= delayDiff ? 0 : delayTime - delayDiff;
            await new Promise(r => setTimeout(r, delay));

            ballRef.current?.classList.remove('in-transit');
            ballRef.current?.classList.remove('transit-down');
            ballRef.current?.classList.remove('transit-across');
            ballRef.current?.classList.remove('reverse');
            ballRef.current?.classList.remove('ball-blue');
            ballRef.current?.classList.remove('ball-red');
            
            return;
        }

        updateBitState();
        
        observer.reportEvent = onObserveEvent;
    }, [bit, delayTime, observer]);

    useEffect(() => {
        bit.addObserver(observer);
    }, [bit, observer])

    let imgRef = useRef<HTMLImageElement>(null);
    let ballRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`bit-outer`}>
            <div className='ball-outer' ref={ballRef}>
                <svg className='ball' height="80" width="80">
                    <circle className='ball-circle' cx="15" cy="15" r="7" stroke="black" strokeWidth="1" fill="red" />
                </svg>
            </div>
            <img className={`bit`} src='./emptypart.png' alt='empty'></img>
            <img className={`bit`} src='./bit.png' alt='bit' ref={imgRef}></img>
        </div>
    );
}
