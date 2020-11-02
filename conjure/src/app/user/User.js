import * as THREE from 'three'

export default class User {

    constructor() {
        
        // internal
        
        this.vec = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.euler = new THREE.Euler();
        
        this.mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xff00ff }))

        this.group = new THREE.Group();
        this.group.add(this.mesh)
    }

    jump() {
        
    }


}