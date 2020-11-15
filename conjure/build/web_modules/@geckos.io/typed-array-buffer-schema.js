import{c as E,a as U,b as de}from"../common/_commonjsHelpers-c99fd594.js";var me=E(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Schema=void 0;var r=function(){function n(l,f,i){this._id=l,this._name=f,this._struct=i,this._bytes=0,n.Validation(i),this.calcBytes()}return n.Validation=function(l){},Object.defineProperty(n.prototype,"id",{get:function(){return this._id},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"name",{get:function(){return this._name},enumerable:!1,configurable:!0}),n.prototype.calcBytes=function(){var l=this,f=function(i){var o,a;for(var h in i){var s=(i==null?void 0:i._type)||((o=i==null?void 0:i.type)===null||o===void 0?void 0:o._type),w=i._bytes||((a=i.type)===null||a===void 0?void 0:a._bytes);if(!s&&i.hasOwnProperty(h))typeof i[h]=="object"&&f(i[h]);else{if(h!=="_type"&&h!=="type")return;if(!w)return;if(s==="String8"||s==="String16"){var c=i.length||12;l._bytes+=w*c}else l._bytes+=w}}};f(this._struct)},Object.defineProperty(n.prototype,"struct",{get:function(){return this._struct},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"bytes",{get:function(){return this._bytes},enumerable:!1,configurable:!0}),n}();t.Schema=r}),J=E(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Lib=void 0;var r=function(){function n(){}return n.newHash=function(l,f){var i=function(a){for(var h=0,s=0;s<a.length;s++){var w=a.charCodeAt(s);h=(h<<5)-h+w,h|=0}return h*=254785,Math.abs(h).toString(32).slice(2,6)},o=i(JSON.stringify(f)+l);if(o.length!==4)throw new Error("Hash has not length of 4");return"#"+o},n.schema=function(l,f){var i=n.newHash(l,f),o=new me.Schema(i,l,f);return this._schemas.set(i,o),o},n._schemas=new Map,n}();t.Lib=r}),ye=typeof U=="object"&&U&&U.Object===Object&&U,pe=ye,be=typeof self=="object"&&self&&self.Object===Object&&self,_e=pe||be||Function("return this")(),Z=_e,ge=Z.Symbol,B=ge,re=Object.prototype,je=re.hasOwnProperty,Oe=re.toString,D=B?B.toStringTag:void 0;function we(e){var t=je.call(e,D),r=e[D];try{e[D]=void 0;var n=!0}catch(f){}var l=Oe.call(e);return n&&(t?e[D]=r:delete e[D]),l}var Se=we,ke=Object.prototype,Te=ke.toString;function Ae(e){return Te.call(e)}var Ce=Ae,Pe="[object Null]",Ue="[object Undefined]",ae=B?B.toStringTag:void 0;function Re(e){return e==null?e===void 0?Ue:Pe:ae&&ae in Object(e)?Se(e):Ce(e)}var ne=Re;function Ie(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var q=Ie,ze="[object AsyncFunction]",Me="[object Function]",Fe="[object GeneratorFunction]",Ee="[object Proxy]";function Be(e){if(!q(e))return!1;var t=ne(e);return t==Me||t==Fe||t==ze||t==Ee}var Ne=Be,Le=Z["__core-js_shared__"],W=Le,ie=function(){var e=/[^.]+$/.exec(W&&W.keys&&W.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function $e(e){return!!ie&&ie in e}var Ve=$e,xe=Function.prototype,De=xe.toString;function He(e){if(e!=null){try{return De.call(e)}catch(t){}try{return e+""}catch(t){}}return""}var Ge=He,qe=/[\\^$.*+?()[\]{}|]/g,Xe=/^\[object .+?Constructor\]$/,Ke=Function.prototype,Je=Object.prototype,Ze=Ke.toString,We=Je.hasOwnProperty,Ye=RegExp("^"+Ze.call(We).replace(qe,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Qe(e){if(!q(e)||Ve(e))return!1;var t=Ne(e)?Ye:Xe;return t.test(Ge(e))}var et=Qe;function tt(e,t){return e==null?void 0:e[t]}var rt=tt;function at(e,t){var r=rt(e,t);return et(r)?r:void 0}var Y=at,nt=function(){try{var e=Y(Object,"defineProperty");return e({},"",{}),e}catch(t){}}(),oe=nt;function it(e,t,r){t=="__proto__"&&oe?oe(e,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):e[t]=r}var ot=it;function st(e,t){return e===t||e!==e&&t!==t}var se=st,ct=Object.prototype,ut=ct.hasOwnProperty;function lt(e,t,r){var n=e[t];(!(ut.call(e,t)&&se(n,r))||r===void 0&&!(t in e))&&ot(e,t,r)}var ht=lt,ft=Array.isArray,Q=ft;function vt(e){return e!=null&&typeof e=="object"}var dt=vt,mt="[object Symbol]";function yt(e){return typeof e=="symbol"||dt(e)&&ne(e)==mt}var ee=yt,pt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,bt=/^\w*$/;function _t(e,t){if(Q(e))return!1;var r=typeof e;return r=="number"||r=="symbol"||r=="boolean"||e==null||ee(e)?!0:bt.test(e)||!pt.test(e)||t!=null&&e in Object(t)}var gt=_t,jt=Y(Object,"create"),H=jt;function Ot(){this.__data__=H?H(null):{},this.size=0}var wt=Ot;function St(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var kt=St,Tt="__lodash_hash_undefined__",At=Object.prototype,Ct=At.hasOwnProperty;function Pt(e){var t=this.__data__;if(H){var r=t[e];return r===Tt?void 0:r}return Ct.call(t,e)?t[e]:void 0}var Ut=Pt,Rt=Object.prototype,It=Rt.hasOwnProperty;function zt(e){var t=this.__data__;return H?t[e]!==void 0:It.call(t,e)}var Mt=zt,Ft="__lodash_hash_undefined__";function Et(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=H&&t===void 0?Ft:t,this}var Bt=Et;function N(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}N.prototype.clear=wt,N.prototype.delete=kt,N.prototype.get=Ut,N.prototype.has=Mt,N.prototype.set=Bt;var ce=N;function Nt(){this.__data__=[],this.size=0}var Lt=Nt;function $t(e,t){for(var r=e.length;r--;)if(se(e[r][0],t))return r;return-1}var X=$t,Vt=Array.prototype,xt=Vt.splice;function Dt(e){var t=this.__data__,r=X(t,e);if(r<0)return!1;var n=t.length-1;return r==n?t.pop():xt.call(t,r,1),--this.size,!0}var Ht=Dt;function Gt(e){var t=this.__data__,r=X(t,e);return r<0?void 0:t[r][1]}var qt=Gt;function Xt(e){return X(this.__data__,e)>-1}var Kt=Xt;function Jt(e,t){var r=this.__data__,n=X(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this}var Zt=Jt;function L(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}L.prototype.clear=Lt,L.prototype.delete=Ht,L.prototype.get=qt,L.prototype.has=Kt,L.prototype.set=Zt;var Wt=L,Yt=Y(Z,"Map"),Qt=Yt;function er(){this.size=0,this.__data__={hash:new ce,map:new(Qt||Wt),string:new ce}}var tr=er;function rr(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}var ar=rr;function nr(e,t){var r=e.__data__;return ar(t)?r[typeof t=="string"?"string":"hash"]:r.map}var K=nr;function ir(e){var t=K(this,e).delete(e);return this.size-=t?1:0,t}var or=ir;function sr(e){return K(this,e).get(e)}var cr=sr;function ur(e){return K(this,e).has(e)}var lr=ur;function hr(e,t){var r=K(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this}var fr=hr;function $(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}$.prototype.clear=tr,$.prototype.delete=or,$.prototype.get=cr,$.prototype.has=lr,$.prototype.set=fr;var ue=$,vr="Expected a function";function te(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(vr);var r=function(){var n=arguments,l=t?t.apply(this,n):n[0],f=r.cache;if(f.has(l))return f.get(l);var i=e.apply(this,n);return r.cache=f.set(l,i)||f,i};return r.cache=new(te.Cache||ue),r}te.Cache=ue;var dr=te,mr=500;function yr(e){var t=dr(e,function(n){return r.size===mr&&r.clear(),n}),r=t.cache;return t}var pr=yr,br=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,_r=/\\(\\)?/g,gr=pr(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(br,function(r,n,l,f){t.push(l?f.replace(_r,"$1"):n||r)}),t}),jr=gr;function Or(e,t){for(var r=-1,n=e==null?0:e.length,l=Array(n);++r<n;)l[r]=t(e[r],r,e);return l}var wr=Or,Sr=1/0,le=B?B.prototype:void 0,he=le?le.toString:void 0;function fe(e){if(typeof e=="string")return e;if(Q(e))return wr(e,fe)+"";if(ee(e))return he?he.call(e):"";var t=e+"";return t=="0"&&1/e==-Sr?"-0":t}var kr=fe;function Tr(e){return e==null?"":kr(e)}var Ar=Tr;function Cr(e,t){return Q(e)?e:gt(e,t)?[e]:jr(Ar(e))}var Pr=Cr,Ur=9007199254740991,Rr=/^(?:0|[1-9]\d*)$/;function Ir(e,t){var r=typeof e;return t=t??Ur,!!t&&(r=="number"||r!="symbol"&&Rr.test(e))&&(e>-1&&e%1==0)&&e<t}var zr=Ir,Mr=1/0;function Fr(e){if(typeof e=="string"||ee(e))return e;var t=e+"";return t=="0"&&1/e==-Mr?"-0":t}var Er=Fr;function Br(e,t,r,n){if(!q(e))return e;t=Pr(t,e);for(var l=-1,f=t.length,i=f-1,o=e;o!=null&&++l<f;){var a=Er(t[l]),h=r;if(a==="__proto__"||a==="constructor"||a==="prototype")return e;if(l!=i){var s=o[a];h=n?n(s,a,o):void 0,h===void 0&&(h=q(s)?s:zr(t[l+1])?[]:{})}ht(o,a,h),o=o[a]}return e}var Nr=Br;function Lr(e,t,r){return e==null?e:Nr(e,t,r)}var $r=Lr,Vr=E(function(e,t){var r=U&&U.__assign||function(){return r=Object.assign||function(i){for(var o,a=1,h=arguments.length;a<h;a++){o=arguments[a];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(i[s]=o[s])}return i},r.apply(this,arguments)},n=U&&U.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(t,"__esModule",{value:!0}),t.Serialize=void 0;var l=n($r),f=function(){function i(o){this.schema=o,this._buffer=new ArrayBuffer(0),this._dataView=new DataView(this._buffer),this._bytes=0}return i.prototype.refresh=function(){this._buffer=new ArrayBuffer(8*1024),this._dataView=new DataView(this._buffer),this._bytes=0},i.prototype.cropString=function(o,a){return o.padEnd(a," ").slice(0,a)},i.prototype.flatten=function(o,a){var h=this,s=[],w=function(c,p){var u,v,g,V,M,z,F;(c==null?void 0:c._id)?s.push({d:c._id,t:"String8"}):((u=c==null?void 0:c[0])===null||u===void 0?void 0:u._id)&&s.push({d:c[0]._id,t:"String8"}),(c==null?void 0:c._struct)?c=c._struct:((v=c==null?void 0:c[0])===null||v===void 0?void 0:v._struct)&&(c=c[0]._struct);for(var y in p)if(p.hasOwnProperty(y))if(typeof p[y]=="object")Array.isArray(p)?w(c,p[parseInt(y)]):w(c[y],p[y]);else if((V=(g=c[y])===null||g===void 0?void 0:g.type)===null||V===void 0?void 0:V._type){if(((M=c[y])===null||M===void 0?void 0:M.digits)&&(p[y]*=Math.pow(10,c[y].digits),p[y]=parseInt(p[y].toFixed(0))),(z=c[y])===null||z===void 0?void 0:z.length){var d=(F=c[y])===null||F===void 0?void 0:F.length;p[y]=h.cropString(p[y],d)}s.push({d:p[y],t:c[y].type._type})}else(c[y]._type==="String8"||c[y]._type==="String16")&&(p[y]=h.cropString(p[y],12)),s.push({d:p[y],t:c[y]._type})};return w(o,a),s},i.prototype.toBuffer=function(o){var a=this,h=JSON.parse(JSON.stringify(o));this.refresh();var s=this.flatten(this.schema,h);s.forEach(function(u,v){if(u.t==="String8")for(var g=0;g<u.d.length;g++)a._dataView.setUint8(a._bytes,u.d[g].charCodeAt(0)),a._bytes++;if(u.t==="String16")for(var g=0;g<u.d.length;g++)a._dataView.setUint16(a._bytes,u.d[g].charCodeAt(0)),a._bytes+=2;u.t==="Int8Array"&&(a._dataView.setInt8(a._bytes,u.d),a._bytes++),u.t==="Uint8Array"&&(a._dataView.setUint8(a._bytes,u.d),a._bytes++),u.t==="Int16Array"&&(a._dataView.setInt16(a._bytes,u.d),a._bytes+=2),u.t==="Uint16Array"&&(a._dataView.setUint16(a._bytes,u.d),a._bytes+=2),u.t==="Int32Array"&&(a._dataView.setInt32(a._bytes,u.d),a._bytes+=4),u.t==="Uint32Array"&&(a._dataView.setUint32(a._bytes,u.d),a._bytes+=4),u.t==="BigInt64Array"&&(a._dataView.setBigInt64(a._bytes,BigInt(u.d)),a._bytes+=8),u.t==="BigUint64Array"&&(a._dataView.setBigUint64(a._bytes,BigInt(u.d)),a._bytes+=8),u.t==="Float32Array"&&(a._dataView.setFloat32(a._bytes,u.d),a._bytes+=4),u.t==="Float64Array"&&(a._dataView.setFloat64(a._bytes,u.d),a._bytes+=8)});for(var w=new ArrayBuffer(this._bytes),c=new DataView(w),p=0;p<this._bytes;p++)c.setUint8(p,this._dataView.getUint8(p));return w},i.prototype.fromBuffer=function(o){for(var a=0,h=[],s=new DataView(o),w=Array.from(new Int8Array(o));a>-1;)a=w.indexOf(35,a),a!==-1&&(h.push(a),a++);var c=[];h.forEach(function(d){for(var k="",_=0;_<5;_++){var S=String.fromCharCode(w[d+_]);k+=S}c.push(k)});var p=[];c.forEach(function(d,k){var _=J.Lib._schemas.get(d);_&&p.push({id:d,schema:J.Lib._schemas.get(d),startsAt:h[k]+5})});var u={},v=0,g={},V=function(d){var k,_,S,C={};if(typeof d=="object"){for(var P in d)if(d.hasOwnProperty(P)){var m=d[P],R=void 0;if(((_=m==null?void 0:m.type)===null||_===void 0?void 0:_._type)&&((S=m==null?void 0:m.type)===null||S===void 0?void 0:S._bytes)&&(R=m,m._type=m.type._type,m._bytes=m.type._bytes),m&&m._type&&m._bytes){var j=m._type,T=m._bytes,b=void 0;if(j==="String8"){b="";for(var x=m.length||12,I=0;I<x;I++){var G=String.fromCharCode(s.getUint8(v));b+=G,v++}}if(j==="String16"){b="";for(var ve=m.length||12,I=0;I<ve;I++){var G=String.fromCharCode(s.getUint16(v));b+=G,v+=2}}j==="Int8Array"&&(b=s.getInt8(v),v+=T),j==="Uint8Array"&&(b=s.getUint8(v),v+=T),j==="Int16Array"&&(b=s.getInt16(v),v+=T),j==="Uint16Array"&&(b=s.getUint16(v),v+=T),j==="Int32Array"&&(b=s.getInt32(v),v+=T),j==="Uint32Array"&&(b=s.getUint32(v),v+=T),j==="BigInt64Array"&&(b=parseInt(s.getBigInt64(v).toString()),v+=T),j==="BigUint64Array"&&(b=parseInt(s.getBigUint64(v).toString()),v+=T),j==="Float32Array"&&(b=s.getFloat32(v),v+=T),j==="Float64Array"&&(b=s.getFloat64(v),v+=T),typeof b=="number"&&(R==null?void 0:R.digits)&&(b*=Math.pow(10,-R.digits),b=parseFloat(b.toFixed(R.digits))),C=r(r({},C),(k={},k[P]=b,k))}}}return C};p.forEach(function(d,k){var _,S,C,P=(_=d.schema)===null||_===void 0?void 0:_.struct,m=d.startsAt,R=o.byteLength,j=((S=d.schema)===null||S===void 0?void 0:S.id)||"XX";j==="XX"&&console.error("ERROR: Something went horribly wrong!");try{R=p[k+1].startsAt-5}catch(G){}for(var T=((C=d.schema)===null||C===void 0?void 0:C.bytes)||1,b=(R-m)/T,x=0;x<b;x++){v=m+x*T;var I=V(P);b<=1?g[j]=r({},I):(typeof g[j]=="undefined"&&(g[j]=[]),g[j].push(I))}}),u={};for(var M=function(d,k,_,S,C){if(S===void 0&&(S=""),C===void 0&&(C=!1),d&&d._id&&d._id===k){var P=S.replace(/_struct\./,"").replace(/\.$/,"");C&&!Array.isArray(_)&&(_=[_]),P===""?u=r(r({},u),_):l.default(u,P,_)}else for(var m in d)if(d.hasOwnProperty(m)&&typeof d[m]=="object"){var P=Array.isArray(d)?"":m+".";M(d[m],k,_,S+P,Array.isArray(d))}},z=0;z<Object.keys(g).length;z++){var F=Object.keys(g)[z],y=g[F];M(this.schema,F,y,"")}return u},i}();t.Serialize=f}),xr=E(function(e,t){var r=U&&U.__extends||function(){var l=function(f,i){return l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,a){o.__proto__=a}||function(o,a){for(var h in a)a.hasOwnProperty(h)&&(o[h]=a[h])},l(f,i)};return function(f,i){l(f,i);function o(){this.constructor=f}f.prototype=i===null?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;var n=function(l){r(f,l);function f(i){var o=l.call(this,i)||this;return o.schema=i,o}return f}(Vr.Serialize);t.Model=n}),A=E(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.string16=t.string8=t.float64=t.float32=t.uint64=t.int64=t.uint32=t.int32=t.uint16=t.int16=t.uint8=t.int8=void 0,t.int8={_type:"Int8Array",_bytes:1},t.uint8={_type:"Uint8Array",_bytes:1},t.int16={_type:"Int16Array",_bytes:2},t.uint16={_type:"Uint16Array",_bytes:2},t.int32={_type:"Int32Array",_bytes:4},t.uint32={_type:"Uint32Array",_bytes:4},t.int64={_type:"BigInt64Array",_bytes:8},t.uint64={_type:"BigUint64Array",_bytes:8},t.float32={_type:"Float32Array",_bytes:4},t.float64={_type:"Float64Array",_bytes:8},t.string8={_type:"String8",_bytes:1},t.string16={_type:"String16",_bytes:2}}),O=E(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BufferSchema",{enumerable:!0,get:function(){return J.Lib}}),Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return xr.Model}}),Object.defineProperty(t,"int8",{enumerable:!0,get:function(){return A.int8}}),Object.defineProperty(t,"uint8",{enumerable:!0,get:function(){return A.uint8}}),Object.defineProperty(t,"int16",{enumerable:!0,get:function(){return A.int16}}),Object.defineProperty(t,"uint16",{enumerable:!0,get:function(){return A.uint16}}),Object.defineProperty(t,"int32",{enumerable:!0,get:function(){return A.int32}}),Object.defineProperty(t,"uint32",{enumerable:!0,get:function(){return A.uint32}}),Object.defineProperty(t,"int64",{enumerable:!0,get:function(){return A.int64}}),Object.defineProperty(t,"uint64",{enumerable:!0,get:function(){return A.uint64}}),Object.defineProperty(t,"float32",{enumerable:!0,get:function(){return A.float32}}),Object.defineProperty(t,"float64",{enumerable:!0,get:function(){return A.float64}}),Object.defineProperty(t,"string8",{enumerable:!0,get:function(){return A.string8}}),Object.defineProperty(t,"string16",{enumerable:!0,get:function(){return A.string16}})}),Dr=de(O),Hr=O.BufferSchema,Gr=O.Model,qr=O.__esModule;export default Dr;var Xr=O.float32,Kr=O.float64,Jr=O.int16,Zr=O.int32,Wr=O.int64,Yr=O.int8,Qr=O.string16,ea=O.string8,ta=O.uint16,ra=O.uint32,aa=O.uint64,na=O.uint8;export{Hr as BufferSchema,Gr as Model,qr as __esModule,O as __moduleExports,Xr as float32,Kr as float64,Jr as int16,Zr as int32,Wr as int64,Yr as int8,Qr as string16,ea as string8,ta as uint16,ra as uint32,aa as uint64,na as uint8};
