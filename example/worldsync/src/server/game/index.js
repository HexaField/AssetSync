// import { AmmoPhysics } from '@enable3d/ammo-physics';
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
// import HaveSomeFun from './havesomefun.js';

// import Ammo from './lib/ammo.worker.js';
// Ammo();

import { Regions } from './world/index.js'
import { HeightmapGenerator } from './world/HeightmapGenerator.js'
import { easyWorldOrigin } from './world/MeshTemplates.js';

export default async function (args) {

    const { assetSync, proxy } = args

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
    scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.4));
    // scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.DirectionalLight(0xdfebff, 0.8);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);

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

    const player = new THREE.Mesh(new THREE.SphereBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
    scene.add(player)

    const heightmapGenerator = new HeightmapGenerator()

    scene.add(easyWorldOrigin(1000))

    const regions = new Regions({
        generateFunction: async (region) => {
            const mesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }))
            mesh.position.set(region.center.x, 0, region.center.y)
            
            const { vertices, indices } = await heightmapGenerator.generate(region.coords)
            mesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
            mesh.geometry.setIndex(indices)
            mesh.geometry.computeVertexNormals()

            region.mesh = mesh
            
            // const origin = new THREE.Mesh(new THREE.SphereBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xffffff }))
            // origin.position.set(RegionConfig.regionSize / 2, 0, RegionConfig.regionSize / 2)
            // mesh.add(origin)
        },
        loadFunction: (region) => {
            scene.add(region.mesh)
        },
        unloadFunction: (region) => {
            scene.remove(region.mesh)
        }
    })
    // regions.updatePosition(camera.position.x, camera.position.y)

    // loop
    const animate = () => {
        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = proxy.clientWidth / proxy.clientHeight;
            camera.updateProjectionMatrix();
        }

        // player.position.x+=0.1
        regions.updatePosition(camera.position.x, camera.position.z)

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}
