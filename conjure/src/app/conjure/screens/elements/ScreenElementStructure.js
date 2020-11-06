import * as THREE from 'three'
import ScreenElementBase from './ScreenElementBase'

export default class ScreenElementStructure extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.worldPosition = new THREE.Vector3();
        this.intersection = new THREE.Vector3();
        
        this.structure = args.structure || new THREE.Object3D();

        this.group.add(this.structure);

        // this.scale = args.scale || 0.1;
        this.rotate = args.rotate;
        
        // this.mesh.scale.set(this.scale, this.scale, this.scale);
    }

    setStructure(structure)
    {
        this.structure = structure
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        if(this.rotate)
        {
            this.structure.rotation.x += 0.005;
            this.structure.rotation.y += 0.01;
        }
    }
}

// export default ScreenElement;