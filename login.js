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

  try {
    // Making the POST request and waiting for the response
    const response = await fetch('http://localhost:3000/data/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response and log the user data
    const data = await response.json();
    console.log(`found user ${data.name}`);
  } catch (error) {
    // Handle any errors
    console.error('error:', error);
  }
}
