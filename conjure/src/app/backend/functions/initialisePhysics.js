import { isNode } from "@AssetSync/common"
// import PHYSX from 'physx-js'

export async function initialisePhysics() {
    // try {
    //     if (isNode) {
    //         await new Promise((resolve) => {
    //             const PhysX = PHYSX()
    //             PhysX.onRuntimeInitialized = () => {
    //                 PhysX.loaded = true
    //                 globalThis.PhysX = PhysX
    //                 resolve()
    //             }
    //         })
    //     } else {
    //         const { default: physxModule } = await import('physx-js/dist/physx.release.wasm')
    //         await new Promise((resolve) => {
    //             const PhysX = PHYSX({
    //                 locateFile(path) {
    //                     if (path.endsWith('.wasm')) {
    //                         return physxModule
    //                     }
    //                     return path
    //                 },
    //                 onRuntimeInitialized() {
    //                     loaded = true
    //                     globalThis.PhysX = PhysX
    //                     console.log('PhysX loaded')
    //                     resolve()
    //                 },
    //             })
    //         })
    //     }
    //     console.log(typeof PhysX === 'undefined' ? 'PhysX failed loading!' : 'PhysX loaded!')
    // } catch (e) {
    //     console.log('error loading physx', e)
    // }

    try {
        if (isNode) {
            const { Ammo: ammo } = await import('@enable3d/ammo-on-nodejs')
            await new Promise((resolve) => {
                ammo().then((Ammo) => {
                    globalThis.Ammo = Ammo
                    resolve()
                })
            })

        } else {

            const { default: ammo } = await import('./ammo.worker.js')   
            await new Promise((resolve) => {
                ammo().then((Ammo) => {
                    globalThis.Ammo = Ammo
                    resolve()
                })
            })
        }
        console.log(typeof Ammo === 'undefined' ? 'Ammo failed loading!' : 'Ammo loaded!')

    } catch (e) { console.log(e) }

    
}