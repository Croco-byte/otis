export interface IElectronAPI {
  goToPage: (callback: any) => Promise<void>,
  registerProject: (projectData: ProjectRegistrationData) => Promise<boolean>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
