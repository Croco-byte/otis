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
    analysis TEXT,

    introRedacted TEXT,
    p1Announce TEXT,
    p1s1Redacted TEXT,
    p1s2Redacted TEXT,
    p1s3Redacted TEXT,
    p1Transition TEXT,
    p2Announce TEXT,
    p2s1Redacted TEXT,
    p2s2Redacted TEXT,
    p2s3Redacted TEXT,
    p2Transition TEXT,
    p3Announce TEXT,
    p3s1Redacted TEXT,
    p3s2Redacted TEXT,
    p3s3Redacted TEXT,
    conclusionRedacted TEXT         -- { "summary": string, "issueAnswer": string, "opening": string }
)
