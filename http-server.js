const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config()
const cors = require('cors')
let port = process.env.PORT
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors({
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => (console.log('the server listen (http): ' + port)));