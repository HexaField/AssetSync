import * as THREE from 'three';

export default class SceneController {

    constructor(worldSync, input) {

        this.worldSync = worldSync
        this.input = input

        this.sceneFunctions = []
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

    registerSceneLoop(scene) {
        this.sceneFunctions.push(scene)
    }

    unregisterSceneLoop(scene) {
        const index = this.sceneFunctions.indexOf(scene);
        if (index !== -1) {
            this.sceneFunctions.splice(index, 1);
        }
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

    startWorld() {

        const animate = () => {

            const delta = this.clock.getDelta() * 1000
            const time = this.clock.getElapsedTime()

            this.resizeRendererToDisplaySize()

            // TODO add in delta & time etc

            for (let scene of this.sceneFunctions) {
                if (scene && typeof scene === 'function')
                    scene({
                        delta,
                        time,
                        input: this.input,
                        mouseRaycaster: this.mouseRaycaster,
                        worldRaycaster: this.worldRaycaster
                    })
            }

            requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)

    }
}