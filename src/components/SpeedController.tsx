import { useEffect, useState } from "react";
import { AppContext } from "../services/AppContext";
import "./SpeedController.css";

export interface SpeedControllerProps {}

export interface SpeedControllerInnerProps extends SpeedControllerProps {
  delayTime: number;
  setDelayTime: (delayTime: number) => void;
}

export const SpeedControllerInner: React.FC<SpeedControllerInnerProps> = ({ delayTime, setDelayTime }) => {
  const [sliderValue, setSliderValue] = useState<number>(delayTime);

  useEffect(() => {
    setSliderValue(delayTime);
  }, [delayTime]);

  return (
    <div className="speed-controller-outer">
      <label htmlFor="speedInput">Faster</label>
      <input
        className="speed-controller-range"
        key="speedInput"
        type="range"
        min={0}
        max={3000}
        value={sliderValue}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
          let newDelay = parseInt(ev.target.value, 10);
          setDelayTime(newDelay);
        }}
      />
      <label htmlFor="speedInput">Slower</label>
    </div>
  );
};

export const SpeedController = (props: SpeedControllerProps) => {
  return (
    <AppContext.Consumer>
      {(appState) => <SpeedControllerInner delayTime={appState.delayTime} setDelayTime={appState.setDelayTime}></SpeedControllerInner>}
    </AppContext.Consumer>
  );
};
