import * as THREE from '../node_modules/three/build/three.module.js';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

// Create a renderer
renderer = new THREE.WebGLRenderer();

// Define the camera with perspective projection
camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 15);
camera.position.z = 12;
camera.position.y = 4;
camera.position.x = 0;

// Create a new scene
scene = new THREE.Scene();

const stairHeight = 1, stairWidth = 4, stairDepth = 0.2;
const createStairSegment = (scene) => {
    // Add a simple geometry and material
    const topOfStairGeometry = new THREE.BoxGeometry(stairWidth, stairDepth, stairHeight);
    const frontOfStairGeometry = new THREE.BoxGeometry(stairWidth, stairHeight, stairDepth);

    const material = new THREE.MeshBasicMaterial({ 
        color: 0xffbe98,
        transparent: true,  // Enable transparency
        opacity: 0.5        // Set opacity (0 = fully transparent, 1 = fully opaque)
        });
    var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

    const topOfStair = new THREE.Mesh(topOfStairGeometry, wireframeMaterial);
    const frontOfStair = new THREE.Mesh(frontOfStairGeometry, material);

    scene.add(topOfStair);
    scene.add(frontOfStair);
}



// Set the size of the renderer to match the window size
renderer.setSize(width, height);
createStairSegment(scene);



// Grid helpers
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// CameraHelper: Visualizes the frustum of a camera.
const helper = new THREE.CameraHelper(camera);
scene.add(helper);

// Add an AxesHelper
const axesHelper = new THREE.AxesHelper(5); // The parameter sets the size of the axes
scene.add(axesHelper);

document.body.appendChild(renderer.domElement);

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();