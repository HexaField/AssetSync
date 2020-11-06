import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

export default class HTMLObject
{
    constructor(conjure, objectParent, element, args = {})
    {
        this.width = args.width || 1
        this.height = args.height || 1
        this.scale = args.scale || 1
        this.resolution = args.resolution || 100
        this.inverseRes = 1/this.resolution;
        
        this.objectCSS = new CSS3DObject(element);
        this.objectCSS.frustumCulled = false
        this.objectCSS.castShadow = false;
        this.objectCSS.receiveShadow = false;
        conjure.sceneCSS.add(this.objectCSS);
        
        var material = new THREE.MeshBasicMaterial();
        material.color.set(0x2685ff)
        material.opacity = 0.0;
        material.transparent = true;
        // material.blending = THREE.NoBlending;
        material.side = THREE.DoubleSide;
        
        var geometry = new THREE.PlaneGeometry(this.width * this.scale, this.height * this.scale);
        this.planeMesh = new THREE.Mesh( geometry, material );
        this.planeMesh.castShadow = false;
        this.planeMesh.receiveShadow = false;
        this.anchor = new THREE.Group();
        this.anchor.position.set(args.anchorX || 0, 0, 0);
        this.anchor.add(this.planeMesh);
        objectParent.add(this.anchor);

        this.vec = new THREE.Vector3();
        this.qua = new THREE.Quaternion();
        // this.update()
        this.show(false)
    }

    show(show)
    {
        this.objectCSS.element.hidden = !show;
        this.objectCSS.visible = show;
    }

    update()
    {
        this.objectCSS.position.copy(this.planeMesh.getWorldPosition(this.vec));
        this.objectCSS.quaternion.copy(this.planeMesh.getWorldQuaternion(this.qua));
        this.objectCSS.scale.copy(this.planeMesh.getWorldScale(this.vec).multiplyScalar(this.inverseRes));
        // console.log(this)
    }
}