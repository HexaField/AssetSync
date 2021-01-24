import ScreenBase from './ScreenBase';
import ScreenElementJSONTree from './elements/ScreenElementJSONTree';
import { PHYSICS_TYPES, PHYSICS_SHAPES } from '../../backend/Constants';


export default class ScreenObjectEdit extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);
        this.frameBorder = 0.05;

        this.updateObject = this.updateObject.bind(this);

        this.jsonTree = new ScreenElementJSONTree(this, this, { width: this.width - this.frameBorder, height: this.height - this.frameBorder })
        this.registerElement(this.jsonTree);
        this.jsonTree.setSchema(this.getSchema());
    }

    setSchema(schema)
    {
        this.schema = schema;
    }

    showScreen(active)
    {
        super.showScreen(active);
        this.jsonTree.setActive(active)
    }

    setObject(object)
    {
        let schema = this.getSchema(object);
        if(schema)
        {
            this.jsonTree.setSchema(schema);
            this.jsonTree.updateTree(object, (param) => this.updateObject(object, param));
        }
    }

    updateObject(object, param)
    {
        this.screenManager.conjure.world.realm.updateObject(object, param);
    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }

    getSchema(object)
    {
        if(!object || !object.type) return;
        switch(object.type.toLowerCase())
        {
            case 'group': return this.getGroupSchema();
            case 'mesh': return this.getMeshSchema();
            default: console.log('ERROR: ScreenObjectEdit: could find schema for object type', object.type.toLowerCase(), 'for object', object); break;
        }
    }

    // TODO: add a function to merge schemas

    getGroupSchema()
    {
        return {
            type: 'json',
            label: 'name',
            items: {
                type: {
                    type: 'static',
                    label: 'Type',
                },
                name: {
                    type: 'text',
                    label: 'Name',
                },
                position: {
                    type: 'vector3',
                    label: 'Pos',
                },
                rotation: {
                    type: 'vector3',
                    label: 'Rot',
                },
                scale: {
                    type: 'vector3',
                    label: 'Scale',
                },
            }
        }
    }

    getMeshSchema()
    {
        return {
            type: 'json',
            label: 'name',
            items: {
                type: {
                    type: 'static',
                    label: 'Type',
                },
                name: {
                    type: 'text',
                    label: 'Name',
                },
                position: {
                    type: 'vector3',
                    label: 'Pos',
                },
                rotation: {
                    type: 'vector3',
                    label: 'Rot',
                },
                scale: {
                    type: 'vector3',
                    label: 'Scale',
                },
                material: {
                    type: 'material',
                    label: 'Material',
                },
                geometry: {
                    type: 'geometry',
                    label: 'Geometry',
                },
                userData: {
                    type: 'json',
                    label: 'userData',
                    items: {
                        label: {
                            type: 'label',
                            label: 'Physics'
                        },
                        physics: {
                            type: 'json',
                            label: 'physics',
                            items: {
                                type: {
                                    type: 'list',
                                    label: 'Type',
                                    items: Object.values(PHYSICS_TYPES),
                                },
                                shape: {
                                    type: 'list',
                                    label: 'Collider Shape',
                                    items: Object.values(PHYSICS_SHAPES),
                                },
                                gravity: {
                                    type: 'scaler',
                                    label: 'Gravity',
                                    default: 1,
                                },
                                bounciness: {
                                    type: 'scaler',
                                    label: 'Bounciness',
                                    default: 0,
                                },
                                mass: {
                                    type: 'scaler',
                                    label: 'Mass',
                                    default: 1,
                                },
                                // destructable: { // breaks objects, no like it corrupts them too lol...
                                //     type: 'bool',
                                //     label: 'Destructable',
                                // },
                                // deformable: { // unimplemented
                                //     type: 'bool',
                                //     label: 'Deformable',
                                // },
                            },
                        },
                        // label1: {
                        //     type: 'label',
                        //     label: 'PayID'
                        // },
                        // payID: {
                        //     type: 'text',
                        //     label: 'payID',
                        // },
                    },
                },
            }
        }
    }

}