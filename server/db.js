const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../db/weather.db'), (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the weather database.');
        db.run(`CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location TEXT,
            startDate TEXT,
            endDate TEXT,
            temperature REAL
        )`);
    }
});

module.exports = db;