import * as THREE from 'three';
import { MAIN_COLOR } from '../common/constants';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Initialize the scene, camera, and renderer
const initScene = () => {
  // Create a new scene
  scene = new THREE.Scene();

  // Setup camera with perspective projection
  camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
  camera.position.z = 10;

  // Create and configure the WebGL renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
};

// Create geometry and material for the triangle mesh
const createTriangle = () => {
  // Define three vertices to create a triangle
  const v1 = new THREE.Vector3(1, 1, 0);
  const v2 = new THREE.Vector3(3, 1, 0);
  const v3 = new THREE.Vector3(3, 3, 0);

  // Create a BufferGeometry from the vertices
  const geometry = new THREE.BufferGeometry().setFromPoints([v1, v2, v3]);

  /**
   * Create a basic material with a specified color.
   * Culling is on by default ("side" is set to THREE.FrontSide).
   * Options include THREE.DoubleSide and THREE.BackSide.
   */
  const material = new THREE.MeshBasicMaterial({
    color: MAIN_COLOR,
    side: THREE.FrontSide,
  });

  // Create a mesh using the geometry and material
  const mesh = new THREE.Mesh(geometry, material);

  // Add the mesh to the scene
  scene.add(mesh);
};

// Render the scene
const render = () => {
  renderer.render(scene, camera);
};

// Initialize everything
const init = () => {
  initScene();
  createTriangle();
  render();
};

// Start the application
init();
