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

const createNewProject = async function(projectData: ProjectRegistrationData) {

    const stmt = db.prepare('INSERT INTO projects (projectName, projectDescription) VALUES (?,?)');
    const result = stmt.run(projectData.projectName, projectData.projectDescription);
    return result.lastInsertRowid
}

export { getProjectFromId, getProjectNameFromId, createNewProject }
