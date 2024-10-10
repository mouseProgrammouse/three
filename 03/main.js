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

const stairHeight = 1,
  stairWidth = 4,
  stairDepth = 0.2;

const createStairSegment = (scene) => {
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

  const material = new THREE.MeshBasicMaterial({
    color: MAIN_COLOR,
    transparent: true, // Enable transparency
    opacity: 0.7, // Set opacity (0 = fully transparent, 1 = fully opaque)
  });
  var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

  const topOfStair = new THREE.Mesh(topOfStairGeometry, wireframeMaterial);
  const frontOfStair = new THREE.Mesh(frontOfStairGeometry, material);

  topOfStair.position.y = stairHeight + stairDepth / 2;
  topOfStair.position.z = stairWidth / 2 - stairDepth / 2;

  frontOfStair.position.y = stairHeight / 2;

  scene.add(topOfStair);
  scene.add(frontOfStair);
};
// Set the size of the renderer to match the window size
renderer.setSize(width, height);
createStairSegment(scene);

addGridAndAxesHelpers(scene, camera, THREE);
document.body.appendChild(renderer.domElement);

// Create the OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // Set the target of the controls to the center of the cube
controls.update();

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
