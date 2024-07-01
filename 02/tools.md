# Dev Tools
1. Inspector tools:
- Three.js Editor: Online editor that allows to import and manipulate scenes, providing real-time feedback and visualization.https://threejs.org/editor/

- Firefox Add-on: A Three.js Developer Tools extension is available for Firefox. It supports inspection of Three.js scenes and renderers, allowing to inspect the scene graph, objects, materials, textures, view renderer info, and modify entity values

- Three-devtool: This is a web extension that allows inspection of Three.js content. It's currently in an experimental stage and can be installed on Firefox and Chrome. The extension observes Three.js scenes and renderers to provide debugging information;

2. Libraries and Plugins:
- dat.GUI: A lightweight graphical user interface for changing variables in code and seeing the effects in real-time. Useful for tweaking parameters like camera settings, lighting, and material properties.
```
var gui = new dat.GUI();
gui.add(camera.position, 'x', -500, 500);
gui.add(camera.position, 'y', -500, 500);
gui.add(camera.position, 'z', -500, 500);
```
- Stats.js: A JavaScript performance monitor to track FPS (frames per second) and render times, helping identify performance bottlenecks.
```
var stats = new Stats();
document.body.appendChild(stats.dom);
function animate() {
  stats.begin();
  // monitored code
  stats.end();
  requestAnimationFrame(animate);
}
animate();
```
3. Three.js helpers:
- Wireframe Mode: Render models in wireframe mode to get a better view of their structure and debug issues related to geometry.
``` 
var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
var wireframeCube = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(wireframeCube);
```
- Bounding Boxes: Use bounding boxes to visualize the extents of objects.
```
var boxHelper = new THREE.BoxHelper(object, 0xffff00);
scene.add(box);
```
- GridHelper: Creates a two-dimensional grid.
```
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);
```
- CameraHelper: Visualizes the frustum of a camera.
```
const helper = new THREE.CameraHelper(camera);
scene.add(helper);
```
- DirectionalLightHelper: Visualizes a directional light.
```
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);
```
- PointLightHelper: Visualizes a point light.
```
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);
```
- SpotLightHelper: Visualizes a spot light.
```
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
```