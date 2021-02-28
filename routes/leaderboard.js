const router = require('express').Router();
const db = require('../db/index');

router.get('/api/leaderboard', async (_, res) => {
    try {
        const userData = await db.query('SELECT username, score, img FROM users ORDER BY score DESC LIMIT 10;');
        res.json({
            status: 1,
            userInfo: userData.rows,
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            messsage: "some error occured... Try again.",
        })
    }
})

module.exports = router;