import * as THREE from 'three'
import { OrbitControls } from "./OrbitControls"
import { TransformControls } from "./TransformControls"
import FlyControls from './FlyControls'
import ObjectControls from './ObjectControls'
import AvatarControls from './AvatarControls'

export const CONTROL_SCHEME = {
    NONE: 'None', // controls deactivated
    ORBIT: 'Orbit',
    FLY: 'Fly',
    AVATAR: 'Avatar',
}

export default class ControlManager
{  
    constructor(conjure)
    {
        this.conjure = conjure;
        this.world = conjure.getWorld();
        this.scene = conjure.scene;
        this.camera = conjure.camera;
        this.domElement = conjure.inputElement;
        
        this.controlsEnabled = false;

        this.flyControls = new FlyControls(this.camera, this.domElement);        
        this.avatarControls = new AvatarControls(conjure, this.world.user, this.domElement)

        this.transformControls = this.buildTransformControls();
        this.orbit = new OrbitControls( this.camera, this.domElement );
        this.orbit.target.copy(this.world.user.focusPoint.position);
        this.orbit.enabled = false;
        this.objectControls = new ObjectControls(this, this.transformControls);
        
        this.transformObjects = [];
        this.lastTransformObject = undefined;
        this.objectGroups = [];
        
        this.vec3 = new THREE.Vector3();
        this.hasPointerLock = false

        this.pointerLockChange = this.pointerLockChange.bind(this)

        this.conjure.input.addKey('FOCUS', 'f');
        this.conjure.input.addKey('EDIT_CONTROLS', '1');
        this.conjure.input.addKey('FLY_CONTROLS', '2');
        this.conjure.input.addKey('AVATAR_CONTROLS', '3');
        this.conjure.input.addKey('FORWARD', 'w'); 
        this.conjure.input.addKey('BACKWARD', 's');
        this.conjure.input.addKey('LEFT', 'a');
        this.conjure.input.addKey('RIGHT', 'd');
        this.conjure.input.addKey('JUMP', 'SPACEBAR');
        document.addEventListener('pointerlockchange', this.pointerLockChange)
    }

    buildTransformControls()
    {
        const controls = new TransformControls( this.camera, this.domElement );
        controls.addEventListener( 'dragging-changed', function ( event ) {
            this.orbit.enabled = !event.value;
        }.bind(this) );
        controls.enabled = false;
        this.scene.add(controls);
        return controls;
    }

    getPointerLock()
    {
        // if(!document.hasFocus()) return
        if(this.conjure.getScreens().hudExplore.active || (this.conjure.getScreens().hudConjure.active && this.currentControlScheme === CONTROL_SCHEME.FLY))
            this.domElement.requestPointerLock()
    }

    pointerLockChange(event)
    {
        let hasLock = document.pointerLockElement === this.domElement || document.mozPointerLockElement === this.domElement
        if(hasLock !== this.hasPointerLock)
            this.hasPointerLock = hasLock
    }

    getPointerLockState()
    {
        return this.hasPointerLock
    }

    pointerLockError()
    {
        // console.log('Control Manager: Could not get pointer lock');
    }

    toggleConjureControls()
    {
        if(this.currentControlScheme === CONTROL_SCHEME.ORBIT)
            this.setControlScheme(CONTROL_SCHEME.FLY)
        else if(this.currentControlScheme === CONTROL_SCHEME.FLY)
            this.setControlScheme(CONTROL_SCHEME.ORBIT)
    }

    enableControls(enable)
    {
        this.enableCurrentControls(enable)
        if(!enable)
            document.exitPointerLock();
    }

    enableCurrentControls(enable)
    {
        // console.log(this.currentControlScheme, enable)
        this.controlsEnabled = enable
        switch(this.currentControlScheme)
        {
            default: case CONTROL_SCHEME.NONE: break;
            
            case CONTROL_SCHEME.ORBIT: 
                if(enable)
                {
                    this.transformControls.enabled = true;
                    this.orbit.enabled = true;
                    this.orbit.update();
                    // this.conjure.getScreens().hudConjure.showScreen(true)
                }
                else
                {
                    if(this.transformControls.objects !== [])
                    {
                        this.lastTransformObject = this.transformControls.object;
                        this.objectControls.detachAll();
                    }
                    this.transformControls.enabled = false;
                    this.orbit.enabled = false;
                }
            break;
            
            case CONTROL_SCHEME.FLY: 
                if(enable)
                {
                    this.flyControls.connect();
                    this.conjure.getScreens().hudConjure.showScreen(false)
                }
                else
                {
                    this.flyControls.disconnect();
                }
            break;

            case CONTROL_SCHEME.AVATAR: 
                if(enable)
                {
                    this.avatarControls.connect();
                }
                else
                {
                    this.avatarControls.disconnect();
                }
                    
            break;
        }
    }

    setControlScheme(scheme)
    {
        switch(scheme)
        {
            default: case CONTROL_SCHEME.NONE:
                this.enableCurrentControls(false)
                document.exitPointerLock();
                
            break;

            case CONTROL_SCHEME.ORBIT: 
                document.exitPointerLock();
                this.enableCurrentControls(false)

                if(this.currentControlScheme === CONTROL_SCHEME.FLY)
                {
                    this.orbit.target.copy(this.flyControls.raycaster.ray.at(10, this.vec3));
                }
                if(this.currentControlScheme === CONTROL_SCHEME.AVATAR)
                    this.orbit.target.copy(this.avatarControls.raycaster.ray.at(10, this.vec3));
                
                this.currentControlScheme = scheme
                this.enableCurrentControls(true)

            break;

            case CONTROL_SCHEME.FLY:
                this.enableCurrentControls(false)
                this.currentControlScheme = scheme
                this.enableCurrentControls(true)

            break;
            
            case CONTROL_SCHEME.AVATAR:
                this.enableCurrentControls(false)
                this.currentControlScheme = scheme
                this.enableCurrentControls(true)

            break;
        }
    }

    lookAt(obj) // need to sync all cameras - might be a better way than this
    {
        if(!obj) return;
        let pos = obj.position.getWorldPosition(this.vec3);
        this.camera.lookAt(pos.x, pos.y, pos.z);
        this.orbit.target.copy(pos);
        this.orbit.update();
    }

    addTransformObject(obj, attach)
    {
        this.transformObjects.push(obj);
        if(this.transformControls.object)
            this.lastTransformObject = this.transformControls.object;
        if(attach)
            this.objectControls.attach(obj, { detachOthers:true });
    }

    update(updateArgs)
    {
        if(!this.controlsEnabled) 
        {
            if(this.conjure.getScreens().controlsEnabled)
                this.enableControls(true)
            else
                return
        }
        else if(!this.conjure.getScreens().controlsEnabled)
        {
            this.enableControls(false)
            return
        }
        if(updateArgs.input.isPressed('MOUSELEFT', true) && !global.CONSOLE.getIsMouseOverhudElement())
            this.getPointerLock()
        // if(updateArgs.input.isPressed('HOME'))
        // {
        //     if(this.currentControlScheme === CONTROL_SCHEME.ORBIT && this.transformControls.hasAnyAttached())
        //     {
        //         this.lastTransformObject = this.transformControls.object;
        //         this.objectControls.detachAll();
        //     }
        //     if(this.currentControlScheme === CONTROL_SCHEME.FLY)
        //     {
        //         this.setControlScheme(CONTROL_SCHEME.ORBIT)
        //         // if(!this.conjure.getScreens().hudConjure.active)
        //         //     this.conjure.getScreens().hudConjure.showScreen(true)
        //     }
        // }

        // if(updateArgs.input.isPressed('DELETE', true) || updateArgs.input.isPressed('BACKSPACE', true))
        // {
        //     this.objectControls.detachAll({ isDeleting:true });
        // }

        // if(this.transformControls.enabled)
        // {
        //     let intersections = updateArgs.mouseRaycaster.intersectObjects(this.transformObjects, true);
        //     if(intersections.length > 0)
        //     {
        //         if(updateArgs.input.isPressed('MOUSELEFT', true))
        //         {
        //             // if(!this.transformControls.axis)
        //             // {
        //                 let object = this.conjure.getWorld().objectManager.getTopGroupObject(intersections[0].object);
        //                 if(object)
        //                 {
        //                     if(updateArgs.input.isDown('SHIFT', true))
        //                     {
        //                         this.objectControls.attach(object);
        //                     }
        //                     else
        //                     {
        //                         if(this.transformControls.hasAnyAttached())
        //                             this.lastTransformObject = this.transformControls.isAttached(object) ? object : this.lastTransformObject;
                                
        //                         if(this.transformControls.isAttached(object))
        //                         {
        //                             this.objectControls.detach(object);
        //                         }
        //                         else
        //                         {
        //                             this.objectControls.attach(object, {detachOthers:true});
        //                         }
        //                     }
        //                 }
        //             // }
        //         }
        //     }
        // }
        // need to fix this to work with multiple objects
        // if(updateArgs.input.isPressed('FOCUS')) // focus on object
        // {
        //     // need to add things necessary to change from other control schemes to orbit/transform
        //     this.transformControls.enabled = true;
        //     if(this.transformControls.objects.length > 0)
        //     {
        //         if(this.lastTransformObject)
        //         {
        //             let obj = this.lastTransformObject;
        //             this.lastTransformObject = this.transformControls.object;
        //             this.objectControls.attach(obj);
        //             if(updateArgs.input.isDown('SHIFT', true))
        //                 this.lookAt(this.lastTransformObject);
        //         }
        //     }
        //     else
        //     {
        //         if(this.lastTransformObject)
        //         {
        //             this.objectControls.attach(this.lastTransformObject);
        //             if(updateArgs.input.isDown('SHIFT', true))
        //                 this.lookAt(this.lastTransformObject);
        //         }
        //     }
        // }

        // INPUT UPDATE
        if(this.currentControlScheme === CONTROL_SCHEME.ORBIT)
        {  
            if(this.conjure.getScreens().openScreens.length > 0)
            {
                this.transformControls.enabled = !this.conjure.getScreens().mouseOver;
                this.orbit.enabled = !this.conjure.getScreens().mouseOver; 
            }   
            else
            {
                this.transformControls.enabled = true;
                this.orbit.enabled = true;
            }
            this.objectControls.input(updateArgs);
        }
        if(this.currentControlScheme === CONTROL_SCHEME.FLY) 
            this.flyControls.input(updateArgs);
        if(this.currentControlScheme === CONTROL_SCHEME.AVATAR) 
            this.avatarControls.input(updateArgs);
        
        // CONTROL UPDATE
        if(this.currentControlScheme === CONTROL_SCHEME.ORBIT)
            this.objectControls.update(updateArgs);
        if(this.currentControlScheme === CONTROL_SCHEME.FLY)
            this.flyControls.update(updateArgs);
        
        this.avatarControls.update(updateArgs); 
    }

    // TODO: schemes
    
    // addControlScheme(name, scheme, shouldSet) {
    //     this.controlSchemes[name] = scheme
    //     if(shouldSet)
    //         this.setControlScheme(name)

    // }

    // removeControlScheme(name) {
    //     if (this.controlSchemes[name])
    //         delete this.controlSchemes[name]
    // }

    // setControlScheme(name) {
    //     if (!this.controlSchemes[name]) return

    //     if(this.currentScheme)
    //         this.currentScheme.disable()
        
    //     this.currentScheme = this.controlSchemes[name]
        
    //     if(this.currentScheme)
    //         this.currentScheme.enable()
    // }

    // update(updateArgs) {
    //     if(!this.currentScheme) return

    //     this.currentScheme.input(updateArgs)
    //     this.currentScheme.update(updateArgs)
    // }
}