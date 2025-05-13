const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  let mainWindow = new BrowserWindow({
    kiosk: true,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
    },
  });

  mainWindow.setMenu(null);

  mainWindow.loadFile("renderer/index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
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
