
import * as THREE from 'three'
import { PHYSICS_TYPES, PHYSICS_SHAPES } from '../../world/object/ObjectManager'
// import { POSTPROCESSING } from '../../PostProcessing'
// import { createGeometry, createMaterial } from '../../util/wireframe'

export const ObjectPrefabs = {
    Mesh: (conjure) => {
        const newObject = new THREE.Mesh(conjure.assetManager.defaultGeometry, conjure.assetManager.defaultMaterial)
        newObject.name = 'Mesh-' + Math.round(Math.random() * 10000)
        newObject.userData.physics = {
            type: PHYSICS_TYPES.NONE,
            shape: PHYSICS_SHAPES.CONVEX,
            gravity: 1, // multiplier
            bounciness: 0,
            mass: 1,
            destructable: false,
            deformable: false
        }
        return newObject
    },
    Menger: (conjure) => {
        const newObject = new THREE.Mesh(conjure.assetManager.mengerGeometry.clone(), new THREE.MeshNormalMaterial())
        newObject.name = 'Menger'
        // newObject.geometry = newObject.geometry.toNonIndexed()
        // createGeometry(newObject.geometry, true)
        // newObject.material = createMaterial({thickness: 0.02});
        // newObject.layers.enable(POSTPROCESSING.BLOOM_SCENE)
        return newObject
    },
    Ball: (conjure) => {
        const newObject = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(0.2, 4), new THREE.MeshPhysicalMaterial({ color: 0xffffff }))
        newObject.name = 'Ball'
        newObject.userData.physics = {
            type: PHYSICS_TYPES.DYNAMIC,
            shape: PHYSICS_SHAPES.CONVEX,
            gravity: 1, // multiplier
            bounciness: 1,
            mass: 1,
            destructable: false,
            deformable: false
        }
        return newObject
    },
    // HTMLPanel: (conjure) => {
    //     let newObject = new THREE.Mesh()
    //     return newObject
    // }
}