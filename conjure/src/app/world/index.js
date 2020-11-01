import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';

export class World {
    constructor(sceneController, proxy) {

        // scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // camera
        const camera = new THREE.PerspectiveCamera(
            70,
            proxy.clientWidth / proxy.clientHeight,
            0.1,
            100000,
        );
        camera.position.set(10, 50, 20);
        sceneController.registerCamera(camera)

        // renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: proxy.canvas });
        renderer.setSize(proxy.clientWidth, proxy.clientHeight, false);
        sceneController.registerRenderer(renderer)

        // dpr    
        const DPR = proxy.devicePixelRatio;
        renderer.setPixelRatio(Math.min(2, DPR));

        // orbit controls
        const controls = new OrbitControls(camera, proxy);

        // light
        scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 0.4));
        // scene.add(new THREE.AmbientLight(0x666666));
        const light = new THREE.DirectionalLight(0xdcd0ff, 0.8);
        light.position.set(50, 200, 100);
        light.position.multiplyScalar(1.3);

        const player = new THREE.Mesh(new THREE.SphereBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xff00ff }))
        scene.add(player)

        sceneController.registerSceneLoop(({ delta, time, mouseRaycaster, worldRaycaster }) => {
            renderer.render(scene, camera)
        })


        // loop
    }
}