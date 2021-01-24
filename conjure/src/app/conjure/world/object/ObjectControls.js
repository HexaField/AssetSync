import * as THREE from 'three'
import { TransformControls } from "./TransformControls.js"
import { OrbitControls } from "./OrbitControls.js"
import { CONJURE_MODE } from '../../Conjure.js'
import EventEmitter from 'events'
import { iterateChildrenWithFunction } from '../../util/iterateRecursive.js'

export default class ObjectControls extends EventEmitter {
    constructor(world) {
        super()
        this.world = world
        this.conjure = world.conjure
        this.enabled = false

        this.lastTransformObject = undefined
        // this.objectGroups = []

        this.orbitControls = new OrbitControls(this.conjure.camera, this.conjure.renderer.domElement);
        this.orbitControls.target.copy(world.user.focusPoint.position);
        this.orbitControls.enabled = false;

        this.transformControls = new TransformControls(this.conjure.camera, this.conjure.renderer.domElement);
        this.transformControls.addEventListener('dragging-changed', (event) => {
            console.log('dragging-changed', event)
            this.orbitControls.enabled = !event.value
        })
        this.transformControls.enabled = false
        this.conjure.scene.add(this.transformControls)

        this.conjure.on('conjure:mode', (mode) => {
            if (mode === CONJURE_MODE.BUILD) {
                this.enabled = true

                // if(this.currentControlScheme === CONTROL_SCHEME.FLY)
                //     this.orbitControls.target.copy(this.flyControls.raycaster.ray.at(10, this.vec3));
                // if(this.currentControlScheme === CONTROL_SCHEME.AVATAR)
                //     this.orbitControls.target.copy(this.avatarControls.raycaster.ray.at(10, this.vec3));

                this.transformControls.enabled = true
                this.orbitControls.enabled = true
                this.orbitControls.update()
                // this.conjure.getScreens().hudConjure.showScreen(true)
            } else {
                this.enabled = false
                if (this.transformControls.objects !== []) {
                    this.lastTransformObject = this.transformControls.objects[0]
                    this.detachAll()
                }
                this.transformControls.enabled = false
                this.orbitControls.enabled = false
            }
        })

        // todo: fly controls - maybe put this with avatar controls
        // onFly => // this.conjure.getScreens().hudConjure.showScreen(false)

        this.storageBodyType = null
        this.translationSnap = 0.5

    }

    getSelectedObject() {
        return this.transformControls.objects.length ? this.transformControls.objects[0] : undefined
    }

    // addTransformObject(obj, attach)
    // {
    //     if(this.transformControls.objects.length)
    //         this.lastTransformObject = this.transformControls.objects[0];
    //     if(attach)
    //         this.attach(obj, { detachOthers:true });
    // }

    createGroup() {
        if (this.transformControls.objects.length > 1) {
            let newGroup = new THREE.Group();
            for (let obj of this.transformControls.objects) {
                obj.parent.remove(obj);
                newGroup.add(obj);
            }
            this.conjure.scene.add(newGroup);
            this.detachAll();
        }
    }

    attach(object, params = {}) {
        console.log(object)
        if (params.detachOthers)
            this.detachAll();
        this.transformControls.attach(object);
        this.conjure.postProcessing.addSelectedObject(object);
        this.emit('selected', this.getSelectedObject())
    }

    detachAll() {
        this.transformControls.detachAll();
        this.conjure.postProcessing.clearSelectedObjects();
        this.emit('selected', this.getSelectedObject())
    }

    detach(object) {
        this.transformControls.detach(object);
        this.conjure.postProcessing.removeSelectedObject(object);
        this.emit('selected', this.getSelectedObject())
    }

    // need to sync all cameras - might be a better way than this
    lookAt(obj) {
        if (!obj) return;
        let pos = obj.position.getWorldPosition(this.vec3);
        this.camera.lookAt(pos.x, pos.y, pos.z);
        this.orbitControls.target.copy(pos);
        this.orbitControls.update();
    }

    update(updateArgs) {
        if (!this.enabled) return

        if (updateArgs.input.isPressed('q', true))
            this.transformControls.setSpace(this.transformControls.space === "local" ? "world" : "local");

        if (updateArgs.input.isPressed('SHIFT', true)) {
            // add settings for this
            this.transformControls.setTranslationSnap(this.translationSnap);
            this.transformControls.setRotationSnap(THREE.MathUtils.degToRad(15));
            this.transformControls.setScaleSnap(0.25);
        }
        if (updateArgs.input.isReleased('SHIFT', true)) {
            this.transformControls.setTranslationSnap(null);
            this.transformControls.setRotationSnap(null);
            this.transformControls.setScaleSnap(null);
        }
        if (updateArgs.input.isPressed('w', true))
            this.transformControls.setMode("translate");

        if (updateArgs.input.isPressed('e', true))
            this.transformControls.setMode("rotate");

        if (updateArgs.input.isPressed('r', true))
            this.transformControls.setMode("scale");

        if (updateArgs.input.isPressed('g', true))
            this.createGroup();

        if (updateArgs.input.isPressed('+', true) || updateArgs.input.isPressed('=', true))
            this.transformControls.setSize(this.transformControls.size + 0.1);

        if (updateArgs.input.isPressed('-', true) || updateArgs.input.isPressed('_', true))
            this.transformControls.setSize(Math.max(this.transformControls.size - 0.1, 0.1));

        if (updateArgs.input.isPressed('x', true))
            this.transformControls.showX = !this.transformControls.showX;

        if (updateArgs.input.isPressed('y', true))
            this.transformControls.showY = !this.transformControls.showY;

        if (updateArgs.input.isPressed('z', true))
            this.transformControls.showZ = !this.transformControls.showZ;

        if (updateArgs.input.isPressed('SPACEBAR', true)) {
            this.transformControls.enabled = !this.transformControls.enabled;
        }

        if (this.transformControls.enabled) {
            let intersections = updateArgs.mouseRaycaster.intersectObjects(this.world.realm.database.world.scene.children, true);
            if (intersections.length > 0) {
                let object = intersections[0].object//this.conjure.world.realm.objectManager.getTopGroupObject(intersections[0].object);
                if (object) {
                    if (updateArgs.input.isDown('MOUSELEFT', true) && this.transformControls.axis) {
                        const mode = this.transformControls.getMode()
                        this.conjure.world.realm.updateObject(object, mode === 'translate' ? 'position' : (mode === 'rotate' ? 'rotation' : 'scale'))
                    }
                    if (updateArgs.input.isPressed('MOUSELEFT', true) && !this.transformControls.axis) {
                        if (updateArgs.input.isDown('CONTROL', true)) {
                            this.attach(object);
                        } else {
                            if (this.transformControls.hasAnyAttached())
                                this.lastTransformObject = this.transformControls.isAttached(object) ? object : this.lastTransformObject;

                            if (this.transformControls.isAttached(object)) {
                                this.detach(object);
                            } else {
                                this.attach(object, { detachOthers: true });
                            }
                        }
                    }
                }
            }
        }
    }

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
}