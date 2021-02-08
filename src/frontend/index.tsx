import React from 'react';
import ReactDOM from 'react-dom';

const { ipcRenderer } = window.require('electron');
const responses: string[] = [];

const pingServer = () => {
  const response = ipcRenderer.sendSync('talk', 'ping');
  renderResponse(response);
};

const resetCounter = () => {
  const response = ipcRenderer.sendSync('reset');
  renderResponse(response);
};

const toggleDebug = () => {
  const response = ipcRenderer.sendSync('debug');
  renderResponse(response);
};

console.log('This is the front-end in typescript and react!');
const mainDiv = document.getElementById('main');

const render = () => {
  ReactDOM.render(
    <>
      <div className="title">
        <h1>Electron 💖 TypeScript, React and Parcel!</h1>
      </div>
      <div className="body">
        <p>Welcome to a TypeScript Electron app.</p>
        <p>
          <button onClick={pingServer}>Ping server</button>
          <button onClick={resetCounter}>Reset</button>
          <button onClick={toggleDebug}>Debug</button>
        </p>
        <div className="output" id="result">
          {responses.map((r, idx) => (
            <p key={idx}>&gt; {r}</p>
          ))}
        </div>
      </div>
    </>,
    mainDiv
  );
};

const renderResponse = (response: string) => {
  responses.push(response);
  render();
};

render();
