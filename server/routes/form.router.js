const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


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
        } = req.body;
        await client.query('BEGIN')
        const feedbackInsertResults = await client.query(`INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
        VALUES ($1, $2, $3, $4)
        RETURNING id;`, [feeling, understanding, support, comments]);
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

module.exports = router;