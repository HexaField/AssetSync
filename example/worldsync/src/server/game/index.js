// import { AmmoPhysics } from '@enable3d/ammo-physics';
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
// import HaveSomeFun from './havesomefun.js';

// import Ammo from './lib/ammo.worker.js';
// Ammo();

import { ProceduralRegions } from './world/index.js'
import { HeightmapGenerator } from './world/HeightmapGenerator.js'
import { easyWorldOrigin } from './world/MeshTemplates.js';
import { RegionConfig } from './world/RegionConfig.js'
import { timer } from '@AssetSync/common'

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
    camera.position.set(10, 5, 20);

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

    const player = new THREE.Mesh(new THREE.SphereBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xff00ff }))
    scene.add(player)

    const heightmapGenerator = new HeightmapGenerator()

    scene.add(easyWorldOrigin(1000))

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

    const regions = new ProceduralRegions({
        generateFunction: async (region) => {
            const time = Date.now()
            const mesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ wireframe: true }))
            mesh.position.set(region.bounds.x, 0, region.bounds.y)
            region.mesh = mesh
            mesh.frustumCulled = false
            // mesh.visible = false
            // mesh.position.y = mesh.position.z

            const { vertices, indices, normals } = await heightmapGenerator.generate({ origin: region.bounds, detail: region.depth, stitchBorders: region.depth > 1 })
            // return { vertices, indices, normals}

            mesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
            mesh.geometry.setIndex(indices)
            // mesh.geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3))
            mesh.geometry.computeVertexNormals()

            region.mesh = mesh

            // const origin = new THREE.Mesh(new THREE.SphereBufferGeometry(), new THREE.MeshBasicMaterial({
            //     color: region.depth === 1 ? 0xff0000 : region.depth === 2 ? 0x00ff00 : 0x0000ff
            // }))
            // if(region.depth === 3)
            //     scene.add(new VertexNormalsHelper( mesh, 2, 0x00ff00, 1 ))
            // mesh.add(origin)
        },
        loadFunction: (region, load) => {
            // region.mesh.visible = true
            if (!region.hasMesh) return
            if (load) {
                
                scene.add(region.mesh)
            } else {
                scene.remove(region.mesh)
            }
        }
    })
    // regions.updatePosition(camera.position.x, camera.position.y)

    // loop
}
