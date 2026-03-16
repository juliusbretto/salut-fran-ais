const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message-from-renderer', message),
  onReply: (callback) => ipcRenderer.on('reply-from-main', (event, ...args) => callback(...args))
});
