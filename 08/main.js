import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';
import { MAIN_COLOR, SECONDARY_COLOR, DARKER_COLOR } from '../common/constants.js';

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

// Function to draw a sphere
const drawLine = () => {
  const geometry = new THREE.CylinderGeometry( 1.20, 1.25, 0.25, 32 ); 
  const material = new THREE.MeshBasicMaterial({
    color: SECONDARY_COLOR,
    transparent: true,
    opacity: 0.5, // Set transparency level
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 2.1;

  scene.add(sphere);
};

// Function to draw a cube
const drawCube = () => {
  const geometry = new THREE.BoxGeometry( 4, 0.5, 4 ); 
  const material = new THREE.MeshLambertMaterial({
    color: DARKER_COLOR,
    transparent: true,
    opacity: 0.8, // Set transparency level
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.25;

  scene.add(cube);
};

// Function to draw a cube
const drawCylinder = () => {
  const geometry = new THREE.CylinderGeometry( 1.25, 1.75, 2, 32 ); 
  const material = new THREE.MeshPhongMaterial({
    color: MAIN_COLOR,
    transparent: true,
    opacity: 0.6,
    shininess: 50,
  });
  const cylinder  = new THREE.Mesh(geometry, material);
  cylinder .position.y = 1;

  scene.add(cylinder);
};

// Function to draw a cube
const drawCone = () => {
  const geometry = new THREE.CylinderGeometry( 0.15, 1.20, 3.5, 32 ); 
  const material = new THREE.MeshPhysicalMaterial({
    color: MAIN_COLOR,
    transmission: 0.5, // Simulates transparency
    thickness: 2,      // Adds depth to the transparency
    roughness: 0.1,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 3.95;

  scene.add(cube);
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
  // draw cone
  drawCone();
  drawLine();
  drawCylinder();
  drawCube();
  // -----
  addGridAndAxesHelpers(scene, camera, THREE);
  setupOrbitControls();
  addLight();
  animate();
};

// Start the application
init();
