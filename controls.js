// === controls.js ===
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://esm.sh/three";

/**
 * Set up OrbitControls with default parameters
 * @param {THREE.Camera} camera
 * @param {HTMLCanvasElement} canvas
 * @returns {OrbitControls}
 */
export function setupControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = false;
  return controls;
}

/**
 * Move the camera to focus on a target position
 * @param {THREE.Vector3} targetPosition
 * @param {THREE.Camera} camera
 * @param {OrbitControls} controls
 */
export function moveToPlanet(targetPosition, camera, controls) {
  controls.target.copy(targetPosition);
  const offset = new THREE.Vector3(0, 0, 10);
  camera.position.copy(targetPosition.clone().add(offset));
  controls.update();
}
