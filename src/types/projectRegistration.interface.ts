export interface ProjectRegistrationData
{
    projectName: string;
    projectDescription?: string;
}

export interface ProjectRegistrationResult
{
    success: boolean;
    projectId?: number;
    error?: string;
}
