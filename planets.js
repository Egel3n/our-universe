// === planets.js ===
import * as THREE from "https://esm.sh/three";

const planetData = [
  {
    name: "Wizard Planet",
    color: 0xff6699,
    position: [-20, 5, -10],
    size: 2,
    sprite: "assets/sihirbazlik.png",
  },
  {
    name: "Sarlo Planet",
    color: 0x996633,
    position: [0, 0, 0],
    size: 2.5,
    sprite: "assets/beer.png",
  },
  {
    name: "Echoes Planet",
    color: 0xffcc80,
    position: [20, -3, 15],
    size: 2,
    sprite: "assets/blanc.png",
  },
  {
    name: "Lamb Ear Planet",
    color: 0x2e6e40,
    position: [40, 15, 15],
    size: 2,
    sprite: "assets/kuzukulagi.png",
  },
  {
    name: "Budweiser Planet",
    color: 0xc8102e,
    position: [60, -12, 15],
    size: 2,
    sprite: "assets/budweiser.png",
  },
];

const planetPositions = [];

export async function createPlanets(scene) {
  const loader = new THREE.TextureLoader();
  const loadedPlanets = [];

  for (const planet of planetData) {
    const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: planet.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...planet.position);
    mesh.name = planet.name;

    scene.add(mesh);
    planetPositions.push(new THREE.Vector3(...planet.position));
    loadedPlanets.push(planet);

    if (planet.sprite) {
      loader.load(planet.sprite, (texture) => {
        const spriteMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthTest: true,
        });

        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2, 2, 1);
        sprite.position
          .copy(mesh.position)
          .add(new THREE.Vector3(0, planet.size + 1, 0));
        scene.add(sprite);
      });
    }
  }

  return loadedPlanets;
}

export function getPlanetPositions() {
  return planetPositions;
}
