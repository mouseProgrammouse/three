import * as THREE from 'three';
import { MAIN_COLOR } from '../common/constants';

// Retrieve the default amount of sides from the input field
const defaultAmountOfSides = document.getElementById('sideAmount').value;

// Declare variables for camera, scene, and renderer
let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Initialize the scene, camera, and renderer
const initScene = () => {
  scene = new THREE.Scene();

  // Setup camera with perspective projection
  camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 15);
  camera.position.z = 10;

  // Create and configure the WebGL renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // Render the initial scene
  renderer.render(scene, camera);
};

// Generate polygon geometry based on the number of sides
const generatePolygon = (sides) => {
  const geometry = new THREE.BufferGeometry();
  const sidePoints = [];

  // Generate points for each side of the polygon
  for (let i = 0; i < sides; i++) {
    const angle = Math.PI / 2 + (i / sides) * 2 * Math.PI;
    const x = Math.cos(angle).toFixed(2);
    const y = Math.sin(angle).toFixed(2);
    sidePoints.push({ x, y });
  }

  // Generate vertices for triangles composing the polygon
  let triangles = [];
  for (let i = 0; i < sidePoints.length - 1; i++) {
    triangles.push(
      sidePoints[i].x,
      sidePoints[i].y,
      0,
      sidePoints[i + 1].x,
      sidePoints[i + 1].y,
      0,
      0,
      0,
      0
    );
  }

  // Close the polygon by connecting the last point to the first
  triangles.push(
    0,
    0,
    0,
    sidePoints[sidePoints.length - 1].x,
    sidePoints[sidePoints.length - 1].y,
    0,
    sidePoints[0].x,
    sidePoints[0].y,
    0
  );

  // Specify vertex positions as attributes of geometry
  const vertices = new Float32Array(triangles);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  return geometry;
};

// Render the polygon with the specified number of sides
const renderPolygon = (sides) => {
  // Generate polygon geometry
  const geometry = generatePolygon(sides);

  // Create material with specified color
  const material = new THREE.MeshBasicMaterial({
    color: MAIN_COLOR,
    side: THREE.FrontSide,
  });

  // Create mesh and add it to the scene
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Render the scene
  renderer.render(scene, camera);
};

// Clear the scene by removing all child objects
const clearScene = () => {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
};

// Initialize form and handle user input
const initForm = () => {
  document.getElementById('submitSides').addEventListener('click', (event) => {
    event.preventDefault();

    // Get the number of sides from the input field
    const sides = document.getElementById('sideAmount').value;

    // If valid, clear the scene and render the polygon
    if (sides >= 3) {
      clearScene();
      renderPolygon(sides);
    }
  });
};

// Initialize everything and render the polygon with default sides
const init = () => {
  initScene();
  initForm();
  renderPolygon(defaultAmountOfSides);
};

// Start the application
init();
