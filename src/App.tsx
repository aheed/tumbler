import React from 'react';
import './App.css';
import { Client } from './components/Client';
import { UserInfo } from './components/UserInfo';

function App() {
  return (
    <>
      <div className="App">
        <div>hello</div>
      </div>
      <UserInfo></UserInfo>
      <Client token='apa'></Client>
    </>
  );
}

export default App;
