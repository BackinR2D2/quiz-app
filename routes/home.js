const router = require('express').Router();
const auth = require('./auth');
const axios = require('axios');
const db = require('../db/index');

router.post('/api/game', async (req, res) => {
    try {
        const { category, difficulty, type } = req.body;
        const getGameData = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`);
        res.status(200).json({
            gameData: getGameData.data,
            status: 1,
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            messsage: "some error occured... Try again.",
        })
    }
})

router.put('/api/update-score', auth, async (req, res) => {
    try {
        const id = req.user;
        const { score, rightAnswers } = req.body;
        const numberOfRightAnswers = rightAnswers.length;
        const updateHistory = await db.query('INSERT INTO history (userid, score, score_value) VALUES ($1, $2, $3)', [id, numberOfRightAnswers, score]);
        if (numberOfRightAnswers !== 0) {
            const updateScore = await db.query('UPDATE users SET score = score + $1 WHERE id = $2', [score, id]);
        }
        res.status(204).json({
            status: 1,
            message: 'Updated',
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            messsage: "some error occured... Try again.",
        })
    }
})

module.exports = router;