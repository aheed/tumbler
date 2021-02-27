import React from 'react';
import { IBallReceiver, TumblerBallColor } from '../logic/TumblerTypes';
import { AppContext, AppStatus } from '../services/AppContext';


interface TriggerProps {
    receiver: IBallReceiver,
    releaseButtonText: string
}

interface TriggerInnerProps extends TriggerProps {
    enabled: boolean,
    setAppStatus: (appStatus: AppStatus) => void
}

export const TriggerInner : React.FC<TriggerInnerProps> = ({receiver, releaseButtonText, enabled, setAppStatus}) => {

    const onTrig = async () => {
        setAppStatus(AppStatus.Executing);
        await receiver.putBall(TumblerBallColor.Blue);
        setAppStatus(AppStatus.Idle);
    }

    return (
        <button onClick={onTrig} disabled={!enabled}>{releaseButtonText}</button>
    );
}

export const Trigger : React.FC<TriggerProps> = ({receiver, releaseButtonText}) => {
    return (
        <AppContext.Consumer>
        {(appState) => (
            <TriggerInner receiver={receiver} releaseButtonText={releaseButtonText} enabled={appState.appStatus === AppStatus.Idle} setAppStatus={appState.setAppStatus}></TriggerInner>
        )}
        </AppContext.Consumer>
    );
}