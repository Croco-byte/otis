import { ProjectRegistrationData, ProjectRegistrationResult } from '../types/projectRegistration.interface'
import { createNewProject } from '../database/dbqueries'

const registerProject = async function(projectData: ProjectRegistrationData): Promise<ProjectRegistrationResult> {
    if (!projectData.projectName) {
        return { success: false, error: "Le nom du projet ne peut pas être vide." }
    }
    const re = /^[\u00C0-\u024F\u1E00-\u1EFF\w\d\s-]+$/;
    if (!re.test(projectData.projectName)) {
        return { success: false, error: "Le nom du projet ne peut contenir que des lettres, nombres, espaces, et tirets." }
    }
    if (projectData.projectName.length > 100) {
        return { success: false, error: "Le nom du projet ne peut faire plus de 100 caractères." }
    }
    if (projectData.projectDescription && projectData.projectDescription.length > 500) {
        return { success: false, error: "La description ne peut faire plus de 500 caractères." }
    }

    const createdProjectId = await createNewProject(projectData);

    return { success: true, projectId: createdProjectId }
}

export { registerProject }
