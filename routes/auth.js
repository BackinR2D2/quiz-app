const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("811500721671-j3ucp4m1iskpve2je2244fa9v4iibs57.apps.googleusercontent.com");

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "811500721671-j3ucp4m1iskpve2je2244fa9v4iibs57.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        if (userid) {
            req.user = userid;
            next();
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
        }
    }
    verify()
        .catch((e) => {
            res.status(401).json({
                status: 0,
                message: 'Unauthorized'
            })
        });
}