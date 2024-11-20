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

// document.getElementById('insertName').addEventListener('submit', insertName);

// function insertName(event) {
//   event.preventDefault();

//   document.querySelector('#insertName > button').disabled = true;

//   const nameInput = document.getElementById('name');
//   const passInput = document.getElementById('password');
//   const nameValue = nameInput.value;
//   const passValue = passInput.value;

//   const newData = { name: nameValue, password: passValue };

//   if (!nameValue) {
//     alert('Please enter a name');
//     return;
//   } else if (!passValue) {
//     alert('Please enter a password');
//     return;
//   } else {
//     // Send the data to the server
//     fetch('http://localhost:3000/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newData),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log('Inserted data:', result);
//       })
//       .catch((error) => console.error('Error inserting data:', error));
//   }

//   document.querySelector('#insertName > button').disabled = false;
// }
