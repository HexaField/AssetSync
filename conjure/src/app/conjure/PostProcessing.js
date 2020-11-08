
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

export const POSTPROCESSING = {
    ENTIRE_SCENE: 0,
    BLOOM_SCENE: 1,
}
//https://codesandbox.io/s/twilight-feather-myhm9 - a solution where bloom is calculated last
//https://discourse.threejs.org/t/solved-effectcomposer-layers/3158/25
//https://discourse.threejs.org/t/selective-unrealbloompass-issues/9331
// http://bkcore.com/blog/3d/webgl-three-js-animated-selective-glow.html
// https://github.com/mrdoob/three.js/issues/1234
export default class PostProcessing
{  
    constructor(conjure)
    {
        this.conjure = conjure;

        this.conjure.renderer.autoClear = false;

        this.composer = new EffectComposer(this.conjure.renderer);
        this.conjure.renderer.toneMappingExposure = 1.0//Math.pow(1.30, 4.0);

        this.renderScene = new SSAARenderPass(this.conjure.scene, this.conjure.camera);
        this.renderScene.sampleLevel = 1;
        this.renderScene.clear = false

        this.composer.addPass(this.renderScene);
        this.addBloom();
        this.addOutlines();
    }
    
    render()
    {
        this.conjure.renderer.clear();
        this.conjure.camera.layers.set(POSTPROCESSING.BLOOM_SCENE)
        this.composer.render();
        
        this.conjure.renderer.clearDepth();
        this.conjure.camera.layers.set(POSTPROCESSING.ENTIRE_SCENE)
        this.conjure.renderer.render(this.conjure.scene, this.conjure.camera);
    }

    addBloom()
    {
        this.bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85)
        this.bloomPass.threshold = 0
        this.bloomPass.strength = 2.5
        this.bloomPass.radius = 0.4
        this.bloomPass.renderToScreen = true
        this.bloomPass.clear = false
        
        this.composer.addPass(this.bloomPass);
    }


    //https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_outline.html
    addOutlines()
    {
        this.objectSelectedPass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.conjure.scene, this.conjure.camera);
        // this.composer.addPass(this.objectSelectedPass);
        this.selectedObjects = [];
        this.objectSelectedPass.edgeGlow = 1;
        this.objectSelectedPass.edgeStrength = 3;
        this.objectSelectedPass.edgeThickness = 3;
        this.objectSelectedPass.pulsePeriod = 0;
        this.objectSelectedPass.visibleEdgeColor = new THREE.Color(0x2685ff);
        this.objectSelectedPass.hiddenEdgeColor = new THREE.Color(0xffffff);

        this.objectHoverPass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.conjure.scene, this.conjure.camera);
        // this.composer.addPass(this.objectHoverPass);
        this.objectHoverPass.edgeGlow = 1;
        this.objectHoverPass.edgeStrength = 3;
        this.objectHoverPass.edgeThickness = 1;
        this.objectHoverPass.pulsePeriod = 1;
        this.objectHoverPass.visibleEdgeColor = new THREE.Color(0xffffff);
        this.objectHoverPass.hiddenEdgeColor = new THREE.Color(0x2685ff);

        // var onLoad = function ( texture ) {

        //     outlinePass.patternTexture = texture;
        //     texture.wrapS = THREE.RepeatWrapping;
        //     texture.wrapT = THREE.RepeatWrapping;

        // };

        // var loader = new THREE.TextureLoader();
        // loader.load( 'textures/tri_pattern.jpg', onLoad );

        this.effectFXAA = new ShaderPass(FXAAShader);
        this.effectFXAA.uniforms['resolution'].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
        // this.composer.ad`dPass(this.effectFXAA);
    }

    setHoverObject(object)
    {
        if(object)
           this.objectHoverPass.selectedObjects = [object];
        else
           this.objectHoverPass.selectedObjects = [];
    }

    addSelectedObject(object)
    {
        let selected = false;
        for(let i in this.selectedObjects)
            if(this.selectedObjects[i].uuid === object.uuid)
                selected = true;

        if(!selected)
        {
            this.selectedObjects.push(object);
            this.objectSelectedPass.selectedObjects = this.selectedObjects;
        }
    }

    clearSelectedObjects()
    {
        this.selectedObjects = [];
        this.objectSelectedPass.selectedObjects = [];
    }

    removeSelectedObject(object)
    {
        for(let i in this.selectedObjects)
            if(this.selectedObjects[i].uuid === object.uuid)
                this.selectedObjects.splice(i, 1);
        this.objectSelectedPass.selectedObjects = this.selectedObjects;
    }
}