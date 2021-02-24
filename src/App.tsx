import React, { useState } from 'react';
import './App.css';
import { UserInfo } from './components/UserInfo';
import { UserTokenContext } from './services/UserTokenContext';
import { Controller } from './components/Controller';

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
      <div className="App">
        <div>This site is a work in progress</div>
      </div>
      <UserInfo></UserInfo>
      <Controller host={getBackendUrl()} columns={11} rows={11}></Controller>
    </UserTokenContext.Provider>
    </>
  );
}

export default App;
