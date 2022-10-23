'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { ProjectRegistrationData } from './types/projectRegistration.interface.ts'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
{ scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
// Create the browser window.
const win = new BrowserWindow({
    show: false,
    webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        preload: path.join(__dirname, '../src/preload.js'),
        }
    })
    win.maximize();
    win.show();

    // Building the application Menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {label:'Accueil',
                click(){
                    win.webContents.send('goToPage', '/');
                }

                },
                {label:'Tutoriel',
                
                click(){
                    win.webContents.send('goToPage', '/tutoriel');
                }},
                {label:'Exit',
                click() { 
                app.quit() 
                }}
            ]
        }
    ])
    Menu.setApplicationMenu(menu)

if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
} else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
}
}

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
if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


async function registerProject(_event, projectData) {
    console.log("Hello, I have been tasked to register a project");
    console.log("This project has the following name: " + projectData.projectName);
    console.log("This project has the following description: " + projectData.projectDescription);
    return true;
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
    await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
    console.error('Vue Devtools failed to install:', e.toString())
    }
}
ipcMain.handle('registerProject', registerProject)
createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
if (process.platform === 'win32') {
    process.on('message', (data) => {
    if (data === 'graceful-exit') {
        app.quit()
    }
    })
} else {
    process.on('SIGTERM', () => {
    app.quit()
    })
}
}
