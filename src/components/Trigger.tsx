import React, { useContext, useEffect } from "react";
import { TumblerEvent, TumblerEventType } from "../logic/TumblerEvent";
import { ITumblerObservable } from "../logic/TumblerObservable";
import { IReleaseButton } from "../logic/TumblerTypes";
import { AppContext, AppStatus } from "../services/AppContext";

interface TriggerProps {
  observableButton: ITumblerObservable;
  releaseButton: IReleaseButton;
  releaseButtonText: string;
}

export const Trigger: React.FC<TriggerProps> = ({ observableButton, releaseButton, releaseButtonText }) => {
  const { appStatus, setAppStatus } = useContext(AppContext);

  useEffect(() => {
    const onObserveEvent = async (evt: TumblerEvent) => {
      console.log(`trigger event: ${TumblerEventType[evt.eventType]}`);
    };

    observableButton.addObserver({ reportEvent: onObserveEvent });
  }, [observableButton]);

  const onTrig = async () => {
    setAppStatus(AppStatus.Executing);
    await releaseButton.buttonPressed();
    setAppStatus(AppStatus.Idle);
  };

  return (
    <button onClick={onTrig} disabled={appStatus !== AppStatus.Idle}>
      {releaseButtonText}
    </button>
  );
};
