import { useContext, useEffect, useRef, useState } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { TumblerGear } from "../logic/TumblerGear";
import { ITumblerPartObserver } from "../logic/TumblerTypes";
import { AppContext } from "../services/AppContext";
import "./Gear.css";

interface GearProps {
  gear: TumblerGear;
}

export const Gear: React.FC<GearProps> = ({ gear }) => {
  const [observer] = useState<ITumblerPartObserver>({ reportEvent: async () => {} });

  const { delayTime } = useContext(AppContext);

  useEffect(() => {
    const updateBitState = () => {
      if (imgRef.current) {
        if (gear.gearSet) {
          imgRef.current.classList.add("gear-tilt");
        } else {
          imgRef.current.classList.remove("gear-tilt");
        }
      }
    };

    const onObserveEvent = async (evt: TumblerEvent) => {
      console.log(`gear event: ${TumblerEventType[evt.eventType]}`);

      updateBitState();

      const delay = delayTime + 100;
      await new Promise((r) => setTimeout(r, delay));

      return;
    };

    updateBitState();

    observer.reportEvent = onObserveEvent;
  }, [gear, delayTime, observer]);

  useEffect(() => {
    gear.addObserver(observer);
  }, [gear, observer]);

  let imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className={`gear-outer`}>
      <img className={`gear`} src="./gear.png" alt="gear" ref={imgRef}></img>
    </div>
  );
};
