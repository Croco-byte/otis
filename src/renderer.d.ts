export interface IElectronAPI {
  goToPage: (callback: any) => Promise<void>,
  registerProject: (projectData: ProjectRegistrationData) => Promise<boolean>,

  // Database queries
  getProjectFromId: (id: number) => Promise<any>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
