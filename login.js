document.getElementById('loginForm').addEventListener('submit', loginUser);

async function loginUser(e) {
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  const payload = {
    username,
    password,
  };
  console.log(payload);

  if (!payload.username || !payload.password) {
    alert('Please enter both username and password');
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
    console.log(`found user ${data._id}`);
    localStorage.setItem('userID', data._id);
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
  }
}

document.getElementById('insertName').addEventListener('submit', insertName);

function insertName() {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const passwordInput = document.getElementById('pass');

  const nameValue = nameInput.value;
  const passwordValue = passwordInput.value;

  if (!nameValue || !passwordValue) {
    alert('Please enter both name and password');
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
  }
}
