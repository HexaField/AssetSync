import * as THREE from 'three'
import ScreenElementButton from './elements/ScreenElementButton';
import ScreenElementCycleButton from './elements/ScreenElementCycleButton';
import ScreenBase from './ScreenBase';
import { PHYSICS_TYPES, PHYSICS_SHAPES } from '../world/object/ObjectManager';
import { createGeometry, createMaterial } from '../util/wireframe'
import { POSTPROCESSING } from '../PostProcessing';
import { ObjectPrefabs } from '../world/object/ObjectPrefabs';

/*

    just make a screen for each poly
*/

export default class ScreenObjectCreate extends ScreenBase {
    constructor(screenManager, args) {
        super(screenManager, args);

        this.group.add(this.background);

        this.onCreateObject = this.onCreateObject.bind(this);

        this.createButton = new ScreenElementButton(this, this, { x: -this.width / 4, width: 0.3, height: 0.1, text: 'Create' });
        this.createButton.setOnClickCallback(this.onCreateObject);
        this.registerElement(this.createButton);

        this.objectTypeButton = new ScreenElementCycleButton(this, this, { x: this.width / 4, width: 0.3, height: 0.1 });
        this.objectTypeButton.setValues(Object.keys(ObjectPrefabs))
        this.registerElement(this.objectTypeButton);

    }

    async onCreateObject() {
        let prefab = ObjectPrefabs[this.objectTypeButton.getValue(true)]
        if(prefab) {
            const obj = await prefab(this.screenManager.conjure)
            await this.world.realm.createObject(obj)
        }
    }
}