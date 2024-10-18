import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Initialize scene, camera, and renderer
const initScene = () => {
  // Create a new scene
  scene = new THREE.Scene();

  // Define the camera with perspective projection
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.set(0, 4, 12);

  // Create a renderer and set its size
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
};

// Create a stair segment
const createStairSegment = (x, y, z) => {
  const stairHeight = 1,
    stairWidth = 4,
    stairDepth = 0.2;

  // Define geometries for the top and front of the stair
  const topGeometry = new THREE.BoxGeometry(
    stairWidth,
    stairDepth,
    stairHeight
  );
  const frontGeometry = new THREE.BoxGeometry(
    stairWidth,
    stairHeight,
    stairDepth
  );

  // Create a material with wireframe for visibility
  const wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

  // Create top and front meshes
  const topOfStair = new THREE.Mesh(topGeometry, wireframeMaterial);
  topOfStair.position.set(
    x,
    y + stairHeight + stairDepth / 2,
    z + stairHeight / 2
  );

  const frontOfStair = new THREE.Mesh(frontGeometry, wireframeMaterial);
  frontOfStair.position.set(x, y + stairHeight / 2, z + stairDepth / 2);

  // Add meshes to the scene
  scene.add(topOfStair, frontOfStair);
};

// Setup orbit controls for the camera
const setupOrbitControls = () => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
};

// Function to clear the scene of all objects
const clearScene = () => {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
};

// Initialize form to handle user input for stairs
const initForm = () => {
  document
    .getElementById('submitStairsAmount')
    .addEventListener('click', (event) => {
      // Prevent default form submission behavior
      event.preventDefault();

      // Get the number of stairs from the input field
      const amountOfStairs = document.getElementById('stairsAmount').value;

      // Clear the scene and add grid and axis helpers
      clearScene();
      addGridAndAxesHelpers(scene, camera, THREE);

      // Create stair segments based on user input
      for (let i = 0; i < amountOfStairs; i++) {
        createStairSegment(0, i, i);
      }

      // Reinitialize orbit controls
      setupOrbitControls();
    });
};

// Animation loop to render the scene
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Initialize the entire setup
const init = () => {
  initScene();
  addGridAndAxesHelpers(scene, camera, THREE);
  setupOrbitControls();
  initForm();
  animate();
};

// Start everything
init();
