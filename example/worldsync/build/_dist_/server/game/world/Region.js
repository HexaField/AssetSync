import{QuadTree as d,Box as h}from"../../../../web_modules/js-quadtree.js";import{RegionConfig as o}from"./RegionConfig.js";import{sqrDistance as s}from"./MathUtil.js";export function coordsToLabel(i,e){return"x"+i+"y"+e}export function labelToCoords(i){const e=String(i).split(/(?=xy)/g).filter(n=>n.trim()!==""),t=Number(e[0].substr(1))*e[0][0]==="x"?1:-1,r=Number(e[1].substr(1))*e[1][0]==="y"?1:-1;return{x:t,y:r}}export class Region{constructor(i,e){this.coords={x:i,y:e},this.bounds=new h((this.coords.x-1)*o.regionSize,(this.coords.y-1)*o.regionSize,this.coords.x*o.regionSize,this.coords.y*o.regionSize),this.center={x:(this.coords.x+.5)*o.regionSize,y:(this.coords.y+.5)*o.regionSize},this.quadtree=new d(this.bounds,{capacity:16,removeEmptyNodes:!0,maximumDepth:5}),this.visible=!1,this.loadThreshold=o.regionSize*8}getLabel(){return coordsToLabel(this.coords.x,this.coords.y)}updateView(i,e){if(!this.needsUpdate)return;this.isLoaded?s(this.center,{x:i,y:e})>this.loadThreshold*2&&this.unloadRegion():s(this.center,{x:i,y:e})<=this.loadThreshold&&this.loadRegion(),this.needsUpdate=!1}async generateRegion(){await this.generateFunction(this),this.isLoaded=!1}loadRegion(){this.loadFunction(this),this.isLoaded=!0}unloadRegion(){this.unloadFunction(this),this.isLoaded=!1}}