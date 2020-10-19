import { AmmoPhysics } from '@enable3d/ammo-physics';
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import HaveSomeFun from './havesomefun.js';

import Ammo from './lib/ammo.worker.js';
Ammo();

export default async function (assetSync, proxy) {

    assetSync.networkPlugin.joinNetwork('test-network-worldsync').then((network) => {
        network.on('onMessage', (message, peerID) => {
            console.log(peerID, 'says', message)
        })
        network.on('onPeerJoin', (peerID) => {
            console.log(peerID, 'has joined')
            assetSync.networkPlugin.sendTo('test-network-worldsync', 'Hello peer!', peerID)
        })
        network.on('onPeerLeave', (peerID) => {
            console.log(peerID, 'has left')
        })
    })

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // camera
    const camera = new THREE.PerspectiveCamera(
        50,
        proxy.clientWidth / proxy.clientHeight,
        0.1,
        100000,
    );
    camera.position.set(10, 10, 20);

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: proxy.canvas });
    renderer.setSize(proxy.clientWidth, proxy.clientHeight, false);

    // dpr    
    const DPR = proxy.devicePixelRatio;
    renderer.setPixelRatio(Math.min(2, DPR));

    // orbit controls
    const controls = new OrbitControls(camera, proxy);

    // light
    scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));
    scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);

    // physics
    const physics = new AmmoPhysics(scene);
    // physics.debug.enable(true)

    // extract the object factory from physics
    // the factory will make/add object without physics
    const { factory } = physics;

    physics.add.ground({ width: 20, height: 20 });
    let objects = [];

    proxy.addEventListener('clear', () => {
        for (let obj of objects) {
            physics.destroy(obj.body);
            scene.remove(obj);
        }
        objects = [];

        // physics.add.ground({ width: 20, height: 20 })
    });

    proxy.addEventListener('drop', (event) => {
        objects.push(...HaveSomeFun(event.detail, physics));
    });

    proxy.dispatchEvent({ type: 'drop', detail: 100 })

    // clock
    const clock = new THREE.Clock();

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = proxy.clientWidth;
        const height = proxy.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    // loop
    const animate = () => {
        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = proxy.clientWidth / proxy.clientHeight;
            camera.updateProjectionMatrix();
        }

        physics.update(clock.getDelta() * 1000);
        physics.updateDebugger();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}
