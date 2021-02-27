import React, { useState } from 'react';
import './App.css';
import { UserInfo } from './components/UserInfo';
import { UserTokenContext } from './services/UserTokenContext';
import { Controller } from './components/Controller';
import { AppContext, AppStatus } from './services/AppContext';

function App() {
  
  const setUserToken = (token: string ) => {
    setUserTokenState({
      token: token,
      // eslint-disable-next-line
      setToken: setUserToken
    })
  }

  const [userTokenState, setUserTokenState] = useState({
    token: '',
    setToken: setUserToken
  });

  const _setUserLoggedInState = (userLoggedIn: boolean) => {
    setUserLoggedInState({
      userLoggedIn: userLoggedIn,
      setUserLoggedIn: _setUserLoggedInState
    })
  }

  const [userLoggedInState, setUserLoggedInState] = useState({
    userLoggedIn: false,
    setUserLoggedIn: _setUserLoggedInState
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
    <UserTokenContext.Provider value={userTokenState}>
      <AppContext.Provider value={{...appStatusState, ...userLoggedInState}}>
        <div className="App">
          <div>This site is a work in progress</div>
        </div>
        <UserInfo></UserInfo>
        <Controller host={getBackendUrl()} columns={11} rows={11}></Controller>
      </AppContext.Provider>
    </UserTokenContext.Provider>
    </>
  );
}

export default App;
