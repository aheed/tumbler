import { useContext, useEffect, useRef, useState } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerRamp } from "../logic/TumblerRamp";
import { ITumblerPartObserver, TumblerBallColor } from "../logic/TumblerTypes";
import { AppContext } from "../services/AppContext";
import "./Ramp.css";

interface RampProps {
  ramp: TumblerRamp;
}

export const Ramp: React.FC<RampProps> = ({ ramp }) => {
  const [observer] = useState<ITumblerPartObserver>({ reportEvent: async () => {} });

  const { delayTime } = useContext(AppContext);

  useEffect(() => {
    const onObserveEvent = async (evt: TumblerEvent) => {
      console.log(`ramp event: ${TumblerEventType[evt.eventType]}`);

      imgRef.current?.classList.add("part-tilt");

      ballRef.current?.classList.add(evt.ballColor === TumblerBallColor.Blue ? "ball-blue" : "ball-red");

      let transitClass = evt.enterLeft === evt.exitLeft ? "transit-down" : "transit-across";
      ballRef.current?.classList.add(transitClass);
      ballRef.current?.classList.add("in-transit");

      const delayDiff = 50;
      const delay = delayTime <= delayDiff ? 0 : delayTime - delayDiff;
      await new Promise((r) => setTimeout(r, delay));

      imgRef.current?.classList.remove("part-tilt");

      ballRef.current?.classList.remove("in-transit");
      ballRef.current?.classList.remove("transit-down");
      ballRef.current?.classList.remove("transit-across");
      ballRef.current?.classList.remove("ball-blue");
      ballRef.current?.classList.remove("ball-red");

      return;
    };

    observer.reportEvent = onObserveEvent;
  }, [ramp, delayTime, observer]);

  useEffect(() => {
    ramp.addObserver(observer);
  }, [ramp, observer]);

  let imgRef = useRef<HTMLImageElement>(null);
  let ballRef = useRef<SVGSVGElement>(null);

  return (
    <div className={`ramp-outer ${!ramp.facingLeft ? "reverse" : ""}`}>
      <svg className="ball" height="100" width="100" ref={ballRef}>
        <circle className="ball-circle" cx="15" cy="15" r="7" stroke="black" strokeWidth="1" fill="red" />
      </svg>
      <img className={`ramp part`} src="./emptypart.png" alt="empty"></img>
      <img className={`ramp part`} src="./ramp.png" alt="ramp" ref={imgRef}></img>
    </div>
  );
};
