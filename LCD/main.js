import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

//const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
//const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);


let loader = new GLTFLoader();
loader.load('walle/scene.gltf', function (gltf) {
    let walle = gltf.scene.children[0];
    walle.scale.set(1, 1, 1);
    walle.rotateZ(-1.13);
    walle.position.set(-0.8, 0, -10);
    scene.add(gltf.scene);
    animate();
});

loader.load('eve/scene.gltf', function (gltf) {
    let eve = gltf.scene.children[0];
    eve.scale.set(1, 1, 1);
    eve.rotateZ(0.3);
    eve.position.set(-4.4, -2, -10);
    scene.add(gltf.scene);
    animate();
});

loader.load('R2D2/scene.gltf', function (gltf) {
    let r2d2 = gltf.scene.children[0];
    r2d2.scale.set(2, 2, 2);
    r2d2.rotateZ(0.35);
    r2d2.position.set(1.6, -2, -10);
    scene.add(gltf.scene);
    animate();
});


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
//scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(500));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('background/space.jpg');
scene.background = spaceTexture;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.01;
    camera.rotation.y = t * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);

    //sceneObjects['walle'].rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
    
}

animate();