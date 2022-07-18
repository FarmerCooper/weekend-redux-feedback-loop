const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all the feedback that has been provided, populate the data on the admin page
router.get('/', (req, res) => {
    // Find all feedback and return them
    pool.query('SELECT * FROM "feedback";').then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /replace', error);
        res.sendStatus(500);  
    });
})

// DELETE feedback row
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "feedback" WHERE id=$1', [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error DELETE /replace', error);
        res.sendStatus(500);
    })
});

module.exports = router;