require('dotenv').config();
const express = require('express');
const db = require('../src/config/db');

function SetUpMockApp(){
  const app = express();
  app.use(express.json());
  return app;
};

module.exports = {
  SetUpMockApp,
}