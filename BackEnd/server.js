const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: '172.168.1.120',
  database: 'WS_DB',
  password: 'password',
  port: 5432, // Port par défaut de PostgreSQL
});

app.get('/answers', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM akinharcelement.answers');
    const answers = result.rows;
    client.release();
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses.' });
  }
});

app.get('/questions', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM akinharcelement.questions;');
    const questions = result.rows;
    client.release();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des questions.' });
  }
});

app.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'SELECT * FROM akinharcelement.questions; WHERE id = $1';
    const values = [id];

    const client = await pool.connect();
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Question non trouvée.' });
    } else {
      const question = result.rows[0];
      res.json(question);
    }

    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la question.' });
  }
});

app.put('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; 
    if (!type) {
      return res.status(400).json({ message: 'Le type est requis.' });
    }

    const query = 'UPDATE akinharcelement.answers SET type = $1 WHERE id = $2';
    const values = [type, id];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    res.status(200).json({ message: 'Réponse mise à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la réponse.' });
  }
});

app.post('/questions', async (req, res) => {
  try {
    const { question, score } = req.body;

    if (!question || !score) {
      return res.status(400).json({ message: 'Question et score sont requis.' });
    }

    const query = 'INSERT INTO akinharcelement.questions (question, type, score) VALUES ($1, $2, $3)';
    const values = [question, score];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    res.status(201).json({ message: 'Question créée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la question.' });
  }
});

app.use(express.json());

app.post('/answers', async (req, res) => {
  try {
    const { type } = req.body; 
    if (!type) {
      return res.status(400).json({ message: 'Le type de réponse est requis.' });
    }
    const query = 'INSERT INTO answers (type) VALUES ($1)';
    const values = [type];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    res.status(201).json({ message: 'Réponse créée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la réponse.' });
  }
});

app.post('/answers', async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: 'Le type de réponse est requis.' });
    }

    const query = 'INSERT INTO answers (type) VALUES ($1)';
    const values = [type];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    res.status(201).json({ message: 'Réponse créée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la réponse.' });
  }
});

app.get('/answerPercentage', async (req, res) => {
  try {
    // Effectue la requête SQL pour obtenir le pourcentage de types de réponses différents
    const query = `SELECT type, (COUNT(*) * 100.0) / (SELECT COUNT(*) FROM akinharcelement.answers) AS percentage FROM akinharcelement.answers GROUP BY type;`;

    const client = await pool.connect();
    const result = await client.query(query);

    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des pourcentages.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
