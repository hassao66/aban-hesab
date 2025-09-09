const { contextBridge, ipcRenderer } = require('electron');

// API امن برای renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // اضافه کردن API های مورد نیاز
  getVersion: () => process.versions.electron,
  platform: process.platform,
  
  // مثال برای ارتباط با main process
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content) => ipcRenderer.invoke('dialog:saveFile', content),
  
  // رویدادها
  onMenuAction: (callback) => ipcRenderer.on('menu-action', callback),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});