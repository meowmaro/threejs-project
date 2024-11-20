const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const usersRoute = require('./routes/users');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const mongoURI =
  'mongodb+srv://maro:Quantix123!@threejs.3iyic.mongodb.net/?retryWrites=true&w=majority&appName=threejs';

let db;
MongoClient.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    db = client.db(); // Database instance
    console.log('Connected to MongoDB');
  })
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// GET /users - Get all users
// GET /users/:id - Get single user by ID
// POST /users - Create new user
// PUT /users/:id - Update existing user by ID
// DELETE /users/:id - Delete user by ID

app.use('/users', usersRoute);

// Example route to fetch data from MongoDB
/* app.get('/data', (req, res) => {
  const collection = db.collection('test');
  collection
    .find()
    .toArray()
    .then((items) => res.json(items))
    .catch((error) => res.status(500).json({ error: 'Failed to fetch data' }));
});

app.get('/data/users', (req, res) => {
  const collection = db.collection('test');
  collection
    .find()
    .toArray()
    .then((items) => res.json(items))
    .catch((error) => res.status(500).json({ error: 'Failed to fetch data' }));
});

// Example route to insert data into MongoDB
app.post('/data/users', (req, res) => {
  const collection = db.collection('users');
  const newData = req.body;

  collection
    .insertOne(newData)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json({ error: 'Failed to insert data' }));
}); */

app.post('/data/login', (req, res) => {
  const collection = db.collection('users');
  const newData = req.body;

  console.log(newData);

  collection
    .findOne({ name: newData.username, password: newData.password })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//hi
