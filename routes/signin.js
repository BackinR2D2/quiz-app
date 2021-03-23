const router = require('express').Router();
const db = require('../db/index');

router.post('/api/signin', async (req, res) => {
    try {
        const { response: { profileObj, tokenObj } } = req.body;
        const checkUser = await db.query("SELECT id FROM users WHERE ID = $1", [profileObj.googleId]);
        if (!checkUser.rows[0]) {
            const insertUserData = await db.query("INSERT INTO users (id, username, email, img) VALUES ($1, $2, $3, $4)", [profileObj.googleId, profileObj.name, profileObj.email, profileObj.imageUrl]);
            return res.status(201).json({
                status: 1,
                token: tokenObj.id_token,
            })
        } else {
            return res.json({
                status: 1,
                message: 'Account is saved.',
                token: tokenObj.id_token,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 0,
            messsage: `some error occured... Try again.`,
        })
    }
})

module.exports = router;