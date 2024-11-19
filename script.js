const gltfLoader = new THREE.GLTFLoader();

const myDiv = document.getElementById("myDiv");
const canvas = document.createElement("canvas");
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
loader.load("./model/controller.gltf", (loadedGltf) => {
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

const apiUrl = "http://localhost:3000/data/users";

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

let username = document.getElementById("userame");
let password = document.getElementById("password");
const usernameValue = username.value;
const passwordValue = password.value;

const userData = { name: nameValue, password: passValue };

app.get("http://localhost:3000/data/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await users.findById(userId);
    res.send({
      success: true,
      message: "logged in",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "nuh uh",
    });
  }
});
