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

// POST new feedback
router.post('/', async (req, res) => {
    const client = await pool.connect();
    console.log(req.body);
    try {
        const {
            feeling,
            understanding,
            support,
            comments,
            flagged,
            date
        } = req.body;
        await client.query('BEGIN')
        const feedbackInsertResults = await client.query(`INSERT INTO "feedback" ("feeling", "understanding", "support", "comments", "flagged")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;`, [feeling, understanding, support, comments, flagged, date]);
        const clientId = feedbackInsertResults.rows[0].id;

        // await Promise.all(pizzas.map(pizza => {
        //     const insertLineItemText = `INSERT INTO "line_item" ("order_id", "pizza_id", "quantity") VALUES ($1, $2, $3)`;
        //     const insertLineItemValues = [orderId, pizza.id, pizza.quantity];
        //     return client.query(insertLineItemText, insertLineItemValues);
        // }));

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/feedback', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

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