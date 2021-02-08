import { ipcMain, app, BrowserWindow } from 'electron';
import * as path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}
let counter = 0;

const initialize = (): void => {
  ipcMain.on('talk', (event, arg: any[]) => {
    counter++;
    event.returnValue = `pong ${counter}`;
  });

  ipcMain.on('debug', (event) => {
    mainWindow.webContents.toggleDevTools();
    event.returnValue = `Dev tools toggled`;
  });

  ipcMain.on('reset', (event) => {
    counter = 0;
    event.returnValue = `pong ${counter}`;
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
};

// when ready we initialize the app. Window and IPC handlers.
app.whenReady().then(initialize);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    initialize();
  }
});

