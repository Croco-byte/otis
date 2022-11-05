import db from './dbmanager'
import { ProjectRegistrationData } from '../types/projectRegistration.interface'
import { BasicInfoData, DraftBasicData, DraftPlanElementsData, DraftPlanData } from '../types/stepsTypes.interface'


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

    // Initializing Step data
    const initSteps = {
                    'StepStart':                false,
                    'StepPrelimApproach':       false,
                    'StepPrelimUnderstand':     false,
                    'StepPrelimBasics':         false,
                    'StepDraftBasics':          false,
                    'StepDraftPlanEnum':        false,
                    'StepDraftPlanParts':       false,
                    'StepDraftPlanSubparts':    false,
                    'StepDraftAnnounce':        false,
                    'StepAnalysis':             false,
                    'StepRedacAdvices':         false,
                    'StepRedacIntro':           false,
                    'StepRedacParts':           false,
                    'StepRedacConclusion':      false,
                    'StepProofReading':         false,
                    'StepEnd':                  false
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

// To delete
const saveDraftPlanData = function(id: number, draftPlanData: DraftPlanData) {
    const stmt = db.prepare("UPDATE projects SET draftPlanData = ? WHERE projectId = ?;");
    const result = stmt.run(JSON.stringify(draftPlanData), id);
    return result.changes
}

// To delete
const getDraftPlanData = function(id: number) {
    const stmt = db.prepare('SELECT draftPlanData FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveDraftPlanElements = function(id: number, draftPlanElements: DraftPlanElementsData) {
    const stmt = db.prepare("UPDATE projects SET draftPlanElements = ? WHERE projectId = ?;");
    const result = stmt.run(JSON.stringify(draftPlanElements), id);
    return result.changes
}

const getDraftPlanElements = function(id: number) {
    const stmt = db.prepare('SELECT draftPlanElements FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveDraftPlanStructure = function(id: number, draftPlanStructure: any) {
    const stmt = db.prepare("UPDATE projects SET draftPlanStructure = ? WHERE projectId = ?;");
    const result = stmt.run(JSON.stringify(draftPlanStructure), id);
    return result.changes
}

const getDraftPlanStructure = function(id: number) {
    const stmt = db.prepare('SELECT draftPlanStructure FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveDraftAnnounce = function(id: number, draftAnnounce: string) {
    const stmt = db.prepare("UPDATE projects SET draftAnnounce = ? WHERE projectId = ?;");
    const result = stmt.run(draftAnnounce, id);
    return result.changes
}

const getDraftAnnounce = function(id: number) {
    const stmt = db.prepare('SELECT draftAnnounce FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveAnalysis = function(id: number, analysis: any) {
    const stmt = db.prepare("UPDATE projects SET analysis = ? WHERE projectId = ?;");
    const result = stmt.run(JSON.stringify(analysis), id);
    return result.changes
}

const getAnalysis = function(id: number) {
    const stmt = db.prepare('SELECT analysis FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveIntroRedacted = function(id: number, introRedacted: string) {
    const stmt = db.prepare("UPDATE projects SET introRedacted = ? WHERE projectId = ?;");
    const result = stmt.run(introRedacted, id);
    return result.changes
}

const getIntroRedacted = function(id: number) {
    const stmt = db.prepare('SELECT introRedacted FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveRedacParts = function(id: number, toSave: any) {
    const stmt = db.prepare("UPDATE projects SET p1Announce = ?, p1s1Redacted = ?, p1s2Redacted = ?, p1s3Redacted = ?, p1Transition = ?, p2Announce = ?, p2s1Redacted = ?, p2s2Redacted = ?, p2s3Redacted = ?, p2Transition = ?, p3Announce = ?, p3s1Redacted = ?, p3s2Redacted = ?, p3s3Redacted = ? WHERE projectId = ?;");
    const result = stmt.run(toSave[0], toSave[1], toSave[2], toSave[3], toSave[4], toSave[5], toSave[6], toSave[7], toSave[8], toSave[9], toSave[10], toSave[11], toSave[12], toSave[13], id);
    return result.changes
}

const getRedacParts = function(id: number) {
    const stmt = db.prepare('SELECT p1Announce, p1s1Redacted, p1s2Redacted, p1s3Redacted, p1Transition, p2Announce, p2s1Redacted, p2s2Redacted, p2s3Redacted, p2Transition, p3Announce, p3s1Redacted, p3s2Redacted, p3s3Redacted FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveConclusionRedacted = function(id: number, conclusionRedacted: any) {
    const stmt = db.prepare("UPDATE projects SET conclusionRedacted = ? WHERE projectId = ?;");
    const result = stmt.run(JSON.stringify(conclusionRedacted), id);
    return result.changes
}

const getConclusionRedacted = function(id: number) {
    const stmt = db.prepare('SELECT conclusionRedacted FROM projects WHERE projectId = ?;')
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
            getDraftBasics,
            saveDraftPlanData,
            getDraftPlanData,
            saveDraftPlanElements,
            getDraftPlanElements,
            saveDraftPlanStructure,
            getDraftPlanStructure,
            saveDraftAnnounce,
            getDraftAnnounce,
            saveAnalysis,
            getAnalysis,
            saveIntroRedacted,
            getIntroRedacted,
            saveRedacParts,
            getRedacParts,
            saveConclusionRedacted,
            getConclusionRedacted }
