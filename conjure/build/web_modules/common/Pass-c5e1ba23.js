import{q as i,P as o,b as n}from"./three.module-36fff313.js";function r(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}Object.assign(r.prototype,{setSize:function(){},render:function(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}),r.FullScreenQuad=function(){var s=new i(-1,1,1,-1,0,1),a=new o(2,2),t=function(e){this._mesh=new n(a,e)};return Object.defineProperty(t.prototype,"material",{get:function(){return this._mesh.material},set:function(e){this._mesh.material=e}}),Object.assign(t.prototype,{dispose:function(){this._mesh.geometry.dispose()},render:function(e){e.render(this._mesh,s)}}),t}();export{r as P};