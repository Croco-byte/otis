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
            > StepDraftPlanEnum
            > StepDraftPlanParts
            > StepDraftPlanSubparts
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
    prelimBasics TEXT,              -- { "orderCheck": boolean, "author": "", "work": "", "text/extract": "", "issue": "" } 

    draftBasics TEXT,
    draftPlanStructure TEXT,        /* { "parts": number, "partOne": { "title": string, "subparts": string, "subpartOneTitle": string, "subpartTwoTitle": string, "subpartThreeTitle": string },
                                                          "partTwo": { "title": string, "subparts": string, "subpartOneTitle": string, "subpartTwoTitle": string, "subpartThreeTitle": string },
                                                          "partThree": { "title": string, "subparts": string, "subpartOneTitle": string, "subpartTwoTitle": string, "subpartThreeTitle": string } */
    draftPlanElements TEXT,         -- { "elements": [ {"data": string, "category": string}, ... ] }
    
    draftAnnounce TEXT,
    analysis TEXT
)
