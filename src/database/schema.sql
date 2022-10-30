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
    draftPlanStructure TEXT,        -- { "parts": number, "partOne_subparts": number, "partTwo_subparts": number, "partThree_subparts": number }
    draftPlanData TEXT,             /* { "uncategorized": [],
                                            "part_one": { "title": string, "elements": { "uncategorized": [], "s1": [], "s2": [], "s3": [] } },
                                            "part_two": { "title": string, "elements": { "uncategorized": [], "s1": [], "s2": [], "s3": [] } },
                                            "part_three": { "title": string, "elements": { "uncategorized": [], "s1": [], "s2": [], "s3": [] } }
                                        } */
    
    draftAnnounce TEXT,
    analysis TEXT
)
