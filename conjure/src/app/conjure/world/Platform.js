
import * as THREE from 'three'
import TextRenderer3D from '../screens/text/TextRenderer3D';
export default class Platform
{  
    constructor(conjure, parentGroup, args = {})
    {
        this.conjure = conjure
        this.platformSize = args.size || 250;
        this.pos = args.pos || new THREE.Vector3();
        this.parentGroup = parentGroup


        this.worldNameText = new TextRenderer3D(this.conjure, this.parentGroup, { text: args.platformLabel || '', width: 5, scale: 10 });
        this.worldNameText.group.position.set(0, 5, 0);

        this.floor = new THREE.Group()
        this.floor.name = 'floor'
        this.floor.add(new THREE.Mesh(new THREE.BoxBufferGeometry(this.platformSize, this.platformSize, 0.1), new THREE.MeshBasicMaterial({ visible: false })));
        this.floor.rotateX(Math.PI / 2)
        // this.floor.position.copy(this.pos) 
        this.parentGroup.add(this.floor);
        conjure.physics.add.existing(this.floor, { collider: { margin: 0.01 }, collisionFlags:1, mass:0 })
    }

    destroy()
    {
        if(this.floor.body)
            this.conjure.physics.destroy(this.floor.body)
        this.parentGroup.remove(this.floor)
        this.parentGroup.remove(this.worldNameText.group)
    }
}