import * as THREE from 'https://unpkg.com/three@0.170.0/build/three.module.js';

const myDiv = document.getElementById('myDiv');
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
myDiv.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.set(0, 0, 5);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x9900FF });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 1, 100);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();