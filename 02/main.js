import * as THREE from 'three';
import * as dat from 'dat.gui';
import { MAIN_COLOR } from '../common/constants.js';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Initialize scene, camera, and renderer
const initScene = () => {
  // Create a new scene
  scene = new THREE.Scene();

  // Setup camera with perspective projection
  camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 15);
  camera.position.set(0, 2, 10);

  // Create and configure the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
};

// Create and add a cube with basic material
const createCube = () => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: MAIN_COLOR,
    transparent: true,
    opacity: 0.7,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  return cube;
};

// Add helpers to the scene
const addHelpers = () => {
  // Grid helper
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  // Camera helper: Visualizes the frustum of a camera
  const cameraHelper = new THREE.CameraHelper(camera);
  scene.add(cameraHelper);

  // Axes helper: Helps visualize the 3D axes (x, y, z)
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
};

// Setup dat.GUI for real-time controls
const setupGUI = (cube) => {
  const gui = new dat.GUI();

  // Rotation controls
  const rotationFolder = gui.addFolder('Rotation');
  rotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
  rotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
  rotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
  rotationFolder.open();

  // Position controls
  const positionFolder = gui.addFolder('Position');
  positionFolder.add(cube.position, 'x', -10, 10);
  positionFolder.add(cube.position, 'y', -10, 10);
  positionFolder.add(cube.position, 'z', -10, 10);
  positionFolder.open();

  // Scale controls
  const scaleFolder = gui.addFolder('Scale');
  scaleFolder.add(cube.scale, 'x', 0, 3);
  scaleFolder.add(cube.scale, 'y', 0, 3);
  scaleFolder.add(cube.scale, 'z', 0, 3);
  scaleFolder.open();

  // Toggle wireframe mode
  const debugParams = { showWireframe: false };
  gui
    .add(debugParams, 'showWireframe')
    .name('Show Wireframe')
    .onChange(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = debugParams.showWireframe;
        }
      });
    });
};

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Initialize everything
const init = () => {
  initScene();
  const cube = createCube();
  addHelpers();
  setupGUI(cube);
  animate();
};

// Start the application
init();
