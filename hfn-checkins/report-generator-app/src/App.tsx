import React from 'react';
import logo from './logo.svg';
import { google } from "googleapis";
import './App.css';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

function App() {
  useEffect(() => {
    const sheets = google.sheets("v4");
    return () => {
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

