import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addGridAndAxesHelpers } from '../common/helpers.js';
import {SECONDARY_COLOR, DARKER_COLOR } from '../common/constants.js';
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

  // Setup camera with perspective projection
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.set(6, 3, 4);

  // Create and configure the renderer
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

const createSegment = () => {
  const baseGeometry = new THREE.BoxGeometry(1, 2);
  const base = new THREE.Mesh(baseGeometry, CHROME_MATERIAL);
  base.position.set(0, 1, 0);
  const jointGeometry = new THREE.SphereGeometry(0.75);
  const joint = new THREE.Mesh(jointGeometry, CHROME_MATERIAL_DARKER);
  joint.position.set(0, 2, 0);
  return new THREE.Object3D().add(base).add(joint);
}

const createHand = () => {
  const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 3, 32 ); 
  const palm = new THREE.Mesh( geometry, CHROME_MATERIAL );
  palm.position.set(0,2,0);
  palm.rotateZ(Math.PI/2);


  const baseGeometry = new THREE.BoxGeometry(1, 2, 0.1);
  const rightSide = new THREE.Mesh(baseGeometry, CHROME_MATERIAL_DARKER);
  rightSide.name = 'rightSide';
  rightSide.rotateX(Math.PI/2);
  rightSide.position.set(0,1.3,0.5);

  const leftSide = new THREE.Mesh(baseGeometry, CHROME_MATERIAL_DARKER);
  leftSide.name = 'leftSide';
  leftSide.rotateX(Math.PI/2);
  leftSide.position.set(0,-1.3,0.5);

  palm.add(leftSide);
  palm.add(rightSide);

  return palm;
}

// Setup dat.GUI for real-time controls
const setupGUI = (joint, palm) => {
    const gui = new dat.GUI();

    // Rotation controls
    const rotationFolder = gui.addFolder('Joint rotation');
    rotationFolder.add(joint.rotation, 'x', 0, Math.PI / 1.5);
    rotationFolder.add(joint.rotation, 'y', 0, Math.PI * 2);
    rotationFolder.open();


    const armsControll = gui.addFolder('Arms');
    const arms = {
      get grip() {
        return palm.getObjectByName('rightSide').position.y;
      },
      set grip(value) {
        palm.getObjectByName('rightSide').position.y = value;
        palm.getObjectByName('leftSide').position.y = -value; // Ensures symmetric movement
      }
    };
    armsControll.add(arms, 'grip', 0.7, 1.3);

    armsControll.add(palm.rotation, 'x', - Math.PI / 2, 0);
    armsControll.open();
}

const addEventListenerForResize = () => {
  window.addEventListener('resize', () => {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });  
}

// Initialize everything
const init = () => {
  initScene();
  // draw robot
  const segment = createSegment();
  const handBase = createSegment();
  handBase.position.set(0,2,0);
  const palm = createHand();
  handBase.add(palm);
  handBase.rotateX(Math.PI/3);
  setupGUI(handBase, palm);
  scene.add(segment);
  scene.add(handBase);
  // -----
  addGridAndAxesHelpers(scene, camera, THREE);
  setupOrbitControls();
  addLight();
  animate();
};

// Start the application
init();
addEventListenerForResize();
