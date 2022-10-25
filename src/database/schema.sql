CREATE TABLE IF NOT EXISTS projects (
    projectId INTEGER NOT NULL PRIMARY KEY,
    projectName TEXT NOT NULL,
    projectDescription TEXT,
    projectDate TEXT,
    textBasics TEXT,
    introBasics TEXT,
    introPlan TEXT,
    introAnnounce TEXT,
    analysisTable TEXT
)
