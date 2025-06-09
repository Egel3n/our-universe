// === main.js ===
import * as THREE from "https://esm.sh/three";
import { createPlanets, getPlanetPositions } from "./planets.js";
import { setupStars } from "./stars.js";
import { setupControls, moveToPlanet } from "./controls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const canvas = document.getElementById("universeCanvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);

const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(10, 20, 20);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const planetData = await createPlanets(scene);
const planetPositions = getPlanetPositions();
const planetNameDiv = document.getElementById("planetName");

const controls = setupControls(camera, renderer.domElement);
let currentIndex = 0;
moveToPlanet(planetPositions[currentIndex], camera, controls);

setupStars(scene);

// Navigation buttons
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    moveToPlanet(planetPositions[currentIndex], camera, controls);
  }
});

rightBtn.addEventListener("click", () => {
  if (currentIndex < planetPositions.length - 1) {
    currentIndex++;
    moveToPlanet(planetPositions[currentIndex], camera, controls);
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Update closest planet name
  let closest = null;
  let minDist = Infinity;

  planetPositions.forEach((pos, i) => {
    const dist = camera.position.distanceTo(pos);
    if (dist < 12 && dist < minDist) {
      minDist = dist;
      closest = planetData[i].name;
    }
  });

  if (closest) {
    planetNameDiv.innerText = closest;
    planetNameDiv.style.display = "block";
  } else {
    planetNameDiv.style.display = "none";
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
