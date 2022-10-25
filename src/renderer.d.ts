export interface IElectronAPI {
  goToPage: (callback: any) => Promise<void>,
  registerProject: (projectData: ProjectRegistrationData) => ProjectRegistrationResult,

  // Database queries
  getProjectFromId: (id: number) => any,
  getProjectNameFromId: (id: number) => any,
  getProjectMetaFromId: (id: number) => any,
  getAllProjectsMeta: () => any,
  deleteProjectFromId: (id: number) => any,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
