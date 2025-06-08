// === stars.js ===
import * as THREE from "https://esm.sh/three";

export function setupStars(scene) {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const starVertices = [];

  // 🚀 Rastgele yıldızlar
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

  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // ❤️ Kalp şeklinde yıldızlar
  const heartGeometry = new THREE.BufferGeometry();
  const heartVertices = [];

  for (let i = 0; i < 200; i++) {
    const t = Math.random() * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    const z = (Math.random() - 0.5) * 2;

    // Scale and position the heart in space
    heartVertices.push(x * 1.5 + 60, y * 1.5 + 40, z + 10);
  }

  heartGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(heartVertices, 3)
  );

  const heartMaterial = new THREE.PointsMaterial({
    color: 0xff4d6d,
    size: 1.2,
  });
  const heartStars = new THREE.Points(heartGeometry, heartMaterial);
  scene.add(heartStars);
}
