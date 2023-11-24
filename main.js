import './style.css'
import * as THREE from 'three';

//import orbitcontrols from 'three-orbitcontrols';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//import glb
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

//add public models shoe.glb
const loader = new GLTFLoader();
loader.load('/models/shoe.glb', function(gltf){
  gltf.scene.position.set(-1/2, 1/2, 1/2);
  gltf.scene.rotation.y = 1;
  //make shoe bigger
  gltf.scene.scale.set(16, 16, 16);
  scene.add(gltf.scene);
}, undefined, function(error){
  console.error(error);
});

//add plane
const planeGeometry = new THREE.PlaneGeometry( 5, 5, 32 );
const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = 1.5;
scene.add( plane );


camera.position.z = 5;
camera.position.y = 3;

//add ambientlight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);


function animate() {
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}

animate();
