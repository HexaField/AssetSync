import * as THREE from 'three'
import Feature from "./Feature"

import { Water } from './Water2.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import Platform from '../Platform'  
// import { easyOrigin } from '../../util/MeshTemplates';
// import SkyboxMilkyway from './SkyboxMilkyway'
// import VolumetricClouds from './VolumetricClouds'
// import TWEEN from '@tweenjs/tween.js';

export default class FeatureArtGallery extends Feature
{
    constructor(realm)
    {
        super(realm)
        this.swordTriggerEventProtocol = 'lookingglass.eventtrigger'
        this.triggerSwordEvent = this.triggerSwordEvent.bind(this)
        this.realm.addNetworkProtocolCallback(this.swordTriggerEventProtocol, this.triggerSwordEvent)
        this.tweens = []
        this.vec3 = new THREE.Vector3()
        this.realmData = realm.getData()
        this.spawnPosition = this.realmData.worldData.spawnPosition
    }

    async preload()
    {
        // await this.getTokens()
        let assetCount = 11

        let nowPlaying = '\n\n\nNow playing | New Order - Bizarre Love Triangle'

        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (1/' + assetCount + ')' + nowPlaying)

        await this.realm.conjure.getAudioManager().load('chiptune', 'assets/sounds/chiptune.mp3')
        this.chiptune = this.realm.conjure.getAudioManager().play('chiptune', { loop: true, volume: 0.25 })

        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (2/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.getAudioManager().load('jumanji', 'assets/sounds/jumanji.wav')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (3/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('lookingglass', 'assets/models/lookingglass.glb')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (4/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('grass1', 'assets/textures/grass1.jpg')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (5/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('granite1', 'assets/textures/granite1.jpg')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (6/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('granite2', 'assets/textures/granite2.jpg')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (7/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('granite3', 'assets/textures/granite3.jpg')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (8/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('rock1', 'assets/textures/rock1.jpg')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (9/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('emerald1', 'assets/textures/emerald1.jpg')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (10/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.load.preload('mountains', 'assets/models/mountainring.glb')
        this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (11/' + assetCount + ')' + nowPlaying)
        await this.realm.conjure.getAudioManager().load('sword', 'assets/sounds/sword.mp3')
        // this.realm.conjure.getLoadingScreen().setText('Loading Realm Assets\n (11/' + assetCount + ')')

        this.realm.conjure.getLoadingScreen().setText(`
THE ETHEREAL REALM
WETWARE INC.

'THE ENTS MARCH TO WAR'

Written by
Ponderjaunt

Produced by
Free Markets & Liberty

REALMS CREATED WITH CONJURE ENGINE

COPYWRONG /©/ 1984 ALL RIGHTS CANCELLED. BY PONDERJAUNT & THE FOREST.
THIS PROGRAM IS PROTECTED UNDER THE LAWS OF THE INCORPORATED UNITED STATES
AND OTHER BANKS. ILLEGAL DISTROBUTION MAY RESULT IN INCREDIBLE CIVIL VALUE
AND ECONOMIC EPOCHAL SHIFTS.`)
        await this.loadScene()

        // setTimeout(()=>{}, 10000)
    }

    async unload()
    {
        this.platform.destroy()
    }

    async loadScene()
    {
        this.platform = new Platform(this.realm.conjure, this.realm.group, { size: 1024, pos: new THREE.Vector3(0, 1, 0) })
        this.platform.floor.visible = false
        this.platform.worldNameText.group.visible = false

        // init sky
 
        this.sky = new Sky();   
        this.sky.scale.setScalar(450000);
        this.realm.group.add(this.sky);

        var uniforms = this.sky.material.uniforms;
        uniforms[ "turbidity" ].value = 0.2;
        uniforms[ "rayleigh" ].value = 0.01;
        uniforms[ "mieCoefficient" ].value = 0.005;
        uniforms[ "mieDirectionalG" ].value = 0.8;
        uniforms[ "sunPosition" ].value.copy(this.realm.conjure.sunPos);

        // this.clouds = new VolumetricClouds({
        //     threshold: 0.25,
        //     opacity: 0.25,
        //     range: 0.1,
        //     steps: 100,
        //     size: {
        //         x: 100,
        //         y: 20,
        //         z: 100,
        //     },
        // })
        // this.clouds.position.setY(100)
        // this.realm.group.add(this.clouds)


        // milkyway
        // this.skybox = new SkyboxMilkyway(this.realm.conjure.camera, { opacity: 0.5 })

        // init water

        this.waterGeometry = new THREE.PlaneBufferGeometry(4096, 4096);

        this.water = new Water( this.waterGeometry, {
            color: 0x6eacff,
            scale: 256,
            reflectivity: 0.9,
            flowDirection: new THREE.Vector2(0.25, 0.25),
            textureWidth: 1024, 
            textureHeight: 1024
        } );

        this.water.position.y = 2;
        this.water.rotation.x = Math.PI * - 0.5;
        this.realm.group.add(this.water);

        this.mountains = await this.realm.conjure.load.gltf('mountains')
        this.mountains.scene.position.setY(-60)
        this.realm.group.add(this.mountains.scene)

        this.sceneModel = await this.realm.conjure.load.gltf('lookingglass')
        console.log(this.sceneModel)
        
        for(let child of this.sceneModel.scene.children)
        {
            if(!child.geometry) continue
            child.geometry.computeVertexNormals()
            console.log(child)
            this.realm.conjure.physics.add.existing(child, { shape:'concaveMesh', mass:0  })
        }
        // console.log(this.sceneModel.scene)
        this.realm.group.add(this.sceneModel.scene)


        let grassTex = await this.realm.conjure.load.texture('grass1')
        grassTex.wrapS = THREE.MirroredRepeatWrapping
        grassTex.wrapT = THREE.MirroredRepeatWrapping
        grassTex.repeat.set( 64 , 64 )
        let grassMat = new THREE.MeshStandardMaterial({ map: grassTex})
        this.sceneModel.scene.children[0].material = grassMat
        

        let granite1Tex = await this.realm.conjure.load.texture('granite1')
        granite1Tex.wrapS = THREE.MirroredRepeatWrapping
        granite1Tex.wrapT = THREE.MirroredRepeatWrapping
        granite1Tex.repeat.set( 4, 4 )
        let granite1Mat = new THREE.MeshStandardMaterial({ map: granite1Tex})
        this.sceneModel.scene.children[5].material = granite1Mat
        this.sceneModel.scene.children[7].material = granite1Mat

        let granite2Tex = await this.realm.conjure.load.texture('granite2')
        granite2Tex.wrapS = THREE.MirroredRepeatWrapping
        granite2Tex.wrapT = THREE.MirroredRepeatWrapping
        granite2Tex.repeat.set( 4, 4 )
        let granite2Mat = new THREE.MeshStandardMaterial({ map: granite2Tex})
        this.sceneModel.scene.children[4].material = granite2Mat
        this.sceneModel.scene.children[6].material = granite2Mat
        this.sceneModel.scene.children[8].material = granite2Mat

        let granite3Tex = await this.realm.conjure.load.texture('granite3')
        granite3Tex.wrapS = THREE.MirroredRepeatWrapping
        granite3Tex.wrapT = THREE.MirroredRepeatWrapping
        granite3Tex.repeat.set( 4, 4 )
        let granite3Mat = new THREE.MeshStandardMaterial({ map: granite3Tex})
        this.sceneModel.scene.children[9].material = granite3Mat
        this.sceneModel.scene.children[10].material = granite3Mat

        let rock1Tex = await this.realm.conjure.load.texture('rock1')
        rock1Tex.wrapS = THREE.MirroredRepeatWrapping
        rock1Tex.wrapT = THREE.MirroredRepeatWrapping
        rock1Tex.repeat.set( 64, 64 )  
        let rock1Mat = new THREE.MeshStandardMaterial({ map: rock1Tex})
        this.mountains.scene.children[0].material = rock1Mat
        this.sceneModel.scene.children[1].material = rock1Mat
        this.sceneModel.scene.children[2].material = rock1Mat
        this.sceneModel.scene.children[3].material = rock1Mat
        this.sceneModel.scene.children[9].material = rock1Mat

        let emerald1Tex = await this.realm.conjure.load.texture('emerald1')
        emerald1Tex.wrapS = THREE.MirroredRepeatWrapping
        emerald1Tex.wrapT = THREE.MirroredRepeatWrapping
        emerald1Tex.repeat.set( 1, 1 )  
        let emerald1Mat = new THREE.MeshPhysicalMaterial({
            map: emerald1Tex,
            color: 0x00ff00,
            metalness: 0,
            roughness: 0,
            opacity: 0.8,
            transparent: true,
            side: THREE.DoubleSide,
            premultipliedAlpha: true,
            envmap: grassTex

        })
        this.sceneModel.scene.children[7].material = emerald1Mat    

        this.flyingLights = []
        for(let i = 0; i < 100; i++)
        {
            let light = new THREE.PointLight(0xbfff83, 1, 20, 2)
            let sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.05), new THREE.MeshBasicMaterial({ color: 0xbfff83 }))
            sphere.add(light)
            sphere.position.set(50-(Math.random() * 100), (Math.random() * 50), 50-(Math.random() * 100))
            this.realm.group.add(sphere)
            sphere.userData.velocity = new THREE.Vector3()
            this.flyingLights.push(sphere)
        }
    }

    async load()
    {
        this.chiptune.stop()
        this.realm.conjure.getAudioManager().play('jumanji', { loop: true })
    }

    async getTokens()
    {
        let address = 'r4sYcbdi4oE18FhVYWEhXa1AEe21XGR39z'
        let txlist = await (await fetch('https://data.ripple.com/api/v2/address/' + address)).json()
        console.log(txlist)
    }

    update(updateArgs)
    {
        if(updateArgs.input.isDown('X', true, true) && updateArgs.input.isDown('Y', true, true) && updateArgs.input.isDown('Z', true, true))
        {
            this.realm.sendData(this.swordTriggerEventProtocol)
            this.triggerSwordEvent()
        }
        for(let light of this.flyingLights)
        {
            light.userData.velocity.x += (Math.random()-0.5)*0.005
            light.userData.velocity.y += (Math.random()-0.5)*0.005
            light.userData.velocity.z += (Math.random()-0.5)*0.005
            light.position.add(light.userData.velocity)
            if(light.getWorldPosition(this.vec3).distanceTo(new THREE.Vector3()) > 50)
            {
                light.position.set(50-(Math.random() * 100), (Math.random() * 50), 50-(Math.random() * 100))
            }
        }
        for(let tween of this.tweens)
            tween.update()
    }

    triggerSwordEvent()
    {
        if(this.realm.world.user.hasSword) return

        this.realm.world.user.swordMesh.material.visible = true
        this.realm.world.user.hasSword = true
        for(let user of Object.values(this.realm.world.remoteUsers))
        {
            user.swordMesh.material.visible = true
            user.hasSword = true
        }
        this.realm.world.user.setAction('unsheath', 0.1, true)
        this.realm.conjure.getAudioManager().play('sword')

        // let sunTweenChange = {
        //     turbidity: this.sky.material.uniforms.turbidity.value,
        //     rayleigh: this.sky.material.uniforms.rayleigh.value,
        //     mieCoefficient: this.sky.material.uniforms.mieCoefficient.value,
        //     mieDirectionalG: this.sky.material.uniforms.mieDirectionalG.value,
        //     theta: Math.PI * ( 0.3 - 0.5 ),
        //     phi: 2 * Math.PI * ( 0.3 - 0.5 )
        // }

        // let tween = new TWEEN.Tween(sunTweenChange).to({
        //     turbidity: 20,
        //     rayleigh: 4,
        //     mieCoefficient: 0.02,
        //     mieDirectionalG: 0.4,
        //     theta: Math.PI * ( 0.48 - 0.5 ),
        //     phi: 2 * Math.PI * ( 0.2 - 0.5 )
        // }, 2000).easing(
        //     TWEEN.Easing.Linear.None
        // ).onUpdate(() => {
        //     console.log('hmm')
        //     this.sky.material.uniforms.turbidity.value = sunTweenChange.turbidity
        //     this.sky.material.uniforms.rayleigh.value = sunTweenChange.rayleigh
        //     this.sky.material.uniforms.mieCoefficient.value = sunTweenChange.mieCoefficient
        //     this.sky.material.uniforms.mieDirectionalG.value = sunTweenChange.mieDirectionalG

        //     // this.realm.conjure.sunPos.x = Math.cos( sunTweenChange.phi );   
        //     // this.realm.conjure.sunPos.y = Math.sin( sunTweenChange.phi ) * Math.sin( sunTweenChange.theta );
        //     // this.realm.conjure.sunPos.z = Math.sin( sunTweenChange.phi ) * Math.cos( sunTweenChange.theta );

        //     // this.realm.conjure.dirLight.position.copy(this.realm.conjure.sunPos)
        //     // this.sky.material.uniforms.sunPosition.value.copy(this.realm.conjure.sunPos)
        // }).onComplete(() => {
        //     // this.tweens.remove(tween)
        // })
        // tween.start()
        // this.tweens.push(tween)

        var uniforms = this.sky.material.uniforms;
        uniforms[ "turbidity" ].value = 20;
        uniforms[ "rayleigh" ].value = 4;
        uniforms[ "mieCoefficient" ].value = 0.02;
        uniforms[ "mieDirectionalG" ].value = 0.4;

        var theta = Math.PI * ( 0.45 - 0.5 );
        var phi = 2 * Math.PI * ( 0.2 - 0.5 );

        this.realm.conjure.sunPos.x = Math.cos( phi );   
        this.realm.conjure.sunPos.y = Math.sin( phi ) * Math.sin( theta );
        this.realm.conjure.sunPos.z = Math.sin( phi ) * Math.cos( theta );
        this.realm.conjure.dirLight.intensity = 1.2

        this.realm.conjure.dirLight.position.copy(this.realm.conjure.sunPos)
        uniforms[ "sunPosition" ].value.copy(this.realm.conjure.sunPos);
    }
}