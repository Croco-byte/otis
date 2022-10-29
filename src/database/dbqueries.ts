import db from './dbmanager'
import { ProjectRegistrationData } from '../types/projectRegistration.interface'
import { BasicInfoData, DraftBasicData } from '../types/stepsTypes.interface'


const getProjectFromId = function(id: number) {
    const stmt = db.prepare('SELECT * FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result;
}

const getProjectNameFromId = function(id: number) {
    const stmt = db.prepare('SELECT projectName FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result.projectName;
}

const getProjectMetaFromId = function(id: number) {
    const stmt = db.prepare('SELECT projectId, projectName, projectDescription, projectDate FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const getAllProjectsMeta = function() {
    const stmt = db.prepare('SELECT projectId, projectName, projectDescription, projectDate FROM projects;')
    const result = stmt.all();
    return result
}

const getProjectStepInfoFromId = function(id: number) {
    const stmt = db.prepare('SELECT completedSteps, currentStep FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const createNewProject = function(projectData: ProjectRegistrationData) {
    const initSteps = {
                    'StepStart':            false,
                    'StepPrelimApproach':   false,
                    'StepPrelimUnderstand': false,
                    'StepPrelimBasics':     false,
                    'StepDraftBasics':      false,
                    'StepDraftPlan':        false,
                    'StepDraftAnnounce':    false,
                    'StepAnalysis':         false,
                    'StepRedacAdvices':     false,
                    'StepRedacIntro':       false,
                    'StepRedacParts':       false,
                    'StepRedacConclusion':  false,
                    'StepProofReading':     false,
                    'StepEnd':              false
                };
    const initCurrentStep = "StepStart";

    const stmt = db.prepare("INSERT INTO projects (projectName, projectDescription, projectDate, completedSteps, currentStep) VALUES (?,?,(SELECT strftime('%d/%m/%Y %Hh%M')),?,?)");
    const result = stmt.run(projectData.projectName, projectData.projectDescription, JSON.stringify(initSteps), initCurrentStep);
    return result.lastInsertRowid
}

const updateCurrentStep = function(id: number, currentStep: string) {
    const stmt = db.prepare("UPDATE projects SET currentStep = ? WHERE projectId = ?;");
    const result = stmt.run(currentStep, id);
    return result.changes
}

const updateCompletedSteps = function(id: number, completedSteps: string) {
    const stmt = db.prepare("UPDATE projects SET completedSteps = ? WHERE projectId = ?;");
    const result = stmt.run(completedSteps, id);
    return result.changes
}

const updateCurrentAndCompletedSteps = function(id: number, currentStep: string, completedSteps: string) {
    const stmt = db.prepare("UPDATE projects SET currentStep = ?, completedSteps = ? WHERE projectId = ?;");
    const result = stmt.run(currentStep, completedSteps, id);
    return result.changes
}

const deleteProjectFromId = function(id: number) {
    const stmt = db.prepare("DELETE FROM projects WHERE projectId = ?;");
    const result = stmt.run(id);
    return result.changes
}

const saveBasicInfo = function(id: number, basicInfo: BasicInfoData) {
    const stmt = db.prepare("UPDATE projects SET prelimBasics = ? WHERE projectId = ?;");
    const result = stmt.run(JSON.stringify(basicInfo), id);
    return result.changes
}

const getBasicInfo = function(id: number) {
    const stmt = db.prepare('SELECT prelimBasics FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveDraftBasics = function(id: number, draftBasics: DraftBasicData) {
    const stmt = db.prepare("UPDATE projects SET draftBasics = ? WHERE projectId = ?;");
    const result = stmt.run(JSON.stringify(draftBasics), id);
    return result.changes
}

const getDraftBasics = function(id: number) {
    const stmt = db.prepare('SELECT draftBasics FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

export {    getProjectFromId,
            getProjectNameFromId,
            getProjectMetaFromId,
            getAllProjectsMeta,
            getProjectStepInfoFromId,
            createNewProject,
            updateCurrentStep,
            updateCompletedSteps,
            updateCurrentAndCompletedSteps,
            deleteProjectFromId,
            saveBasicInfo,
            getBasicInfo,
            saveDraftBasics,
            getDraftBasics }
