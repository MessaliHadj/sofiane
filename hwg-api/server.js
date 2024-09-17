const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

pgClient.on('connect', client => 
  client.query('CREATE TABLE IF NOT EXISTS values (number INTEGER)')
    .catch((err) => console.error('Error creating table:', err)));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/values/all', async (req, res) => {
  try {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
  } catch (err) {
    console.error('Error fetching values:', err);
    res.status(500).send({ error: 'Failed to retrieve values' });
  }
});

app.post('/values', async (req, res) => {
  const value = req.body.value;
  if (!value) 
    res.status(400).send({ error: 'Missing value in request body' });

  try {
    await pgClient.query('INSERT INTO values(number) VALUES($1)', [value]);
    res.send({ working: true });
  } catch (err) {
    console.error('Error inserting value:', err);
    res.status(500).send({ error: 'Failed to insert value' });
  }
});

app.listen(port, (err) => {
  err ?
    console.error('Api-Server startup error:', err)
  :
    console.log(`Api-Server listening on port ${port}`);
});