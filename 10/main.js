import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';
import { SECONDARY_COLOR, DARKER_COLOR } from '../common/constants.js';
import * as dat from 'dat.gui';

let camera, scene, renderer;
const { innerWidth: width, innerHeight: height } = window;

const CHROME_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: SECONDARY_COLOR,
  metalness: 1.0,
  roughness: 0.2,
});

const CHROME_MATERIAL_DARKER = new THREE.MeshPhysicalMaterial({
  color: DARKER_COLOR,
  metalness: 1.0,
  roughness: 0.2,
});

// Initialize scene, camera, and renderer
const initScene = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.set(6, 3, 4);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
};

// Adding ambient and point lights
const addLight = () => {
  // Point light to illuminate the sphere
  const pointLight = new THREE.PointLight(0xffffff, 500, 100);
  pointLight.position.set(2, 5, 4);
  scene.add(pointLight);

  // Ambient light to softly light the entire scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 10);
  scene.add(ambientLight);

  // DirectionalLight simulates sunlight and can make objects look more natural
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(10, 20, 10);
  scene.add(directionalLight);

  //  HemisphereLight adds soft ambient lighting from the sky:
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 3);
  scene.add(hemisphereLight);
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

// Creates a robotic segment with a base and joint
const createSegment = () => {
  const segment = new THREE.Object3D();

  const base = new THREE.Mesh(new THREE.BoxGeometry(1, 2), CHROME_MATERIAL);
  base.position.y = 1;
  
  const joint = new THREE.Mesh(new THREE.SphereGeometry(0.75), CHROME_MATERIAL_DARKER);
  joint.position.y = 2;

  segment.add(base);
  segment.add(joint);

  return segment;
};

// Creates a robotic hand structure
const createHand = () => {
  const palm = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3, 32), CHROME_MATERIAL);
  palm.position.y = 2;
  palm.rotateZ(Math.PI / 2);

  const sideGeometry = new THREE.BoxGeometry(1, 2, 0.1);
  const rightSide = new THREE.Mesh(sideGeometry, CHROME_MATERIAL_DARKER);
  rightSide.name = 'rightSide';
  rightSide.rotateX(Math.PI / 2);
  rightSide.position.set(0, 1.3, 0.5);

  const leftSide = new THREE.Mesh(sideGeometry, CHROME_MATERIAL_DARKER);
  leftSide.name = 'leftSide';
  leftSide.rotateX(Math.PI / 2);
  leftSide.position.set(0, -1.3, 0.5);

  palm.add(leftSide, rightSide);
  return palm;
};

// Setup dat.GUI for real-time controls
const setupGUI = (joint, palm) => {
  const gui = new dat.GUI();
  const rightSide = palm.getObjectByName('rightSide');
  const leftSide = palm.getObjectByName('leftSide');

  const rotationFolder = gui.addFolder('Joint Rotation');
  rotationFolder.add(joint.rotation, 'x', 0, Math.PI / 1.5);
  rotationFolder.add(joint.rotation, 'y', 0, Math.PI * 2);
  rotationFolder.open();

  const armsControl = gui.addFolder('Arms');
  const arms = {
    get grip() {
      return rightSide.position.y;
    },
    set grip(value) {
      rightSide.position.y = value;
      leftSide.position.y = -value;
    },
  };
  armsControl.add(arms, 'grip', 0.7, 1.3);
  armsControl.add(palm.rotation, 'x', -Math.PI / 2, 0);
  armsControl.open();
};

// Handle window resize
const addEventListenerForResize = () => {
  window.addEventListener('resize', () => {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
};

// Initialize the scene and robot arm
const init = () => {
  initScene();

  const baseSegment = createSegment();
  const forearmSegment = createSegment();
  forearmSegment.position.y = 2;

  const hand = createHand();
  forearmSegment.add(hand);
  forearmSegment.rotateX(Math.PI / 3);

  setupGUI(forearmSegment, hand);

  scene.add(baseSegment, forearmSegment);
  addGridAndAxesHelpers(scene, camera, THREE);
  setupOrbitControls();
  addLight();
  animate();
};

init();
addEventListenerForResize();
