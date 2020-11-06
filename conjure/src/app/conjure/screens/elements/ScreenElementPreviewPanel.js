import * as THREE from 'three'
import { easyPlane } from '../../util/MeshTemplates'
import ScreenElementBase from './ScreenElementBase';
import ScreenElementButton from './ScreenElementButton';

export default class ScreenElementPreviewPanel extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.elements = [];
        this.frameBorder = 0.1;

        this.worldPosition = new THREE.Vector3();
        this.intersection = new THREE.Vector3();
        
        this.background = easyPlane({ width:this.width, height: 0.3 }, { color: 0x2685ff });
        this.background.position.setY(-0.45);
        this.background.castShadow = false;
        this.background.receiveShadow = false;
        this.background.material.transparent = true;
        this.background.material.opacity = 0.5;
        this.group.add(this.background);

        this.createButton = new ScreenElementButton(screen, this, 0, { x: -this.height/2 + this.frameBorder + 0.05, y: 0.1, width: 0.15, height: 0 });
        this.createButton.setOnClickCallback(args.createCallback, -1);
        this.createButton.setText("Create");
        this.screen.registerElement(this.createButton);
        
        this.previewMesh = args.previewMesh;
        this.previewMeshInWorld = args.previewMeshInWorld;

        this.group.add(this.previewMesh);
        this.previewMesh.position.setY(0.1);
        
        this.previewMesh.scale.copy(new THREE.Vector3(0.2, 0.2, 0.2));
        
        // this.isTouchingPreview = false;
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        // if(updateArgs.input.isPressed('MOUSELEFT'))
        //     this.isTouchingPreview = true;
        // if(updateArgs.input.isReleased('MOUSELEFT'))
        //     this.isTouchingPreview = false;
        
        // let intersections = updateArgs.mouseRaycaster.intersectObject(this.background, false);
        // if(intersections.length > 0 && this.isTouchingPreview)
        // {
        //     console.log(intersections[0].point);
        //     var vector = this.vec3.copy(intersections[0].point);
        //     intersections[0].object.worldToLocal(vector);
        //     this.previewMesh.lookAt(vector);
        // }
        // else
        // {
        this.previewMesh.rotation.x += 0.005;
        this.previewMesh.rotation.y += 0.01;
        // }
    }
}

// export default ScreenElement;