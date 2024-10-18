import * as THREE from 'three';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Define the camera with perspective projection
camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 10;

// Create a new scene
scene = new THREE.Scene();

// Define three vertices to create a triangle
const v1 = new THREE.Vector3(1, 1, 0);  // Bottom-left vertex
const v2 = new THREE.Vector3(3, 1, 0);  // Bottom-right vertex
const v3 = new THREE.Vector3(2, 3, 0);  // Top vertex

// Create a BufferGeometry from the vertices
// setFromPoints automatically creates the position attribute
var geometry = new THREE.BufferGeometry().setFromPoints([v1, v2, v3]);

// Define colors for each vertex
// Each color is represented by three float values (R, G, B) between 0 and 1
const colors = new Float32Array([
  1.0, 0.0, 0.0,  // Red for v1
  0.0, 1.0, 0.0,  // Green for v2
  0.0, 0.0, 1.0,  // Blue for v3
]);

// Add the color attribute to the geometry
// The second parameter (3) indicates that each color has 3 components (R, G, B)
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Create a basic material that will use vertex colors
const material = new THREE.MeshBasicMaterial({
  vertexColors: true  // This enables the use of per-vertex colors
});

// Create a mesh by combining the geometry and material
// This mesh will be a triangle with color interpolation between vertices
const mesh = new THREE.Mesh(geometry, material);

// Render object
scene.add(mesh);
renderer = new THREE.WebGLRenderer({
  antialias: true,
});

// Set the size of the renderer to match the window size
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
