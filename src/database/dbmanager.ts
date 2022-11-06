import { ipcRenderer } from 'electron';
const path = require('path');
const Database = require('better-sqlite3');
//const dbPath = '/data/app.db';
//const db = new Database(dbPath, {});

//ipcRenderer.invoke('getUserDataDirectory').then((result) => {
//    console.log(result);
//});

//const createTable = 'CREATE TABLE IF NOT EXISTS projects (projectId INTEGER NOT NULL PRIMARY KEY, projectName TEXT NOT NULL, projectDescription TEXT, projectDate TEXT, completedSteps TEXT, currentStep TEXT, prelimBasics TEXT, draftBasics TEXT, draftPlanStructure TEXT, draftPlanElements TEXT, draftAnnounce TEXT, analysis TEXT, introRedacted TEXT, p1Announce TEXT, p1s1Redacted TEXT, p1s2Redacted TEXT, p1s3Redacted TEXT, p1Transition TEXT, p2Announce TEXT, p2s1Redacted TEXT, p2s2Redacted TEXT, p2s3Redacted TEXT, p2Transition TEXT, p3Announce TEXT, p3s1Redacted TEXT, p3s2Redacted TEXT, p3s3Redacted TEXT, conclusionRedacted TEXT, everythingRedacted TEXT)';
//db.exec(createTable);

async function initializeDatabase() {
    console.log("Initializing database");
    const result = await ipcRenderer.invoke('getUserDataDirectory');
    const dbPath = path.join(result, "otis.db")
    console.log(dbPath);
    const db = new Database(dbPath, {});
    const createTable = 'CREATE TABLE IF NOT EXISTS projects (projectId INTEGER NOT NULL PRIMARY KEY, projectName TEXT NOT NULL, projectDescription TEXT, projectDate TEXT, completedSteps TEXT, currentStep TEXT, prelimBasics TEXT, draftBasics TEXT, draftPlanStructure TEXT, draftPlanElements TEXT, draftAnnounce TEXT, analysis TEXT, introRedacted TEXT, p1Announce TEXT, p1s1Redacted TEXT, p1s2Redacted TEXT, p1s3Redacted TEXT, p1Transition TEXT, p2Announce TEXT, p2s1Redacted TEXT, p2s2Redacted TEXT, p2s3Redacted TEXT, p2Transition TEXT, p3Announce TEXT, p3s1Redacted TEXT, p3s2Redacted TEXT, p3s3Redacted TEXT, conclusionRedacted TEXT, everythingRedacted TEXT)';
    await db.exec(createTable);
    return db
}

//const db = await initializeDatabase();
//export default db
export { initializeDatabase }
