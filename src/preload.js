const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onGoToPage: (callback) => ipcRenderer.on('goToPage', callback),
    registerProject: (projectData) => ipcRenderer.invoke('registerProject', projectData) 
})
