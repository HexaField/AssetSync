import * as THREE from 'three';
import { EVENTS } from '../core/Constants';
import User from '../user/User.js'

export class World {
    constructor(proxy) {

        this.sceneName = 'world'

        // scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // camera
        this.camera = new THREE.PerspectiveCamera(
            70,
            proxy.clientWidth / proxy.clientHeight,
            0.1,
            100000,
        );
        this.camera.position.set(10, 50, 20);
        this.camera.lookAt(0, 0, 0);

        // for GUIs

        this.cameraScreenAttach = new THREE.Group()
        this.cameraScreenAttach.scale.set(0.2, 0.2, 0.2)
        this.scene.add(this.cameraScreenAttach)

        // renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: proxy.canvas });

        // dpr    
        const DPR = proxy.devicePixelRatio;
        this.renderer.setPixelRatio(Math.min(2, DPR));

        // light
        this.scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 0.4));
        // scene.add(new THREE.AmbientLight(0x666666));
        this.light = new THREE.DirectionalLight(0xdcd0ff, 0.8);
        this.light.position.set(50, 200, 100);
        this.light.position.multiplyScalar(1.3);

        this.user = new User()
        this.scene.add(this.user.group)
    }

    register(sceneController) {
        sceneController.registerCamera(this.camera)
        sceneController.registerRenderer(this.renderer)

        sceneController.addEventListener(EVENTS.SCENE_STOP + this.sceneName, () => { })
        sceneController.addEventListener(EVENTS.SCENE_START + this.sceneName, () => { })
        sceneController.registerSceneLoop(this.sceneName, ({ delta, time, mouseRaycaster, worldRaycaster }) => {
            this.renderer.render(this.scene, this.camera)
        })

        // loop
    }
}