import s from"./ScreenBase.js";import l from"./elements/ScreenElementJSONTree.js";import{PHYSICS_TYPES as r,PHYSICS_SHAPES as o}from"../../backend/Constants.js";export default class i extends s{constructor(e,t){super(e,t);this.group.add(this.background),this.frameBorder=.05,this.updateObject=this.updateObject.bind(this),this.jsonTree=new l(this,this,{width:this.width-this.frameBorder,height:this.height-this.frameBorder}),this.registerElement(this.jsonTree),this.jsonTree.setSchema(this.getSchema())}setSchema(e){this.schema=e}showScreen(e){super.showScreen(e),this.jsonTree.setActive(e)}setObject(e){let t=this.getSchema(e);t&&(this.jsonTree.setSchema(t),this.jsonTree.updateTree(e,a=>this.updateObject(e,a)))}updateObject(e,t){this.screenManager.conjure.world.realm.updateObject(e,t)}update(e){super.update(e)}getSchema(e){if(!e||!e.type)return;switch(e.type.toLowerCase()){case"group":return this.getGroupSchema();case"mesh":return this.getMeshSchema();default:console.log("ERROR: ScreenObjectEdit: could find schema for object type",e.type.toLowerCase(),"for object",e);break}}getGroupSchema(){return{type:"json",label:"name",items:{type:{type:"static",label:"Type"},name:{type:"text",label:"Name"},position:{type:"vector3",label:"Pos"},rotation:{type:"vector3",label:"Rot"},scale:{type:"vector3",label:"Scale"}}}}getMeshSchema(){return{type:"json",label:"name",items:{type:{type:"static",label:"Type"},name:{type:"text",label:"Name"},position:{type:"vector3",label:"Pos"},rotation:{type:"vector3",label:"Rot"},scale:{type:"vector3",label:"Scale"},material:{type:"material",label:"Material"},geometry:{type:"geometry",label:"Geometry"},userData:{type:"json",label:"userData",items:{label:{type:"label",label:"Physics"},physics:{type:"json",label:"physics",items:{type:{type:"list",label:"Type",items:Object.values(r)},shape:{type:"list",label:"Collider Shape",items:Object.values(o)},gravity:{type:"scaler",label:"Gravity",default:1},bounciness:{type:"scaler",label:"Bounciness",default:0},mass:{type:"scaler",label:"Mass",default:1}}}}}}}}}
