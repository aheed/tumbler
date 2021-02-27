import React, { useState } from 'react';
import './App.css';
import { UserInfo } from './components/UserInfo';
import { Controller } from './components/Controller';
import { AppContext, AppStatus, UserState } from './services/AppContext';

function App() {

  const _setUserState = (userState: UserState) => {
    setUserState({
      userState: userState,
      setUserState: _setUserState
    })
  }

  const [userState, setUserState] = useState({
    userState: {
      userLoggedIn: false,
      token: ''
    },
    setUserState: _setUserState
  });
  
  const _setAppStatusState = (appStatus: AppStatus) => {
    setAppStatusState({
      appStatus: appStatus,
      setAppStatus: _setAppStatusState
    })
  }

  const [appStatusState, setAppStatusState] = useState({
    appStatus: AppStatus.Idle,
    setAppStatus: _setAppStatusState
  });


  const getBackendUrl = (): string => {
    let ret: string | undefined = process.env.REACT_APP_BACKEND_URL;

    if (!ret) {
      ret = window.location.origin;
    }

    return ret;
  }

  return (
    <>
      <AppContext.Provider value={{...appStatusState, ...userState}}>
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
