const { app, BrowserWindow, webContents } = require("electron");
const path = require("path");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let mainWindow
const { secureWebviews } = require('./renderer/scripts/DisableWrongJSInWindows');


function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false
      
    },
    
  });

  mainWindow.setMenu(null);

  // Load the local HTML file
  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
