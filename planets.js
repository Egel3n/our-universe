// === planets.js ===
import * as THREE from "https://esm.sh/three";

const planetData = [
  {
    name: "Sihirbazlık Gezegeni",
    color: 0xff6699,
    position: [-20, 5, -10],
    size: 2,
    sprite: "assets/sihirbazlik.png",
  },
  {
    name: "Şarlo Gezegeni",
    color: 0x996633,
    position: [0, 0, 0],
    size: 2.5,
    sprite: "assets/beer.png",
  },
  {
    name: "Echoes Gezegeni",
    color: 0xffcc80,
    position: [20, -3, 15],
    size: 2,
    sprite: "assets/blanc.png",
  },
  {
    name: "Kuzu Kulağı Gezegeni",
    color: 0x2e6e40,
    position: [40, 15, 15],
    size: 2,
    sprite: "assets/kuzukulagi.png",
  },
  {
    name: "Budweiser Gezegeni",
    color: 0xc8102e,
    position: [60, -12, 15],
    size: 2,
    sprite: "assets/budweiser.png",
  },
  {
    name: "Serra",
    color: 0xffcc00,
    position: [80, 45, -40],
    size: 4,
    isSun: true, // 🌞 ayırıcı bayrak
    sprite: null, // güneşe etiket gerekmez
  },
  {
    name: "Ege",
    color: 0xcccccc, // soft gray
    position: [95, 45, -40],
    size: 1.5,
    isMoon: true,
    texture: "assets/moon.jpg", // sen ekleyeceksin
    sprite: null,
  },
];

const planetPositions = [];

export async function createPlanets(scene) {
  const loader = new THREE.TextureLoader();
  const createdPlanets = [];

  for (const planet of planetData) {
    const geometry = new THREE.SphereGeometry(planet.size, 64, 64);
    let material;

    // ☀️ Sun material
    if (planet.isSun) {
      material = new THREE.MeshStandardMaterial({
        color: planet.color,
        emissive: 0xff9900,
        emissiveIntensity: 2,
        roughness: 0.4,
        metalness: 0.1,
      });
    }
    // 🌕 Moon material
    else if (planet.isMoon) {
      material = new THREE.MeshStandardMaterial({
        color: planet.color,
        emissive: 0xaaaaaa,
        emissiveIntensity: 1.2,
        roughness: 0.9,
        metalness: 0.05,
      });
    }
    // 🪐 Other planets
    else {
      material = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.8,
        metalness: 0.1,
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...planet.position);
    mesh.name = planet.name;
    scene.add(mesh);
    planetPositions.push(new THREE.Vector3(...planet.position));
    createdPlanets.push(planet);
    planet.mesh = mesh;

    // ☀️ Sun light + glow
    if (planet.isSun) {
      const sunLight = new THREE.PointLight(0xfff1aa, 10, 300, 2);
      sunLight.position.set(...planet.position);
      scene.add(sunLight);

      const glowTexture = await loader.loadAsync("assets/sun_glow.png");
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffaa00,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(20, 20, 1);
      glowSprite.position.set(...planet.position);
      scene.add(glowSprite);
    }

    // 🌕 Moon light + glow
    if (planet.isMoon) {
      const moonLight = new THREE.PointLight(0xffffff, 5, 150, 2);
      moonLight.position.set(...planet.position);
      scene.add(moonLight);

      const moonGlowTex = await loader.loadAsync("assets/moon_glow.png");
      const moonGlowMat = new THREE.SpriteMaterial({
        map: moonGlowTex,
        color: 0xddddff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const moonGlow = new THREE.Sprite(moonGlowMat);
      moonGlow.scale.set(10, 10, 1);
      moonGlow.position.set(...planet.position);
      scene.add(moonGlow);
    }

    // 🌟 Sprite label if exists
    if (planet.sprite) {
      const spriteTex = await loader.loadAsync(planet.sprite);
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteTex,
        transparent: true,
        depthTest: true,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(2, 2, 1);
      sprite.position
        .copy(mesh.position)
        .add(new THREE.Vector3(0, planet.size + 1, 0));
      scene.add(sprite);
    }
  }

  return createdPlanets;
}

export function getPlanetPositions() {
  return planetPositions;
}
