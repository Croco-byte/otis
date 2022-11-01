const { contextBridge, ipcRenderer } = require('electron')
import { registerProject } from './services/projectRegistration.service'
import {    getProjectFromId,
            getProjectNameFromId,
            getProjectMetaFromId,
            getAllProjectsMeta,
            deleteProjectFromId,
            getProjectStepInfoFromId,
            updateCurrentStep,
            updateCompletedSteps,
            updateCurrentAndCompletedSteps,
            saveBasicInfo,
            getBasicInfo,
            saveDraftBasics,
            getDraftBasics,
            saveDraftPlanData,
            getDraftPlanData,
            saveDraftPlanElements,
            getDraftPlanElements
        } from './database/dbqueries'


contextBridge.exposeInMainWorld('electronAPI', {
    goToPage: (callback: any) => ipcRenderer.on('goToPage', callback),

    // Do not use IPC for regular app tasks
    // https://stackoverflow.com/questions/65851796/how-do-i-make-a-database-call-from-an-electron-front-end
    registerProject: registerProject,
    getProjectFromId: getProjectFromId,
    getProjectNameFromId: getProjectNameFromId,
    getProjectMetaFromId: getProjectMetaFromId,
    getAllProjectsMeta: getAllProjectsMeta,
    deleteProjectFromId: deleteProjectFromId,
    getProjectStepInfoFromId: getProjectStepInfoFromId,
    updateCurrentStep: updateCurrentStep,
    updateCompletedSteps: updateCompletedSteps,
    updateCurrentAndCompletedSteps: updateCurrentAndCompletedSteps,
    saveBasicInfo: saveBasicInfo,
    getBasicInfo: getBasicInfo,
    getDraftBasics: getDraftBasics,
    saveDraftBasics: saveDraftBasics,
    getDraftPlanData: getDraftPlanData,
    saveDraftPlanData: saveDraftPlanData,
    getDraftPlanElements: getDraftPlanElements,
    saveDraftPlanElements: saveDraftPlanElements
})
