function secureWebviews(mainWindow) {
  mainWindow.webContents.on('did-attach-webview', (event, webContents) => {
    webContents.executeJavaScript(`
      window.addEventListener('DOMContentLoaded', () => {
        delete window.require;
        delete window.process;
        delete window.module;
      });
    `);
  
    webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    });
  
}

module.exports = { secureWebviews };
