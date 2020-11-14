import{L as T,S as O,a as A,T as z}from"./common/three.module-837575b2.js";function P(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function S(e,r){for(var o=0;o<r.length;o++){var t=r[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function R(e,r,o){return r&&S(e.prototype,r),o&&S(e,o),e}function j(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&d(e,r)}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)},c(e)}function d(e,r){return d=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},d(e,r)}function E(){if(typeof Reflect=="undefined"||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function H(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(e,r){return r&&(typeof r=="object"||typeof r=="function")?r:H(e)}function I(e){var r=E();return function(){var t=c(e),n;if(r){var a=c(this).constructor;n=Reflect.construct(t,arguments,a)}else n=t.apply(this,arguments);return F(this,n)}}function g(e){return M(e)||L(e)||U(e)||B()}function M(e){if(Array.isArray(e))return _(e)}function L(e){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(e))return Array.from(e)}function U(e,r){if(!e)return;if(typeof e=="string")return _(e,r);var o=Object.prototype.toString.call(e).slice(8,-1);if(o==="Object"&&e.constructor&&(o=e.constructor.name),o==="Map"||o==="Set")return Array.from(e);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return _(e,r)}function _(e,r){(r==null||r>e.length)&&(r=e.length);for(var o=0,t=new Array(r);o<r;o++)t[o]=e[o];return t}function B(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var u=window.THREE?window.THREE:{LinearFilter:T,Sprite:O,SpriteMaterial:A,Texture:z},D=function(e){j(o,e);var r=I(o);function o(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:10,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"rgba(255, 255, 255, 1)";return P(this,o),t=r.call(this,new u.SpriteMaterial({map:new u.Texture})),t._text="".concat(n),t._textHeight=a,t._color=i,t._backgroundColor=!1,t._padding=0,t._borderWidth=0,t._borderColor="white",t._strokeWidth=0,t._strokeColor="white",t._fontFace="Arial",t._fontSize=90,t._fontWeight="normal",t._canvas=document.createElement("canvas"),t._texture=t.material.map,t._texture.minFilter=u.LinearFilter,t._genCanvas(),t}return R(o,[{key:"_genCanvas",value:function(){var n=this,a=this._canvas,i=a.getContext("2d"),p=Array.isArray(this.borderWidth)?this.borderWidth:[this.borderWidth,this.borderWidth],s=p.map(function(h){return h*n.fontSize*.1}),y=Array.isArray(this.padding)?this.padding:[this.padding,this.padding],l=y.map(function(h){return h*n.fontSize*.1}),f=this.text.split(`
`),b="".concat(this.fontWeight," ").concat(this.fontSize,"px ").concat(this.fontFace);i.font=b;var v=Math.max.apply(Math,g(f.map(function(h){return i.measureText(h).width}))),w=this.fontSize*f.length;a.width=v+s[0]*2+l[0]*2,a.height=w+s[1]*2+l[1]*2,this.borderWidth&&(i.strokeStyle=this.borderColor,s[0]&&(i.lineWidth=s[0]*2,i.beginPath(),i.moveTo(0,0),i.lineTo(0,a.height),i.moveTo(a.width,0),i.lineTo(a.width,a.height),i.stroke()),s[1]&&(i.lineWidth=s[1]*2,i.beginPath(),i.moveTo(s[0],0),i.lineTo(a.width-s[0],0),i.moveTo(s[0],a.height),i.lineTo(a.width-s[0],a.height),i.stroke())),i.translate.apply(i,g(s)),this.backgroundColor&&(i.fillStyle=this.backgroundColor,i.fillRect(0,0,a.width-s[0]*2,a.height-s[1]*2)),i.translate.apply(i,g(l)),i.font=b,i.fillStyle=this.color,i.textBaseline="bottom";var m=this.strokeWidth>0;m&&(i.lineWidth=this.strokeWidth*this.fontSize/10,i.strokeStyle=this.strokeColor),f.forEach(function(h,W){var x=(v-i.measureText(h).width)/2,C=(W+1)*n.fontSize;m&&i.strokeText(h,x,C),i.fillText(h,x,C)}),this._texture.image=a,this._texture.needsUpdate=!0;var k=this.textHeight*f.length+p[1]*2+y[1]*2;this.scale.set(k*a.width/a.height,k,0)}},{key:"clone",value:function(){return new this.constructor(this.text,this.textHeight,this.color).copy(this)}},{key:"copy",value:function(n){return u.Sprite.prototype.copy.call(this,n),this.color=n.color,this.backgroundColor=n.backgroundColor,this.padding=n.padding,this.borderWidth=n.borderWidth,this.borderColor=n.borderColor,this.fontFace=n.fontFace,this.fontSize=n.fontSize,this.fontWeight=n.fontWeight,this.strokeWidth=n.strokeWidth,this.strokeColor=n.strokeColor,this}},{key:"text",get:function(){return this._text},set:function(n){this._text=n,this._genCanvas()}},{key:"textHeight",get:function(){return this._textHeight},set:function(n){this._textHeight=n,this._genCanvas()}},{key:"color",get:function(){return this._color},set:function(n){this._color=n,this._genCanvas()}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(n){this._backgroundColor=n,this._genCanvas()}},{key:"padding",get:function(){return this._padding},set:function(n){this._padding=n,this._genCanvas()}},{key:"borderWidth",get:function(){return this._borderWidth},set:function(n){this._borderWidth=n,this._genCanvas()}},{key:"borderColor",get:function(){return this._borderColor},set:function(n){this._borderColor=n,this._genCanvas()}},{key:"fontFace",get:function(){return this._fontFace},set:function(n){this._fontFace=n,this._genCanvas()}},{key:"fontSize",get:function(){return this._fontSize},set:function(n){this._fontSize=n,this._genCanvas()}},{key:"fontWeight",get:function(){return this._fontWeight},set:function(n){this._fontWeight=n,this._genCanvas()}},{key:"strokeWidth",get:function(){return this._strokeWidth},set:function(n){this._strokeWidth=n,this._genCanvas()}},{key:"strokeColor",get:function(){return this._strokeColor},set:function(n){this._strokeColor=n,this._genCanvas()}}]),o}(u.Sprite);export default D;