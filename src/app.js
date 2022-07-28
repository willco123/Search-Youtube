const express = require('express');
const app = express();

require('./config/db');
require('./config/routes')(app);

module.exports = app