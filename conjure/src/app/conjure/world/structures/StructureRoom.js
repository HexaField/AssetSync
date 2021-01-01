import * as THREE from 'three'

export default class StructureRoom
{  
    constructor(conjure, parentGroup, roomArgs = {})
    {
        this.conjure = conjure
        this.roomWidth = roomArgs.roomWidth || 10; // X
        this.roomHeight = roomArgs.roomHeight || 4; // Y
        this.roomLength = roomArgs.roomLength || 16; // Z
        let boxDepth = 0.1

        this.group = new THREE.Group();
        parentGroup.add(this.group);

        this.wallMaterial = new THREE.MeshStandardMaterial({
            side:THREE.DoubleSide,
            roughness: 0.8,
            color: 0xffffff,
            metalness: 0.2,
            bumpScale: 0.0005
        })

        this.floor = new THREE.Group()
        this.floor.name = 'floor'
        this.floor.add(new THREE.Mesh(new THREE.BoxBufferGeometry(this.roomWidth, this.roomLength, boxDepth),  this.wallMaterial));
        this.floor.rotateX(Math.PI / 2)
        this.group.add(this.floor);
        conjure.physics.add.existing(this.floor, { collider:{margin:0.01}, collisionFlags:1, mass:0})

        // this.ceiling = new THREE.Group()
        // this.ceiling.name = 'ceiling'
        // this.ceiling.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(this.roomWidth, this.roomLength, boxDepth), this.wallMaterial));
        // this.ceiling.position.setY(this.roomHeight)
        // this.ceiling.rotateX(Math.PI / 2)
        // this.group.add(this.ceiling);
        // conjure.physics.add.existing(this.ceiling, {shape:'plane', collider:{margin:0.01}, collisionFlags:1, mass:0})

        // this.wallNorth = new THREE.Group()
        // this.wallNorth.name = 'wallNorth'
        // this.wallNorth.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(this.roomWidth, this.roomHeight, boxDepth), this.wallMaterial));
        // this.wallNorth.position.set(0, this.roomHeight / 2, this.roomLength / 2)
        // // this.wallNorth.rotateX(Math.PI / 2)
        // this.group.add(this.wallNorth);
        // conjure.physics.add.existing(this.wallNorth, {shape:'plane', collider:{margin:0.01}, collisionFlags:1, mass:0})
        
        // this.wallSouth = new THREE.Group()
        // this.wallSouth.name = 'wallSouth'
        // this.wallSouth.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(this.roomWidth, this.roomHeight, boxDepth), this.wallMaterial));
        // this.wallSouth.position.set(0, this.roomHeight / 2, -this.roomLength / 2)
        // // this.wallSouth.rotateX(Math.PI / 2)
        // this.group.add(this.wallSouth);
        // conjure.physics.add.existing(this.wallSouth, {shape:'plane', collider:{margin:0.01}, collisionFlags:1, mass:0})

        // this.wallEast = new THREE.Group()
        // this.wallEast.name = 'wallEast'
        // this.wallEast.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(this.roomLength, this.roomHeight, boxDepth), this.wallMaterial));
        // this.wallEast.position.set(this.roomWidth / 2, this.roomHeight / 2, 0)
        // this.wallEast.rotateY(Math.PI / 2)
        // this.group.add(this.wallEast);
        // conjure.physics.add.existing(this.wallEast, {shape:'plane', collider:{margin:0.01}, collisionFlags:1, mass:0})

        // this.wallWest = new THREE.Group()
        // this.wallWest.name = 'wallWest'
        // this.wallWest.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(this.roomLength, this.roomHeight, boxDepth), this.wallMaterial))
        // this.wallWest.position.set(-this.roomWidth / 2, this.roomHeight / 2, 0)
        // this.wallWest.rotateY(Math.PI / 2)
        // this.group.add(this.wallWest);
        // conjure.physics.add.existing(this.wallWest, {shape:'plane', collider:{margin:0.01}, collisionFlags:1, mass:0})
    }

    destroy()
    {
        this.conjure.physics.destroy(this.floor.body)
        // this.conjure.physics.destroy(this.ceiling.body)
        // this.conjure.physics.destroy(this.wallNorth.body)
        // this.conjure.physics.destroy(this.wallSouth.body)
        // this.conjure.physics.destroy(this.wallEast.body)
        // this.conjure.physics.destroy(this.wallWest.body)
        this.group.parent.remove(this.group)
    }
}