import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';
import { MAIN_COLOR } from '../common/constants.js';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Initialize scene, camera, and renderer
const initScene = () => {
  scene = new THREE.Scene();

  // Setup camera with perspective projection
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.set(0, 4, 12);

  // Create and configure the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
};

// Function to draw a sphere using mesh phong material
const drawMeshPhongSphere = () => {
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: MAIN_COLOR,
    shininess: 40, // Shininess factor
    specular: 0xffffff, // Specular highlight color
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 2;

  scene.add(sphere);
};

// Function to draw a sphere using Lambert material
const drawLambertMeshSphere = () => {
  const geometry = new THREE.SphereGeometry(2, 32, 16);
  const material = new THREE.MeshLambertMaterial({
    color: MAIN_COLOR,
    emissive: 0x111111,
    emissiveIntensity: 0.75,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 2;

  scene.add(sphere);
};

// Adding ambient and point lights
const addLight = () => {
  // Point light to illuminate the sphere
  const pointLight = new THREE.PointLight(0xffffff, 15);
  pointLight.position.set(2, 5, 4);
  scene.add(pointLight);

  // Ambient light to softly light the entire scene
  const ambientLight = new THREE.AmbientLight(0x404040, 2.5);
  scene.add(ambientLight);
};

// Function to clear the scene
const clearScene = () => {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
};

// Initialize form to handle material selection
const initForm = () => {
  document.getElementById('material').addEventListener('click', (e) => {
    clearScene();
    if (e.target.checked) {
      drawLambertMeshSphere();
    } else {
      drawMeshPhongSphere();
    }
    addLight();
    addGridAndAxesHelpers(scene, camera, THREE);
    setupOrbitControls();
  });
};

// Setup orbit controls for camera
const setupOrbitControls = () => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
};

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Initialize everything
const init = () => {
  initScene();
  drawMeshPhongSphere();
  addGridAndAxesHelpers(scene, camera, THREE);
  setupOrbitControls();
  addLight();
  initForm();
  animate();
};

// Start the application
init();
