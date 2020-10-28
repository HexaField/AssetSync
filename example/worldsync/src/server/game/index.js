// import { AmmoPhysics } from '@enable3d/ammo-physics';
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
// import HaveSomeFun from './havesomefun.js';

// import Ammo from './lib/ammo.worker.js';
// Ammo();

import diff from 'hyperdiff'

import { TerrainChunkGenerator } from './world/index.js'
import { HeightmapGenerator } from './world/HeightmapGenerator.js'
import { easyWorldOrigin } from './world/MeshTemplates.js';
import { TerrainChunkConfig } from './world/TerrainChunkConfig.js'
import { timer } from '@AssetSync/common'
import RTree from 'rbush'
import { Sky } from 'three/examples/jsm/objects/Sky.js';

export default async function (args) {

    const { assetSync, proxy } = args

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // camera
    const camera = new THREE.PerspectiveCamera(
        70,
        proxy.clientWidth / proxy.clientHeight,
        0.1,
        100000,
    );
    camera.position.set(10, 50, 20);

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: proxy.canvas });
    renderer.setSize(proxy.clientWidth, proxy.clientHeight, false);

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

    scene.fog = new THREE.FogExp2( 0xdcd0ff, 0.0001 );
    const sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky)
    const uniforms = sky.material.uniforms;
    uniforms[ "turbidity" ].value = 10;
    uniforms[ "rayleigh" ].value = 3;
    uniforms[ "mieCoefficient" ].value = 0.005;
    uniforms[ "mieDirectionalG" ].value = 0.8;
    uniforms[ "sunPosition" ].value.copy(light.position);

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
    const objectHierarchy = new RTree();

    scene.add(easyWorldOrigin(1000))

    const chunks = new TerrainChunkGenerator({
        generateFunction: async (chunk) => {
            await heightmapGenerator.heightmap({ origin: chunk.bounds })
            const mesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ color: 0xad975f, wireframe: false }))
            mesh.position.set(chunk.bounds.x, 0, chunk.bounds.y)
            mesh.frustumCulled = false
            chunk.mesh = mesh

            const trees = []

            for(let i = 0; i < 32; i++) {
                const tree = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 2, 16), new THREE.MeshBasicMaterial({ color: 0xbd8d09 }))
                const leaves = new THREE.Mesh(new THREE.SphereBufferGeometry(8), new THREE.MeshBasicMaterial({ color: 0x6fbd09 }))
                leaves.position.y = 12
                tree.add(leaves)
                const x = (Math.random() * TerrainChunkConfig.chunkSize) + chunk.bounds.x
                const z = (Math.random() * TerrainChunkConfig.chunkSize) + chunk.bounds.y
                const y = await heightmapGenerator.getPoint({ x: x, y: z })
                tree.position.set(x, y + 6, z)
                trees.push({
                    obj: tree,
                    minX: x - 1,
                    minY: z - 1,    
                    maxX: x + 1,
                    maxY: z + 1,
                })
            }

            objectHierarchy.load(trees)

            // chunk.mesh.add(new THREE.Mesh(new THREE.SphereBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xff0000 })))
        },
        loadFunction: async (chunk) => {

            if(!chunk.mesh) return

            if(!chunk.isLoaded && chunk.mesh) {
                // for(let obj of chunk.objects) {
                //     scene.remove(obj)
                // }
                // chunk.objects = []
                scene.remove(chunk.mesh)
                chunks.loadedChunks--
                return
            }

            if(chunk.meshSimplification === chunk.lastChunkSimplification)
                return
            
            chunk.lastChunkSimplification = chunk.meshSimplification

            const { vertices, indices, uv, normals } = await heightmapGenerator.aggregate({ origin: chunk.bounds, meshSimplification: chunk.meshSimplification })
            
            chunk.mesh.geometry = new THREE.BufferGeometry()
            chunk.mesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
            chunk.mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uv), 2))
            chunk.mesh.geometry.setIndex(indices)
            // mesh.geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3))
            chunk.mesh.geometry.computeVertexNormals()

            scene.add(chunk.mesh)
            chunks.loadedChunks++

            const results = objectHierarchy.search(chunk.bounds)
            const newObjs = []
            if(chunk.meshSimplification <= 4)
                for(let i = 0; i < results.length; i += chunk.meshSimplification * chunk.meshSimplification) {
                    newObjs.push(results[i].obj)
                }

            let added = newObjs.filter(x => !chunk.objects.includes(x));
            // let common = newObjs.filter(x => chunk.objects.includes(x));
            let removed = chunk.objects.filter(x => !newObjs.includes(x));
            added.forEach((obj) => {
                scene.add(obj)
                chunk.objects.push(obj)
            })
            removed.forEach((obj) => {
                scene.remove(obj)
                const index = chunk.objects.indexOf(obj)
                if (index > -1)
                    chunk.objects.splice(index, 1)
            })
        }
    })

    const animate = () => {
        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = proxy.clientWidth / proxy.clientHeight;
            camera.updateProjectionMatrix();
        }

        // player.position.x+=0.1
        chunks.updatePosition(camera.position.x, camera.position.z)

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // loop
}
