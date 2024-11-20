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
