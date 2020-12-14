import * as THREE from 'three';
import { iterateChildrenWithFunction } from '../util/iterateRecursive'

export default class ObjectControls
{  
    constructor(controlManager, controls)
    {
        this.conjure = controlManager.conjure
        this.controlManager = controlManager;
        this.controls = controls;
        this.storageBodyType = null;
        this.translationSnap = 0.5;
    }

    input(updateArgs)
    {
        if(updateArgs.input.isPressed('q', true))
            this.controls.setSpace( this.controls.space === "local" ? "world" : "local" );
            
        if(updateArgs.input.isPressed('SHIFT', true))
        {
            // add settings for this
            this.controls.setTranslationSnap( this.translationSnap );
            this.controls.setRotationSnap( THREE.MathUtils.degToRad( 15 ) );
            this.controls.setScaleSnap( 0.25 );
        }
        if(updateArgs.input.isReleased('SHIFT', true))
        {
            this.controls.setTranslationSnap( null );
            this.controls.setRotationSnap( null );
            this.controls.setScaleSnap( null );
        }
        if(updateArgs.input.isPressed('w', true))
            this.controls.setMode( "translate" );

        if(updateArgs.input.isPressed('e', true))
            this.controls.setMode( "rotate" );

        if(updateArgs.input.isPressed('r', true))
            this.controls.setMode( "scale" );

        if(updateArgs.input.isPressed('g', true))
            this.createGroup();

        if(updateArgs.input.isPressed('+', true) || updateArgs.input.isPressed('=', true))
            this.controls.setSize( this.controls.size + 0.1 );

        if(updateArgs.input.isPressed('-', true) || updateArgs.input.isPressed('_', true))
            this.controls.setSize( Math.max( this.controls.size - 0.1, 0.1 ) );

        if(updateArgs.input.isPressed('x', true))
            this.controls.showX = ! this.controls.showX;

        if(updateArgs.input.isPressed('y', true))
            this.controls.showY = ! this.controls.showY;

        if(updateArgs.input.isPressed('z', true))
            this.controls.showZ = ! this.controls.showZ;

        if(updateArgs.input.isPressed('SPACEBAR', true))
        {
            this.controls.enabled = ! this.controls.enabled;
        }
    }

    createGroup()
    {
        if(this.controls.objects.length > 1)
        {
            let newGroup = new THREE.Group();
            for(let obj of this.controls.objects)
            {
                obj.parent.remove(obj);
                newGroup.add(obj);
            }
            this.conjure.scene.add(newGroup);
            this.detachAll();
        }
    }

    attach(object, params = {})
    {
        console.log(object)
        if(params.detachOthers) 
            this.detachAll();
        // iterateChildrenWithFunction(object, (o) => {
        //     if(o.body)
        //     {
        //         this.conjure.physics.destroy(o.body);
        //     }
        // })

        this.controls.attach(object);
        this.conjure.postProcessing.addSelectedObject(object);
        if(!params.ignoreScreenUpdate)
            this.conjure.getScreens().screenObjectsHierarchy.selectObject(true, object);
        this.conjure.getScreens().showScreen(this.conjure.getScreens().screenObjectEdit);
        this.conjure.getScreens().screenObjectEdit.setObject(object);
    }

    detachAll(params = {})
    {
        if(params.isDeleting)
            for(let object of this.controls.objects)
                this.conjure.getWorld().destroyObject(object);
        else
            for(let object of this.controls.objects)
            {
                if(!params.ignoreScreenUpdate)
                    this.conjure.getScreens().screenObjectsHierarchy.selectObject(false, object);
                // iterateChildrenWithFunction(object, (o) => {
                //     this.conjure.getWorld().realm.restorePhysics(o);
                // });
                object.userData.needsUpdate = true;
            }

        this.controls.detachAll();
        this.conjure.postProcessing.clearSelectedObjects();
        this.conjure.getScreens().hideScreen(this.conjure.getScreens().screenObjectEdit);
    }

    detach(object, params = {})
    {
        this.controls.detach(object);
        
        // iterateChildrenWithFunction(object, (o) => {
        //     this.conjure.getWorld().realm.restorePhysics(o);
        // });
        object.userData.needsUpdate = true;
        this.conjure.postProcessing.removeSelectedObject(object);
        
        if(!params.ignoreScreenUpdate)
            this.conjure.getScreens().screenObjectsHierarchy.selectObject(false, object)
        this.conjure.getScreens().hideScreen(this.conjure.getScreens().screenObjectEdit);
    }

    update(updateArgs)
    {
        
    }
}