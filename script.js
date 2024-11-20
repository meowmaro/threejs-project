const apiUrl = process.env.API_URL || "http://localhost:3000/data/users";

document.getElementById("insertName").addEventListener("submit", insertName);

function insertName(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const passInput = document.getElementById("password");
  const nameValue = nameInput.value;
  const passValue = passInput.value;

  const newData = { name: nameValue, password: passValue };

  if (!nameValue) {
    alert("Please enter a name");
    return;
  } else if (!passValue) {
    alert("Please enter a password");
    return;
  } else {
    // Send the data to the server
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData), // Send name in the correct format
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Inserted data:", result);
      })
      .catch((error) => console.error("Error inserting data:", error));
  }
}

fetch("http://localhost:3000/data/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function loginUser() {
  let username = document.getElementById("username").value;
}

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
