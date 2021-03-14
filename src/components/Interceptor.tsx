import { useContext, useEffect, useState } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerInterceptor } from "../logic/TumblerInterceptor";
import { TumblerBallColor } from "../logic/TumblerTypes";
import { AppContext, AppStatus } from "../services/AppContext";
import "./Interceptor.css";

interface InterceptorProps {
  interceptor: TumblerInterceptor;
}

interface InterceptorInnerProps extends InterceptorProps {
  interceptor: TumblerInterceptor;
  showBall: boolean;
}

export const InterceptorInner: React.FC<InterceptorInnerProps> = ({ interceptor, showBall }) => {
  const [ballColor, setBallColor] = useState<TumblerBallColor | undefined>(undefined);

  useEffect(() => {
    const onObserveEvent = async (evt: TumblerEvent) => {
      console.log(`interceptor event: ${TumblerEventType[evt.eventType]}`);

      setBallColor(evt.ballColor);

      await new Promise((r) => setTimeout(r, 100));

      return;
    };

    interceptor.addObserver({ reportEvent: onObserveEvent });
  }, [interceptor]);

  useEffect(() => {
    if (!showBall) {
      setBallColor(undefined);
    }
  }, [showBall, setBallColor]);

  const renderBall = () => {
    if (showBall && ballColor !== undefined) {
      return (
        <svg className="ball" height="16" width="16">
          <circle
            className="ball-circle"
            cx="8"
            cy="8"
            r="7"
            stroke="black"
            strokeWidth="1"
            fill={ballColor === TumblerBallColor.Blue ? "blue" : "red"}
          />
        </svg>
      );
    }
  };

  return (
    <div className="interceptor-outer">
      <img className="interceptor" src="./interceptor.png" alt="interceptor"></img>
      {renderBall()}
    </div>
  );
};

export const Interceptor = (props: InterceptorProps) => {
  const appState = useContext(AppContext);

  return <InterceptorInner interceptor={props.interceptor} showBall={appState.appStatus === AppStatus.Idle}></InterceptorInner>;
};
