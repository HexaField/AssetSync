import * as THREE from 'three'
import ScreenElementBase from './ScreenElementBase'

export default class ScreenElementMesh extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.worldPosition = new THREE.Vector3();
        this.intersection = new THREE.Vector3();
        
        this.mesh = new THREE.Mesh(args.geometry, args.material);

        this.group.add(this.mesh);

        this.scale = args.scale || 0.1;
        this.rotate = args.rotate;
        
        this.mesh.scale.set(this.scale, this.scale, this.scale);
        
    }

    setMaterial(material)
    {
        this.mesh.material = material;
    }

    setGeometry(geometry)
    {
        this.mesh.geometry = geometry;
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        if(this.rotate)
        {
            this.mesh.rotation.x += 0.005;
            this.mesh.rotation.y += 0.01;
        }
    }
}

// export default ScreenElement;