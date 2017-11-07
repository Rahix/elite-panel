const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1024, height: 720, frame: true, title: "elite-panel"})

  win.maximize();
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);
  win.setTitle("elite-panel");

  // Open the DevTools.
  //win.webContents.openDevTools()

  globalShortcut.register("CommandOrControl+Shift+Q", function() {
    win.webContents.send("keyboard-command", "q");
  });
  globalShortcut.register("CommandOrControl+Shift+W", function() {
    win.webContents.send("keyboard-command", "w");
  });
  globalShortcut.register("CommandOrControl+Shift+E", function() {
    win.webContents.send("keyboard-command", "e");
  });
  globalShortcut.register("CommandOrControl+Shift+A", function() {
    win.webContents.send("keyboard-command", "a");
  });
  globalShortcut.register("CommandOrControl+Shift+S", function() {
    win.webContents.send("keyboard-command", "s");
  });
  globalShortcut.register("CommandOrControl+Shift+D", function() {
    win.webContents.send("keyboard-command", "d");
  });
  globalShortcut.register("CommandOrControl+Shift+Space", function() {
    win.webContents.send("keyboard-command", " ");
  });
  globalShortcut.register("CommandOrControl+Shift+R", function() {
    win.webContents.send("keyboard-command", "r");
  });
  globalShortcut.register("CommandOrControl+Shift+F", function() {
    win.webContents.send("keyboard-command", "f");
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

var is_fullscreen = false;
ipcMain.on("toggle-fullscreen", function() {
  is_fullscreen = !is_fullscreen;
  win.setFullScreen(is_fullscreen);
})

ipcMain.on("close-app", function() {
  globalShortcut.unregisterAll()
  app.quit();
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
