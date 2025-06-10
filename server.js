const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'nodeapp';
const COLLECTION = 'users';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // To serve index.html

let db, usersCollection;

MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    usersCollection = db.collection(COLLECTION);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Get all users
app.get('/getUsers', async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Add new user
app.post('/addUser', async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    await usersCollection.insertOne({ email, username, password });
    res.json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add user' });
  }
});