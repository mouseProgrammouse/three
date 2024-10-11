import * as THREE from 'three';
import * as dat from 'dat.gui';
import { MAIN_COLOR } from '../common/constants.js';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Create a renderer
renderer = new THREE.WebGLRenderer();

// Define the camera with perspective projection
camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 15);
camera.position.z = 10;
camera.position.y = 2;
camera.position.x = 0;

// Create a new scene
scene = new THREE.Scene();

// Add a simple geometry and material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: MAIN_COLOR,
  transparent: true, // Enable transparency
  opacity: 0.7, // Set opacity (0 = fully transparent, 1 = fully opaque)
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// Set the size of the renderer to match the window size
renderer.setSize(width, height);

// Grid helpers
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// CameraHelper: Visualizes the frustum of a camera.
const helper = new THREE.CameraHelper(camera);
scene.add(helper);

// Add an AxesHelper
const axesHelper = new THREE.AxesHelper(5); // The parameter sets the size of the axes
scene.add(axesHelper);

// Create a dat.GUI instance
const gui = new dat.GUI();

// Add a rotation folder
const rotationFolder = gui.addFolder('Rotation');
rotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
rotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
rotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
rotationFolder.open();

// Add a position folder
const positionFolder = gui.addFolder('Position');
positionFolder.add(cube.position, 'x', -10, 10);
positionFolder.add(cube.position, 'y', -10, 10);
positionFolder.add(cube.position, 'z', -10, 10);
positionFolder.open();

// Add a scale folder
const scaleFolder = gui.addFolder('Scale');
scaleFolder.add(cube.scale, 'x', 0, 3);
scaleFolder.add(cube.scale, 'y', 0, 3);
scaleFolder.add(cube.scale, 'z', 0, 3);
scaleFolder.open();

// Add toggle for the switcing between mesh and material
const debugParams = {
  showWireframe: false,
};

gui
  .add(debugParams, 'showWireframe')
  .name('Show Wireframe')
  .onChange(() => {
    // Toggle wireframe on/off for all objects in the scene
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.wireframe = debugParams.showWireframe;
      }
    });
  });

document.body.appendChild(renderer.domElement);

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
