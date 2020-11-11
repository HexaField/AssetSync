import*as s from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import{Store as l,get as u,set as p,keys as g,del as w,clear as m}from"../../../web_modules/idb-keyval.js";import f from"../../../web_modules/events.js";import{isWebWorker as S}from"../../../web_modules/@AssetSync/common.js";export const CONJURE_MODE={LOADING:"Loading",WAITING:"Waiting",EXPLORE:"Explore",CONJURE:"Conjure"};export async function startConjure(e){const{default:t}=await import("./util/ammo.worker.js");t(),new M(e)}class M extends f{constructor({assetSync:e,assets:t,profiles:a,realms:i,worldSync:r}){super();this.assets=t,this.profiles=a,this.realms=i,this.worldSync=r,this.canvas=r.canvas,this.urlParams=r.config.urlParams,this.start()}async start(){const e="conjureSimpleDataStore",t=new l(e,e);self.simpleStorage={async get(i){return await u(i,t)},async set(i,r){return await p(i,r,t)},async del(i){return await w(i,t)},async clear(){return await m(t)},async keys(){return await g(t)}},await this.init(),await this.preload(),await this.create();const a=()=>{this.resizeRendererToDisplaySize(this.renderer),this.update(),requestAnimationFrame(a)};requestAnimationFrame(a)}resizeRendererToDisplaySize(e){const t=e.domElement,a=window.innerWidth,i=window.innerHeight,r=t.width!==a||t.height!==i;return r&&this.resizeCanvas(a,i),r}getWorld(){return this.world}getScreens(){return this.screenManager}getControls(){return this.controlManager}getFonts(){return this.fonts}getFont(e){return this.getFonts().getFont(e)}getDefaultFont(){return this.fonts.getDefault()}getProfile(){return this.profile}getGlobalHUD(){return this.screenManager.hudGlobal}getAudioManager(){return this.audioManager}getLoadingScreen(){return this.loadingScreen}async init(){this.clock=new s.Clock,this.loadTimer=Date.now(),this.conjureMode=CONJURE_MODE.LOADING;const{default:e}=await import("./screens/text/Fonts.js");this.fonts=new e(this),await this.fonts.addFont("Helvetiker","/assets/fonts/helvetiker.json"),await this.fonts.addFont("System","/assets/fonts/system.json"),this.fonts.setDefault("Helvetiker"),this.initScene();const{default:t}=await import("./LoadingScreen.js");this.loadingScreen=new t(this),this.loadingScreen.create(),this.loadingScreen.setText("Initialising..."),this.mouseRaycaster=new s.Raycaster,this.worldRaycaster=new s.Raycaster,this.vec3=new s.Vector3,this.vec2=new s.Vector2,this.quat=new s.Quaternion;const{default:a}=await import("./Input.js");this.input=new a(this)}initScene(){this.scene=new s.Scene,this.scene.fog=new s.FogExp2(3424834,.001);let e=new s.AmbientLight(13421772,.2);this.scene.add(e);let t=8.25;var a=Math.PI*(.3-.5),i=2*Math.PI*(.3-.5);this.sunPos=new s.Vector3,this.sunPos.x=Math.cos(i),this.sunPos.y=Math.sin(i)*Math.sin(a),this.sunPos.z=Math.sin(i)*Math.cos(a),this.dirLight=new s.DirectionalLight(16777215,.4),this.dirLight.position.copy(this.sunPos),this.dirLight.castShadow=!0,this.dirLight.shadow.mapSize=new s.Vector2(1024,1024),this.dirLight.shadow.camera.near=.1,this.dirLight.shadow.camera.far=1500,this.dirLight.shadow.camera.left=t*-1,this.dirLight.shadow.camera.right=t,this.dirLight.shadow.camera.top=t,this.dirLight.shadow.camera.bottom=t*-1,this.scene.add(this.dirLight),this.camera=new s.PerspectiveCamera(60,window.clientWidth/window.clientHeight,.1,1e4),this.cameraFollow=new s.Group,this.cameraFollow.position.setZ(-.35),this.debugBall=new s.Mesh(new s.SphereBufferGeometry(.1),new s.MeshBasicMaterial),this.debugBall.receiveShadow=!1,this.debugBall.castShadow=!1,this.cameraFollow.add(this.debugBall),this.camera.add(this.cameraFollow),this.cameraTrack=new s.Group,this.scene.add(this.cameraTrack),this.cameraScreenAttach=new s.Group,this.cameraScreenAttach.scale.set(.2,.2,.2),this.scene.add(this.cameraScreenAttach),this.renderer=new s.WebGLRenderer({antialias:!0,alpha:!0,canvas:this.canvas}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.clientWidth,window.clientHeight,!1),this.renderer.outputEncoding=s.sRGBEncoding,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=s.PCFSoftShadowMap,this.renderer.toneMapping=s.ReinhardToneMapping,this.renderer.setClearColor(0,1)}async preload(){s.Cache.enabled=!0,this.cache=s.Cache,this.textureAnisotropy=1;const{default:e}=await import("./util/loaders.js");this.load=new e(this.cache,this.textureAnisotropy),this.loadingScreen.setText("Downloading assets..."),await this.load.preload("playerModel","/assets/models/ybot_anims.glb"),await this.load.preload("default_realm","/assets/icons/default_realm.png"),await this.load.preload("pin_full","/assets/icons/pin_full.png"),await this.load.preload("pin_empty","/assets/icons/pin_empty.png"),await this.load.preload("speaker","/assets/icons/speaker.png"),await this.load.preload("speakermute","/assets/icons/speakermute.png"),await this.load.preload("missing_texture","/assets/textures/missing_texture.png"),await this.load.preload("menger_texture","/assets/textures/menger_texture.png"),await this.load.preload("ponder_texture","/assets/textures/ponder_texture.png"),await this.load.preload("default_texture","/assets/textures/default_texture.png")}async create(){console.log("Took",(Date.now()-this.loadTimer)/1e3," seconds to preload.");const{AmmoPhysics:e}=await import("../../../web_modules/@enable3d/ammo-physics.js");this.physics=new e(this.scene);const{default:t}=await import("./util/mixers.js");this.mixers=new t,this.animationMixers=this.mixers.mixers;const{default:a}=await import("./PostProcessing.js");this.postProcessing=new a(this),this.loadingScreen.setText("Loading default assets...");const{default:i}=await import("./AssetManager.js");this.assetManager=new i(this),await this.assetManager.createDefaultAssets();const{default:r}=await import("./user/Profile.js");this.profile=new r(this);const{default:n}=await import("./world/World.js");this.world=new n(this);const{default:h}=await import("./controls/ControlManager.js");this.controlManager=new h(this);const{default:d}=await import("./screens/ScreenManager.js");if(this.screenManager=new d(this),this.screenManager.hudGlobal.showScreen(!0),S){const{AudioWrapper:o}=await import("./AudioWrapper.js");this.audioManager=new o(this);const{VideoWrapper:c}=await import("./VideoWrapper.js");this.videoWrapper=new c(this)}else{const{AudioManager:o}=await import("./AudioManager.js");this.audioManager=new o(this)}this.screenManager.hudGlobal.audioControls.setAudioManager(this.audioManager),this.loadingScreen.setText("Loading World..."),await this.profile.loadFromDatabase(),await this.profile.getServiceManager().initialiseServices(),await this.world.preloadGlobalRealms(),this.setConjureMode(CONJURE_MODE.WAITING),this.world.loadDefault(),window.CONSOLE.showNotification(`Press (R) to reset if your avatar gets stuck
Press escape to reveal the mouse and access settings.`,3),this.getGlobalHUD().log("Took "+(Date.now()-this.loadTimer)/1e3+" seconds to load.")}toggleConjureMode(){if(this.conjureMode===CONJURE_MODE.LOADING)return;this.setConjureMode(this.conjureMode===CONJURE_MODE.EXPLORE?CONJURE_MODE.CONJURE:CONJURE_MODE.EXPLORE)}setConjureMode(e){if(this.conjureMode===e)return;this.conjureMode=e,this.emit("conjure:mode",e)}update(){const e=this.clock.getDelta()*1e3,t=this.clock.getElapsedTime();this.conjureMode===CONJURE_MODE.LOADING?this.loadingScreen.update(parseFloat(t.toFixed(3)),parseInt(e.toString())):(this.updateConjure(parseFloat(t.toFixed(3)),parseInt(e.toString())),this.conjureMode!==CONJURE_MODE.WAITING&&(this.physics.update(e),this.physics.updateDebugger()),this.animationMixers.update(e),this.postProcessing.render())}updateConjure(e,t){let a=t/1e3;a>.1&&(a=.1),this.input.update(),this.input.isPressed("l",!0)&&(this.physics.debugDrawer.enabled?this.physics.debug.disable():this.physics.debug.enable()),this.mouseRaycaster.setFromCamera(this.input.mouse,this.camera),this.worldRaycaster.setFromCamera(this.vec2,this.camera);let i={delta:a,input:this.input,mouseRaycaster:this.mouseRaycaster,worldRaycaster:this.worldRaycaster,conjure:this};this.getControls().update(i),this.cameraScreenAttach.position.copy(this.cameraFollow.getWorldPosition(this.vec3)),this.cameraScreenAttach.quaternion.copy(this.cameraFollow.getWorldQuaternion(this.quat)),this.getWorld().update(i),this.getScreens().update(i)}resizeCanvas(e,t){if(!e||!t)return;const a=e/t;this.camera.aspect=a,this.camera.updateProjectionMatrix(),this.loadingScreen.camera.aspect=a,this.loadingScreen.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.postProcessing.composer.setSize(e,t,!1),this.screenManager&&this.screenManager.resizeScreens(a)}}
