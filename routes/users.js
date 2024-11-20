const { Router } = require('express');

const usersRoute = Router();

usersRoute.get('/', () => {});

usersRoute.get('/:id', () => {});

usersRoute.post('/', (req, res) => {
  const data = req.body;

  console.log(data);

  res.status(200).json({ success: true });
});

usersRoute.put('/:id', () => {});

usersRoute.delete('/:id', () => {});

module.exports = usersRoute;
