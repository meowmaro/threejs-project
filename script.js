const apiUrl = 'http://localhost:3000/data';

document.getElementById('insertName').addEventListener('submit', insertName);

function insertName(event) {
  event.preventDefault();  
  const nameInput = document.getElementById('name');
  const passInput = document.getElementById('password');
  const nameValue = nameInput.value;  
  const passValue = passInput.value;
  

  const newData = { name: nameValue, password: passValue};  

  // Send the data to the server
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)  
  })
    .then(response => response.json())
    .then(result => {
      console.log('Inserted data:', result);
    })
    .catch(error => console.error('Error inserting data:', error));
}

document.getElementById('loginCardForm').addEventListener('submit', login);





function openProfile() {
    if (document.getElementById("profile").className === "profile")
      document.getElementById("profile").className = "openProfile";
    else document.getElementById("profile").classList = "profile";
  }
  function openNav() {
    if (document.getElementById("sideNav").className === "sideNav")
      document.getElementById("sideNav").className = "open";
    else document.getElementById("sideNav").classList = "sideNav";
  }




  //client ID for google authentication
  //327018359293-eng2gcueu5t89sagkhc2g0fdga92s7v9.apps.googleusercontent.com



  //client sevret for google authentication
  //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