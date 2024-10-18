import * as THREE from 'three';

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
const createColoredTriangle = () => {
  // Define three vertices to create a triangle
  const v1 = new THREE.Vector3(1, 1, 0); // Bottom-left vertex
  const v2 = new THREE.Vector3(3, 1, 0); // Bottom-right vertex
  const v3 = new THREE.Vector3(2, 3, 0); // Top vertex

  // Create a BufferGeometry from the vertices
  const geometry = new THREE.BufferGeometry().setFromPoints([v1, v2, v3]);

  // Define colors for each vertex (R, G, B) values between 0 and 1
  const colors = new Float32Array([
    1.0,
    0.0,
    0.0, // Red for v1
    0.0,
    1.0,
    0.0, // Green for v2
    0.0,
    0.0,
    1.0, // Blue for v3
  ]);

  // Add the color attribute to the geometry (3 components: R, G, B)
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Create a material that uses vertex colors
  const material = new THREE.MeshBasicMaterial({ vertexColors: true });

  // Create a mesh combining the geometry and material
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
  createColoredTriangle();
  render();
};

// Start the application
init();
