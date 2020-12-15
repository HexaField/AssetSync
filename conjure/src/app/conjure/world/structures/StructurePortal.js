import * as THREE from 'three'
import TextRenderer3D from '../../screens/text/TextRenderer3D';

export default class StructurePortal
{  
    constructor(conjure, parentGroup, params = {})
    {
        this.conjure = conjure
        this.portalWidth = params.portalWidth || 1; // X
        this.portalHeight = params.portalHeight || 1; // Y
        this.portalLength = params.portalLength || 1; // Z

        this.group = new THREE.Group();
        parentGroup.add(this.group);
        this.group.position.set(params.position.x, params.position.y, params.position.z)

        this.portalMaterial = new THREE.MeshBasicMaterial({ visible: false })

        this.portalEntered = false

        this.portal = new THREE.Mesh(new THREE.BoxBufferGeometry(this.portalWidth, this.portalLength, this.portalHeight),  this.portalMaterial)
        this.group.add(this.portal);
        this.portal.name = 'portal-' + params.realmData.id

        conjure.physics.add.existing(this.group, { collisionFlags: 6 })
        this.group.body.on.collision((otherObject, event) => {
            if(this.portalEntered)
                return
            this.portalEntered = true
            console.log(params.realmData.id)
            if (otherObject === this.conjure.getWorld().user.group)
                this.conjure.world.joinRealmByID(params.realmData.id)
        })
        
        this.nameplate = new TextRenderer3D(conjure, this.group, { text: params.realmData.name, color: params.color, glow: true });
        this.nameplate.group.lookAt(new THREE.Vector3())
        this.nameplate.group.position.setY(1)
        this.nameplate.group.scale.setScalar(4)
    }

    destroy()
    {
        if(this.group.body)
            this.conjure.physics.destroy(this.group)
        this.group.parent.remove(this.group)
    }
}