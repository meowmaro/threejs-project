const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const usersRoute = require('./routes/users');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());
app.use('/users', usersRoute);

// MongoDB connection URI
const mongoURI =
  'mongodb+srv://maro:Quantix123!@threejs.3iyic.mongodb.net/?retryWrites=true&w=majority&appName=threejs';

let db;
MongoClient.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    db = client.db();
    console.log('Connected to MongoDB');
  })
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// login
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

// sign up
app.post('/data/users', (req, res) => {
  const collection = db.collection('users');
  const newData = req.body;

  console.log('Received data:', newData);

  collection
    .insertOne({ name: newData.name, password: newData.password })
    .then((result) => {
      console.log('Added user:', result);
      res.json(result);
    })
    .catch((err) => {
      console.log('Error signing up:', err);
      res.status(500).json({ error: 'Error signing up' });
    });
});

//get user
app.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const collection = db.collection('users');
  try {
    console.log(`Fetching user with ID: ${userId}`);
    const result = await collection.findOne({ _id: new ObjectId(userId) });
    if (result) {
      console.log('User found:', result);
      res.send({
        success: true,
        message: 'UserId fetched successfully',
        data: result,
        id: result._id,
      });
    } else {
      console.log('User not found');
      res.send({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.send({
      success: false,
      message: 'Failed to fetch UserId',
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
