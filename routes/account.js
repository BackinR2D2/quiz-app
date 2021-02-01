const router = require('express').Router();
const auth = require('./auth');
const db = require('../db/index');

router.get('/account', auth, async (req, res) => {
    try {
        const uid = req.user;
        const userInfo = await db.query("SELECT username, email, score, img, timestamp FROM users WHERE id = $1", [uid]);
        const userHistory = await db.query("SELECT history.score, history.timestamp, history.score_value FROM users INNER JOIN history ON users.id = history.userid WHERE users.id = $1", [uid]);
        res.json({
            status: 1,
            userInfo: userInfo.rows[0],
            userHistory: userHistory.rows,
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            messsage: "some error occured... Try again.",
        })
    }
})

router.put('/update-username', auth, async (req, res) => {
    try {
        const id = req.user;
        const { newUsername } = req.body;
        const updateUsername = await db.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING username', [newUsername, id]);
        res.status(201).json({
            status: 1,
            updatedUsername: updateUsername.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            messsage: "some error occured... Try again.",
        })
    }
})

router.delete('/delete-account', auth, async (req, res) => {
    try {
        const id = req.user;
        const deleteHistory = await db.query('DELETE FROM history WHERE userid = $1', [id]);
        const deleteAccount = await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).json({
            status: 1,
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            messsage: "some error occured... Try again.",
        })
    }
})

module.exports = router;