import db from './dbmanager'
import { ProjectRegistrationData } from '../types/projectRegistration.interface'


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

const createNewProject = function(projectData: ProjectRegistrationData) {
    const stmt = db.prepare("INSERT INTO projects (projectName, projectDescription, projectDate) VALUES (?,?, (SELECT strftime('%d/%m/%Y %Hh%M')))");
    const result = stmt.run(projectData.projectName, projectData.projectDescription);
    return result.lastInsertRowid
}

const deleteProjectFromId = function(id: number) {
    const stmt = db.prepare("DELETE FROM projects WHERE projectId = ?;");
    const result = stmt.run(id);
    return result.changes
}

export { getProjectFromId, getProjectNameFromId, getProjectMetaFromId, getAllProjectsMeta, createNewProject, deleteProjectFromId }
