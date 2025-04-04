import * as THREE from "three";
import { ARButton } from "three/addons/webxr/ARButton.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer;
let dodecahedronMesh, ringMesh, tetrahedronMesh;
let controls;

export function start() {
  init();
  animate();
}

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  // Сцена
  scene = new THREE.Scene();

  // Камера
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    40
  );

  // Об'єкт рендерингу
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.xr.enabled = true; // Життєво важливий рядок коду для вашого застосунку!
  container.appendChild(renderer.domElement);

  // Світло
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(5, 5, 0);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight2.position.set(-5, -5, 0);
  scene.add(directionalLight2);

  const pointLight = new THREE.PointLight(0xffffff, 10, 10);
  pointLight.position.set(-3, -3, 0);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const textureLoader = new THREE.TextureLoader();

  // 1. Створюємо об'єкт Dodecahedron
  const dodecahedronGeometry = new THREE.DodecahedronGeometry(1.5, 1);
  // Матеріал для першого об'єкту
  const dodecahedronMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x663399,
    transparent: true,
    opacity: 0.8,
    roughness: 0.2,
    metalness: 0.7,
    reflectivity: 0.5,
    transmission: 1,
  });
  // Створюємо меш
  dodecahedronMesh = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
  dodecahedronMesh.position.x = -3;
  dodecahedronMesh.position.z = -3;
  scene.add(dodecahedronMesh);

  // 2. Створюємо об'єкт Ring
  const ringGeometry = new THREE.RingGeometry(0.5, 1, 50);

  const texture = textureLoader.load(
    "https://lesnoi-dmytro.github.io/Lab2_VR-AR_sources/stones.png"
  );
  // Матеріал для другого
  const ringMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  // Створюємо наступний меш
  ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  ringMesh.position.z = -3;
  scene.add(ringMesh);

  // 3. Створюємо об'єкт Tetrahedron
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.5, 0);
  // Матеріал для третього
  const tetrahedronMaterial = new THREE.MeshStandardMaterial({
    color: 0xdf92b8,
    roughness: 1,
    metalness: 0.5,
  });
  // Створюємо наступний меш
  tetrahedronMesh = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
  tetrahedronMesh.position.x = 3;
  tetrahedronMesh.position.z = -3;
  scene.add(tetrahedronMesh);

  // Позиція для камери
  camera.position.z = 3;

  // Контролери для 360 огляду на вебсторінці, але не під час AR-сеансу
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  document.body.appendChild(ARButton.createButton(renderer));

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
  controls.update();
}

function render() {
  rotateObjects();
  renderer.render(scene, camera);
}

let direction = 1;

function rotateObjects() {
  dodecahedronMesh.rotation.y = dodecahedronMesh.rotation.y - 0.01;
  ringMesh.rotation.x = ringMesh.rotation.x - 0.01;

  if (tetrahedronMesh.position.x <= 2) {
    direction = 1;
  } else if (tetrahedronMesh.position.x >= 4) {
    direction = -1;
  }

  tetrahedronMesh.position.x = tetrahedronMesh.position.x + 0.01 * direction;
}
