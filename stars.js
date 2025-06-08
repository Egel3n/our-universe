// === stars.js ===
import * as THREE from "https://esm.sh/three";

/**
 * Add a field of stars to the scene
 * @param {THREE.Scene} scene
 */
export function setupStars(scene) {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const starVertices = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const z = (Math.random() - 0.5) * 400;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
