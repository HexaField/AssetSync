import Ammo from '../../lib/ammo.worker.js';
import { AmmoPhysics } from '@enable3d/ammo-physics';
import Mixers from './util/mixers'

import * as THREE from 'three'
import Loaders from './util/loaders'

import Fonts from './screens/text/Fonts'
import LoadingScreen from './LoadingScreen'
import Input from './Input' 
import PostProcessing from './PostProcessing'
import AssetManager from './AssetManager';
import Profile from './user/Profile'
import { Store, get as getIDBItem, set as setIDBItem, keys as keysIDBItem, del as delIDBItem, clear as clearIDBItem } from 'idb-keyval';

import World from './world/World'
import ControlManager, { CONTROL_SCHEME } from './controls/ControlManager'
import ScreenManager from './screens/ScreenManager'
import AudioManager from './AudioManager'

export const CONJURE_MODE = {
    LOADING: 'Loading',
    WAITING: 'Waiting', // this is for once the world is loaded but waiting on user input (eg passcode)
    EXPLORE: 'Explore',
    CONJURE: 'Conjure',
}

export class Conjure
{
    constructor(server)
    {
        console.log(server)

        this.server = server

        this.canvas = server.worldSync.canvas
        this.inputElement = server.worldSync
        this.dataHandler = data.assetSync
        // this.urlParams = data.userData.urlParams

        this.assetURL = "https://assets.conjure.world/"
        
        this.start()
    }

    async start()
    {
        const conjureDataStoreName = 'conjureSimpleDataStore'
        const customStore = new Store(conjureDataStoreName, conjureDataStoreName);
        
        self.simpleStorage = {
          async get(key) {
            return await getIDBItem(key, customStore);
          },
          async set(key, val) {
            return await setIDBItem(key, val, customStore);
          },
          async del(key) {
            return await delIDBItem(key, customStore);
          },
          async clear() {
            return await clearIDBItem(customStore);
          },
          async keys() {
            return await keysIDBItem(customStore);
          },
        };

        await this.init()
        await this.preload()
        this.physics = new AmmoPhysics(this.scene);
        this.mixers = new Mixers()
        this.animationMixers = this.mixers.mixers
        
        await this.create()

        const animate = () => {
            if (this.resizeRendererToDisplaySize(this.renderer)) {
              this.camera.aspect = this.inputElement.clientWidth / this.inputElement.clientHeight;
              this.camera.updateProjectionMatrix();
            }
            this.update()
            requestAnimationFrame(animate)
        };
        requestAnimationFrame(animate)
    }


    resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = window.clientWidth;
        const height = window.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            this.resizeCanvas(width, height);
        }
        return needResize;
    }
    
    getWorld() { return this.world }
    getScreens() { return this.screenManager }
    getControls() { return this.controlManager }
    getFonts() { return this.fonts }
    getFont(font) { return this.getFonts().getFont(font) }
    getDefaultFont() { return this.fonts.getDefault() }
    getProfile() { return this.profile }
    async getDataHandler(protocol, data) { return await this.inputElement.request(protocol, data) }
    getGlobalHUD() { return this.screenManager.hudGlobal }
    getAudioManager() { return this.audioManager }
    getLoadingScreen() { return this.loadingScreen }
    
    async ipfsGet(url) { return await this.dataHandler.ipfsGet(url) }

    async init()
    {
        this.clock = new THREE.Clock()
        global.THISFRAME = Date.now()
        this.loadTimer = global.THISFRAME
        this.conjureMode = CONJURE_MODE.LOADING

        this.fonts = new Fonts(this)
        await this.fonts.addFont('Helvetiker', this.assetURL + 'assets/fonts/helvetiker.json')
        await this.fonts.addFont('System', this.assetURL + 'assets/fonts/system.json')
        this.fonts.setDefault('Helvetiker')

        this.loadingScreen = new LoadingScreen(this)
        this.loadingScreen.create()
        this.loadingScreen.setText('Initialising...')

        this.initScene()
        this.initCamera()
        this.initRenderer()

        this.mouseRaycaster = new THREE.Raycaster()
        this.worldRaycaster = new THREE.Raycaster()

        this.vec3 = new THREE.Vector3()
        this.vec2 = new THREE.Vector2()
        this.quat = new THREE.Quaternion()

        this.input = new Input(this)
    }

    initRenderer()
    {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: this.canvas })
        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.toneMapping = THREE.ReinhardToneMapping

        this.renderer.setClearColor( 0x000000, 1.0)

        // this.rendererCSS = new CSS3DRenderer({alpha: true, antialias: true})
        // this.rendererCSS.setSize( window.innerWidth, window.innerHeight )
        // // this.rendererCSS.domElement.style.position = 'absolute'
        // this.rendererCSS.domElement.style.outline = 'none' // required
        // this.rendererCSS.domElement.style.top = 0
        // this.rendererCSS.domElement.style.zIndex = 10000
        // document.body.appendChild(this.rendererCSS.domElement);
        // document.body.removeChild(this.renderer.domElement);
        // this.rendererCSS.domElement.appendChild(this.renderer.domElement);
    }

    initCamera()
    {
        this.camera = new THREE.PerspectiveCamera(
          60,
          window.clientWidth / window.clientHeight,
          0.1,
          10000,
        );

        this.cameraFollow = new THREE.Group()
        this.cameraFollow.position.setZ(-0.25)
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
    }

    initScene()
    {
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
    }

    // async preload(label, url)
    // {

    // }

    // async load(type, name)
    // {
    //     let asset = await this.dataHandler.loadAsset(name)
    //     if(!asset)
    //         asset = await this.dataHandler.saveAsset(name, )
    // }

    async preload()
    {
        THREE.Cache.enabled = true
        this.cache = THREE.Cache
        this.textureAnisotropy = 1
        this.load = new Loaders(this.cache, this.textureAnisotropy)
        this.loadingScreen.setText('Downloading assets...') 
            
        await this.load.preload('playerModel', this.assetURL + 'assets/models/ybot_anims.glb')
        await this.load.preload('sword', this.assetURL + 'assets/models/chevalier/scene.gltf')
        await this.load.preload('default_realm', this.assetURL + 'assets/icons/default_realm.png')
        await this.load.preload('speaker', this.assetURL + 'assets/icons/pin_full.png')
        await this.load.preload('pin_empty', this.assetURL + 'assets/icons/pin_empty.png')

        await this.load.preload('missing_texture', this.assetURL + 'assets/textures/missing_texture.png')
        await this.load.preload('menger_texture', this.assetURL + 'assets/textures/menger_texture.png')
        await this.load.preload('ponder_texture', this.assetURL + 'assets/textures/ponder_texture.png')
        await this.load.preload('default_texture', this.assetURL + 'assets/textures/default_texture.png')
    }

    // this is for creating conjure-specific things
    async create()
    {
        console.log('Took', (Date.now() - this.loadTimer)/1000, ' seconds to load.')

        this.postProcessing = new PostProcessing(this);

        this.loadingScreen.setText('Loading default assets...') 
        this.assetManager = new AssetManager(this)

        await this.assetManager.createDefaultAssets(); // we want to do this now as some screens may use default assets or grab references in initialisation
        
        this.profile = new Profile(this)
        
        this.world = new World(this)
        this.controlManager = new ControlManager(this)
        this.screenManager = new ScreenManager(this)

        this.resizeCanvas() // trigger this to set up screen anchors
        this.screenManager.hudGlobal.showScreen(true)
        
        this.audioManager = new AudioManager(this)
        this.screenManager.hudGlobal.audioControls.setAudioManager(this.audioManager)

        this.loadingScreen.setText('Loading World...')

        // Now load stuff in
        await this.profile.loadFromDatabase()
        await this.profile.getServiceManager().initialiseServices()
        await this.world.preloadGlobalRealms()
        
        // join last loaded realm or get one from the url
        this.setConjureMode(CONJURE_MODE.WAITING)

        this.world.loadDefault()
        global.CONSOLE.showNotification('Press (R) to reset if your avatar gets stuck\nPress escape to reveal the mouse and access settings.', 3)

        // this.loadInfo = document.getElementById( 'loadInfo' )
        // this.loadInfo.hidden = true
        
        this.getGlobalHUD().log('Took ' + (Date.now() - this.loadTimer)/1000 + ' seconds to load.')
    }

    toggleConjureMode()
    {
        if(this.conjureMode === CONJURE_MODE.LOADING) return
        
        this.setConjureMode(this.conjureMode === CONJURE_MODE.EXPLORE ? CONJURE_MODE.CONJURE : CONJURE_MODE.EXPLORE)
    }

    setConjureMode(mode)
    {
        if(this.conjureMode === mode)  return
        if(this.conjureMode === CONJURE_MODE.LOADING && mode !== CONJURE_MODE.LOADING)
        {
            this.loadingScreen.renderer.clear(true)
        }
        this.conjureMode = mode
        switch(mode)
        {
            default: case CONJURE_MODE.LOADING:
                this.postProcessing.clear()
                this.loadingScreen.active = true
                this.controlManager.enableCurrentControls(false)
                this.screenManager.hideHud()

            break;
            
            case CONJURE_MODE.WAITING: 
                this.loadingScreen.active = false
                this.controlManager.setControlScheme(CONTROL_SCHEME.NONE)

            break;

            case CONJURE_MODE.EXPLORE: 
                this.loadingScreen.active = false
                this.controlManager.setControlScheme(CONTROL_SCHEME.AVATAR)
                this.screenManager.showHud()

            break;

            case CONJURE_MODE.CONJURE:
                this.loadingScreen.active = false
                this.controlManager.setControlScheme(CONTROL_SCHEME.ORBIT)
                this.screenManager.showHud()
            break;
        }
    }
    
    update()
    {   
        const delta = this.clock.getDelta() * 1000
        const time = this.clock.getElapsedTime()
    
        if(this.conjureMode === CONJURE_MODE.LOADING)
        {
            this.loadingScreen.update(parseFloat(time.toFixed(3)), parseInt(delta.toString()))
        } 
        else
        {
            this.updateConjure(parseFloat(time.toFixed(3)), parseInt(delta.toString()))

            if(this.conjureMode !== CONJURE_MODE.WAITING)
            {
                this.physics.update(delta)
                this.physics.updateDebugger()
            }
            
            this.animationMixers.update(delta)
            // this.renderer.render(this.scene, this.camera)
            this.postProcessing.render()
            // this.rendererCSS.render(this.sceneCSS, this.camera)
        }
    }

    updateConjure(time, delta)
    {
        let deltaSeconds = delta / 1000
        if(deltaSeconds > 0.1) deltaSeconds = 0.1 // so physics doesnt go insane
        
        this.input.update()

        if(this.input.isPressed('l', true))
        {
            if(this.physics.debugDrawer.enabled)
                this.physics.debug.disable()
            else
                this.physics.debug.enable()
        }

        this.mouseRaycaster.setFromCamera(this.input.mouse, this.camera)
        this.worldRaycaster.setFromCamera(this.vec2, this.camera)
    
        let args = { 
            delta: deltaSeconds,
            input: this.input,
            mouseRaycaster: this.mouseRaycaster,
            worldRaycaster: this.worldRaycaster,
            conjure: this,
        }
        this.getControls().update(args)

        this.cameraScreenAttach.position.copy(this.cameraFollow.getWorldPosition(this.vec3))
        this.cameraScreenAttach.quaternion.copy(this.cameraFollow.getWorldQuaternion(this.quat))

        this.getWorld().update(args)
        this.getScreens().update(args)
    }

    resizeCanvas(width, height)
    {
        if(!width || !height) return
        this.renderer.setSize(width, height, false)
        this.loadingScreen.renderer.setSize(width, height, false)
        // this.rendererCSS.setSize(width, height, false)
        this.postProcessing.composer.setSize(width, height, false)
        if(this.screenManager)
            this.screenManager.resizeScreens(width / height)
        // this.postProcessing.effectFXAA.uniforms['resolution'].value.set(1 / this.canvas.width, 1 / this.canvas.height)
    }
}

export function startConjure(data)
{
    if(!data)
        console.error('ERROR at conjure start, missing data')

    Ammo();
    new Conjure(data)
}