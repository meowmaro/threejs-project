document.getElementById('loginForm').addEventListener('submit', loginUser);

async function loginUser(e) {
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';

  const payload = {
    username,
    password,
  };
  console.log(payload);

  if (!payload.username || !payload.password) {
    errorMessage.textContent = 'Please enter both username and password';
  }

  try {
    const response = await fetch('http://localhost:3000/data/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`found user ${data.userId}`, data.username);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userID', data.userId);
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
    errorMessage.textContent = 'Invalid username or password';
  }
}

document.getElementById('insertName').addEventListener('submit', insertName);

function insertName(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const passwordInput = document.getElementById('pass');
  const errorMessage = document.getElementById('signupErrorMessage');
  errorMessage.textContent = '';

  const nameValue = nameInput.value;
  const passwordValue = passwordInput.value;

  if (!nameValue || !passwordValue) {
    errorMessage.textContent = 'Please enter both name and password';
  } else {
    fetch('http://localhost:3000/data/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nameValue, password: passwordValue }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Inserted', result);
        localStorage.setItem('userId', result.insertedId);
        window.location.href = 'index.html';
      })
      .catch((err) => console.log('Error:', err));
    errorMessage.textContent = 'error signing up';
  }
}

function getUsers() {
  fetch('http://localhost:3000/data/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log('error:', error);
    });
}
