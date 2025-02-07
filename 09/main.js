import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';
import { MAIN_COLOR, SECONDARY_COLOR, DARKER_COLOR } from '../common/constants.js';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;


// Initialize scene, camera, and renderer
const initScene = () => {
  scene = new THREE.Scene();

  // Setup camera with perspective projection
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.set(6, 3, 4);

  // Create and configure the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
};

// Draw clock face
const drawClockFace = () => {
  const geometry = new THREE.CylinderGeometry( 1, 1, 0.1, 32 );
  const material = new THREE.MeshStandardMaterial( {color: SECONDARY_COLOR} ); 
  const clockFace = new THREE.Mesh( geometry, material);
  clockFace.rotation.z = (90 * Math.PI) / 180;
  clockFace.position.y = 1;
  scene.add( clockFace );
};

// Draw clock face
const drawClockHands = () => {
  const geometry = new THREE.BoxGeometry( 0.5, 0.101, 0.1 ); 
  const material = new THREE.MeshStandardMaterial({ 
    color: MAIN_COLOR,
    metalness: 0.9,    // High metalness value (0-1)
    roughness: 0.1,    // Low roughness for a shinier look (0-1)
  })
  const clockHands = new THREE.Object3D(); // Create a parent Object3D for the hands

  // Minute Hand
  const minuteHand = new THREE.Mesh(geometry, material);
  minuteHand.rotation.x = (45 * Math.PI) / 180;
  minuteHand.rotation.z = (90 * Math.PI) / 180;
  minuteHand.position.set(0, 0.15, 0.15);
  clockHands.add(minuteHand); // Add to parent
  
  // Hour Hand
  const geometry_hour = new THREE.BoxGeometry(0.7, 0.101, 0.02);
  const hourHand = new THREE.Mesh(geometry_hour, material);
  hourHand.rotation.x = (90 * Math.PI) / 180;
  hourHand.rotation.z = (90 * Math.PI) / 180;
  hourHand.position.set(0, 0, 0.35);
  clockHands.add(hourHand); // Add to parent

  clockHands.position.set(0,1,0);
  scene.add(clockHands);
};

// Adding ambient and point lights
const addLight = () => {
  // Point light to illuminate the sphere
  const pointLight = new THREE.PointLight(0xffffff, 15);
  pointLight.position.set(2, 5, 4);
  scene.add(pointLight);

  // Ambient light to softly light the entire scene
  const ambientLight = new THREE.AmbientLight(0x404040, 2.5);
  scene.add(ambientLight);
};

// Setup orbit controls for camera
const setupOrbitControls = () => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
};

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Initialize everything
const init = () => {
  initScene();
  // draw clock
  drawClockFace();
  drawClockHands();
  // -----
  addGridAndAxesHelpers(scene, camera, THREE);
  setupOrbitControls();
  addLight();
  animate();
};

// Start the application
init();
