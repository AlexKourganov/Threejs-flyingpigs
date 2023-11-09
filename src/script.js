import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove',(e)=>{
    // console.log(e.clientX, ' ' , e.clientY);
    cursor.x = e.clientX / window.innerWidth - 0.5;
    cursor.y = e.clientY / window.innerHeight - 0.5;
    
});



/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Font
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const textGeometry = new TextGeometry(
            'When Pigs Fly',
            {
                font,
                size:0.5,
                height:0.2,
                curveSegments:12,
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:15
                
            }
        )
        textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x-0.02)*0.5,
        //     -(textGeometry.boundingBox.max.y-0.02)*0.5,
        //     -(textGeometry.boundingBox.max.z-0.03)*0.5,
        // )
        textGeometry.center()
        const textMaterial = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry,textMaterial)
        scene.add(text)
        console.time('donuts')

        const donutGeometry = new THREE.TorusBufferGeometry(0.1,0.05,20,45)
        const dobutMaterial = new THREE.MeshNormalMaterial()
        for(let i = 0;i<100;i++){
            const donut = new THREE.Mesh(donutGeometry,dobutMaterial)
            // random position
            donut.position.x = (Math.random()-0.5)*10
            donut.position.y = (Math.random()-0.5)*10
            donut.position.z = (Math.random()-0.5)*10
            donut.rotation.x = (Math.random()-0.5)*10
            donut.rotation.y = (Math.random()-0.5)*10
            donut.rotation.z = (Math.random()-0.5)*10
            scene.add(donut)
        }
        
        // Mobius
        const mobiusGeometry = new THREE.TorusKnotGeometry(0.1,0.035,150,20)
        const mobiusMaterial = new THREE.MeshNormalMaterial()
        for(let i = 0;i<100;i++){
            const mobius = new THREE.Mesh(mobiusGeometry,mobiusMaterial)
            // random position
            mobius.position.x = (Math.random()-0.5)*10
            mobius.position.y = (Math.random()-0.5)*10
            mobius.position.z = (Math.random()-0.5)*10
            mobius.rotation.x = (Math.random()-0.5)*10
            mobius.rotation.y = (Math.random()-0.5)*10
            mobius.rotation.z = (Math.random()-0.5)*10
            scene.add(mobius)
        }
        console.timeEnd('donuts')

        // ----------------
        const animate = () => {
            // ... (previous code)

            // Text Rotation
            text.rotation.y += 0.01; // Rotate the text on the x-axis
            text.rotation.x += 0.01; // Rotate the text on the x-axis

            // Render
            renderer.render(scene, camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(animate);
        };
        animate(); // Start the animation loop
        
        
    }

)


/**
 * Object donuts
 */



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let rotationDirection = 1; // 1 for clockwise, -1 for counterclockwise
let currentRotation = 0;

const tick = () =>
{
    
    const elapsedTime = clock.getElapsedTime()
   
    // Update controls
    controls.update()

    // Scene rotation
  // Adjust the rotation speed based on your desired animation duration
  const rotationSpeed = .003;

  // Update the rotation based on the direction
  currentRotation += rotationDirection * rotationSpeed;

  // Rotate the scene or camera based on the currentRotation
//   scene.rotation.z = currentRotation;
  scene.rotation.x = currentRotation;

  // Check if we reached the desired angles and reverse the direction
  if (currentRotation >= Math.PI / 3) { // 30 degrees in radians
    rotationDirection = -1; // Reverse direction
  } else if (currentRotation <= -4 * Math.PI / 6) { // 150 degrees in radians
    rotationDirection = 1; // Reverse direction
  }
    
  

    // Rotate camera
       camera.position.x = Math.sin(cursor.x * Math.PI)*7;
       camera.position.y = Math.sin(cursor.y * Math.PI)*7;
    //  camera.position.z = Math.cos(cursor.x * Math.PI*2)*3;
    //  camera.position.y = cursor.y * Math.PI*2;

   

     camera.lookAt(new THREE.Vector3());
    // camera.lookAt(mesh.position);

    // Text Rotation
    // text.rotation.x +=1

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()