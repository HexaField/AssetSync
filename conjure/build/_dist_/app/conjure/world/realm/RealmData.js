export const REALM_WORLD_GENERATORS={NONE:"None",INFINITE_WORLD:"Infinite World"},REALM_WHITELIST={NONE:"None",SERVICE:"Service",PASSCODE:"Passcode"};import a from"../../../../../web_modules/lodash.js";export default class s{constructor(t){this.setData(t)}setData(t={}){const e=Date.now();this.data={id:String(t.id||e),name:t.name||this.getName()||"New Realm",timestamp:e,iconURL:t.iconURL||this.getIconURL(),global:Boolean(t.global),whitelist:t.whitelist?{type:t.whitelist.type||REALM_WHITELIST.NONE,ids:t.whitelist.ids||[]}:{type:REALM_WHITELIST.NONE,ids:[]},worldData:t.worldData||{},worldSettings:Object.assign({},t.worldSettings||{features:t.features&&t.features.length?t.features:[],worldGeneratorType:REALM_WORLD_GENERATORS.INFINITE_WORLD},t.worldSettings?a.clone(t.worldSettings):{})}}getWorldSettings(){return this.data.worldSettings}getData(){return this.data}getID(){return this.data.id}getName(){return this.data?this.data.name:""}getIconURL(){return this.data?this.data.iconURL:""}}
