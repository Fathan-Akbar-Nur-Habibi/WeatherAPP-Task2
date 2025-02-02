const express = require('express');
const router = express.Router();
const db = require('./db');
const PDFDocument = require('pdfkit'); 

// Route for  root URL
router.get('', (req, res) => {
    res.status(200);
    res.send('Welcome to the Weather App API!'); 
});
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

// Export to PDF
router.get('/weather/export/pdf', (req, res) => {
    const doc = new PDFDocument();
    let filename = 'weather_data.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res); // Pipe the PDF into the response

    // Fetch data from the database
    const query = `SELECT * FROM weather`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Add content to the PDF
        doc.fontSize(25).text('Weather Data', { align: 'center' });
        doc.moveDown();

        rows.forEach(row => {
            doc.fontSize(12).text(`Location: ${row.location}`);
            doc.text(`Start Date: ${row.startDate}`);
            doc.text(`End Date: ${row.endDate}`);
            doc.text(`Temperature: ${row.temperature}°C`);
            doc.moveDown();
        });

        doc.end(); 
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