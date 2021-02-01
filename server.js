require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const signin = require('./routes/signin');
const account = require('./routes/account');
const home = require('./routes/home');
const leaderboard = require('./routes/leaderboard');

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use(signin);
app.use(account);
app.use(home);
app.use(leaderboard);

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})