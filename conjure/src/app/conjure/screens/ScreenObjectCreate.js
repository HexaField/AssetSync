import * as THREE from 'three'
import ScreenElementButton from './elements/ScreenElementButton';
import ScreenElementCycleButton from './elements/ScreenElementCycleButton';
import ScreenBase from './ScreenBase';
import { PHYSICS_TYPES, PHYSICS_SHAPES } from '../world/realm/ObjectManager';
import { createGeometry, createMaterial } from '../util/wireframe'
import { POSTPROCESSING } from '../PostProcessing';

/*

    just make a screen for each poly
*/

export default class ScreenObjectCreate extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);

        this.objectTypes = new Map([
            ["Group", THREE.Group],
            ["Mesh", THREE.Mesh],
            ["Menger", 'Menger']
        ]);

        this.onCreateObject = this.onCreateObject.bind(this);

        this.createButton = new ScreenElementButton(this, this, { x: -this.width/4, width: 0.3, height: 0.1, text:'Create' });
        this.createButton.setOnClickCallback(this.onCreateObject);
        this.registerElement(this.createButton);

        this.objectTypeButton = new ScreenElementCycleButton(this, this, { x: this.width/4, width: 0.3, height: 0.1 });
        this.objectTypeButton.setValues(Array.from(this.objectTypes.keys()))
        this.registerElement(this.objectTypeButton);

    }

    async onCreateObject()
    {
        let type = this.objectTypeButton.getValue(true);
        if(type === 'Menger')
        {            
            let newObject = new THREE.Mesh();
            newObject.name = 'Menger';
            newObject.geometry = this.screenManager.conjure.assetManager.mengerGeometry.clone();
            newObject.geometry = newObject.geometry.toNonIndexed()
            createGeometry(newObject.geometry, true)
            newObject.material = new THREE.MeshPhysicalMaterial({color: this.defaultColour3})
            // newObject.material = createMaterial({thickness: 0.02});
            newObject.layers.enable(POSTPROCESSING.BLOOM_SCENE)
            newObject.userData.payID = 'menger$conjure.realm'

            await this.world.realm.createObject(newObject);
        }
        else
        {
            
            let newObject = new (this.objectTypes.get(type))();
            newObject.name = type + '-' + Math.round(Math.random()*10000);
            switch(type)
            {
                case "Mesh": 
                    newObject.geometry = this.screenManager.conjure.assetManager.defaultGeometry;
                    newObject.material = this.screenManager.conjure.assetManager.defaultMaterial;
                    break;
                default:break;
            }
            newObject.userData.physics = {
                type: PHYSICS_TYPES.NONE,
                shape: PHYSICS_SHAPES.AUTO,
                gravity: 1, // multiplier
                bounciness: 0,
                mass: 1,
                destructable: false,
                deformable: false
            }
            await this.world.realm.createObject(newObject);
            // this.screenManager.conjure.getControls().objectControls.attach(newObject, {detachOthers:true});
        }
    }
}