const express = require('express');
const router = express.Router();
const db = require('./db');


// Create
router.post('/weather', (req, res) => {
    const { location, startDate, endDate, temperature } = req.body;
    const query = `INSERT INTO weather (location, startDate, endDate, temperature) VALUES (?, ?, ?, ?)`;
    db.run(query, [location, startDate, endDate, temperature], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Read
router.get('/weather', (req, res) => {
    const query = `SELECT * FROM weather`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update
router.put('/weather/:id', (req, res) => {
    const { id } = req.params;
    const { location, startDate, endDate, temperature } = req.body;
    const query = `UPDATE weather SET location = ?, startDate = ?, endDate = ?, temperature = ? WHERE id = ?`;
    db.run(query, [location, startDate, endDate, temperature, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ updatedID: id });
    });
});

// Delete
router.delete('/weather/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM weather WHERE id = ?`;
    db.run(query, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ deletedID: id });
    });
});

module.exports = router;