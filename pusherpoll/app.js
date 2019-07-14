const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const poll = require('./routes/poll');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/poll', poll);

app.listen(3000);