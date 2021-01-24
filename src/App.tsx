import React, { useState } from 'react';
import './App.css';
import { Client } from './components/Client';
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

  return (
    <>
    <UserTokenContext.Provider value={userTokenState}>
      <div className="App">
        <div>hello</div>
      </div>
      <UserInfo></UserInfo>
      <Client></Client>
      <Controller text='zerooc' columns={11} rows={11}></Controller>
    </UserTokenContext.Provider>
    </>
  );
}

export default App;
