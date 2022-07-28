const express = require('express');
const app = express();

require('./startup/db');
require('./startup/routes')(app);

module.exports = app