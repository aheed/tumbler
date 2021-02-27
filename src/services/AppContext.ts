import React from "react";

export enum AppStatus {
    Idle = 0,
    Executing
}

export interface AppState {
    appStatus: AppStatus,
    userLoggedIn: boolean,
    setAppStatus: (appStatus: AppStatus) => void,
    setUserLoggedIn: (userLoggedIn: boolean) => void,
}

export const AppContext = React.createContext<AppState>({
    appStatus: AppStatus.Idle,
    userLoggedIn: false,
    setAppStatus: (appStatus: AppStatus) => {},
    setUserLoggedIn: (userLoggedIn: boolean) => {}
});

