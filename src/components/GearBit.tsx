import { useContext, useEffect, useRef, useState } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerGearBit } from "../logic/TumblerGearBit";
import { ITumblerPartObserver, TumblerBallColor } from "../logic/TumblerTypes";
import { AppContext } from "../services/AppContext";
import "./GearBit.css";

interface GearBitProps {
  bit: TumblerGearBit;
}

export const GearBit: React.FC<GearBitProps> = ({ bit }) => {
  const [observer] = useState<ITumblerPartObserver>({ reportEvent: async () => {} });

  const { delayTime } = useContext(AppContext);

  useEffect(() => {
    const updateBitState = () => {
      if (imgRef.current) {
        if (bit.gearSet) {
          imgRef.current.classList.add("gearbit-tilt");
        } else {
          imgRef.current.classList.remove("gearbit-tilt");
        }
      }
    };

    const onObserveEvent = async (evt: TumblerEvent) => {
      console.log(`gearbit event: ${TumblerEventType[evt.eventType]}`);

      if (evt.eventType === TumblerEventType.Set || evt.eventType === TumblerEventType.Reset) {
        updateBitState();
        const delay = delayTime + 100;
        await new Promise((r) => setTimeout(r, delay));
      } else if (evt.eventType === TumblerEventType.BallAtPart) {
        ballRef.current?.classList.add(evt.ballColor === TumblerBallColor.Blue ? "ball-blue" : "ball-red");
        let transitClass = evt.enterLeft === evt.exitLeft ? "transit-down" : "transit-across";
        ballRef.current?.classList.add(transitClass);
        if (!evt.enterLeft) {
          ballRef.current?.classList.add("reverse");
        }

        const delayDiff = 50;
        const delay = delayTime <= delayDiff ? 0 : delayTime - delayDiff;
        await new Promise((r) => setTimeout(r, delay));

        ballRef.current?.classList.remove("in-transit");
        ballRef.current?.classList.remove("transit-down");
        ballRef.current?.classList.remove("transit-across");
        ballRef.current?.classList.remove("reverse");
        ballRef.current?.classList.remove("ball-blue");
        ballRef.current?.classList.remove("ball-red");
      }
    };

    updateBitState();

    observer.reportEvent = onObserveEvent;
  }, [bit, delayTime, observer]);

  useEffect(() => {
    bit.addObserver(observer);
  }, [bit, observer]);

  let imgRef = useRef<HTMLImageElement>(null);
  let ballRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`gearbit-outer`}>
      <div className="ball-outer" ref={ballRef}>
        <svg className="ball" height="80" width="80">
          <circle className="ball-circle" cx="15" cy="15" r="7" stroke="black" strokeWidth="1" fill="red" />
        </svg>
      </div>
      <img className={`gearbit-background`} src="./emptypart.png" alt="empty"></img>
      <img className={`gearbit`} src="./gearbit.png" alt="gearbit" ref={imgRef}></img>
    </div>
  );
};
