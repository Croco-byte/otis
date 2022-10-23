const { contextBridge, ipcRenderer } = require('electron')
import { ProjectRegistrationData } from './types/projectRegistration.interface'

contextBridge.exposeInMainWorld('electronAPI', {
    goToPage: (callback: any) => ipcRenderer.on('goToPage', callback),

    // TODO: don't use IPC for such tasks ; simply expose the 'registerProject' method to the frontend.
    registerProject: (projectData: ProjectRegistrationData) => ipcRenderer.invoke('registerProject', projectData),

    // Database queries - same as above, do not use IPC: https://stackoverflow.com/questions/65851796/how-do-i-make-a-database-call-from-an-electron-front-end 
    getProjectFromId: (id: number) => ipcRenderer.invoke('getProjectFromId', id)
})
