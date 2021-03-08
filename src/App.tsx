import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { UserInfo } from "./components/UserInfo";
import { Controller } from "./components/Controller";
import { AppContext, AppStatus, UserState } from "./services/AppContext";

function App() {
  const _setUserState = (userState: UserState) => {
    setUserState({
      userState: userState,
      setUserState: _setUserState,
    });
  };

  const [userState, setUserState] = useState({
    userState: {
      userLoggedIn: false,
      token: "",
    },
    setUserState: _setUserState,
  });

  const _setAppStatusState = (appStatus: AppStatus) => {
    setAppStatusState({
      appStatus: appStatus,
      setAppStatus: _setAppStatusState,
    });
  };

  const [appStatusState, setAppStatusState] = useState({
    appStatus: AppStatus.Idle,
    setAppStatus: _setAppStatusState,
  });

  const _setDelayTimeState = useCallback((delayTime: number) => {
    var r = document.querySelector(":root");
    r?.setAttribute("style", `--anim-ms: ${delayTime};`);

    setDelayTimeState({
      delayTime: delayTime,
      setDelayTime: _setDelayTimeState,
    });
  }, []);

  const [delayTimeState, setDelayTimeState] = useState({
    delayTime: 100,
    setDelayTime: _setDelayTimeState,
  });

  const getBackendUrl = (): string => {
    let ret: string | undefined = process.env.REACT_APP_BACKEND_URL;

    if (!ret) {
      ret = window.location.origin;
    }

    return ret;
  };

  const initialDelayMs = 501;
  const setInitialDelayTimeState = useCallback(() => _setDelayTimeState(initialDelayMs), [_setDelayTimeState]);

  useEffect(() => {
    setInitialDelayTimeState();
  }, [setInitialDelayTimeState]);

  return (
    <>
      <AppContext.Provider value={{ ...appStatusState, ...userState, ...delayTimeState }}>
        <div className="App">
          <div>This site is a work in progress</div>
        </div>
        <UserInfo></UserInfo>
        <Controller host={getBackendUrl()} columns={11} rows={11}></Controller>
      </AppContext.Provider>
    </>
  );
}

export default App;
