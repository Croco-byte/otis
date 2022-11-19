import { initializeDatabase } from './dbmanager'
import { ProjectRegistrationData } from '../types/projectRegistration.interface'
import { BasicInfoData, DraftBasicData, DraftPlanElementsData, DraftPlanData } from '../types/stepsTypes.interface'

let db: any;
initializeDatabase().then((result) => db = result);

function escapeHtml(unsafe: string | undefined)
{
    if (typeof unsafe !== 'string') { return 'no content'; }
    return (unsafe as string)
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

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
                    'StepDraftRecap':           false,
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

const getEverythingRedacted = function(id: number) {
    const stmt = db.prepare('SELECT everythingRedacted FROM projects WHERE projectId = ?;')
    const result = stmt.get(id);
    return result
}

const saveEverythingRedacted = function(id: number, everythingRedacted: string) {
    const stmt = db.prepare("UPDATE projects SET everythingRedacted = ? WHERE projectId = ?;");
    const result = stmt.run(everythingRedacted, id);
    return result.changes
}

const buildDraftRecap = function(id: number) {
    let redacted = "";
    let prelimBasics: any = { "theme": "", "genre": "", "type": "", "goal": "" };
    let draftBasics: any = { "orderCheck": false, "author": "", "work": "", "text": "", "issue": "" } ;
    let draftPlanStructure: any = {};
    let draftPlanElements: any = [];
    let p1s1: any = [];
    let p1s2: any = [];
    let p1s3: any = [];
    let p2s1: any = [];
    let p2s2: any = [];
    let p2s3: any = [];
    let p3s1: any = [];
    let p3s2: any = [];
    let p3s3: any = [];

    const stmt = db.prepare('SELECT projectName, projectDate, prelimBasics, draftBasics, draftPlanStructure, draftPlanElements, draftAnnounce FROM projects WHERE projectId = ?;');
    const result = stmt.get(id);

    if (result.prelimBasics) {
        prelimBasics = JSON.parse(result.prelimBasics)
    } 

    if (result.draftBasics) {
        draftBasics = JSON.parse(result.draftBasics);
    }

    if (result.draftPlanElements) {
        draftPlanElements = (JSON.parse(result.draftPlanElements)).elements
    }

    for (var i = 0; i < draftPlanElements.length; i++) {
            if (draftPlanElements[i].category === 'p1s1' ) { p1s1.push(draftPlanElements[i].data); continue }
            if (draftPlanElements[i].category === 'p1s2' ) { p1s2.push(draftPlanElements[i].data); continue }
            if (draftPlanElements[i].category === 'p1s3' ) { p1s3.push(draftPlanElements[i].data); continue }

            if (draftPlanElements[i].category === 'p2s1' ) { p2s1.push(draftPlanElements[i].data); continue }
            if (draftPlanElements[i].category === 'p2s2' ) { p2s2.push(draftPlanElements[i].data); continue }
            if (draftPlanElements[i].category === 'p2s3' ) { p2s3.push(draftPlanElements[i].data); continue }

            if (draftPlanElements[i].category === 'p3s1' ) { p3s1.push(draftPlanElements[i].data); continue }
            if (draftPlanElements[i].category === 'p3s2' ) { p3s2.push(draftPlanElements[i].data); continue }
            if (draftPlanElements[i].category === 'p3s3' ) { p3s3.push(draftPlanElements[i].data); continue }
    }

    if (result.draftPlanStructure) {
        draftPlanStructure = JSON.parse(result.draftPlanStructure);
    } else {
        draftPlanStructure = { "parts": '2', "partOne": { "title": "Première partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                             "partTwo": { "title": "Deuxième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                             "partThree": { "title": "Troisième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" }}
    }

    redacted += '<h1 style="text-align: center;">' + escapeHtml(result.projectName) + " - Brouillon</h1>";
    redacted += '<h3 style="text-align: center;">' + escapeHtml(result.projectDate) + "</h3></div>";
    redacted += "<br/><br/>";
    redacted += "<h3>Les bases</h3><br/>";
    redacted += "<h6>➤ Le thème du texte</h6>";
    redacted += "<p>" + escapeHtml(prelimBasics.theme) + "</p>";
    redacted += "<h6>➤ Le genre du texte</h6>";
    redacted += "<p>" + escapeHtml(prelimBasics.genre) + "</p>";
    redacted += "<h6>➤ Le type du texte</h6>";
    redacted += "<p>" + escapeHtml(prelimBasics.type) + "</p>";
    redacted += "<h6>➤ Le but du texte</h6>";
    redacted += "<p>" + escapeHtml(prelimBasics.goal) + "</p>";
    
    redacted += "<br/><br/>";
    redacted += "<h3>Brouillon: éléments de base</h3><br/>";
    redacted += "<h6>➤ L'auteur</h6>";
    redacted += "<p>" + escapeHtml(draftBasics.author) + "</p>";
    redacted += "<h6>➤ L'oeuvre'</h6>";
    redacted += "<p>" + escapeHtml(draftBasics.work) + "</p>";
    redacted += "<h6>➤ Le texte</h6>";
    redacted += "<p>" + escapeHtml(draftBasics.text) + "</p>";
    redacted += "<h6>➤ La problématique</h6>";
    redacted += "<p>" + escapeHtml(prelimBasics.issue) + "</p>";

    redacted += "<br/><br/>";
    redacted += "<h3>Brouillon: plan et éléments</h3><br/>";

    redacted += "<h4>&emsp;<b><u>I. " + escapeHtml(draftPlanStructure.partOne.title) + "</b></u></h4>";
    redacted += "<h5><i>&emsp;1. " + escapeHtml(draftPlanStructure.partOne.subpartOneTitle) + "</i></h5>";
    redacted += "<ul>"
    for (var i = 0; i < p1s1.length; i++) {
        redacted += "<li>" + escapeHtml(p1s1[i]) + "</li>"
    }
    redacted += "</ul>"

    redacted += "<h5><i>&emsp;2. " + escapeHtml(draftPlanStructure.partOne.subpartTwoTitle) + "</i></h5>";
    redacted += "<ul>"
    for (var i = 0; i < p1s2.length; i++) {
        redacted += "<li>" + escapeHtml(p1s2[i]) + "</li>"
    }
    redacted += "</ul>"

    if (draftPlanStructure.partOne.subparts === '3') {
        redacted += "<h5><i>&emsp;3. " + escapeHtml(draftPlanStructure.partOne.subpartThreeTitle) + "</i></h5>";
        redacted += "<ul>"
        for (var i = 0; i < p1s3.length; i++) {
            redacted += "<li>" + escapeHtml(p1s3[i]) + "</li>"
        }
        redacted += "</ul>"
    }

    redacted += "<h4>&emsp;<b><u>II. " + escapeHtml(draftPlanStructure.partTwo.title) + "</b></u></h4>";
    redacted += "<h5><i>&emsp;1. " + escapeHtml(draftPlanStructure.partTwo.subpartOneTitle) + "</i></h5>";
    redacted += "<ul>"
    for (var i = 0; i < p2s1.length; i++) {
        redacted += "<li>" + escapeHtml(p2s1[i]) + "</li>"
    }
    redacted += "</ul>"

    redacted += "<h5><i>&emsp;2. " + escapeHtml(draftPlanStructure.partTwo.subpartTwoTitle) + "</i></h5>";
    redacted += "<ul>"
    for (var i = 0; i < p2s2.length; i++) {
        redacted += "<li>" + escapeHtml(p2s2[i]) + "</li>"
    }
    redacted += "</ul>"

    if (draftPlanStructure.partTwo.subparts === '3') {
        redacted += "<h5><i>&emsp;3. " + escapeHtml(draftPlanStructure.partTwo.subpartThreeTitle) + "</i></h5>";
        redacted += "<ul>"
        for (var i = 0; i < p2s3.length; i++) {
            redacted += "<li>" + escapeHtml(p2s3[i]) + "</li>"
        }
        redacted += "</ul>"
    }

    if (draftPlanStructure.parts === '3') {
        redacted += "<h4>&emsp;<b><u>III. " + escapeHtml(draftPlanStructure.partThree.title) + "</b></u></h4>";
        redacted += "<h5><i>&emsp;1. " + escapeHtml(draftPlanStructure.partThree.subpartOneTitle) + "</i></h5>";
        redacted += "<ul>"
        for (var i = 0; i < p3s1.length; i++) {
            redacted += "<li>" + escapeHtml(p3s1[i]) + "</li>"
        }
        redacted += "</ul>"

        redacted += "<h5><i>&emsp;2. " + escapeHtml(draftPlanStructure.partThree.subpartTwoTitle) + "</i></h5>";
        redacted += "<ul>"
        for (var i = 0; i < p3s2.length; i++) {
            redacted += "<li>" + escapeHtml(p3s2[i]) + "</li>"
        }
        redacted += "</ul>"

        if (draftPlanStructure.partThree.subparts === '3') {
            redacted += "<h5><i>&emsp;3. " + escapeHtml(draftPlanStructure.partThree.subpartThreeTitle) + "</i></h5>";
            redacted += "<ul>"
            for (var i = 0; i < p3s3.length; i++) {
                redacted += "<li>" + escapeHtml(p3s3[i]) + "</li>"
            }
            redacted += "</ul>"
        }
    }

    redacted += "<br/><br/>";
    redacted += "<h3>Brouillon: Annonce de plan</h3><br/>";
    redacted += escapeHtml(result.draftAnnounce);

    return redacted;
}

const buildFinalRedaction = function(id: number) {
    let redacted = "";
    let draftPlanStructure: any = {};
    let conclusion: any = {};

    const stmt = db.prepare('SELECT projectName, projectDate, draftPlanStructure, introRedacted, p1Announce, p1s1Redacted, p1s2Redacted, p1s3Redacted, p1Transition, p2Announce, p2s1Redacted, p2s2Redacted, p2s3Redacted, p2Transition, p3Announce, p3s1Redacted, p3s2Redacted, p3s3Redacted, conclusionRedacted FROM projects WHERE projectId = ?;');
    const result = stmt.get(id);

    if (result.draftPlanStructure) {
            draftPlanStructure = JSON.parse(result.draftPlanStructure);
        } else {
            draftPlanStructure = { "parts": '2', "partOne": { "title": "Première partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partTwo": { "title": "Deuxième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partThree": { "title": "Troisième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" }}
        }

    if (result.conclusionRedacted) {
            conclusion = JSON.parse(result.conclusionRedacted);
        } else {
            conclusion = { "summary": "", "issueAnswer": "", "opening": ""};
        }

    redacted += '<h1 style="text-align: center;">' + escapeHtml(result.projectName) + "</h1>";
    redacted += '<h3 style="text-align: center;">' + escapeHtml(result.projectDate) + "</h3></div>";
    redacted += "<br/><br/>";
    redacted += "&emsp;" + escapeHtml(result.introRedacted) + "<br/><br/>";
    //redacted += "<h3>&emsp;<b><u>I. " + escapeHtml(draftPlanStructure.partOne.title) + "</b></u></h3>";
    redacted += "<p>&emsp;" + escapeHtml(result.p1Announce) + "</p><br/>";
    //redacted += "<h4><i>&emsp;1. " + escapeHtml(draftPlanStructure.partOne.subpartOneTitle) + "</i></h4>";
    redacted += "<p>&emsp;" + escapeHtml(result.p1s1Redacted) + "</p><br/>";
    //redacted += "<h4><i>&emsp;2. " + escapeHtml(draftPlanStructure.partOne.subpartTwoTitle) + "</i></h4>";
    redacted += "<p>&emsp;" + escapeHtml(result.p1s2Redacted) + "</p><br/>";

    if (draftPlanStructure.partOne.subparts === '3') {
        //redacted += "<h4><i>&emsp;3. " + escapeHtml(draftPlanStructure.partOne.subpartThreeTitle) + "</i></h4>";
        redacted += "<p>&emsp;" + escapeHtml(result.p1s3Redacted) + "</p><br/>";
    }

    redacted += "<br/><p>&emsp;" + escapeHtml(result.p1Transition) + "</p><br/>";
    //redacted += "<h3>&emsp;<b><u>II. " + escapeHtml(draftPlanStructure.partTwo.title) + "</b></u></h3>";
    redacted += "<p>&emsp;" + escapeHtml(result.p2Announce) + "</p><br/>";
    //redacted += "<h4><i>&emsp;1. " + escapeHtml(draftPlanStructure.partTwo.subpartOneTitle) + "</i></h4>";
    redacted += "<p>&emsp;" + escapeHtml(result.p2s1Redacted) + "</p><br/>";
    //redacted += "<h4><i>&emsp;2. " + escapeHtml(draftPlanStructure.partTwo.subpartTwoTitle) + "</i></h4>";
    redacted += "<p>&emsp;" + escapeHtml(result.p2s2Redacted) + "</p><br/>";

    if (draftPlanStructure.partTwo.subparts === '3') {
        //redacted += "<h4><i>&emsp;3. " + escapeHtml(draftPlanStructure.partTwo.subpartThreeTitle) + "</i></h4>";
        redacted += "<p>&emsp;" + escapeHtml(result.p2s3Redacted) + "</p><br/>";
    }

    if (draftPlanStructure.parts === '3') {
        redacted += "<br/><p>&emsp;" + escapeHtml(result.p2Transition) + "</p><br/>";
        //redacted += "<h3>&emsp;<b><u>III. " + escapeHtml(draftPlanStructure.partThree.title) + "</u></b></h3>";
        redacted += "<p>&emsp;" + escapeHtml(result.p3Announce) + "</p><br/>";
        //redacted += "<h4><i>&emsp;1. " + escapeHtml(draftPlanStructure.partThree.subpartOneTitle) + "</i></h4>";
        redacted += "<p>&emsp;" + escapeHtml(result.p3s1Redacted) + "</p><br/>";
        //redacted += "<h4><i>&emsp;2. " + escapeHtml(draftPlanStructure.partThree.subpartTwoTitle) + "</i></h4>";
        redacted += "<p>&emsp;" + escapeHtml(result.p3s2Redacted) + "</p><br/>";

        if (draftPlanStructure.partThree.subparts === '3') {
        //    redacted += "<h4><i>&emsp;3. " + escapeHtml(draftPlanStructure.partThree.subpartThreeTitle) + "</i></h4>";
            redacted += "<p>&emsp;" + escapeHtml(result.p3s3Redacted) + "</p><br/>";
        }
    }

    redacted += "<br/><p>&emsp;" + escapeHtml(conclusion.summary) + "\n" + escapeHtml(conclusion.issueAnswer) + "\n" + escapeHtml(conclusion.opening) + "</p>";

    return redacted;
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
            getConclusionRedacted,
            saveEverythingRedacted,
            getEverythingRedacted,
            buildFinalRedaction,
            buildDraftRecap }
