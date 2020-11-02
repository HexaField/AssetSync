import { isNode, EventDispatcher } from '@AssetSync/common'
import * as THREE from 'three';

export default async function (args) {
    new Conjure(args)
}


class Conjure extends EventDispatcher {
    constructor({ assetSync, worldSync }) {

        super()

        this.assetSync = assetSync
        this.worldSync = worldSync

        // realms (dht)
        // profiles (dht)
        // assets (dht)

        // TODO: eventually add support for physics, graphics, audio from node
        if (!isNode) {
            this.loadModules()
        }
    }

    async loadModules() {


        // Core
        // const { default: AudioManager } = await import('./core/AudioManager.js')
        // this.audioManager = new AudioManager()

        const { default: Fonts } = await import('./core/Fonts.js')
        this.fonts = new Fonts()

        await this.fonts.addFont('Helvetiker', '/assets/fonts/helvetiker.json')
        await this.fonts.addFont('System', '/assets/fonts/system.json')
        this.fonts.setDefault('Helvetiker')

        const { default: Input } = await import('./core/Input.js')
        this.input = new Input()

        const { default: SceneController } = await import('./core/SceneController.js')
        this.sceneController = new SceneController(this.worldSync, this.input)

        const { default: LoadingScreen } = await import('./core/LoadingScreen.js')
        this.loadingScreen = new LoadingScreen(this.fonts)
        // this.sceneController.setScene(this.loadingScreen.sceneName)

        // const { default: PostProcessing } = await import('./core/PostProcessing.js')
        // this.postProcessing = new PostProcessing()

        THREE.Cache.enabled = true
        this.cache = THREE.Cache
        this.textureAnisotropy = 1
        const { default: Loaders } = await import('./core/util/loaders.js')
        this.load = new Loaders(this.cache, this.textureAnisotropy)

        // const { default: AssetManager } = await import('./assets/AssetManager.js')
        // this.assetManager = new AssetManager(this.load)

        // const { default: Profile } = await import('./profile/Profile.js')
        // this.profile = new Profile()

        // Controls
        // User
        // Screens
        // World

        const { Controls } = await import('./controls/Controls.js')
        this.controls = new Controls(this.input)


        // const { FlyControls } = await import('./controls/FlyControls.js')
        // this.controls.addControlScheme(new FlyControls())

        const { World } = await import('./world/index.js')
        this.world = new World(this.worldSync)

        this.startConjure()

        this.sceneController.startWorld((updateData) => {
            this.input.update()
            this.controls.update(updateData)
        })
        console.log(this.worldSync)
    }

    async startConjure() {

        const { AvatarControls } = await import('./controls/AvatarControls.js')
        this.controls.addControlScheme('avatar', new AvatarControls(this.world.camera, this.world.user), true)


        this.loadingScreen.init(this.sceneController, this.worldSync)
        this.loadingScreen.setText('Initialising...')

        this.loadingScreen.setText('Downloading assets...')
        
        // await this.load.preload('playerModel', '/assets/models/ybot_anims.glb')
        // await this.load.preload('sword', '/assets/models/chevalier/scene.gltf')
        // await this.load.preload('default_realm', '/assets/icons/default_realm.png')
        // await this.load.preload('speaker', '/assets/icons/pin_full.png')
        // await this.load.preload('pin_empty', '/assets/icons/pin_empty.png')

        // await this.load.preload('missing_texture', '/assets/textures/missing_texture.png')
        // await this.load.preload('menger_texture', '/assets/textures/menger_texture.png')
        // await this.load.preload('ponder_texture', '/assets/textures/ponder_texture.png')
        // await this.load.preload('default_texture', '/assets/textures/default_texture.png')

        this.loadingScreen.setText('Loading default assets...') 

        // await this.assetManager.createDefaultAssets()


        // const { default: ProfileServiceDiscord } = await import('./profile/services/ProfileServiceDiscord.js')
        // this.addService(new ProfileServiceDiscord(this.profile))

        this.loadingScreen.setText('Loading World...')
        this.world.register(this.sceneController)
        this.sceneController.setScene(this.world.sceneName)
    }

}
