import { useEffect, useState } from "react";
import { IBallSink } from "../logic/BallSink";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerBallColor } from "../logic/TumblerTypes";


interface SinkProps {
    observableSink: IBallSink,
}

export const Sink : React.FC<SinkProps> = ({observableSink}) => {

    const [balls, setBalls] = useState<TumblerBallColor[]>([]);

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`sink event: ${TumblerEventType[evt.eventType]}`);
            setBalls(observableSink.getBalls());
            return;
        }

        observableSink.addObserver({reportEvent: onObserveEvent})
    }, [observableSink]);

    const renderBalls = () => {
        return balls.map((color, index) => 
        <svg key={index} className='ball' height="16" width="16">
            <circle className='ball-circle' cx="8" cy="8" r="7" stroke="black" strokeWidth="1" fill={color === TumblerBallColor.Blue ? "blue" : "red"} />
        </svg>);
    }

    return (
        <div className='sink-outer'>
            {renderBalls()}
        </div>
    );
}


