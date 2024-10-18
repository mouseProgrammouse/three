import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';
import { MAIN_COLOR } from '../common/constants.js';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Create a renderer
renderer = new THREE.WebGLRenderer();

// Define the camera with perspective projection
camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
camera.position.z = 12;
camera.position.y = 4;
camera.position.x = 0;

// Create a new scene
scene = new THREE.Scene();


const drawBasicMeshSphere = (scene) => {
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: MAIN_COLOR });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 2;

  scene.add(sphere);
};

const drawLambertMeshSphere = (scene) => {
  const geometry = new THREE.SphereGeometry(2, 32, 16);
  const material = new THREE.MeshLambertMaterial({ color: MAIN_COLOR,    emissive: 0x111111,
    emissiveIntensity: 0.75});
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 2;

  scene.add(sphere);
};

// Adding the ambientLight and pointLight
const addLight = (scene) => {
    // Add a point light to illuminate the sphere
    const pointLight = new THREE.PointLight(0xffffff, 15);
    pointLight.position.set(2, 5, 4); // Position the light to shine on the sphere
    scene.add(pointLight);
  
    // Add ambient light to softly light the entire scene
    const ambientLight = new THREE.AmbientLight(0x404040, 2.5); // Soft white light
    scene.add(ambientLight);

}

// Function to clear the scene
const clearScene = () => {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
};

const initForm = () => {
  document.getElementById('material').addEventListener('click', (e) => {
    clearScene();
    if (e.target.checked) {
      drawLambertMeshSphere(scene);
    } else {
      drawBasicMeshSphere(scene);
    }
    addLight(scene);
    addGridAndAxesHelpers(scene, camera, THREE);
    addOrbitControlls();
  });
};

const addOrbitControlls = () => {
  // Create the OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
};

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Set the size of the renderer to match the window size
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
drawBasicMeshSphere(scene);
addGridAndAxesHelpers(scene, camera, THREE);
addOrbitControlls();
addLight(scene);
initForm();

animate();
