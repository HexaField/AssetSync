import { EventDispatcher } from '@AssetSync/common';
import * as THREE from 'three';
import { EVENTS } from './Constants';

export default class SceneController extends EventDispatcher {

    constructor(worldSync, input) {
        super()
        
        this.worldSync = worldSync
        this.input = input

        this.sceneFunctions = {}
        this.currentScene

        this.cameras = []
        this.renderers = []
        this.rendererWidth = 0
        this.rendererHeight = 0

        this.mouseRaycaster = new THREE.Raycaster()
        this.worldRaycaster = new THREE.Raycaster()

        this.clock = new THREE.Clock()
    }

    registerCamera(camera) {
        this.cameras.push(camera)
    }

    unregisterCamera(camera) {
        const index = this.cameras.indexOf(camera);
        if (index !== -1) {
            this.cameras.splice(index, 1);
        }
    }

    registerRenderer(renderer) {
        this.renderers.push(renderer)
    }

    unregisterRenderer(renderer) {
        const index = this.renderers.indexOf(renderer);
        if (index !== -1) {
            this.renderers.splice(index, 1);
        }
    }

    registerSceneLoop(name, scene) {
        if (scene && typeof scene === 'function')
            this.sceneFunctions[name] = scene
    }

    unregisterSceneLoop(name) {
        if(this.sceneFunctions[name])
            delete this.sceneFunctions[name]
    }

    setScene(name) {
        this.dispatchEvent(EVENTS.SCENE_STOP + this.currentScene)
        this.currentScene = name
        this.dispatchEvent(EVENTS.SCENE_START + this.currentScene)
    }

    resizeRendererToDisplaySize() {
        const width = this.worldSync.clientWidth
        const height = this.worldSync.clientHeight
        const needResize = this.rendererWidth !== width || this.rendererHeight !== height
        if (needResize) {

            this.rendererWidth = width
            this.rendererHeight = height
            this.aspectRatio = this.rendererWidth / this.rendererHeight

            for (let renderer of this.renderers) {
                renderer.setSize(width, height, false)
            }

            for (let camera of this.cameras) {
                camera.aspect = this.aspectRatio
                camera.updateProjectionMatrix()
            }
        }

        return needResize
    }

    startWorld(logic) {

        const animate = () => {

            const delta = this.clock.getDelta() * 1000
            const time = this.clock.getElapsedTime()

            this.resizeRendererToDisplaySize()

            const updateData = {
                delta,
                time,
                input: this.input,
                mouseRaycaster: this.mouseRaycaster,
                worldRaycaster: this.worldRaycaster
            }

            logic(updateData)

            if(this.currentScene && this.sceneFunctions[this.currentScene])
                this.sceneFunctions[this.currentScene](updateData)

            requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)

    }
}