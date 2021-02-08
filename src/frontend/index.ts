// import { ipcRenderer } from 'electron';

const { ipcRenderer } = window.require('electron');

const renderResponse = (response: string) => {
  const respP = document.getElementById('result');
  if (respP) {
    const res = document.createElement('p');
    res.innerText = `> ${response}`;
    respP.appendChild(res);
  }
};

console.log('This is the front-end typescript!');
const mainDiv = document.getElementById('main');
if (mainDiv) {
  console.log('Adding UI ...');
  mainDiv.innerHTML = `
  <div class="title"><h1>Electron 💖 TypeScript and Parcel!</h1></div>
  <div class="body">
    <p>Welcome to a TypeScript Electron app.</p>
    <p>
      <button id="talkBt">Ping server</button>
      <button id="resetBt">Reset</button>
      <button id="debugBt">Debug</button>
    </p>
    <div class="output" id="result"></div>
  </div>`;

  const debugBt = document.getElementById('debugBt') as HTMLButtonElement;
  if (debugBt) {
    debugBt.addEventListener('click', () => {
      const response = ipcRenderer.sendSync('debug');
      renderResponse(response);
    });
  }

  const resetBt = document.getElementById('resetBt') as HTMLButtonElement;
  if (resetBt) {
    resetBt.addEventListener('click', () => {
      const response = ipcRenderer.sendSync('reset');
      renderResponse(response);
    });
  }

  const talkBt = document.getElementById('talkBt') as HTMLButtonElement;
  if (talkBt) {
    talkBt.addEventListener('click', () => {
      const response = ipcRenderer.sendSync('talk', 'ping');
      renderResponse(response);
    });
  }
}
