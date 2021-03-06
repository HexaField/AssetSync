import * as THREE from 'three'
import EventEmitter from 'events'
import { REALM_TYPES } from '../backend/realm/RealmData.js';
import { getParams } from '@AssetSync/common'

export const CONJURE_MODE = {
    LOADING: 'Loading',
    EXPLORE: 'Explore',
    BUILD: 'Build',
    SCREEN: 'Screen'
}

export async function startConjure(data)
{
    new Conjure(data)
}

class Conjure extends EventEmitter
{
    constructor({ assetSync, assets, profiles, realms })
    {
        super()
        
        this.assetSync = assetSync
        this.assets = assets
        this.profiles = profiles
        this.realms = realms
        this.canvas = document.getElementById('canvas')
        this.urlParams = getParams()
        this.allowIncomingFeeds = false
        
        this.start()
    }

    async start()
    {
        await this.init()
        await this.preload()
        await this.create()

        this.realms.on('update', (delta) => {
            this.resizeRendererToDisplaySize(this.renderer)
            this.update(delta)
        })
        // const animate = () => {
        //     this.resizeRendererToDisplaySize(this.renderer)
        //     this.update()
        //     requestAnimationFrame(animate)
        // };
        // requestAnimationFrame(animate)
    }


    resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            this.resizeCanvas(width, height);
        }
        return needResize;
    }
    
    getWorld() { return this.world }
    getScreens() { return this.screenManager }
    getFonts() { return this.fonts }
    getFont(font) { return this.getFonts().getFont(font) }
    getDefaultFont() { return this.fonts.getDefault() }
    getProfile() { return this.profile }
    getGlobalHUD() { return this.screenManager.hudGlobal }
    getAudioManager() { return this.audioManager }
    getLoadingScreen() { return this.loadingScreen }
    
    async init()
    {
        this.clock = new THREE.Clock()
        this.loadTimer =  Date.now()
        this.setConjureMode(CONJURE_MODE.LOADING)

        const { default: Fonts } = await import('./screens/text/Fonts.js')
        this.fonts = new Fonts(this)
        await this.fonts.addFont('Helvetiker', '/assets/fonts/helvetiker.json')
        await this.fonts.addFont('System', '/assets/fonts/system.json')
        this.fonts.setDefault('Helvetiker')

        this.initScene()

        const { default: LoadingScreen } = await import('./LoadingScreen.js')
        this.loadingScreen = new LoadingScreen(this)
        this.loadingScreen.create()

        this.loadingScreen.setText('Initialising...')

        this.mouseRaycaster = new THREE.Raycaster()
        this.worldRaycaster = new THREE.Raycaster()

        this.vec3 = new THREE.Vector3()
        this.vec2 = new THREE.Vector2()
        this.quat = new THREE.Quaternion()

        const { default: Input } = await import('./Input.js')
        this.input = new Input(this)
    }

    initScene()
    {

        // === SCENE === //
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.FogExp2( 0x344242, 0.001 );
        
        let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
        this.scene.add( ambientLight );

        let d = 8.25
        
        var theta = Math.PI * ( 0.3 - 0.5 );
        var phi = 2 * Math.PI * ( 0.3 - 0.5 );

        this.sunPos = new THREE.Vector3();
        this.sunPos.x = Math.cos( phi );   
        this.sunPos.y = Math.sin( phi ) * Math.sin( theta );
        this.sunPos.z = Math.sin( phi ) * Math.cos( theta );

        this.dirLight = new THREE.DirectionalLight(0xffffff, 0.4)
        this.dirLight.position.copy(this.sunPos)
        this.dirLight.castShadow = true
        this.dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
        this.dirLight.shadow.camera.near = 0.1
        this.dirLight.shadow.camera.far = 1500
        this.dirLight.shadow.camera.left = d * -1
        this.dirLight.shadow.camera.right = d
        this.dirLight.shadow.camera.top = d
        this.dirLight.shadow.camera.bottom = d * -1
        this.scene.add(this.dirLight)

        // === CAMERA === //

        this.camera = new THREE.PerspectiveCamera(
          60,
          window.clientWidth / window.clientHeight,
          0.1,
          10000,
        );

        this.cameraFollow = new THREE.Group()
        this.cameraFollow.position.setZ(-0.35)
        this.debugBall = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1), new THREE.MeshBasicMaterial())
        this.debugBall.receiveShadow = false
        this.debugBall.castShadow = false
        this.cameraFollow.add(this.debugBall)
        this.camera.add(this.cameraFollow)

        this.cameraTrack = new THREE.Group()
        this.scene.add(this.cameraTrack)

        this.cameraScreenAttach = new THREE.Group()
        this.cameraScreenAttach.scale.set(0.2, 0.2, 0.2)
        this.scene.add(this.cameraScreenAttach)

        // === RENDER === //

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: this.canvas })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.clientWidth, window.clientHeight, false)

        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.toneMapping = THREE.ReinhardToneMapping

        this.renderer.setClearColor( 0x000000, 1.0)
    }

    async preload()
    {
        THREE.Cache.enabled = true
        this.cache = THREE.Cache
        this.textureAnisotropy = 1
        
        const { default: Loaders } = await import('./util/loaders.js')
        this.load = new Loaders(this.cache, this.textureAnisotropy)
        // this.resizeCanvas()
        this.loadingScreen.setText('Downloading assets...') 
            
        await this.load.preload('playerModel', '/assets/models/ybot_anims.glb')
        // await this.load.preload('sword', '/assets/models/chevalier/scene.gltf')
        await this.load.preload('default_realm', '/assets/icons/default_realm.png')
        await this.load.preload('pin_full', '/assets/icons/pin_full.png')
        await this.load.preload('pin_empty', '/assets/icons/pin_empty.png')
        await this.load.preload('speaker', '/assets/icons/speaker.png')
        await this.load.preload('speakermute', '/assets/icons/speakermute.png')
        await this.load.preload('global_icon', '/assets/icons/global.png')

        await this.load.preload('missing_texture', '/assets/textures/missing_texture.png')
        await this.load.preload('menger_texture', '/assets/textures/menger_texture.png')
        await this.load.preload('ponder_texture', '/assets/textures/ponder_texture.png')
        await this.load.preload('default_texture', '/assets/textures/default_texture.png')
    }

    async create()
    {
        console.log('Took', (Date.now() - this.loadTimer)/1000, ' seconds to preload.')

        // const { AmmoPhysics } = await import('@enable3d/ammo-physics')
        // this.physics = new AmmoPhysics(this.scene)
        
        const { default: Mixers } = await import('./util/mixers.js')
        this.mixers = new Mixers()
        this.animationMixers = this.mixers.mixers
        
        const { default: PostProcessing } = await import('./PostProcessing.js')
        this.postProcessing = new PostProcessing(this);

        this.loadingScreen.setText('Loading default assets...') 
        const { default: AssetManager } = await import('./AssetManager.js')
        this.assetManager = new AssetManager(this)

        await this.assetManager.createDefaultAssets(); // we want to do this now as some screens may use default assets or grab references in initialisation
        
        const { default: Profile } = await import('./profile/Profile.js')
        this.profile = new Profile(this)

        const { NetworkingSchemas } = await import ('./world/realm/NetworkingSchemas')
        this.networkingSchemas = new NetworkingSchemas()

        this.input.addKey('FOCUS', 'f');
        this.input.addKey('EDIT_CONTROLS', '1');
        this.input.addKey('FLY_CONTROLS', '2');
        this.input.addKey('AVATAR_CONTROLS', '3');
        this.input.addKey('FORWARD', 'w'); 
        this.input.addKey('BACKWARD', 's');
        this.input.addKey('LEFT', 'a');
        this.input.addKey('RIGHT', 'd');
        this.input.addKey('JUMP', 'SPACEBAR');
        const { default: World } = await import('./world/World.js')
        this.world = new World(this)
        // const { default: ControlManager } = await import('./controls/ControlManager.js')
        // this.controlManager = new ControlManager(this)
        const { default: ScreenManager } = await import('./screens/ScreenManager.js')
        this.screenManager = new ScreenManager(this)

        // this.resizeCanvas() // trigger this to set up screen anchors
        this.screenManager.hudGlobal.showScreen(true)
        
        // if(isWebWorker) {
        //     const { AudioWrapper } = await import('./AudioWrapper.js')
        //     this.audioManager = new AudioWrapper(this)
            
        //     const { VideoWrapper } = await import('./VideoWrapper.js')
        //     this.videoWrapper = new VideoWrapper(this)
        // } else {
            const { AudioManager } = await import('./AudioManager.js')
            this.audioManager = new AudioManager(this)
        // }
        this.screenManager.hudGlobal.audioControls.setAudioManager(this.audioManager)

        this.loadingScreen.setText('Loading World...')

        // Now load stuff in
        await this.profile.loadFromDatabase()
        await this.profile.getServiceManager().initialiseServices()
        await this.world.preloadRealms()

        this.world.loadDefault()
        window.CONSOLE.showNotification('Press (R) to reset if your avatar gets stuck\nPress escape to reveal the mouse and access settings.', 3)

        // this.loadInfo = document.getElementById( 'loadInfo' )
        // this.loadInfo.hidden = true
        
        this.getGlobalHUD().log('Took ' + (Date.now() - this.loadTimer)/1000 + ' seconds to load.')
        this.getGlobalHUD().addWatchItem('Peers Online', this.assetSync.transportPlugin.peerInfo, 'peersCount')
    }

    setConjureMode(mode)
    {
        if(this.conjureMode === mode)  {
            return
        }

        this.lastConjureMode = this.conjureMode
        this.conjureMode = mode
        this.emit('conjure:mode', mode)
    }
    
    update(delta)
    {   
        // const delta = this.clock.getDelta() * 1000
        // const time = this.clock.getElapsedTime()
    
        if(this.conjureMode === CONJURE_MODE.LOADING)
        {
            this.loadingScreen.update(delta)
        } 
        else
        {
            this.updateConjure(delta)

            // this.physics.update(delta)
            
            this.animationMixers.update(delta)
            // this.renderer.render(this.scene, this.camera)
            this.postProcessing.render()
            // this.rendererCSS.render(this.sceneCSS, this.camera)
        }
    }

    updateConjure(delta)
    {
        let deltaSeconds = delta / 1000
        if(deltaSeconds > 0.1) deltaSeconds = 0.1 // so physics doesnt go insane
        
        this.input.update()

        this.mouseRaycaster.setFromCamera(this.input.mouse, this.camera)
        this.worldRaycaster.setFromCamera(this.vec2, this.camera)
    
        let args = { 
            delta: deltaSeconds,
            input: this.input,
            mouseRaycaster: this.mouseRaycaster,
            worldRaycaster: this.worldRaycaster,
            conjure: this,
        }

        this.getWorld().update(args)
        this.cameraScreenAttach.position.copy(this.cameraFollow.getWorldPosition(this.vec3))
        this.cameraScreenAttach.quaternion.copy(this.cameraFollow.getWorldQuaternion(this.quat))

        this.getScreens().update(args)
    }

    async updateIngoingMediaStream() {
        await this.audioManager.create(false)
        for(let user of Object.values(this.world.remoteUsers)) {
            user.getIncomingMediaStreams()
        }
    }

    async toggleMediaStream() {
        if(!this.hasMediaStream()) {
            if(this.world.realm.realmData.type === REALM_TYPES.GLOBAL) {
                if(this.world.realm.realmID !== 'Campfire')
                    return
                // do verification of realm here
            }
            const stream = await this._getUserMediaStream()
            if(!stream.ended && stream.active) {
                for(let user of Object.values(this.world.remoteUsers)) {
                    user.addMedia(stream)
                }
                return
            }
        }
        for(let user of Object.values(this.world.remoteUsers)) {
            user.removeMedia()
            user.removeVideo()
        }
        this.userMediaStream = undefined
    }

    hasMediaStream() {
        return this.userMediaStream !== undefined
    }

    async _getUserMediaStream() {
        if(!this.mediaStreamHandler) {
            const { default: mediaStreamHandler } = await import("./mediastreams/MediaStream.js")
            this.mediaStreamHandler = mediaStreamHandler
        }
        console.log('Attempting to get media stream...')
        if(!this.hasMediaStream()) {
            try {
                this.userMediaStream = await this.mediaStreamHandler()

                console.log('Successfully got media streams!')
            } catch (err) {
                console.log('Failed to get media streams!', err)
                this.userMediaStream = undefined
            }
        }
        return this.userMediaStream
    }

    makeUrl() {
        const url = new URL(location.origin)
        if(this.world.realm) {
            url.searchParams.append('r', this.world.realm.realmID)
        }
        url.searchParams.append('network', 'true')
        return url
    }

    resizeCanvas(width, height)
    {
        if(!width || !height) return

        const aspect = width / height
        
        this.camera.aspect = aspect
        this.camera.updateProjectionMatrix()

        this.loadingScreen.camera.aspect = aspect
        this.loadingScreen.camera.updateProjectionMatrix()
        
        this.renderer.setSize(width, height, false)

        // this.loadingScreen.renderer.setSize(width, height, false)
        // this.rendererCSS.setSize(width, height, false)
        this.postProcessing.composer.setSize(width, height, false)
        if(this.screenManager)
            this.screenManager.resizeScreens(aspect)
        // this.postProcessing.effectFXAA.uniforms['resolution'].value.set(1 / this.canvas.width, 1 / this.canvas.height)
    }
}