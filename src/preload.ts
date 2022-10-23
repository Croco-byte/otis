const { contextBridge, ipcRenderer } = require('electron')
import { ProjectRegistrationData } from './types/projectRegistration.interface'

contextBridge.exposeInMainWorld('electronAPI', {
    goToPage: (callback: any) => ipcRenderer.on('goToPage', callback),
    registerProject: (projectData: ProjectRegistrationData) => ipcRenderer.invoke('registerProject', projectData) 
})
