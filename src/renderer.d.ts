export interface IElectronAPI {
  goToPage: (callback: any) => Promise<void>,
  registerProject: (projectData: ProjectRegistrationData) => ProjectRegistrationResult,

  // Database queries
  getProjectFromId: (id: number) => any,
  getProjectNameFromId: (id: number) => any,
  getProjectMetaFromId: (id: number) => any,
  getAllProjectsMeta: () => any,
  deleteProjectFromId: (id: number) => any,
  getProjectStepInfoFromId: (id: number) => any,
  updateCurrentStep: (id: number, currentStep: string) => any,
  updateCompletedSteps: (id: number, completedSteps: string) => any,
  updateCurrentAndCompletedSteps: (id: number, currentStep: string, completedSteps: string) => any,
  saveBasicInfo: (id: number, basicInfo: BasicInfoData) => any,
  getBasicInfo: (id: number) => any,
  getDraftBasics: (id: number) => any,
  saveDraftBasics: (id: number, draftBasics: DraftBasicData) => any,
  saveDraftPlanData: (id: number, draftPlanData: DraftPlanData) => any,
  getDraftPlanData: (id: number) => any,
  saveDraftPlanElements: (id: number, draftPlanElements: DraftPlanElementsData) => any,
  getDraftPlanElements: (id: number) => any,
  saveDraftPlanStructure: (id: number, draftPlanStructure: any) => any,
  getDraftPlanStructure: (id: number) => any,
  saveDraftAnnounce: (id: number, draftAnnounce: string) => any,
  getDraftAnnounce: (id: number) => any,
  saveAnalysis: (id: number, analysis: any) => any,
  getAnalysis: (id: number) => any,
  saveIntroRedacted: (id: number, introRedacted: string) => any,
  getIntroRedacted: (id: number) => any,
  saveRedacParts: (id: number, toSave: [string, srting, string, string, string, string, string, string, string, string, string, string, string, string]) => any,
  getRedacParts: (id: number) => any,
  saveConclusionRedacted: (id: number, conclusionRedacted: any) => any,
  getConclusionRedacted: (id: number) => any,
  saveEverythingRedacted: (id: number, everythingRedacted: any) => any,
  getEverythingRedacted: (id: number) => any,
  buildFinalRedaction: (id: number) => any
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
