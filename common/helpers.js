export const addGridAndAxesHelpers = (scene, camera, THREE) => {
  // Grid helpers
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  // CameraHelper: Visualizes the frustum of a camera.
  const helper = new THREE.CameraHelper(camera);
  scene.add(helper);

  // Add an AxesHelper
  const axesHelper = new THREE.AxesHelper(5); // The parameter sets the size of the axes
  scene.add(axesHelper);
};
