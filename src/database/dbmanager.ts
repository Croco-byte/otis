const Database = require('better-sqlite3');
const db = new Database('/data/app.db', {});

export default db
