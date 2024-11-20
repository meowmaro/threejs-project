const gltfLoader = new THREE.GLTFLoader();

const myDiv = document.getElementById('myDiv');
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
myDiv.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

const scene = new THREE.Scene();
scene.background = null;
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.width / canvas.height,
  0.1,
  1000
);
let gltf;

const loader = new THREE.GLTFLoader();
loader.load('./model/controller.gltf', (loadedGltf) => {
  gltf = loadedGltf;
  scene.add(gltf.scene);

  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = box.getCenter(new THREE.Vector3());
  camera.position.copy(center);
  camera.position.z += 5;

  const size = box.getSize(new THREE.Vector3());
  const maxSize = Math.max(size.x, size.y, size.z);
  camera.zoom = 1 / (maxSize / 2);
  camera.updateProjectionMatrix();

  const light = new THREE.DirectionalLight(0xffaaff, 2.5);
  light.position.set(0, 1, 1);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);

    const shakeAmount = 2;
    const shakeSpeed = 0.004;
    gltf.scene.position.x = Math.sin(Date.now() * shakeSpeed) * shakeAmount;
    gltf.scene.rotation.x = THREE.MathUtils.degToRad(88);
    camera.lookAt(gltf.scene.position);
    renderer.render(scene, camera);
  }

  animate();
});

document.getElementById('insertName').addEventListener('submit', insertName);

function insertName(event) {
  event.preventDefault();

  document.querySelector('#insertName > button').disabled = true;

  const nameInput = document.getElementById('name');
  const passInput = document.getElementById('password');
  const nameValue = nameInput.value;
  const passValue = passInput.value;

  const newData = { name: nameValue, password: passValue };

  if (!nameValue) {
    alert('Please enter a name');
    return;
  } else if (!passValue) {
    alert('Please enter a password');
    return;
  } else {
    // Send the data to the server
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Inserted data:', result);
      })
      .catch((error) => console.error('Error inserting data:', error));
  }

  document.querySelector('#insertName > button').disabled = false;
}

/* fetch('http://localhost:3000/data/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  }); */

// async function loginUser() {
//   let username = document.getElementById('username').value;
//   let password = document.getElementById('password').value;
//   fetch('http://localhost:3000/data/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(`found user ${data.name}`);
//     })
//     .catch((error) => {
//       console.error('error:', error);
//     });
// }

/* document.getElementById('loginForm').addEventListener('submit', loginUser);

async function loginUser(e) {
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  try {
    // Making the POST request and waiting for the response
    const response = await fetch('http://localhost:3000/data/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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
} */

function openProfile() {
  if (document.getElementById('profile').className === 'profile')
    document.getElementById('profile').className = 'openProfile';
  else document.getElementById('profile').classList = 'profile';
}
function openNav() {
  if (document.getElementById('sideNav').className === 'sideNav')
    document.getElementById('sideNav').className = 'open';
  else document.getElementById('sideNav').classList = 'sideNav';
}

// const data = fetch()
//   .then((result) => result.json())
//   .catch();

// try {
//   const res = await fetch();
//   const data = await res.json();
// } catch (err) {
//   console.error(err);
// }
