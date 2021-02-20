import { useEffect } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerInterceptor } from "../logic/TumblerInterceptor";

interface InterceptorProps {
    interceptor: TumblerInterceptor,
}

export const Interceptor : React.FC<InterceptorProps> = ({interceptor}) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`interceptor event: ${TumblerEventType[evt.eventType]}`);

            await new Promise(r => setTimeout(r, 100));
            
            return;
        }

        interceptor.addObserver({reportEvent: onObserveEvent})
    }, [interceptor]);

    return (
        <div className={`interceptor-outer`}>
            <img className={`interceptor`} src='./interceptor.png' alt='interceptor'></img>
        </div>
    );
}
