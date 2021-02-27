import React, { useEffect } from 'react';
import { TumblerEvent, TumblerEventType } from '../logic/TumblerEvent';
import { ITumblerObservable } from '../logic/TumblerObservable';
import { IReleaseButton } from '../logic/TumblerTypes';
import { AppContext, AppStatus } from '../services/AppContext';


interface TriggerProps {
    observableButton: ITumblerObservable,
    releaseButton: IReleaseButton,
    releaseButtonText: string
}

interface TriggerInnerProps extends TriggerProps {
    enabled: boolean,
    setAppStatus: (appStatus: AppStatus) => void
}

export const TriggerInner : React.FC<TriggerInnerProps> = ({observableButton, releaseButton, releaseButtonText, enabled, setAppStatus}) => {

    useEffect(() => {
        const onObserveEvent = async (evt: TumblerEvent) => {
            console.log(`trigger event: ${TumblerEventType[evt.eventType]}`);
            
            //TBD            

            return;
        }
        
        observableButton.addObserver({reportEvent: onObserveEvent})
    }, [observableButton]);

    const onTrig = async () => {
        setAppStatus(AppStatus.Executing);
        await releaseButton.buttonPressed();
        setAppStatus(AppStatus.Idle);
    }

    return (
        <button onClick={onTrig} disabled={!enabled}>{releaseButtonText}</button>
    );
}

export const Trigger : React.FC<TriggerProps> = ({observableButton, releaseButton, releaseButtonText}) => {
    return (
        <AppContext.Consumer>
        {(appState) => (
            <TriggerInner observableButton={observableButton} releaseButton={releaseButton} releaseButtonText={releaseButtonText} enabled={appState.appStatus === AppStatus.Idle} setAppStatus={appState.setAppStatus}></TriggerInner>
        )}
        </AppContext.Consumer>
    );
}