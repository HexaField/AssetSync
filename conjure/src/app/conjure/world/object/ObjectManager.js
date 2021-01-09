import * as THREE from 'three'
import { number } from '../../util/number'
import { NETWORKING_OPCODES } from '../../../backend/Constants.js'

export const PHYSICS_TYPES = {
    NONE: 'None',
    DYNAMIC: 'Dynamic',
    STATIC: 'Static',
    KINEMATIC: 'Kinematic',
    GHOST: 'Ghost',
}

export const PHYSICS_SHAPES = {
    AUTO: 'Automatic',
    CONVEX: 'Convex Mesh',
    CONCAVE: 'Concave Mesh',
    EXTRUDE: 'Extrude Mesh',
    BOX: 'Box',
    CONE: 'Cone',
    CYLINDER: 'Cylinder',
    PLANE: 'Plane',
    SPHERE: 'Sphere',
    TORUS: 'Torus',
}

export default class ObjectManager {
    constructor(realm) {
        this.realm = realm
        this.world = realm.world;
        this.conjure = realm.conjure;
        this.scene = this.conjure.scene;

        this.objects = [];

        this.vec3 = new THREE.Vector3();
        this.quat = new THREE.Quaternion();

        this.physicsTypes = Object.values(PHYSICS_TYPES);
    }

    getPhysicsType(type) {
        for (let i in this.physicsTypes)
            if (this.physicsTypes[i] === type)
                return i - 1;
        return -1;
    }

    getPhysicsShape(type) {
        switch (type) {
            case PHYSICS_SHAPES.AUTO: return 'unknown';
            case PHYSICS_SHAPES.CONVEX: return 'convexMesh';
            case PHYSICS_SHAPES.CONCAVE: return 'concaveMesh';
            case PHYSICS_SHAPES.EXTRUDE: return 'hacd';
            case PHYSICS_SHAPES.BOX: return 'box';
            case PHYSICS_SHAPES.CONE: return 'cone';
            case PHYSICS_SHAPES.CYLINDER: return 'cylinder';
            case PHYSICS_SHAPES.PLANE: return 'plane';
            case PHYSICS_SHAPES.SPHERE: return 'sphere';
            case PHYSICS_SHAPES.TORUS: return 'torus';
            default: return 'unknown';
        }
    }

    async groupObjects(newParent, newChild, ignoreNetwork) {
        if (!newParent || !newChild || !newParent.parent || !newChild.parent) return; // something went wrong, trying to attach something and nothing
        if (newChild.parent === newParent) {
            // console.log('parent is already parent!')
            return; // already is where it needs to be
        }
        // console.log('ObjectManager: groupObjects', newParent, newChild)
        if (this.getIsParentOfRecursive(newChild, newParent)) {
            // console.log('child is parent!')
            return;
        } // don't want to be attaching a parent to it's own child, recursion problem recursion problem recursion problem
        let oldTopParent = this.getTopGroupObject(newChild);
        let newTopParent = this.getTopGroupObject(newParent);

        // console.log('top parents', oldTopParent, newTopParent)
        if (!oldTopParent || !newTopParent) return;

        // success if you made it this far, now lets group...
        this.conjure.world.objectControls.detachAll()
        newChild.parent.remove(newChild);
        let newObject = newChild.clone();

        // update old top parent (so long as it isn't the same as the new one, in which case we're only updating one top parent)
        if (newTopParent !== oldTopParent)
            if (this.getObject(oldTopParent)) // if newChild is a top level object and isn't anymore, need to remove it from the database
                await this.conjure.getWorld().destroyObject(oldTopParent);
            else // otherwise just update it
                await this.conjure.getWorld().updateObject(oldTopParent)

        // update new top parent
        newParent.add(newObject);
        if (newObject.userData.hash)
            newObject.userData.hash = null;
        await this.conjure.getWorld().updateObject(newTopParent)

        this.conjure.getScreens().screenObjectsHierarchy.updateObjects();
        if (!ignoreNetwork)
            this.conjure.getWorld().sendData(NETWORKING_OPCODES.OBJECT.UPDATE, { newParentUUID: newParent.UUID, newChildUUID: newObject.UUID }) // shouldn't need to use this as the two updateObjects should take care of this
    }

    getObject(obj) {
        for (let object of this.objects)
            if (object === obj)
                return object;
    }

    getObjectByHash(hash) {
        for (let object of this.objects)
            if (object.userData.hash === hash)
                return object;
    }

    getObjectByUUID(uuid) {
        for (let object of this.objects)
            if (object.uuid === uuid)
                return object;
    }

    addObject(object, attach = false) {
        this.objects.push(object);
        this.scene.add(object);
        this.conjure.world.objectControls.addTransformObject(object, attach);
        this.conjure.getScreens().screenObjectsHierarchy.updateObjects();
        console.log(object)
    }
    // find a group in this.objects that contains 'obj'
    getTopGroupObject(obj) {
        for (let o of this.objects)
            if (this.getIsParentOfRecursive(o, obj))
                return o
        return; // not in object list, nor are any subchildren
    }

    getIsParentOfRecursive(parent, child) {
        if (parent === child) return true;
        if (child.parent)
            return this.getIsParentOfRecursive(parent, child.parent)
        return false;
    }

    getIsChildOfRecursive(parent, child) {
        if (this.getIsParentOfRecursive(parent, child)) return false;
        if (parent === child) return true;
        for (let p of parent.children)
            if (p === child)
                return true;
        if (child.children)
            for (let c of child.children)
                return this.getIsChildOfRecursive(c, child)
        return false;
    }

    destroyAllObjects() {
        for (let object of this.objects) {
            if (object.body)
                this.conjure.physics.destroy(object.body)
            if (object.material)
                object.material.dispose();
            if (object.geometry)
                object.geometry.dispose();
            this.scene.remove(object);
        }
        this.objects = [];
        this.conjure.renderer.renderLists.dispose();
    }

    destroyObjectByUUID(uuid) {
        for (let object of this.objects)
            if (object.uuid === uuid)
                this.destroyObject(object)
    }

    destroyObject(object, params = {}) {
        if (object.body)
            this.conjure.physics.destroy(object.body)
        if (!params.isChild)
            for (let i = 0; i < this.objects.length; i++)
                if (this.objects[i] === object)
                    this.objects.splice(i, 1);
        if (!params.isChild)
            this.scene.remove(object);
        else
            object.parent.remove(object);
        if (object.material)
            object.material.dispose();
        if (object.geometry)
            object.geometry.dispose();
        this.conjure.getScreens().screenObjectsHierarchy.updateObjects();
        this.conjure.renderer.renderLists.dispose();
    }

    removeObject(object) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i] === object)
                this.objects.splice(i, 1);
        }
    }

    rgbToHex(rgb) {
        var hex = number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    }

    update(updateArgs) {
        for (let o of this.objects) {
            if (o.body) {

                let pos = o.getWorldPosition(this.vec3);
                if (pos.y < -10 || pos.y > 100 || pos.x > 100 || pos.x < -100 || pos.z > 100 || pos.z < -100) {
                    this.teleport(o, 0, 10, 0);
                }
            }
        }
        if (!this.conjure.getScreens().mouseOver) {
            let intersects = updateArgs.mouseRaycaster.intersectObjects(this.objects, true);
            if (intersects.length > 0)
                this.conjure.postProcessing.setHoverObject(intersects[0].object);
            else
                this.conjure.postProcessing.setHoverObject();
        }
        else
            this.conjure.postProcessing.setHoverObject();
    }

    updateObjectFromClient(uuid, data) {
        for (let object of this.objects) {
            if (object.uuid === uuid) {
                if (object.body) {
                    object.body.setCollisionFlags(2);
                    object.position.set(data.position.x, data.position.y, data.position.z);
                    object.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
                    object.body.needUpdate = true;
                    object.body.once.update(() => {
                        object.body.setCollisionFlags(0)
                        if (data.velocity)
                            object.body.setVelocity(data.velocity.x, data.velocity.y, data.velocity.z)
                        if (data.angularVelocity)
                            object.body.setAngularVelocity(data.angularVelocity.x, data.angularVelocity.y, data.angularVelocity.z)
                    })
                }
                else {
                    object.position.set(data.position.x, data.position.y, data.position.z);
                    object.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
                }
            }
        }
    }

    // need to refactor this to use stored physics type
    teleport(object, x, y, z) {
        object.body.setCollisionFlags(2);
        object.position.set(x, y, z);
        object.body.needUpdate = true;
        object.body.once.update(() => {
            object.body.setCollisionFlags(0)
            object.body.setVelocity(0, 0, 0)
            object.body.setAngularVelocity(0, 0, 0)
        })
    }
}