import React from "react";

export enum AppStatus {
  Idle = 0,
  Executing,
}

export interface UserState {
  userLoggedIn: boolean;
  token: string;
}

export interface AppState {
  appStatus: AppStatus;
  userState: UserState;
  delayTime: number;
  setAppStatus: (appStatus: AppStatus) => void;
  setUserState: (userState: UserState) => void;
  setDelayTime: (delayTime: number) => void;
}

export const AppContext = React.createContext<AppState>({
  appStatus: AppStatus.Idle,
  userState: {
    userLoggedIn: false,
    token: "",
  },
  delayTime: 100,
  setAppStatus: (appStatus: AppStatus) => {},
  setUserState: (userState: UserState) => {},
  setDelayTime: (delayTime: number) => {},
});
