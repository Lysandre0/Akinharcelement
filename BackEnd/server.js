const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'votre_utilisateur',
  host: 'localhost',
  database: 'mydb',
  password: 'votre_mot_de_passe',
  port: 5432, // Port par défaut de PostgreSQL
});

// Endpoint pour obtenir toutes les réponses
app.get('/answers', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM answers');
    const answers = result.rows;
    client.release();
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses.' });
  }
});

// Endpoint pour obtenir toutes les questions
app.get('/questions', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM questions');
    const questions = result.rows;
    client.release();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des questions.' });
  }
});

// Endpoint pour mettre à jour une réponse existante
app.put('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params; // Récupère l'ID de la réponse à mettre à jour
    const { type } = req.body; // Récupère les données de la requête PUT

    // Vérifiez que le type existe
    if (!type) {
      return res.status(400).json({ message: 'Le type est requis.' });
    }

    // Effectue la requête SQL de mise à jour
    const query = 'UPDATE answers SET type = $1 WHERE id = $2';
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


// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
