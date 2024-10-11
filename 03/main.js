import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';

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

const stairHeight = 1,
  stairWidth = 4,
  stairDepth = 0.2;

const createStairSegment = (scene, x, y, z) => {
  // Add a simple geometry and material
  const topOfStairGeometry = new THREE.BoxGeometry(
    stairWidth,
    stairDepth,
    stairHeight
  );
  const frontOfStairGeometry = new THREE.BoxGeometry(
    stairWidth,
    stairHeight,
    stairDepth
  );

  var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

  const topOfStair = new THREE.Mesh(topOfStairGeometry, wireframeMaterial);
  const frontOfStair = new THREE.Mesh(frontOfStairGeometry, wireframeMaterial);

  topOfStair.position.y = y + stairHeight + stairDepth / 2;
  topOfStair.position.z = z + stairHeight / 2;

  frontOfStair.position.y = y + stairHeight / 2;
  frontOfStair.position.z = z + stairDepth / 2;

  scene.add(topOfStair);
  scene.add(frontOfStair);
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

const initForm = () => {
  document
    .getElementById('submitStairsAmount')
    .addEventListener('click', (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the number of sides from the input field
      const amountOfStairs = document.getElementById('stairsAmount').value;
      clearScene();
      addGridAndAxesHelpers(scene, camera, THREE);
      for (let i = 0; i < amountOfStairs; i++) {
        createStairSegment(scene, 0, stairHeight * i, stairHeight * i);
      }
      addOrbitControlls();
    });
};

// Function to clear the scene
const clearScene = () => {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
};

// Set the size of the renderer to match the window size
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
addGridAndAxesHelpers(scene, camera, THREE);
addOrbitControlls();
initForm();

animate();
