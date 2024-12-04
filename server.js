const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const usersRoute = require('./routes/users');
const jwt = require('jsonwebtoken');
const { openDelimiter } = require('ejs');
const app = express();
const port = 3000;
const JWT_SECRET = 'the-best-secret';

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());
app.use('/users', usersRoute);

// MongoDB connection URI
const mongoURI =
  'mongodb+srv://maro:Quantix123!@threejs.3iyic.mongodb.net/?retryWrites=true&w=majority&appName=threejs';

let db;
MongoClient.connect(mongoURI)
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
        const token = jwt.sign(
          {
            userId: result._id,
            username: result.name,
            iss: 'http://localhost:3000',
          },
          JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.json({ token, userId: result._id, username: result.name });
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
      if (result) {
        const token = jwt.sign(
          {
            userId: result._id,
            username: result.name,
            iss: 'http://localhost:3000',
          },
          JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.json({ token, userId: result._id, username: result.name });
      }
      // Custom response format
      const response = {
        success: true,
        userId: result.insertedId,
        name: newData.name,
        message: 'User added successfully',
      };

      console.log('Added user:', response);
      res.json(response);
    })
    .catch((err) => {
      console.log('Error signing up:', err);
      res.status(500).json({ error: 'Error signing up' });
    });
});

//get user
// app.get('/:userId', async (req, res) => {
//   const userId = req.params.userId;
//   const collection = db.collection('users');
//   try {
//     console.log(`Fetching user with ID: ${userId}`);
//     const result = await collection.findOne({ _id: new ObjectId(userId) });
//     if (result) {
//       console.log('User found:', result);
//       res.send({
//         success: true,
//         message: 'UserId fetched successfully',
//         data: result,
//         id: result._id,
//       });
//     } else {
//       console.log('User not found');
//       res.send({
//         success: false,
//         message: 'User not found',
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     res.send({
//       success: false,
//       message: 'Failed to fetch UserId',
//       error: error.message,
//     });
//   }
// });

//verify token
function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'no token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      iss: 'http://localhost:3000',
    });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'invalid token ' });
  }
}

// get all users
app.get('/data/users', verifyToken, async (req, res) => {
  const collection = db.collection('users');
  collection
    .find()
    .toArray()
    .then((result) => {
      console.log('Found users:', result);
      res.json(result);
    })
    .catch((error) => {
      console.log('error fetching users', error);
    });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
