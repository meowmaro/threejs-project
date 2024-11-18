import * as THREE from 'https://unpkg.com/three@0.170.0/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader';

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
scene.background = null;

const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

const loader = new GLTFLoader();
loader.load('model/scene.gltf', (gltf) => {
  scene.add(gltf.scene);

  const box = new THREE.Box3().setFromObject(model.scene);
  const center = box.getCenter(new THREE.Vector3());
  camera.position.copy(center);
  camera.position.z += 5;

  const size = box.getSize(new THREE.Vector3());
  const maxSize = Math.max(size.x, size.y, size.z);
  camera.zoom = 1 / (maxSize / 2);
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();