import React from "react";

export enum AppStatus {
    Idle = 0,
    Executing
}

export interface UserState {
    userLoggedIn: boolean,
    token: string
}

export interface AppState {
    appStatus: AppStatus,
    userState: UserState,    
    setAppStatus: (appStatus: AppStatus) => void,
    setUserState: (userState: UserState) => void,
}

export const AppContext = React.createContext<AppState>({
    appStatus: AppStatus.Idle,
    userState: {
        userLoggedIn: false,
        token: ''
    },
    setAppStatus: (appStatus: AppStatus) => {},
    setUserState: (userState: UserState) => {}
});

