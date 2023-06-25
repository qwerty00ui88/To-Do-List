const express = require('express');
const app = express();

const maria = require('./config/database');
maria.connect();

maria.query('SELECT * from Todos', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

maria.end();

const cors = require('cors');
app.use(cors());

app.get('/todos', function (req, res) {});

app.post('/todos', function (req, res) {
  res.json('post ok');
});

app.delete('/todos', function (req, res) {
  res.json('delete ok');
});

app.patch('/todos', function (req, res) {
  res.json('patch ok');
});

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001');
});
