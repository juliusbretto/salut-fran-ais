const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

// Check if we are in development mode
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, // A bit bigger for a real app
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      // Important for React dev tools and security
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load from Vite dev server in development, or from the build file in production
  if (isDev) {
    win.loadURL('http://localhost:5173'); // Default Vite port
    win.webContents.openDevTools(); // Open DevTools automatically
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

// Your IPC listeners can go here, just like before
ipcMain.on('message-from-renderer', (event, arg) => {
  console.log('Message from React app:', arg);
  event.sender.send('reply-from-main', 'Hello from the Main process!');
});
