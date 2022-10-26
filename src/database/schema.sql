CREATE TABLE IF NOT EXISTS projects (
    -- Project meta information
    projectId INTEGER NOT NULL PRIMARY KEY,
    projectName TEXT NOT NULL,
    projectDescription TEXT,
    projectDate TEXT,

    -- Steps information
    /* Available steps are :
            > StepStart

            > StepPrelimApproach
            > StepPrelimUnderstand
            > StepPrelimBasics

            > StepDraftBasics
            > StepDraftPlan
            > StepDraftAnnounce

            > StepAnalysis

            > StepRedacAdvices
            > StepRedacIntro
            > StepRedacParts
            > StepRedacConclusion

            > StepProofReading

            > StepEnd
    */

    completedSteps TEXT,
    currentStep TEXT,

    -- Content variables
    prelimBasics TEXT,

    draftBasics TEXT,
    draftPlan TEXT,
    draftAnnounce TEXT,
    analysis TEXT
)
