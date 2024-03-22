import * as THREE from '../node_modules/three/build/three.module.js';

// Retrieve the default amount of sides from the input field
const defaultAmountOfSides = document.getElementById("sideAmount").value;

// Declare variables for camera, scene, and renderer
let camera, scene, renderer;

// Get the inner width and height of the window
const { innerWidth: width, innerHeight: height } = window;

// Define the camera with perspective projection
camera = new THREE.PerspectiveCamera(20, width / height, 0.01, 0);
camera.position.z = 10;

// Function to generate polygon geometry based on the number of sides
const generatePolygon = (sides) => {
    const geometry = new THREE.BufferGeometry();
    const sidePoints = [];

    // Generate points for each side of the polygon
    for (let i = 0; i < sides; i++) {
        // Calculate the angle for each vertex
        const angle = (Math.PI / 2) + (i / sides) * 2 * Math.PI;

        // Calculate the x and y coordinates for the vertex
        const x = Math.cos(angle).toFixed(2);
        const y = Math.sin(angle).toFixed(2);

        // Save the vertex location 
        sidePoints.push({ x, y });
    }

    // Generate vertices for triangles composing the polygon
    let triangles = [];
    for (let i = 0; i < sidePoints.length - 1; i++) {
        // Add points for the triangle
        triangles.push(
            sidePoints[i].x,
            sidePoints[i].y,
            0,
            sidePoints[i + 1].x,
            sidePoints[i + 1].y,
            0,
            0, 0, 0
        );
    }

    // Duplicate the top left and bottom right vertices to close the polygon
    triangles.push(
        0, 0, 0,
        sidePoints[sidePoints.length - 1].x,
        sidePoints[sidePoints.length - 1].y,
        0,
        sidePoints[0].x,
        sidePoints[0].y,
        0
    );

    // Specify vertex positions as attributes of geometry
    const vertices = new Float32Array(triangles);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    return geometry;
};

// Function to initialize the scene
const initScene = () => {
    // Create a new scene
    scene = new THREE.Scene();

    // Create a WebGL renderer with antialiasing enabled
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set the size of the renderer to match the window size
    renderer.setSize(width, height);

    // Append renderer's DOM element to the document body
    document.body.appendChild(renderer.domElement);

    // Render the scene with the camera
    renderer.render(scene, camera);
}

// Function to render the polygon with the specified number of sides
const renderPolygon = (sides) => {
    // Generate geometry for a polygon
    const geometry = generatePolygon(sides);

    // Create a basic material with a specified color and front side rendering
    const material = new THREE.MeshBasicMaterial({ color: 0x5A6A68, side: THREE.FrontSide });

    // Create a mesh using the geometry and material
    const mesh = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(mesh);

    // Render the scene with the camera
    renderer.render(scene, camera);
}

// Function to clear the scene
const clearScene = () => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

// Function to initialize the form and handle form submission
const initForm = () => {
    // Add event listener to the submit button
    document.getElementById("submitSides").addEventListener("click", (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the number of sides from the input field
        const sides = document.getElementById("sideAmount").value;

        // If the number of sides is valid (at least 3), clear the scene and render the polygon
        if (sides >= 3) {
            clearScene();
            renderPolygon(sides);
        }
    })
}

// Initialize the scene, form, and render the polygon with the default number of sides
initScene();
initForm();
renderPolygon(defaultAmountOfSides);