import { useContext } from "react";
import { AppContext } from "../services/AppContext";
import "./SpeedController.css";

export const SpeedController: React.FC = () => {
  const appState = useContext(AppContext);

  return (
    <div className="speed-controller-outer">
      <label htmlFor="speedInput">Faster</label>
      <input
        className="speed-controller-range"
        key="speedInput"
        type="range"
        min={0}
        max={3000}
        value={appState.delayTime}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
          let newDelay = parseInt(ev.target.value, 10);
          appState.setDelayTime(newDelay);
        }}
      />
      <label htmlFor="speedInput">Slower</label>
    </div>
  );
};
