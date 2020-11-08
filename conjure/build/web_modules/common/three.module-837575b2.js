const nl="122",il=0,Xo=1,rl=2,Yo=1,sl=2,Ei=3,Ti=0,Ze=1,Ai=2,Zo=1,Fn=0,Li=1,us=2,Jo=3,Qo=4,ol=5,Un=100,al=101,cl=102,$o=103,Ko=104,ll=200,hl=201,ul=202,dl=203,ea=204,ta=205,fl=206,pl=207,ml=208,gl=209,yl=210,vl=0,xl=1,_l=2,ds=3,bl=4,wl=5,Ml=6,Sl=7,hr=0,El=1,Tl=2,Ri=0,Al=1,Ll=2,Rl=3,Cl=4,Pl=5,na=300,fs=301,ps=302,ms=303,ia=304,gs=306,ys=307,ur=1e3,ht=1001,dr=1002,tt=1003,vs=1004,xs=1005,$e=1006,ra=1007,Ci=1008,_s=1009,Il=1010,Dl=1011,fr=1012,Nl=1013,pr=1014,tn=1015,mr=1016,Ol=1017,Bl=1018,Fl=1019,Pi=1020,Ul=1021,nn=1022,vt=1023,zl=1024,kl=1025,zn=1026,Ii=1027,Hl=1028,Gl=1029,Vl=1030,Wl=1031,jl=1032,ql=1033,sa=33776,oa=33777,aa=33778,ca=33779,la=35840,ha=35841,ua=35842,da=35843,Xl=36196,fa=37492,pa=37496,Yl=37808,Zl=37809,Jl=37810,Ql=37811,$l=37812,Kl=37813,eh=37814,th=37815,nh=37816,ih=37817,rh=37818,sh=37819,oh=37820,ah=37821,ch=36492,lh=37840,hh=37841,uh=37842,dh=37843,fh=37844,ph=37845,mh=37846,gh=37847,yh=37848,vh=37849,xh=37850,_h=37851,bh=37852,wh=37853,Mh=2200,Sh=2201,Eh=2202,Di=2300,Ni=2301,bs=2302,kn=2400,Hn=2401,gr=2402,ws=2500,ma=2501,Th=0,Ah=1,Lh=2,Oi=3e3,Ms=3001,Rh=3007,Ch=3002,Ph=3003,Ih=3004,Dh=3005,Nh=3006,Oh=3200,ga=3201,En=0,Bh=1,Ss=7680,Fh=519,yr=35044,Bi=35048,ya="300 es";function Wt(){}Object.assign(Wt.prototype,{addEventListener:function(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)},hasEventListener:function(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1},removeEventListener:function(e,t){if(this._listeners===void 0)return;const n=this._listeners,i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}},dispatchEvent:function(e){if(this._listeners===void 0)return;const t=this._listeners,n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e)}}});const Ke=[];for(let e=0;e<256;e++)Ke[e]=(e<16?"0":"")+e.toString(16);let vr=1234567;const be={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Ke[e&255]+Ke[e>>8&255]+Ke[e>>16&255]+Ke[e>>24&255]+"-"+Ke[t&255]+Ke[t>>8&255]+"-"+Ke[t>>16&15|64]+Ke[t>>24&255]+"-"+Ke[n&63|128]+Ke[n>>8&255]+"-"+Ke[n>>16&255]+Ke[n>>24&255]+Ke[i&255]+Ke[i>>8&255]+Ke[i>>16&255]+Ke[i>>24&255];return r.toUpperCase()},clamp:function(e,t,n){return Math.max(t,Math.min(n,e))},euclideanModulo:function(e,t){return(e%t+t)%t},mapLinear:function(e,t,n,i,r){return i+(e-t)*(r-i)/(n-t)},lerp:function(e,t,n){return(1-n)*e+n*t},smoothstep:function(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))},smootherstep:function(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))},randInt:function(e,t){return e+Math.floor(Math.random()*(t-e+1))},randFloat:function(e,t){return e+Math.random()*(t-e)},randFloatSpread:function(e){return e*(.5-Math.random())},seededRandom:function(e){return e!==void 0&&(vr=e%2147483647),vr=vr*16807%2147483647,(vr-1)/2147483646},degToRad:function(e){return e*be.DEG2RAD},radToDeg:function(e){return e*be.RAD2DEG},isPowerOfTwo:function(e){return(e&e-1)===0&&e!==0},ceilPowerOfTwo:function(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))},floorPowerOfTwo:function(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))},setQuaternionFromProperEuler:function(e,t,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),c=o(n/2),l=s((t+i)/2),d=o((t+i)/2),h=s((t-i)/2),f=o((t-i)/2),u=s((i-t)/2),m=o((i-t)/2);switch(r){case"XYX":e.set(a*d,c*h,c*f,a*l);break;case"YZY":e.set(c*f,a*d,c*h,a*l);break;case"ZXZ":e.set(c*h,c*f,a*d,a*l);break;case"XZX":e.set(a*d,c*m,c*u,a*l);break;case"YXY":e.set(c*u,a*d,c*m,a*l);break;case"ZYZ":e.set(c*m,c*u,a*d,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}};class W{constructor(e=0,t=0){Object.defineProperty(this,"isVector2",{value:!0}),this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){const e=Math.atan2(-this.y,-this.x)+Math.PI;return e}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*n-s*i+e.x,this.y=r*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}}class st{constructor(){Object.defineProperty(this,"isMatrix3",{value:!0}),this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,s,o,a,c){const l=this.elements;return l[0]=e,l[1]=i,l[2]=o,l[3]=t,l[4]=r,l[5]=a,l[6]=n,l[7]=s,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}clone(){return new this.constructor().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,s=n[0],o=n[3],a=n[6],c=n[1],l=n[4],d=n[7],h=n[2],f=n[5],u=n[8],m=i[0],v=i[3],y=i[6],g=i[1],p=i[4],E=i[7],S=i[2],T=i[5],b=i[8];return r[0]=s*m+o*g+a*S,r[3]=s*v+o*p+a*T,r[6]=s*y+o*E+a*b,r[1]=c*m+l*g+d*S,r[4]=c*v+l*p+d*T,r[7]=c*y+l*E+d*b,r[2]=h*m+f*g+u*S,r[5]=h*v+f*p+u*T,r[8]=h*y+f*E+u*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],s=e[4],o=e[5],a=e[6],c=e[7],l=e[8];return t*s*l-t*o*c-n*r*l+n*o*a+i*r*c-i*s*a}getInverse(e,t){t!==void 0&&console.warn("THREE.Matrix3: .getInverse() can no longer be configured to throw on degenerate.");const n=e.elements,i=this.elements,r=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],d=n[6],h=n[7],f=n[8],u=f*c-l*h,m=l*d-f*a,v=h*a-c*d,y=r*u+s*m+o*v;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/y;return i[0]=u*g,i[1]=(o*h-f*s)*g,i[2]=(l*s-o*c)*g,i[3]=m*g,i[4]=(f*r-o*d)*g,i[5]=(o*a-l*r)*g,i[6]=v*g,i[7]=(s*d-h*r)*g,i[8]=(c*r-s*a)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).getInverse(this).transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,s,o){const a=Math.cos(r),c=Math.sin(r);this.set(n*a,n*c,-n*(a*s+c*o)+s+e,-i*c,i*a,-i*(-c*s+a*o)+o+t,0,0,1)}scale(e,t){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=t,n[4]*=t,n[7]*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),i=this.elements,r=i[0],s=i[3],o=i[6],a=i[1],c=i[4],l=i[7];return i[0]=t*r+n*a,i[3]=t*s+n*c,i[6]=t*o+n*l,i[1]=-n*r+t*a,i[4]=-n*s+t*c,i[7]=-n*o+t*l,this}translate(e,t){const n=this.elements;return n[0]+=e*n[2],n[3]+=e*n[5],n[6]+=e*n[8],n[1]+=t*n[2],n[4]+=t*n[5],n[7]+=t*n[8],this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}}let Gn;const Tn={getDataURL:function(e){if(/^data:/i.test(e.src))return e.src;if(typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gn===void 0&&(Gn=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),Gn.width=e.width,Gn.height=e.height;const n=Gn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gn}return t.width>2048||t.height>2048?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}};let Uh=0;function Ne(e,t,n,i,r,s,o,a,c,l){Object.defineProperty(this,"id",{value:Uh++}),this.uuid=be.generateUUID(),this.name="",this.image=e!==void 0?e:Ne.DEFAULT_IMAGE,this.mipmaps=[],this.mapping=t!==void 0?t:Ne.DEFAULT_MAPPING,this.wrapS=n!==void 0?n:ht,this.wrapT=i!==void 0?i:ht,this.magFilter=r!==void 0?r:$e,this.minFilter=s!==void 0?s:Ci,this.anisotropy=c!==void 0?c:1,this.format=o!==void 0?o:vt,this.internalFormat=null,this.type=a!==void 0?a:_s,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=l!==void 0?l:Oi,this.version=0,this.onUpdate=null}Ne.DEFAULT_IMAGE=void 0,Ne.DEFAULT_MAPPING=na,Ne.prototype=Object.assign(Object.create(Wt.prototype),{constructor:Ne,isTexture:!0,updateMatrix:function(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this},toJSON:function(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){const i=this.image;if(i.uuid===void 0&&(i.uuid=be.generateUUID()),!t&&e.images[i.uuid]===void 0){let r;if(Array.isArray(i)){r=[];for(let s=0,o=i.length;s<o;s++)r.push(Tn.getDataURL(i[s]))}else r=Tn.getDataURL(i);e.images[i.uuid]={uuid:i.uuid,url:r}}n.image=i.uuid}return t||(e.textures[this.uuid]=n),n},dispose:function(){this.dispatchEvent({type:"dispose"})},transformUv:function(e){if(this.mapping!==na)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ur:e.x=e.x-Math.floor(e.x);break;case ht:e.x=e.x<0?0:1;break;case dr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ur:e.y=e.y-Math.floor(e.y);break;case ht:e.y=e.y<0?0:1;break;case dr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}}),Object.defineProperty(Ne.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}});class Ie{constructor(e=0,t=0,n=0,i=1){Object.defineProperty(this,"isVector4",{value:!0}),this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*r,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*r,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*r,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const s=.01,o=.1,a=e.elements,c=a[0],l=a[4],d=a[8],h=a[1],f=a[5],u=a[9],m=a[2],v=a[6],y=a[10];if(Math.abs(l-h)<s&&Math.abs(d-m)<s&&Math.abs(u-v)<s){if(Math.abs(l+h)<o&&Math.abs(d+m)<o&&Math.abs(u+v)<o&&Math.abs(c+f+y-3)<o)return this.set(1,0,0,0),this;t=Math.PI;const p=(c+1)/2,E=(f+1)/2,S=(y+1)/2,T=(l+h)/4,b=(d+m)/4,L=(u+v)/4;return p>E&&p>S?p<s?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(p),i=T/n,r=b/n):E>S?E<s?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(E),n=T/i,r=L/i):S<s?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(S),n=b/r,i=L/r),this.set(n,i,r,t),this}let g=Math.sqrt((v-u)*(v-u)+(d-m)*(d-m)+(h-l)*(h-l));return Math.abs(g)<.001&&(g=1),this.x=(v-u)/g,this.y=(d-m)/g,this.z=(h-l)/g,this.w=Math.acos((c+f+y-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}}function xt(e,t,n){this.width=e,this.height=t,this.scissor=new Ie(0,0,e,t),this.scissorTest=!1,this.viewport=new Ie(0,0,e,t),n=n||{},this.texture=new Ne(void 0,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.image={},this.texture.image.width=e,this.texture.image.height=t,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:$e,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null}xt.prototype=Object.assign(Object.create(Wt.prototype),{constructor:xt,isWebGLRenderTarget:!0,setSize:function(e,t){(this.width!==e||this.height!==t)&&(this.width=e,this.height=t,this.texture.image.width=e,this.texture.image.height=t,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.width=e.width,this.height=e.height,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});function va(e,t,n){xt.call(this,e,t,n),this.samples=4}va.prototype=Object.assign(Object.create(xt.prototype),{constructor:va,isWebGLMultisampleRenderTarget:!0,copy:function(e){return xt.prototype.copy.call(this,e),this.samples=e.samples,this}});class ut{constructor(e=0,t=0,n=0,i=1){Object.defineProperty(this,"isQuaternion",{value:!0}),this._x=e,this._y=t,this._z=n,this._w=i}static slerp(e,t,n,i){return n.copy(e).slerp(t,i)}static slerpFlat(e,t,n,i,r,s,o){let a=n[i+0],c=n[i+1],l=n[i+2],d=n[i+3];const h=r[s+0],f=r[s+1],u=r[s+2],m=r[s+3];if(d!==m||a!==h||c!==f||l!==u){let v=1-o;const y=a*h+c*f+l*u+d*m,g=y>=0?1:-1,p=1-y*y;if(p>Number.EPSILON){const S=Math.sqrt(p),T=Math.atan2(S,y*g);v=Math.sin(v*T)/S,o=Math.sin(o*T)/S}const E=o*g;if(a=a*v+h*E,c=c*v+f*E,l=l*v+u*E,d=d*v+m*E,v===1-o){const S=1/Math.sqrt(a*a+c*c+l*l+d*d);a*=S,c*=S,l*=S,d*=S}}e[t]=a,e[t+1]=c,e[t+2]=l,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,s){const o=n[i],a=n[i+1],c=n[i+2],l=n[i+3],d=r[s],h=r[s+1],f=r[s+2],u=r[s+3];return e[t]=o*u+l*d+a*f-c*h,e[t+1]=a*u+l*h+c*d-o*f,e[t+2]=c*u+l*f+o*h-a*d,e[t+3]=l*u-o*d-a*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=e._x,i=e._y,r=e._z,s=e._order,o=Math.cos,a=Math.sin,c=o(n/2),l=o(i/2),d=o(r/2),h=a(n/2),f=a(i/2),u=a(r/2);switch(s){case"XYZ":this._x=h*l*d+c*f*u,this._y=c*f*d-h*l*u,this._z=c*l*u+h*f*d,this._w=c*l*d-h*f*u;break;case"YXZ":this._x=h*l*d+c*f*u,this._y=c*f*d-h*l*u,this._z=c*l*u-h*f*d,this._w=c*l*d+h*f*u;break;case"ZXY":this._x=h*l*d-c*f*u,this._y=c*f*d+h*l*u,this._z=c*l*u+h*f*d,this._w=c*l*d-h*f*u;break;case"ZYX":this._x=h*l*d-c*f*u,this._y=c*f*d+h*l*u,this._z=c*l*u-h*f*d,this._w=c*l*d+h*f*u;break;case"YZX":this._x=h*l*d+c*f*u,this._y=c*f*d+h*l*u,this._z=c*l*u-h*f*d,this._w=c*l*d-h*f*u;break;case"XZY":this._x=h*l*d-c*f*u,this._y=c*f*d-h*l*u,this._z=c*l*u+h*f*d,this._w=c*l*d+h*f*u;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],s=t[1],o=t[5],a=t[9],c=t[2],l=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(l-a)*f,this._y=(r-c)*f,this._z=(s-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(l-a)/f,this._x=.25*f,this._y=(i+s)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+s)/f,this._y=.25*f,this._z=(a+l)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(s-i)/f,this._x=(r+c)/f,this._y=(a+l)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){const n=1e-6;let i=e.dot(t)+1;return i<n?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(be.clamp(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}inverse(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,s=e._w,o=t._x,a=t._y,c=t._z,l=t._w;return this._x=n*l+s*o+i*c-r*a,this._y=i*l+s*a+r*o-n*c,this._z=r*l+s*c+n*a-i*o,this._w=s*l-n*o-i*a-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,s=this._w;let o=s*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=n,this._y=i,this._z=r,this;const a=1-o*o;if(a<=Number.EPSILON){const f=1-t;return this._w=f*s+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(a),l=Math.atan2(c,o),d=Math.sin((1-t)*l)/c,h=Math.sin(t*l)/c;return this._w=s*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}}class M{constructor(e=0,t=0,n=0){Object.defineProperty(this,"isVector3",{value:!0}),this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(xa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,s=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*s,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*s,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,s=e.y,o=e.z,a=e.w,c=a*t+s*i-o*n,l=a*n+o*t-r*i,d=a*i+r*n-s*t,h=-r*t-s*n-o*i;return this.x=c*a+h*-r+l*-o-d*-s,this.y=l*a+h*-s+d*-r-c*-o,this.z=d*a+h*-o+c*-s-l*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e,t){return t!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,s=t.x,o=t.y,a=t.z;return this.x=i*a-r*o,this.y=r*s-n*a,this.z=n*o-i*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Es.copy(this).projectOnVector(e),this.sub(Es)}reflect(e){return this.sub(Es.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(be.clamp(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}}const Es=new M,xa=new ut;class jt{constructor(e,t){Object.defineProperty(this,"isBox3",{value:!0}),this.min=e!==void 0?e:new M(Infinity,Infinity,Infinity),this.max=t!==void 0?t:new M(-Infinity,-Infinity,-Infinity)}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=Infinity,n=Infinity,i=Infinity,r=-Infinity,s=-Infinity,o=-Infinity;for(let a=0,c=e.length;a<c;a+=3){const l=e[a],d=e[a+1],h=e[a+2];l<t&&(t=l),d<n&&(n=d),h<i&&(i=h),l>r&&(r=l),d>s&&(s=d),h>o&&(o=h)}return this.min.set(t,n,i),this.max.set(r,s,o),this}setFromBufferAttribute(e){let t=Infinity,n=Infinity,i=Infinity,r=-Infinity,s=-Infinity,o=-Infinity;for(let a=0,c=e.count;a<c;a++){const l=e.getX(a),d=e.getY(a),h=e.getZ(a);l<t&&(t=l),d<n&&(n=d),h<i&&(i=h),l>r&&(r=l),d>s&&(s=d),h>o&&(o=h)}return this.min.set(t,n,i),this.max.set(r,s,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e){return this.makeEmpty(),this.expandByObject(e)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=Infinity,this.max.x=this.max.y=this.max.z=-Infinity,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return e===void 0&&(console.warn("THREE.Box3: .getCenter() target is now required"),e=new M),this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return e===void 0&&(console.warn("THREE.Box3: .getSize() target is now required"),e=new M),this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e){e.updateWorldMatrix(!1,!1);const t=e.geometry;t!==void 0&&(t.boundingBox===null&&t.computeBoundingBox(),As.copy(t.boundingBox),As.applyMatrix4(e.matrixWorld),this.union(As));const n=e.children;for(let i=0,r=n.length;i<r;i++)this.expandByObject(n[i]);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t===void 0&&(console.warn("THREE.Box3: .getParameter() target is now required"),t=new M),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Fi),Fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),xr.subVectors(this.max,Ui),Vn.subVectors(e.a,Ui),Wn.subVectors(e.b,Ui),jn.subVectors(e.c,Ui),rn.subVectors(Wn,Vn),sn.subVectors(jn,Wn),An.subVectors(Vn,jn);let t=[0,-rn.z,rn.y,0,-sn.z,sn.y,0,-An.z,An.y,rn.z,0,-rn.x,sn.z,0,-sn.x,An.z,0,-An.x,-rn.y,rn.x,0,-sn.y,sn.x,0,-An.y,An.x,0];return Ts(t,Vn,Wn,jn,xr)?(t=[1,0,0,0,1,0,0,0,1],Ts(t,Vn,Wn,jn,xr)?(_r.crossVectors(rn,sn),t=[_r.x,_r.y,_r.z],Ts(t,Vn,Wn,jn,xr)):!1):!1}clampPoint(e,t){return t===void 0&&(console.warn("THREE.Box3: .clampPoint() target is now required"),t=new M),t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){const t=Fi.copy(e).clamp(this.min,this.max);return t.sub(e).length()}getBoundingSphere(e){return e===void 0&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(e.center),e.radius=this.getSize(Fi).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}function Ts(e,t,n,i,r){for(let s=0,o=e.length-3;s<=o;s+=3){Ln.fromArray(e,s);const a=r.x*Math.abs(Ln.x)+r.y*Math.abs(Ln.y)+r.z*Math.abs(Ln.z),c=t.dot(Ln),l=n.dot(Ln),d=i.dot(Ln);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const qt=[new M,new M,new M,new M,new M,new M,new M,new M],Fi=new M,As=new jt,Vn=new M,Wn=new M,jn=new M,rn=new M,sn=new M,An=new M,Ui=new M,xr=new M,_r=new M,Ln=new M,zh=new jt;class Xt{constructor(e,t){this.center=e!==void 0?e:new M,this.radius=t!==void 0?t:-1}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):zh.setFromPoints(e).getCenter(n);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t===void 0&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),t=new M),t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return e===void 0&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),e=new jt),this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}}const Yt=new M,Ls=new M,br=new M,on=new M,Rs=new M,wr=new M,Cs=new M;class zi{constructor(e,t){this.origin=e!==void 0?e:new M,this.direction=t!==void 0?t:new M(0,0,-1)}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}clone(){return new this.constructor().copy(this)}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t===void 0&&(console.warn("THREE.Ray: .at() target is now required"),t=new M),t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yt)),this}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),t=new M),t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yt.copy(this.direction).multiplyScalar(t).add(this.origin),Yt.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ls.copy(e).add(t).multiplyScalar(.5),br.copy(t).sub(e).normalize(),on.copy(this.origin).sub(Ls);const r=e.distanceTo(t)*.5,s=-this.direction.dot(br),o=on.dot(this.direction),a=-on.dot(br),c=on.lengthSq(),l=Math.abs(1-s*s);let d,h,f,u;if(l>0)if(d=s*a-o,h=s*o-a,u=r*l,d>=0)if(h>=-u)if(h<=u){const m=1/l;d*=m,h*=m,f=d*(d+s*h+2*o)+h*(s*d+h+2*a)+c}else h=r,d=Math.max(0,-(s*h+o)),f=-d*d+h*(h+2*a)+c;else h=-r,d=Math.max(0,-(s*h+o)),f=-d*d+h*(h+2*a)+c;else h<=-u?(d=Math.max(0,-(-s*r+o)),h=d>0?-r:Math.min(Math.max(-r,-a),r),f=-d*d+h*(h+2*a)+c):h<=u?(d=0,h=Math.min(Math.max(-r,-a),r),f=h*(h+2*a)+c):(d=Math.max(0,-(s*r+o)),h=d>0?r:Math.min(Math.max(-r,-a),r),f=-d*d+h*(h+2*a)+c);else h=s>0?-r:r,d=Math.max(0,-(s*h+o)),f=-d*d+h*(h+2*a)+c;return n&&n.copy(this.direction).multiplyScalar(d).add(this.origin),i&&i.copy(br).multiplyScalar(h).add(Ls),f}intersectSphere(e,t){Yt.subVectors(e.center,this.origin);const n=Yt.dot(this.direction),i=Yt.dot(Yt)-n*n,r=e.radius*e.radius;if(i>r)return null;const s=Math.sqrt(r-i),o=n-s,a=n+s;return o<0&&a<0?null:o<0?this.at(a,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);if(t===0)return!0;const n=e.normal.dot(this.direction);return n*t<0}intersectBox(e,t){let n,i,r,s,o,a;const c=1/this.direction.x,l=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),l>=0?(r=(e.min.y-h.y)*l,s=(e.max.y-h.y)*l):(r=(e.max.y-h.y)*l,s=(e.min.y-h.y)*l),n>s||r>i?null:((r>n||n!==n)&&(n=r),(s<i||i!==i)&&(i=s),d>=0?(o=(e.min.z-h.z)*d,a=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,a=(e.min.z-h.z)*d),n>a||o>i?null:((o>n||n!==n)&&(n=o),(a<i||i!==i)&&(i=a),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Yt)!==null}intersectTriangle(e,t,n,i,r){Rs.subVectors(t,e),wr.subVectors(n,e),Cs.crossVectors(Rs,wr);let s=this.direction.dot(Cs),o;if(s>0){if(i)return null;o=1}else if(s<0)o=-1,s=-s;else return null;on.subVectors(this.origin,e);const a=o*this.direction.dot(wr.crossVectors(on,wr));if(a<0)return null;const c=o*this.direction.dot(Rs.cross(on));if(c<0)return null;if(a+c>s)return null;const l=-o*on.dot(Cs);return l<0?null:this.at(l/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}}class Ee{constructor(){Object.defineProperty(this,"isMatrix4",{value:!0}),this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,s,o,a,c,l,d,h,f,u,m,v){const y=this.elements;return y[0]=e,y[4]=t,y[8]=n,y[12]=i,y[1]=r,y[5]=s,y[9]=o,y[13]=a,y[2]=c,y[6]=l,y[10]=d,y[14]=h,y[3]=f,y[7]=u,y[11]=m,y[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ee().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/qn.setFromMatrixColumn(e,0).length(),r=1/qn.setFromMatrixColumn(e,1).length(),s=1/qn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const t=this.elements,n=e.x,i=e.y,r=e.z,s=Math.cos(n),o=Math.sin(n),a=Math.cos(i),c=Math.sin(i),l=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=s*l,f=s*d,u=o*l,m=o*d;t[0]=a*l,t[4]=-a*d,t[8]=c,t[1]=f+u*c,t[5]=h-m*c,t[9]=-o*a,t[2]=m-h*c,t[6]=u+f*c,t[10]=s*a}else if(e.order==="YXZ"){const h=a*l,f=a*d,u=c*l,m=c*d;t[0]=h+m*o,t[4]=u*o-f,t[8]=s*c,t[1]=s*d,t[5]=s*l,t[9]=-o,t[2]=f*o-u,t[6]=m+h*o,t[10]=s*a}else if(e.order==="ZXY"){const h=a*l,f=a*d,u=c*l,m=c*d;t[0]=h-m*o,t[4]=-s*d,t[8]=u+f*o,t[1]=f+u*o,t[5]=s*l,t[9]=m-h*o,t[2]=-s*c,t[6]=o,t[10]=s*a}else if(e.order==="ZYX"){const h=s*l,f=s*d,u=o*l,m=o*d;t[0]=a*l,t[4]=u*c-f,t[8]=h*c+m,t[1]=a*d,t[5]=m*c+h,t[9]=f*c-u,t[2]=-c,t[6]=o*a,t[10]=s*a}else if(e.order==="YZX"){const h=s*a,f=s*c,u=o*a,m=o*c;t[0]=a*l,t[4]=m-h*d,t[8]=u*d+f,t[1]=d,t[5]=s*l,t[9]=-o*l,t[2]=-c*l,t[6]=f*d+u,t[10]=h-m*d}else if(e.order==="XZY"){const h=s*a,f=s*c,u=o*a,m=o*c;t[0]=a*l,t[4]=-d,t[8]=c*l,t[1]=h*d+m,t[5]=s*l,t[9]=f*d-u,t[2]=u*d-f,t[6]=o*l,t[10]=m*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kh,e,Hh)}lookAt(e,t,n){const i=this.elements;return dt.subVectors(e,t),dt.lengthSq()===0&&(dt.z=1),dt.normalize(),an.crossVectors(n,dt),an.lengthSq()===0&&(Math.abs(n.z)===1?dt.x+=1e-4:dt.z+=1e-4,dt.normalize(),an.crossVectors(n,dt)),an.normalize(),Mr.crossVectors(dt,an),i[0]=an.x,i[4]=Mr.x,i[8]=dt.x,i[1]=an.y,i[5]=Mr.y,i[9]=dt.y,i[2]=an.z,i[6]=Mr.z,i[10]=dt.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,s=n[0],o=n[4],a=n[8],c=n[12],l=n[1],d=n[5],h=n[9],f=n[13],u=n[2],m=n[6],v=n[10],y=n[14],g=n[3],p=n[7],E=n[11],S=n[15],T=i[0],b=i[4],L=i[8],k=i[12],H=i[1],te=i[5],R=i[9],O=i[13],D=i[2],B=i[6],C=i[10],P=i[14],z=i[3],U=i[7],ee=i[11],re=i[15];return r[0]=s*T+o*H+a*D+c*z,r[4]=s*b+o*te+a*B+c*U,r[8]=s*L+o*R+a*C+c*ee,r[12]=s*k+o*O+a*P+c*re,r[1]=l*T+d*H+h*D+f*z,r[5]=l*b+d*te+h*B+f*U,r[9]=l*L+d*R+h*C+f*ee,r[13]=l*k+d*O+h*P+f*re,r[2]=u*T+m*H+v*D+y*z,r[6]=u*b+m*te+v*B+y*U,r[10]=u*L+m*R+v*C+y*ee,r[14]=u*k+m*O+v*P+y*re,r[3]=g*T+p*H+E*D+S*z,r[7]=g*b+p*te+E*B+S*U,r[11]=g*L+p*R+E*C+S*ee,r[15]=g*k+p*O+E*P+S*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],s=e[1],o=e[5],a=e[9],c=e[13],l=e[2],d=e[6],h=e[10],f=e[14],u=e[3],m=e[7],v=e[11],y=e[15];return u*(+r*a*d-i*c*d-r*o*h+n*c*h+i*o*f-n*a*f)+m*(+t*a*f-t*c*h+r*s*h-i*s*f+i*c*l-r*a*l)+v*(+t*c*d-t*o*f-r*s*d+n*s*f+r*o*l-n*c*l)+y*(-i*o*l-t*a*d+t*o*h+i*s*d-n*s*h+n*a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}getInverse(e,t){t!==void 0&&console.warn("THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate.");const n=this.elements,i=e.elements,r=i[0],s=i[1],o=i[2],a=i[3],c=i[4],l=i[5],d=i[6],h=i[7],f=i[8],u=i[9],m=i[10],v=i[11],y=i[12],g=i[13],p=i[14],E=i[15],S=u*p*h-g*m*h+g*d*v-l*p*v-u*d*E+l*m*E,T=y*m*h-f*p*h-y*d*v+c*p*v+f*d*E-c*m*E,b=f*g*h-y*u*h+y*l*v-c*g*v-f*l*E+c*u*E,L=y*u*d-f*g*d-y*l*m+c*g*m+f*l*p-c*u*p,k=r*S+s*T+o*b+a*L;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/k;return n[0]=S*H,n[1]=(g*m*a-u*p*a-g*o*v+s*p*v+u*o*E-s*m*E)*H,n[2]=(l*p*a-g*d*a+g*o*h-s*p*h-l*o*E+s*d*E)*H,n[3]=(u*d*a-l*m*a-u*o*h+s*m*h+l*o*v-s*d*v)*H,n[4]=T*H,n[5]=(f*p*a-y*m*a+y*o*v-r*p*v-f*o*E+r*m*E)*H,n[6]=(y*d*a-c*p*a-y*o*h+r*p*h+c*o*E-r*d*E)*H,n[7]=(c*m*a-f*d*a+f*o*h-r*m*h-c*o*v+r*d*v)*H,n[8]=b*H,n[9]=(y*u*a-f*g*a-y*s*v+r*g*v+f*s*E-r*u*E)*H,n[10]=(c*g*a-y*l*a+y*s*h-r*g*h-c*s*E+r*l*E)*H,n[11]=(f*l*a-c*u*a-f*s*h+r*u*h+c*s*v-r*l*v)*H,n[12]=L*H,n[13]=(f*g*o-y*u*o+y*s*m-r*g*m-f*s*p+r*u*p)*H,n[14]=(y*l*o-c*g*o-y*s*d+r*g*d+c*s*p-r*l*p)*H,n[15]=(c*u*o-f*l*o+f*s*d-r*u*d-c*s*m+r*l*m)*H,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,s=e.x,o=e.y,a=e.z,c=r*s,l=r*o;return this.set(c*s+n,c*o-i*a,c*a+i*o,0,c*o+i*a,l*o+n,l*a-i*s,0,c*a-i*o,l*a+i*s,r*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n){return this.set(1,t,n,0,e,1,n,0,e,t,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,s=t._y,o=t._z,a=t._w,c=r+r,l=s+s,d=o+o,h=r*c,f=r*l,u=r*d,m=s*l,v=s*d,y=o*d,g=a*c,p=a*l,E=a*d,S=n.x,T=n.y,b=n.z;return i[0]=(1-(m+y))*S,i[1]=(f+E)*S,i[2]=(u-p)*S,i[3]=0,i[4]=(f-E)*T,i[5]=(1-(h+y))*T,i[6]=(v+g)*T,i[7]=0,i[8]=(u+p)*b,i[9]=(v-g)*b,i[10]=(1-(h+m))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=qn.set(i[0],i[1],i[2]).length();const s=qn.set(i[4],i[5],i[6]).length(),o=qn.set(i[8],i[9],i[10]).length(),a=this.determinant();a<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],wt.copy(this);const c=1/r,l=1/s,d=1/o;return wt.elements[0]*=c,wt.elements[1]*=c,wt.elements[2]*=c,wt.elements[4]*=l,wt.elements[5]*=l,wt.elements[6]*=l,wt.elements[8]*=d,wt.elements[9]*=d,wt.elements[10]*=d,t.setFromRotationMatrix(wt),n.x=r,n.y=s,n.z=o,this}makePerspective(e,t,n,i,r,s){s===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const o=this.elements,a=2*r/(t-e),c=2*r/(n-i),l=(t+e)/(t-e),d=(n+i)/(n-i),h=-(s+r)/(s-r),f=-2*s*r/(s-r);return o[0]=a,o[4]=0,o[8]=l,o[12]=0,o[1]=0,o[5]=c,o[9]=d,o[13]=0,o[2]=0,o[6]=0,o[10]=h,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,i,r,s){const o=this.elements,a=1/(t-e),c=1/(n-i),l=1/(s-r),d=(t+e)*a,h=(n+i)*c,f=(s+r)*l;return o[0]=2*a,o[4]=0,o[8]=0,o[12]=-d,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-h,o[2]=0,o[6]=0,o[10]=-2*l,o[14]=-f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const qn=new M,wt=new Ee,kh=new M(0,0,0),Hh=new M(1,1,1),an=new M,Mr=new M,dt=new M;class ki{constructor(e=0,t=0,n=0,i=ki.DefaultOrder){Object.defineProperty(this,"isEuler",{value:!0}),this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._order=i||this._order,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t,n){const i=be.clamp,r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],d=r[9],h=r[2],f=r[6],u=r[10];t=t||this._order;switch(t){case"XYZ":this._y=Math.asin(i(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,u),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-i(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(i(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-i(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(i(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-i(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n!==!1&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _a.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_a,t,n)}setFromVector3(e,t){return this.set(e.x,e.y,e.z,t||this._order)}reorder(e){return ba.setFromEuler(this),this.setFromQuaternion(ba,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}toVector3(e){return e?e.set(this._x,this._y,this._z):new M(this._x,this._y,this._z)}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}}ki.DefaultOrder="XYZ",ki.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];const _a=new Ee,ba=new ut;class wa{constructor(){this.mask=1|0}set(e){this.mask=1<<e|0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=4294967295|0}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}}let Gh=0;const Ma=new M,Xn=new ut,Zt=new Ee,Sr=new M,Hi=new M,Vh=new M,Wh=new ut,Sa=new M(1,0,0),Ea=new M(0,1,0),Ta=new M(0,0,1),jh={type:"added"},Aa={type:"removed"};function le(){Object.defineProperty(this,"id",{value:Gh++}),this.uuid=be.generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=le.DefaultUp.clone();const e=new M,t=new ki,n=new ut,i=new M(1,1,1);function r(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ee},normalMatrix:{value:new st}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=le.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new wa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}le.DefaultUp=new M(0,1,0),le.DefaultMatrixAutoUpdate=!0,le.prototype=Object.assign(Object.create(Wt.prototype),{constructor:le,isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix4:function(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(e){return this.quaternion.premultiply(e),this},setRotationFromAxisAngle:function(e,t){this.quaternion.setFromAxisAngle(e,t)},setRotationFromEuler:function(e){this.quaternion.setFromEuler(e,!0)},setRotationFromMatrix:function(e){this.quaternion.setFromRotationMatrix(e)},setRotationFromQuaternion:function(e){this.quaternion.copy(e)},rotateOnAxis:function(e,t){return Xn.setFromAxisAngle(e,t),this.quaternion.multiply(Xn),this},rotateOnWorldAxis:function(e,t){return Xn.setFromAxisAngle(e,t),this.quaternion.premultiply(Xn),this},rotateX:function(e){return this.rotateOnAxis(Sa,e)},rotateY:function(e){return this.rotateOnAxis(Ea,e)},rotateZ:function(e){return this.rotateOnAxis(Ta,e)},translateOnAxis:function(e,t){return Ma.copy(e).applyQuaternion(this.quaternion),this.position.add(Ma.multiplyScalar(t)),this},translateX:function(e){return this.translateOnAxis(Sa,e)},translateY:function(e){return this.translateOnAxis(Ea,e)},translateZ:function(e){return this.translateOnAxis(Ta,e)},localToWorld:function(e){return e.applyMatrix4(this.matrixWorld)},worldToLocal:function(e){return e.applyMatrix4(Zt.getInverse(this.matrixWorld))},lookAt:function(e,t,n){e.isVector3?Sr.copy(e):Sr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zt.lookAt(Hi,Sr,this.up):Zt.lookAt(Sr,Hi,this.up),this.quaternion.setFromRotationMatrix(Zt),i&&(Zt.extractRotation(i.matrixWorld),Xn.setFromRotationMatrix(Zt),this.quaternion.premultiply(Xn.inverse()))},add:function(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(jh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)},remove:function(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Aa)),this},clear:function(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Aa)}return this.children.length=0,this},attach:function(e){return this.updateWorldMatrix(!0,!1),Zt.getInverse(this.matrixWorld),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zt),e.updateWorldMatrix(!1,!1),this.add(e),this},getObjectById:function(e){return this.getObjectByProperty("id",e)},getObjectByName:function(e){return this.getObjectByProperty("name",e)},getObjectByProperty:function(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n],s=r.getObjectByProperty(e,t);if(s!==void 0)return s}return},getWorldPosition:function(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),e=new M),this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),e=new ut),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,Vh),e},getWorldScale:function(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),e=new M),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,Wh,e),e},getWorldDirection:function(e){e===void 0&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),e=new M),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()},raycast:function(){},traverse:function(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)},traverseVisible:function(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)},traverseAncestors:function(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)},updateWorldMatrix:function(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateWorldMatrix(!1,!0)}},toJSON:function(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON());function r(o,a){return o[a.uuid]===void 0&&(o[a.uuid]=a.toJSON(e)),a.uuid}if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const a=o.shapes;if(Array.isArray(a))for(let c=0,l=a.length;c<l;c++){const d=a[c];r(e.shapes,d)}else r(e.shapes,a)}}if(this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let a=0,c=this.material.length;a<c;a++)o.push(r(e.materials,this.material[a]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(t){const o=s(e.geometries),a=s(e.materials),c=s(e.textures),l=s(e.images),d=s(e.shapes);o.length>0&&(n.geometries=o),a.length>0&&(n.materials=a),c.length>0&&(n.textures=c),l.length>0&&(n.images=l),d.length>0&&(n.shapes=d)}return n.object=i,n;function s(o){const a=[];for(const c in o){const l=o[c];delete l.metadata,a.push(l)}return a}},clone:function(e){return new this.constructor().copy(this,e)},copy:function(e,t){if(t===void 0&&(t=!0),this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}});const Ps=new M,qh=new M,Xh=new st;class Pt{constructor(e,t){Object.defineProperty(this,"isPlane",{value:!0}),this.normal=e!==void 0?e:new M(1,0,0),this.constant=t!==void 0?t:0}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ps.subVectors(n,t).cross(qh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}clone(){return new this.constructor().copy(this)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t===void 0&&(console.warn("THREE.Plane: .projectPoint() target is now required"),t=new M),t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){t===void 0&&(console.warn("THREE.Plane: .intersectLine() target is now required"),t=new M);const n=e.delta(Ps),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):void 0;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?void 0:t.copy(n).multiplyScalar(r).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e===void 0&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),e=new M),e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xh.getNormalMatrix(e),i=this.coplanarPoint(Ps).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}}const Mt=new M,Jt=new M,Is=new M,Qt=new M,Yn=new M,Zn=new M,La=new M,Ds=new M,Ns=new M,Os=new M;class ot{constructor(e,t,n){this.a=e!==void 0?e:new M,this.b=t!==void 0?t:new M,this.c=n!==void 0?n:new M}static getNormal(e,t,n,i){i===void 0&&(console.warn("THREE.Triangle: .getNormal() target is now required"),i=new M),i.subVectors(n,t),Mt.subVectors(e,t),i.cross(Mt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Mt.subVectors(i,t),Jt.subVectors(n,t),Is.subVectors(e,t);const s=Mt.dot(Mt),o=Mt.dot(Jt),a=Mt.dot(Is),c=Jt.dot(Jt),l=Jt.dot(Is),d=s*c-o*o;if(r===void 0&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),r=new M),d===0)return r.set(-2,-1,-1);const h=1/d,f=(c*a-o*l)*h,u=(s*l-o*a)*h;return r.set(1-f-u,u,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Qt),Qt.x>=0&&Qt.y>=0&&Qt.x+Qt.y<=1}static getUV(e,t,n,i,r,s,o,a){return this.getBarycoord(e,t,n,i,Qt),a.set(0,0),a.addScaledVector(r,Qt.x),a.addScaledVector(s,Qt.y),a.addScaledVector(o,Qt.z),a}static isFrontFacing(e,t,n,i){return Mt.subVectors(n,t),Jt.subVectors(e,t),Mt.cross(Jt).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mt.subVectors(this.c,this.b),Jt.subVectors(this.a,this.b),Mt.cross(Jt).length()*.5}getMidpoint(e){return e===void 0&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),e=new M),e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ot.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e===void 0&&(console.warn("THREE.Triangle: .getPlane() target is now required"),e=new Pt),e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ot.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return ot.getUV(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return ot.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ot.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),t=new M);const n=this.a,i=this.b,r=this.c;let s,o;Yn.subVectors(i,n),Zn.subVectors(r,n),Ds.subVectors(e,n);const a=Yn.dot(Ds),c=Zn.dot(Ds);if(a<=0&&c<=0)return t.copy(n);Ns.subVectors(e,i);const l=Yn.dot(Ns),d=Zn.dot(Ns);if(l>=0&&d<=l)return t.copy(i);const h=a*d-l*c;if(h<=0&&a>=0&&l<=0)return s=a/(a-l),t.copy(n).addScaledVector(Yn,s);Os.subVectors(e,r);const f=Yn.dot(Os),u=Zn.dot(Os);if(u>=0&&f<=u)return t.copy(r);const m=f*c-a*u;if(m<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Zn,o);const v=l*u-f*d;if(v<=0&&d-l>=0&&f-u>=0)return La.subVectors(r,i),o=(d-l)/(d-l+(f-u)),t.copy(i).addScaledVector(La,o);const y=1/(v+m+h);return s=m*y,o=h*y,t.copy(n).addScaledVector(Yn,s).addScaledVector(Zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ra={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},St={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Bs(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}function Fs(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Us(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}class he{constructor(e,t,n){return Object.defineProperty(this,"isColor",{value:!0}),t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,this}setRGB(e,t,n){return this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n){if(e=be.euclideanModulo(e,1),t=be.clamp(t,0,1),n=be.clamp(n,0,1),t===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+t):n+t-n*t,r=2*n-i;this.r=Bs(r,i,e+1/3),this.g=Bs(r,i,e),this.b=Bs(r,i,e-1/3)}return this}setStyle(e){function t(i){if(i===void 0)return;parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e)){let i;const r=n[1],s=n[2];switch(r){case"rgb":case"rgba":if(i=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(s))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,t(i[5]),this;if(i=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(s))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,t(i[5]),this;break;case"hsl":case"hsla":if(i=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(s)){const o=parseFloat(i[1])/360,a=parseInt(i[2],10)/100,c=parseInt(i[3],10)/100;return t(i[5]),this.setHSL(o,a,c)}break}}else if(n=/^\#([A-Fa-f0-9]+)$/.exec(e)){const i=n[1],r=i.length;if(r===3)return this.r=parseInt(i.charAt(0)+i.charAt(0),16)/255,this.g=parseInt(i.charAt(1)+i.charAt(1),16)/255,this.b=parseInt(i.charAt(2)+i.charAt(2),16)/255,this;if(r===6)return this.r=parseInt(i.charAt(0)+i.charAt(1),16)/255,this.g=parseInt(i.charAt(2)+i.charAt(3),16)/255,this.b=parseInt(i.charAt(4)+i.charAt(5),16)/255,this}return e&&e.length>0?this.setColorName(e):this}setColorName(e){const t=Ra[e];return t!==void 0?this.setHex(t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copyGammaToLinear(e,t){return t===void 0&&(t=2),this.r=Math.pow(e.r,t),this.g=Math.pow(e.g,t),this.b=Math.pow(e.b,t),this}copyLinearToGamma(e,t){t===void 0&&(t=2);const n=t>0?1/t:1;return this.r=Math.pow(e.r,n),this.g=Math.pow(e.g,n),this.b=Math.pow(e.b,n),this}convertGammaToLinear(e){return this.copyGammaToLinear(this,e),this}convertLinearToGamma(e){return this.copyLinearToGamma(this,e),this}copySRGBToLinear(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}copyLinearToSRGB(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(e){e===void 0&&(console.warn("THREE.Color: .getHSL() target is now required"),e={h:0,s:0,l:0});const t=this.r,n=this.g,i=this.b,r=Math.max(t,n,i),s=Math.min(t,n,i);let o,a;const c=(s+r)/2;if(s===r)o=0,a=0;else{const l=r-s;a=c<=.5?l/(r+s):l/(2-r-s);switch(r){case t:o=(n-i)/l+(n<i?6:0);break;case n:o=(i-t)/l+2;break;case i:o=(t-n)/l+4;break}o/=6}return e.h=o,e.s=a,e.l=c,e}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(e,t,n){return this.getHSL(St),St.h+=e,St.s+=t,St.l+=n,this.setHSL(St.h,St.s,St.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpHSL(e,t){this.getHSL(St),e.getHSL(Er);const n=be.lerp(St.h,Er.h,t),i=be.lerp(St.s,Er.s,t),r=be.lerp(St.l,Er.l,t);return this.setHSL(n,i,r),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),e.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}}he.NAMES=Ra,he.prototype.r=1,he.prototype.g=1,he.prototype.b=1;class zs{constructor(e,t,n,i,r,s){this.a=e,this.b=t,this.c=n,this.normal=i&&i.isVector3?i:new M,this.vertexNormals=Array.isArray(i)?i:[],this.color=r&&r.isColor?r:new he,this.vertexColors=Array.isArray(r)?r:[],this.materialIndex=s!==void 0?s:0}clone(){return new this.constructor().copy(this)}copy(e){this.a=e.a,this.b=e.b,this.c=e.c,this.normal.copy(e.normal),this.color.copy(e.color),this.materialIndex=e.materialIndex;for(let t=0,n=e.vertexNormals.length;t<n;t++)this.vertexNormals[t]=e.vertexNormals[t].clone();for(let t=0,n=e.vertexColors.length;t<n;t++)this.vertexColors[t]=e.vertexColors[t].clone();return this}}let Yh=0;function fe(){Object.defineProperty(this,"id",{value:Yh++}),this.uuid=be.generateUUID(),this.name="",this.type="Material",this.fog=!0,this.blending=Li,this.side=Ti,this.flatShading=!1,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=ea,this.blendDst=ta,this.blendEquation=Un,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ss,this.stencilZFail=Ss,this.stencilZPass=Ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}fe.prototype=Object.assign(Object.create(Wt.prototype),{constructor:fe,isMaterial:!0,onBeforeCompile:function(){},customProgramCacheKey:function(){return this.onBeforeCompile.toString()},setValues:function(e){if(e===void 0)return;for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}if(t==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===Zo;continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}},toJSON:function(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(n.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,n.reflectivity=this.reflectivity,n.refractionRatio=this.refractionRatio,this.combine!==void 0&&(n.combine=this.combine),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity)),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Li&&(n.blending=this.blending),this.flatShading===!0&&(n.flatShading=this.flatShading),this.side!==Ti&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.morphTargets===!0&&(n.morphTargets=!0),this.morphNormals===!0&&(n.morphNormals=!0),this.skinning===!0&&(n.skinning=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(r){const s=[];for(const o in r){const a=r[o];delete a.metadata,s.push(a)}return s}if(t){const r=i(e.textures),s=i(e.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n},clone:function(){return new this.constructor().copy(this)},copy:function(e){this.name=e.name,this.fog=e.fog,this.blending=e.blending,this.side=e.side,this.flatShading=e.flatShading,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),Object.defineProperty(fe.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}});function cn(e){fe.call(this),this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=hr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(e)}cn.prototype=Object.create(fe.prototype),cn.prototype.constructor=cn,cn.prototype.isMeshBasicMaterial=!0,cn.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this};const Ue=new M,Tr=new W;function ye(e,t,n){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n===!0,this.usage=yr,this.updateRange={offset:0,count:-1},this.version=0}Object.defineProperty(ye.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}}),Object.assign(ye.prototype,{isBufferAttribute:!0,onUploadCallback:function(){},setUsage:function(e){return this.usage=e,this},copy:function(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this},copyAt:function(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this},copyArray:function(e){return this.array.set(e),this},copyColorsArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),s=new he),t[n++]=s.r,t[n++]=s.g,t[n++]=s.b}return this},copyVector2sArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),s=new W),t[n++]=s.x,t[n++]=s.y}return this},copyVector3sArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),s=new M),t[n++]=s.x,t[n++]=s.y,t[n++]=s.z}return this},copyVector4sArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),s=new Ie),t[n++]=s.x,t[n++]=s.y,t[n++]=s.z,t[n++]=s.w}return this},applyMatrix3:function(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix3(e),this.setXY(t,Tr.x,Tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ue.fromBufferAttribute(this,t),Ue.applyMatrix3(e),this.setXYZ(t,Ue.x,Ue.y,Ue.z);return this},applyMatrix4:function(e){for(let t=0,n=this.count;t<n;t++)Ue.x=this.getX(t),Ue.y=this.getY(t),Ue.z=this.getZ(t),Ue.applyMatrix4(e),this.setXYZ(t,Ue.x,Ue.y,Ue.z);return this},applyNormalMatrix:function(e){for(let t=0,n=this.count;t<n;t++)Ue.x=this.getX(t),Ue.y=this.getY(t),Ue.z=this.getZ(t),Ue.applyNormalMatrix(e),this.setXYZ(t,Ue.x,Ue.y,Ue.z);return this},transformDirection:function(e){for(let t=0,n=this.count;t<n;t++)Ue.x=this.getX(t),Ue.y=this.getY(t),Ue.z=this.getZ(t),Ue.transformDirection(e),this.setXYZ(t,Ue.x,Ue.y,Ue.z);return this},set:function(e,t){return t===void 0&&(t=0),this.array.set(e,t),this},getX:function(e){return this.array[e*this.itemSize]},setX:function(e,t){return this.array[e*this.itemSize]=t,this},getY:function(e){return this.array[e*this.itemSize+1]},setY:function(e,t){return this.array[e*this.itemSize+1]=t,this},getZ:function(e){return this.array[e*this.itemSize+2]},setZ:function(e,t){return this.array[e*this.itemSize+2]=t,this},getW:function(e){return this.array[e*this.itemSize+3]},setW:function(e,t){return this.array[e*this.itemSize+3]=t,this},setXY:function(e,t,n){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this},setXYZ:function(e,t,n,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this},setXYZW:function(e,t,n,i,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this},onUpload:function(e){return this.onUploadCallback=e,this},clone:function(){return new this.constructor(this.array,this.itemSize).copy(this)},toJSON:function(){return{itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized}}});function ks(e,t,n){ye.call(this,new Int8Array(e),t,n)}ks.prototype=Object.create(ye.prototype),ks.prototype.constructor=ks;function Hs(e,t,n){ye.call(this,new Uint8Array(e),t,n)}Hs.prototype=Object.create(ye.prototype),Hs.prototype.constructor=Hs;function Gs(e,t,n){ye.call(this,new Uint8ClampedArray(e),t,n)}Gs.prototype=Object.create(ye.prototype),Gs.prototype.constructor=Gs;function Vs(e,t,n){ye.call(this,new Int16Array(e),t,n)}Vs.prototype=Object.create(ye.prototype),Vs.prototype.constructor=Vs;function Jn(e,t,n){ye.call(this,new Uint16Array(e),t,n)}Jn.prototype=Object.create(ye.prototype),Jn.prototype.constructor=Jn;function Ws(e,t,n){ye.call(this,new Int32Array(e),t,n)}Ws.prototype=Object.create(ye.prototype),Ws.prototype.constructor=Ws;function Gi(e,t,n){ye.call(this,new Uint32Array(e),t,n)}Gi.prototype=Object.create(ye.prototype),Gi.prototype.constructor=Gi;function Oe(e,t,n){ye.call(this,new Float32Array(e),t,n)}Oe.prototype=Object.create(ye.prototype),Oe.prototype.constructor=Oe;function js(e,t,n){ye.call(this,new Float64Array(e),t,n)}js.prototype=Object.create(ye.prototype),js.prototype.constructor=js;class Zh{constructor(){this.vertices=[],this.normals=[],this.colors=[],this.uvs=[],this.uvs2=[],this.groups=[],this.morphTargets={},this.skinWeights=[],this.skinIndices=[],this.boundingBox=null,this.boundingSphere=null,this.verticesNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.uvsNeedUpdate=!1,this.groupsNeedUpdate=!1}computeGroups(e){const t=[];let n,i,r;const s=e.faces;for(i=0;i<s.length;i++){const o=s[i];o.materialIndex!==r&&(r=o.materialIndex,n!==void 0&&(n.count=i*3-n.start,t.push(n)),n={start:i*3,materialIndex:r})}n!==void 0&&(n.count=i*3-n.start,t.push(n)),this.groups=t}fromGeometry(e){const t=e.faces,n=e.vertices,i=e.faceVertexUvs,r=i[0]&&i[0].length>0,s=i[1]&&i[1].length>0,o=e.morphTargets,a=o.length;let c;if(a>0){c=[];for(let y=0;y<a;y++)c[y]={name:o[y].name,data:[]};this.morphTargets.position=c}const l=e.morphNormals,d=l.length;let h;if(d>0){h=[];for(let y=0;y<d;y++)h[y]={name:l[y].name,data:[]};this.morphTargets.normal=h}const f=e.skinIndices,u=e.skinWeights,m=f.length===n.length,v=u.length===n.length;n.length>0&&t.length===0&&console.error("THREE.DirectGeometry: Faceless geometries are not supported.");for(let y=0;y<t.length;y++){const g=t[y];this.vertices.push(n[g.a],n[g.b],n[g.c]);const p=g.vertexNormals;if(p.length===3)this.normals.push(p[0],p[1],p[2]);else{const S=g.normal;this.normals.push(S,S,S)}const E=g.vertexColors;if(E.length===3)this.colors.push(E[0],E[1],E[2]);else{const S=g.color;this.colors.push(S,S,S)}if(r===!0){const S=i[0][y];S!==void 0?this.uvs.push(S[0],S[1],S[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",y),this.uvs.push(new W,new W,new W))}if(s===!0){const S=i[1][y];S!==void 0?this.uvs2.push(S[0],S[1],S[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",y),this.uvs2.push(new W,new W,new W))}for(let S=0;S<a;S++){const T=o[S].vertices;c[S].data.push(T[g.a],T[g.b],T[g.c])}for(let S=0;S<d;S++){const T=l[S].vertexNormals[y];h[S].data.push(T.a,T.b,T.c)}m&&this.skinIndices.push(f[g.a],f[g.b],f[g.c]),v&&this.skinWeights.push(u[g.a],u[g.b],u[g.c])}return this.computeGroups(e),this.verticesNeedUpdate=e.verticesNeedUpdate,this.normalsNeedUpdate=e.normalsNeedUpdate,this.colorsNeedUpdate=e.colorsNeedUpdate,this.uvsNeedUpdate=e.uvsNeedUpdate,this.groupsNeedUpdate=e.groupsNeedUpdate,e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),this}}function Ca(e){if(e.length===0)return-Infinity;let t=e[0];for(let n=1,i=e.length;n<i;++n)e[n]>t&&(t=e[n]);return t}let Jh=1;const It=new Ee,qs=new le,Qn=new M,ft=new jt,Vi=new jt,Je=new M;function ze(){Object.defineProperty(this,"id",{value:Jh+=2}),this.uuid=be.generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:Infinity},this.userData={}}ze.prototype=Object.assign(Object.create(Wt.prototype),{constructor:ze,isBufferGeometry:!0,getIndex:function(){return this.index},setIndex:function(e){return Array.isArray(e)?this.index=new(Ca(e)>65535?Gi:Jn)(e,1):this.index=e,this},getAttribute:function(e){return this.attributes[e]},setAttribute:function(e,t){return this.attributes[e]=t,this},deleteAttribute:function(e){return delete this.attributes[e],this},addGroup:function(e,t,n){this.groups.push({start:e,count:t,materialIndex:n!==void 0?n:0})},clearGroups:function(){this.groups=[]},setDrawRange:function(e,t){this.drawRange.start=e,this.drawRange.count=t},applyMatrix4:function(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this},rotateX:function(e){return It.makeRotationX(e),this.applyMatrix4(It),this},rotateY:function(e){return It.makeRotationY(e),this.applyMatrix4(It),this},rotateZ:function(e){return It.makeRotationZ(e),this.applyMatrix4(It),this},translate:function(e,t,n){return It.makeTranslation(e,t,n),this.applyMatrix4(It),this},scale:function(e,t,n){return It.makeScale(e,t,n),this.applyMatrix4(It),this},lookAt:function(e){return qs.lookAt(e),qs.updateMatrix(),this.applyMatrix4(qs.matrix),this},center:function(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qn).negate(),this.translate(Qn.x,Qn.y,Qn.z),this},setFromObject:function(e){const t=e.geometry;if(e.isPoints||e.isLine){const n=new Oe(t.vertices.length*3,3),i=new Oe(t.colors.length*3,3);if(this.setAttribute("position",n.copyVector3sArray(t.vertices)),this.setAttribute("color",i.copyColorsArray(t.colors)),t.lineDistances&&t.lineDistances.length===t.vertices.length){const r=new Oe(t.lineDistances.length,1);this.setAttribute("lineDistance",r.copyArray(t.lineDistances))}t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone())}else e.isMesh&&(t&&t.isGeometry&&this.fromGeometry(t));return this},setFromPoints:function(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Oe(t,3)),this},updateFromObject:function(e){let t=e.geometry;if(e.isMesh){let n=t.__directGeometry;if(t.elementsNeedUpdate===!0&&(n=void 0,t.elementsNeedUpdate=!1),n===void 0)return this.fromGeometry(t);n.verticesNeedUpdate=t.verticesNeedUpdate,n.normalsNeedUpdate=t.normalsNeedUpdate,n.colorsNeedUpdate=t.colorsNeedUpdate,n.uvsNeedUpdate=t.uvsNeedUpdate,n.groupsNeedUpdate=t.groupsNeedUpdate,t.verticesNeedUpdate=!1,t.normalsNeedUpdate=!1,t.colorsNeedUpdate=!1,t.uvsNeedUpdate=!1,t.groupsNeedUpdate=!1,t=n}if(t.verticesNeedUpdate===!0){const n=this.attributes.position;n!==void 0&&(n.copyVector3sArray(t.vertices),n.needsUpdate=!0),t.verticesNeedUpdate=!1}if(t.normalsNeedUpdate===!0){const n=this.attributes.normal;n!==void 0&&(n.copyVector3sArray(t.normals),n.needsUpdate=!0),t.normalsNeedUpdate=!1}if(t.colorsNeedUpdate===!0){const n=this.attributes.color;n!==void 0&&(n.copyColorsArray(t.colors),n.needsUpdate=!0),t.colorsNeedUpdate=!1}if(t.uvsNeedUpdate){const n=this.attributes.uv;n!==void 0&&(n.copyVector2sArray(t.uvs),n.needsUpdate=!0),t.uvsNeedUpdate=!1}if(t.lineDistancesNeedUpdate){const n=this.attributes.lineDistance;n!==void 0&&(n.copyArray(t.lineDistances),n.needsUpdate=!0),t.lineDistancesNeedUpdate=!1}return t.groupsNeedUpdate&&(t.computeGroups(e.geometry),this.groups=t.groups,t.groupsNeedUpdate=!1),this},fromGeometry:function(e){return e.__directGeometry=new Zh().fromGeometry(e),this.fromDirectGeometry(e.__directGeometry)},fromDirectGeometry:function(e){const t=new Float32Array(e.vertices.length*3);if(this.setAttribute("position",new ye(t,3).copyVector3sArray(e.vertices)),e.normals.length>0){const n=new Float32Array(e.normals.length*3);this.setAttribute("normal",new ye(n,3).copyVector3sArray(e.normals))}if(e.colors.length>0){const n=new Float32Array(e.colors.length*3);this.setAttribute("color",new ye(n,3).copyColorsArray(e.colors))}if(e.uvs.length>0){const n=new Float32Array(e.uvs.length*2);this.setAttribute("uv",new ye(n,2).copyVector2sArray(e.uvs))}if(e.uvs2.length>0){const n=new Float32Array(e.uvs2.length*2);this.setAttribute("uv2",new ye(n,2).copyVector2sArray(e.uvs2))}this.groups=e.groups;for(const n in e.morphTargets){const i=[],r=e.morphTargets[n];for(let s=0,o=r.length;s<o;s++){const a=r[s],c=new Oe(a.data.length*3,3);c.name=a.name,i.push(c.copyVector3sArray(a.data))}this.morphAttributes[n]=i}if(e.skinIndices.length>0){const n=new Oe(e.skinIndices.length*4,4);this.setAttribute("skinIndex",n.copyVector4sArray(e.skinIndices))}if(e.skinWeights.length>0){const n=new Oe(e.skinWeights.length*4,4);this.setAttribute("skinWeight",n.copyVector4sArray(e.skinWeights))}return e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),this},computeBoundingBox:function(){this.boundingBox===null&&(this.boundingBox=new jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new M(-Infinity,-Infinity,-Infinity),new M(Infinity,Infinity,Infinity));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];ft.setFromBufferAttribute(r),this.morphTargetsRelative?(Je.addVectors(this.boundingBox.min,ft.min),this.boundingBox.expandByPoint(Je),Je.addVectors(this.boundingBox.max,ft.max),this.boundingBox.expandByPoint(Je)):(this.boundingBox.expandByPoint(ft.min),this.boundingBox.expandByPoint(ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)},computeBoundingSphere:function(){this.boundingSphere===null&&(this.boundingSphere=new Xt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new M,Infinity);return}if(e){const n=this.boundingSphere.center;if(ft.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];Vi.setFromBufferAttribute(o),this.morphTargetsRelative?(Je.addVectors(ft.min,Vi.min),ft.expandByPoint(Je),Je.addVectors(ft.max,Vi.max),ft.expandByPoint(Je)):(ft.expandByPoint(Vi.min),ft.expandByPoint(Vi.max))}ft.getCenter(n);let i=0;for(let r=0,s=e.count;r<s;r++)Je.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Je));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],a=this.morphTargetsRelative;for(let c=0,l=o.count;c<l;c++)Je.fromBufferAttribute(o,c),a&&(Qn.fromBufferAttribute(e,c),Je.add(Qn)),i=Math.max(i,n.distanceToSquared(Je))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}},computeFaceNormals:function(){},computeVertexNormals:function(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ye(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new M,r=new M,s=new M,o=new M,a=new M,c=new M,l=new M,d=new M;if(e)for(let h=0,f=e.count;h<f;h+=3){const u=e.getX(h+0),m=e.getX(h+1),v=e.getX(h+2);i.fromBufferAttribute(t,u),r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),l.subVectors(s,r),d.subVectors(i,r),l.cross(d),o.fromBufferAttribute(n,u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,v),o.add(l),a.add(l),c.add(l),n.setXYZ(u,o.x,o.y,o.z),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),l.subVectors(s,r),d.subVectors(i,r),l.cross(d),n.setXYZ(h+0,l.x,l.y,l.z),n.setXYZ(h+1,l.x,l.y,l.z),n.setXYZ(h+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}},merge:function(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(e.attributes[i]===void 0)continue;const r=n[i],s=r.array,o=e.attributes[i],a=o.array,c=o.itemSize*t,l=Math.min(a.length,s.length-c);for(let d=0,h=c;d<l;d++,h++)s[h]=a[d]}return this},normalizeNormals:function(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Je.fromBufferAttribute(e,t),Je.normalize(),e.setXYZ(t,Je.x,Je.y,Je.z)},toNonIndexed:function(){function e(o,a){const c=o.array,l=o.itemSize,d=o.normalized,h=new c.constructor(a.length*l);let f=0,u=0;for(let m=0,v=a.length;m<v;m++){f=a[m]*l;for(let y=0;y<l;y++)h[u++]=c[f++]}return new ye(h,l,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;const t=new ze,n=this.index.array,i=this.attributes;for(const o in i){const a=i[o],c=e(a,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const a=[],c=r[o];for(let l=0,d=c.length;l<d;l++){const h=c[l],f=e(h,n);a.push(f)}t.morphAttributes[o]=a}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,a=s.length;o<a;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t},toJSON:function(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const a=this.parameters;for(const c in a)a[c]!==void 0&&(e[c]=a[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const a in n){const c=n[a],l=c.toJSON(e.data);c.name!==""&&(l.name=c.name),e.data.attributes[a]=l}const i={};let r=!1;for(const a in this.morphAttributes){const c=this.morphAttributes[a],l=[];for(let d=0,h=c.length;d<h;d++){const f=c[d],u=f.toJSON(e.data);f.name!==""&&(u.name=f.name),l.push(u)}l.length>0&&(i[a]=l,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e},clone:function(){return new ze().copy(this)},copy:function(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const l=i[c];this.setAttribute(c,l.clone(t))}const r=e.morphAttributes;for(const c in r){const l=[],d=r[c];for(let h=0,f=d.length;h<f;h++)l.push(d[h].clone(t));this.morphAttributes[c]=l}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,l=s.length;c<l;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});const Pa=new Ee,Rn=new zi,Xs=new Xt,ln=new M,hn=new M,un=new M,Ys=new M,Zs=new M,Js=new M,Ar=new M,Lr=new M,Rr=new M,$n=new W,Kn=new W,ei=new W,Wi=new M,Cr=new M;function et(e,t){le.call(this),this.type="Mesh",this.geometry=e!==void 0?e:new ze,this.material=t!==void 0?t:new cn,this.updateMorphTargets()}et.prototype=Object.assign(Object.create(le.prototype),{constructor:et,isMesh:!0,copy:function(e){return le.prototype.copy.call(this,e),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this},updateMorphTargets:function(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}},raycast:function(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0)return;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(r),e.ray.intersectsSphere(Xs)===!1)return;if(Pa.getInverse(r),Rn.copy(e.ray).applyMatrix4(Pa),n.boundingBox!==null&&Rn.intersectsBox(n.boundingBox)===!1)return;let s;if(n.isBufferGeometry){const o=n.index,a=n.attributes.position,c=n.morphAttributes.position,l=n.morphTargetsRelative,d=n.attributes.uv,h=n.attributes.uv2,f=n.groups,u=n.drawRange;if(o!==null)if(Array.isArray(i))for(let m=0,v=f.length;m<v;m++){const y=f[m],g=i[y.materialIndex],p=Math.max(y.start,u.start),E=Math.min(y.start+y.count,u.start+u.count);for(let S=p,T=E;S<T;S+=3){const b=o.getX(S),L=o.getX(S+1),k=o.getX(S+2);s=Pr(this,g,e,Rn,a,c,l,d,h,b,L,k),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=y.materialIndex,t.push(s))}}else{const m=Math.max(0,u.start),v=Math.min(o.count,u.start+u.count);for(let y=m,g=v;y<g;y+=3){const p=o.getX(y),E=o.getX(y+1),S=o.getX(y+2);s=Pr(this,i,e,Rn,a,c,l,d,h,p,E,S),s&&(s.faceIndex=Math.floor(y/3),t.push(s))}}else if(a!==void 0)if(Array.isArray(i))for(let m=0,v=f.length;m<v;m++){const y=f[m],g=i[y.materialIndex],p=Math.max(y.start,u.start),E=Math.min(y.start+y.count,u.start+u.count);for(let S=p,T=E;S<T;S+=3){const b=S,L=S+1,k=S+2;s=Pr(this,g,e,Rn,a,c,l,d,h,b,L,k),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=y.materialIndex,t.push(s))}}else{const m=Math.max(0,u.start),v=Math.min(a.count,u.start+u.count);for(let y=m,g=v;y<g;y+=3){const p=y,E=y+1,S=y+2;s=Pr(this,i,e,Rn,a,c,l,d,h,p,E,S),s&&(s.faceIndex=Math.floor(y/3),t.push(s))}}}else if(n.isGeometry){const o=Array.isArray(i),a=n.vertices,c=n.faces;let l;const d=n.faceVertexUvs[0];d.length>0&&(l=d);for(let h=0,f=c.length;h<f;h++){const u=c[h],m=o?i[u.materialIndex]:i;if(m===void 0)continue;const v=a[u.a],y=a[u.b],g=a[u.c];if(s=Ia(this,m,e,Rn,v,y,g,Wi),s){if(l&&l[h]){const p=l[h];$n.copy(p[0]),Kn.copy(p[1]),ei.copy(p[2]),s.uv=ot.getUV(Wi,v,y,g,$n,Kn,ei,new W)}s.face=u,s.faceIndex=h,t.push(s)}}}}});function Ia(e,t,n,i,r,s,o,a){let c;if(t.side===Ze?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side!==Ai,a),c===null)return null;Cr.copy(a),Cr.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(Cr);return l<n.near||l>n.far?null:{distance:l,point:Cr.clone(),object:e}}function Pr(e,t,n,i,r,s,o,a,c,l,d,h){ln.fromBufferAttribute(r,l),hn.fromBufferAttribute(r,d),un.fromBufferAttribute(r,h);const f=e.morphTargetInfluences;if(t.morphTargets&&s&&f){Ar.set(0,0,0),Lr.set(0,0,0),Rr.set(0,0,0);for(let m=0,v=s.length;m<v;m++){const y=f[m],g=s[m];if(y===0)continue;Ys.fromBufferAttribute(g,l),Zs.fromBufferAttribute(g,d),Js.fromBufferAttribute(g,h),o?(Ar.addScaledVector(Ys,y),Lr.addScaledVector(Zs,y),Rr.addScaledVector(Js,y)):(Ar.addScaledVector(Ys.sub(ln),y),Lr.addScaledVector(Zs.sub(hn),y),Rr.addScaledVector(Js.sub(un),y))}ln.add(Ar),hn.add(Lr),un.add(Rr)}e.isSkinnedMesh&&(e.boneTransform(l,ln),e.boneTransform(d,hn),e.boneTransform(h,un));const u=Ia(e,t,n,i,ln,hn,un,Wi);if(u){a&&($n.fromBufferAttribute(a,l),Kn.fromBufferAttribute(a,d),ei.fromBufferAttribute(a,h),u.uv=ot.getUV(Wi,ln,hn,un,$n,Kn,ei,new W)),c&&($n.fromBufferAttribute(c,l),Kn.fromBufferAttribute(c,d),ei.fromBufferAttribute(c,h),u.uv2=ot.getUV(Wi,ln,hn,un,$n,Kn,ei,new W));const m=new zs(l,d,h);ot.getNormal(ln,hn,un,m.normal),u.face=m}return u}class Qs extends ze{constructor(e=1,t=1,n=1,i=1,r=1,s=1){super();this.type="BoxBufferGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:s};const o=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const a=[],c=[],l=[],d=[];let h=0,f=0;u("z","y","x",-1,-1,n,t,e,s,r,0),u("z","y","x",1,-1,n,t,-e,s,r,1),u("x","z","y",1,1,e,n,t,i,s,2),u("x","z","y",1,-1,e,n,-t,i,s,3),u("x","y","z",1,-1,e,t,n,i,r,4),u("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(a),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(d,2));function u(m,v,y,g,p,E,S,T,b,L,k){const H=E/b,te=S/L,R=E/2,O=S/2,D=T/2,B=b+1,C=L+1;let P=0,z=0;const U=new M;for(let ee=0;ee<C;ee++){const re=ee*te-O;for(let oe=0;oe<B;oe++){const Se=oe*H-R;U[m]=Se*g,U[v]=re*p,U[y]=D,c.push(U.x,U.y,U.z),U[m]=0,U[v]=0,U[y]=T>0?1:-1,l.push(U.x,U.y,U.z),d.push(oe/b),d.push(1-ee/L),P+=1}}for(let ee=0;ee<L;ee++)for(let re=0;re<b;re++){const oe=h+re+B*ee,Se=h+re+B*(ee+1),Ae=h+(re+1)+B*(ee+1),He=h+(re+1)+B*ee;a.push(oe,Se,He),a.push(Se,Ae,He),z+=6}o.addGroup(f,z,k),f+=z,h+=P}}}function ti(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture)?t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function nt(e){const t={};for(let n=0;n<e.length;n++){const i=ti(e[n]);for(const r in i)t[r]=i[r]}return t}const Da={clone:ti,merge:nt};var Qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$h=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;function at(e){fe.call(this),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=Qh,this.fragmentShader=$h,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}at.prototype=Object.create(fe.prototype),at.prototype.constructor=at,at.prototype.isShaderMaterial=!0,at.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ti(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this},at.prototype.toJSON=function(e){const t=fe.prototype.toJSON.call(this,e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i],s=r.value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t};function dn(){le.call(this),this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee}dn.prototype=Object.assign(Object.create(le.prototype),{constructor:dn,isCamera:!0,copy:function(e,t){return le.prototype.copy.call(this,e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this},getWorldDirection:function(e){e===void 0&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),e=new M),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()},updateMatrixWorld:function(e){le.prototype.updateMatrixWorld.call(this,e),this.matrixWorldInverse.getInverse(this.matrixWorld)},updateWorldMatrix:function(e,t){le.prototype.updateWorldMatrix.call(this,e,t),this.matrixWorldInverse.getInverse(this.matrixWorld)},clone:function(){return new this.constructor().copy(this)}});function Qe(e,t,n,i){dn.call(this),this.type="PerspectiveCamera",this.fov=e!==void 0?e:50,this.zoom=1,this.near=n!==void 0?n:.1,this.far=i!==void 0?i:2e3,this.focus=10,this.aspect=t!==void 0?t:1,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}Qe.prototype=Object.assign(Object.create(dn.prototype),{constructor:Qe,isPerspectiveCamera:!0,copy:function(e,t){return dn.prototype.copy.call(this,e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this},setFocalLength:function(e){const t=.5*this.getFilmHeight()/e;this.fov=be.RAD2DEG*2*Math.atan(t),this.updateProjectionMatrix()},getFocalLength:function(){const e=Math.tan(be.DEG2RAD*.5*this.fov);return .5*this.getFilmHeight()/e},getEffectiveFOV:function(){return be.RAD2DEG*2*Math.atan(Math.tan(be.DEG2RAD*.5*this.fov)/this.zoom)},getFilmWidth:function(){return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function(){return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(e,t,n,i,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()},clearViewOffset:function(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function(){const e=this.near;let t=e*Math.tan(be.DEG2RAD*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const a=s.fullWidth,c=s.fullHeight;r+=s.offsetX*i/a,t-=s.offsetY*n/c,i*=s.width/a,n*=s.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far),this.projectionMatrixInverse.getInverse(this.projectionMatrix)},toJSON:function(e){const t=le.prototype.toJSON.call(this,e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}});const ni=90,ii=1;function ri(e,t,n){if(le.call(this),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new Qe(ni,ii,e,t);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new M(1,0,0)),this.add(i);const r=new Qe(ni,ii,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new M(-1,0,0)),this.add(r);const s=new Qe(ni,ii,e,t);s.layers=this.layers,s.up.set(0,0,1),s.lookAt(new M(0,1,0)),this.add(s);const o=new Qe(ni,ii,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(new M(0,-1,0)),this.add(o);const a=new Qe(ni,ii,e,t);a.layers=this.layers,a.up.set(0,-1,0),a.lookAt(new M(0,0,1)),this.add(a);const c=new Qe(ni,ii,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new M(0,0,-1)),this.add(c),this.update=function(l,d){this.parent===null&&this.updateMatrixWorld();const h=l.xr.enabled,f=l.getRenderTarget();l.xr.enabled=!1;const u=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,l.setRenderTarget(n,0),l.render(d,i),l.setRenderTarget(n,1),l.render(d,r),l.setRenderTarget(n,2),l.render(d,s),l.setRenderTarget(n,3),l.render(d,o),l.setRenderTarget(n,4),l.render(d,a),n.texture.generateMipmaps=u,l.setRenderTarget(n,5),l.render(d,c),l.setRenderTarget(f),l.xr.enabled=h}}ri.prototype=Object.create(le.prototype),ri.prototype.constructor=ri;function fn(e,t,n,i,r,s,o,a,c,l){e=e!==void 0?e:[],t=t!==void 0?t:fs,o=o!==void 0?o:nn,Ne.call(this,e,t,n,i,r,s,o,a,c,l),this.flipY=!1,this._needsFlipEnvMap=!0}fn.prototype=Object.create(Ne.prototype),fn.prototype.constructor=fn,fn.prototype.isCubeTexture=!0,Object.defineProperty(fn.prototype,"images",{get:function(){return this.image},set:function(e){this.image=e}});function Cn(e,t,n){Number.isInteger(t)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),t=n),xt.call(this,e,e,t),t=t||{},this.texture=new fn(void 0,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture._needsFlipEnvMap=!1}Cn.prototype=Object.create(xt.prototype),Cn.prototype.constructor=Cn,Cn.prototype.isWebGLCubeRenderTarget=!0,Cn.prototype.fromEquirectangularTexture=function(e,t){this.texture.type=t.type,this.texture.format=vt,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

			varying vec3 vWorldDirection;

			vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

				return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

			}

			void main() {

				vWorldDirection = transformDirection( position, modelMatrix );

				#include <begin_vertex>
				#include <project_vertex>

			}
		`,fragmentShader:`

			uniform sampler2D tEquirect;

			varying vec3 vWorldDirection;

			#include <common>

			void main() {

				vec3 direction = normalize( vWorldDirection );

				vec2 sampleUV = equirectUv( direction );

				gl_FragColor = texture2D( tEquirect, sampleUV );

			}
		`},i=new Qs(5,5,5),r=new at({name:"CubemapFromEquirect",uniforms:ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:Fn});r.uniforms.tEquirect.value=t;const s=new et(i,r),o=t.minFilter;t.minFilter===Ci&&(t.minFilter=$e);const a=new ri(1,10,this);return a.update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this},Cn.prototype.clear=function(e,t,n,i){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,i);e.setRenderTarget(r)};function si(e,t,n,i,r,s,o,a,c,l,d,h){Ne.call(this,null,s,o,a,c,l,i,r,d,h),this.image={data:e||null,width:t||1,height:n||1},this.magFilter=c!==void 0?c:tt,this.minFilter=l!==void 0?l:tt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}si.prototype=Object.create(Ne.prototype),si.prototype.constructor=si,si.prototype.isDataTexture=!0;const oi=new Xt,Ir=new M;class Dr{constructor(e,t,n,i,r,s){this.planes=[e!==void 0?e:new Pt,t!==void 0?t:new Pt,n!==void 0?n:new Pt,i!==void 0?i:new Pt,r!==void 0?r:new Pt,s!==void 0?s:new Pt]}set(e,t,n,i,r,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(s),this}clone(){return new this.constructor().copy(this)}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],r=n[1],s=n[2],o=n[3],a=n[4],c=n[5],l=n[6],d=n[7],h=n[8],f=n[9],u=n[10],m=n[11],v=n[12],y=n[13],g=n[14],p=n[15];return t[0].setComponents(o-i,d-a,m-h,p-v).normalize(),t[1].setComponents(o+i,d+a,m+h,p+v).normalize(),t[2].setComponents(o+r,d+c,m+f,p+y).normalize(),t[3].setComponents(o-r,d-c,m-f,p-y).normalize(),t[4].setComponents(o-s,d-l,m-u,p-g).normalize(),t[5].setComponents(o+s,d+l,m+u,p+g).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(oi)}intersectsSprite(e){return oi.center.set(0,0,0),oi.radius=.7071067811865476,oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++){const s=t[r].distanceToPoint(n);if(s<i)return!1}return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ir.x=i.normal.x>0?e.max.x:e.min.x,Ir.y=i.normal.y>0?e.max.y:e.min.y,Ir.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}}function Na(){let e=null,t=!1,n=null,i=null;function r(s,o){n(s,o),i=e.requestAnimationFrame(r)}return{start:function(){if(t===!0)return;if(n===null)return;i=e.requestAnimationFrame(r),t=!0},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function Kh(e,t){const n=t.isWebGL2,i=new WeakMap;function r(l,d){const h=l.array,f=l.usage,u=e.createBuffer();e.bindBuffer(d,u),e.bufferData(d,h,f),l.onUploadCallback();let m=5126;return h instanceof Float32Array?m=5126:h instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):h instanceof Uint16Array?m=5123:h instanceof Int16Array?m=5122:h instanceof Uint32Array?m=5125:h instanceof Int32Array?m=5124:h instanceof Int8Array?m=5120:h instanceof Uint8Array&&(m=5121),{buffer:u,type:m,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version}}function s(l,d,h){const f=d.array,u=d.updateRange;e.bindBuffer(h,l),u.count===-1?e.bufferSubData(h,0,f):(n?e.bufferSubData(h,u.offset*f.BYTES_PER_ELEMENT,f,u.offset,u.count):e.bufferSubData(h,u.offset*f.BYTES_PER_ELEMENT,f.subarray(u.offset,u.offset+u.count)),u.count=-1)}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const d=i.get(l);d&&(e.deleteBuffer(d.buffer),i.delete(l))}function c(l,d){if(l.isGLBufferAttribute){var h=i.get(l);(!h||h.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);f===void 0?i.set(l,r(l,d)):f.version<l.version&&(s(f.buffer,l,d),f.version=l.version)}return{get:o,remove:a,update:c}}class Oa extends ze{constructor(e,t,n,i){super();this.type="PlaneBufferGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i},e=e||1,t=t||1;const r=e/2,s=t/2,o=Math.floor(n)||1,a=Math.floor(i)||1,c=o+1,l=a+1,d=e/o,h=t/a,f=[],u=[],m=[],v=[];for(let y=0;y<l;y++){const g=y*h-s;for(let p=0;p<c;p++){const E=p*d-r;u.push(E,-g,0),m.push(0,0,1),v.push(p/o),v.push(1-y/a)}}for(let y=0;y<a;y++)for(let g=0;g<o;g++){const p=g+c*y,E=g+c*(y+1),S=g+1+c*(y+1),T=g+1+c*y;f.push(p,E,T),f.push(E,S,T)}this.setIndex(f),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(m,3)),this.setAttribute("uv",new Oe(v,2))}}var eu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nu=`#ifdef ALPHATEST
	if ( diffuseColor.a < ALPHATEST ) discard;
#endif`,iu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
	#endif
#endif`,ru=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,su="vec3 transformed = vec3( position );",ou=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,au=`vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	return vec2( -1.04, 1.04 ) * a004 + r.zw;
}
float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
#if defined ( PHYSICALLY_CORRECT_LIGHTS )
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
#else
	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
#endif
}
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}
vec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {
	float fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );
	vec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;
	return Fr * fresnel + F0;
}
float G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	return 1.0 / ( gl * gv );
}
float G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( incidentLight.direction + viewDir );
	float dotNL = saturate( dot( normal, incidentLight.direction ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( G * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	return specularColor * brdf.x + brdf.y;
}
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	vec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	vec3 FssEss = F * brdf.x + brdf.y;
	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {
	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );
}
float BlinnExponentToGGXRoughness( const in float blinnExponent ) {
	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );
}
#if defined( USE_SHEEN )
float D_Charlie(float roughness, float NoH) {
	float invAlpha = 1.0 / roughness;
	float cos2h = NoH * NoH;
	float sin2h = max(1.0 - cos2h, 0.0078125);	return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}
float V_Neubelt(float NoV, float NoL) {
	return saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));
}
vec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {
	vec3 N = geometry.normal;
	vec3 V = geometry.viewDir;
	vec3 H = normalize( V + L );
	float dotNH = saturate( dot( N, H ) );
	return specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );
}
#endif`,cu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 );
		fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fu=`#ifdef USE_COLOR
	diffuseColor.rgb *= vColor;
#endif`,pu=`#ifdef USE_COLOR
	varying vec3 vColor;
#endif`,mu=`#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,gu=`#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor.xyz *= color.xyz;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,yu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	float distance = dot( planeNormal, point - pointOnPlane );
	return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,vu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
		vec2 f = fract( uv );
		uv += 0.5 - f;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x += texelSize;
		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.y += texelSize;
		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x -= texelSize;
		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		vec3 tm = mix( tl, tr, f.x );
		vec3 bm = mix( bl, br, f.x );
		return mix( tm, bm, f.y );
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xu=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,wu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Su="gl_FragColor = linearToOutputTexel( gl_FragColor );",Eu=`
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}`,Tu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifndef ENVMAP_TYPE_CUBE_UV
		envColor = envMapTexelToLinear( envColor );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Au=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform int maxMipLevel;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ru=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pu=`#ifdef USE_FOG
	fogDepth = - mvPosition.z;
#endif`,Iu=`#ifdef USE_FOG
	varying float fogDepth;
#endif`,Du=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float fogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ou=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return texture2D( gradientMap, coord ).rgb;
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,Bu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel= texture2D( lightMap, vUv2 );
	reflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
#endif`,Fu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uu=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );
		#endif
	}
	#pragma unroll_loop_end
#endif`,zu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {
	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	return irradiance;
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );
		if ( angleCos > spotLight.coneCos ) {
			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;
		} else {
			directLight.color = vec3( 0.0 );
			directLight.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {
		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			irradiance *= PI;
		#endif
		return irradiance;
	}
#endif`,ku=`#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {
		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );
			#else
				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
		#else
			vec4 envMapColor = vec4( 0.0 );
		#endif
		return PI * envMapColor.rgb * envMapIntensity;
	}
	float getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {
		float maxMIPLevelScalar = float( maxMIPLevel );
		float sigma = PI * roughness * roughness / ( 1.0 + roughness );
		float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );
		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );
	}
	vec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( -viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
		#else
			vec3 reflectVec = refract( -viewDir, normal, refractionRatio );
		#endif
		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
		float specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );
			#else
				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
		#endif
		return envMapColor.rgb * envMapIntensity;
	}
#endif`,Hu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gu=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Vu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wu=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,ju=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;
material.specularRoughness = min( material.specularRoughness, 1.0 );
#ifdef REFLECTIVITY
	material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
#endif
#ifdef CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheen;
#endif`,qu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;
#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif
};
#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {
	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	#ifdef CLEARCOAT
		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = ccDotNL * directLight.color;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			ccIrradiance *= PI;
		#endif
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
	#else
		float clearcoatDHR = 0.0;
	#endif
	#ifdef USE_SHEEN
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);
	#else
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);
	#endif
	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef CLEARCOAT
		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
	#else
		float clearcoatDHR = 0.0;
	#endif
	float clearcoatInv = 1.0 - clearcoatDHR;
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Xu=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointDirectLightIrradiance( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotDirectLightIrradiance( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );
	#ifdef CLEARCOAT
		clearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );
	#endif
#endif`,Zu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Ju=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$u=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ku=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ed=`#ifdef USE_MAP
	vec4 texelColor = texture2D( map, vUv );
	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;
#endif`,td=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,od=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
	objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
	objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
	objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
#endif`,ad=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifndef USE_MORPHNORMALS
		uniform float morphTargetInfluences[ 8 ];
	#else
		uniform float morphTargetInfluences[ 4 ];
	#endif
#endif`,cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	transformed += morphTarget0 * morphTargetInfluences[ 0 ];
	transformed += morphTarget1 * morphTargetInfluences[ 1 ];
	transformed += morphTarget2 * morphTargetInfluences[ 2 ];
	transformed += morphTarget3 * morphTargetInfluences[ 3 ];
	#ifndef USE_MORPHNORMALS
		transformed += morphTarget4 * morphTargetInfluences[ 4 ];
		transformed += morphTarget5 * morphTargetInfluences[ 5 ];
		transformed += morphTarget6 * morphTargetInfluences[ 6 ];
		transformed += morphTarget7 * morphTargetInfluences[ 7 ];
	#endif
#endif`,ld=`#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
			bitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,hd=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( -vViewPosition, normal, mapN );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );
#endif`,ud=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		float scale = sign( st1.t * st0.s - st0.t * st1.s );
		vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );
		vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );
		vec3 N = normalize( surf_norm );
		mat3 tsn = mat3( S, T, N );
		mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
		return normalize( tsn * mapN );
	}
#endif`,dd=`#ifdef CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,fd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN );
	#endif
#endif`,pd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,md=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,gd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_d=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wd=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Md=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Sd=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Ed=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Td=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ad=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,Ld=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Id=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dd=`#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nd=`#ifdef USE_TRANSMISSIONMAP
	totalTransmission *= texture2D( transmissionMap, vUv ).r;
#endif`,Od=`#ifdef USE_TRANSMISSIONMAP
	uniform sampler2D transmissionMap;
#endif`,Bd=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Fd=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Ud=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,zd=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,kd=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Hd=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Gd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vd=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Wd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jd=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,qd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Yd=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	vec4 texColor = texture2D( tEquirect, sampleUV );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,$d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ef=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nf=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>
	#ifdef USE_ENVMAP
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rf=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sf=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,of=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );
	#else
		vec4 matcapColor = vec4( 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,af=`#define MATCAP
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#ifndef FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lf=`#define TOON
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uf=`#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,df=`#define STANDARD
#ifdef PHYSICAL
	#define REFLECTIVITY
	#define CLEARCOAT
	#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
	uniform float transmission;
#endif
#ifdef REFLECTIVITY
	uniform float reflectivity;
#endif
#ifdef CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#ifdef TRANSMISSION
		float totalTransmission = transmission;
	#endif
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <transmissionmap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#ifdef TRANSMISSION
		diffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );
	#endif
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ff=`#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <packing>
#include <uv_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
}`,mf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,xf=`#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_f=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,bf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`;const Te={alphamap_fragment:eu,alphamap_pars_fragment:tu,alphatest_fragment:nu,aomap_fragment:iu,aomap_pars_fragment:ru,begin_vertex:su,beginnormal_vertex:ou,bsdfs:au,bumpmap_pars_fragment:cu,clipping_planes_fragment:lu,clipping_planes_pars_fragment:hu,clipping_planes_pars_vertex:uu,clipping_planes_vertex:du,color_fragment:fu,color_pars_fragment:pu,color_pars_vertex:mu,color_vertex:gu,common:yu,cube_uv_reflection_fragment:vu,defaultnormal_vertex:xu,displacementmap_pars_vertex:_u,displacementmap_vertex:bu,emissivemap_fragment:wu,emissivemap_pars_fragment:Mu,encodings_fragment:Su,encodings_pars_fragment:Eu,envmap_fragment:Tu,envmap_common_pars_fragment:Au,envmap_pars_fragment:Lu,envmap_pars_vertex:Ru,envmap_physical_pars_fragment:ku,envmap_vertex:Cu,fog_vertex:Pu,fog_pars_vertex:Iu,fog_fragment:Du,fog_pars_fragment:Nu,gradientmap_pars_fragment:Ou,lightmap_fragment:Bu,lightmap_pars_fragment:Fu,lights_lambert_vertex:Uu,lights_pars_begin:zu,lights_toon_fragment:Hu,lights_toon_pars_fragment:Gu,lights_phong_fragment:Vu,lights_phong_pars_fragment:Wu,lights_physical_fragment:ju,lights_physical_pars_fragment:qu,lights_fragment_begin:Xu,lights_fragment_maps:Yu,lights_fragment_end:Zu,logdepthbuf_fragment:Ju,logdepthbuf_pars_fragment:Qu,logdepthbuf_pars_vertex:$u,logdepthbuf_vertex:Ku,map_fragment:ed,map_pars_fragment:td,map_particle_fragment:nd,map_particle_pars_fragment:id,metalnessmap_fragment:rd,metalnessmap_pars_fragment:sd,morphnormal_vertex:od,morphtarget_pars_vertex:ad,morphtarget_vertex:cd,normal_fragment_begin:ld,normal_fragment_maps:hd,normalmap_pars_fragment:ud,clearcoat_normal_fragment_begin:dd,clearcoat_normal_fragment_maps:fd,clearcoat_pars_fragment:pd,packing:md,premultiplied_alpha_fragment:gd,project_vertex:yd,dithering_fragment:vd,dithering_pars_fragment:xd,roughnessmap_fragment:_d,roughnessmap_pars_fragment:bd,shadowmap_pars_fragment:wd,shadowmap_pars_vertex:Md,shadowmap_vertex:Sd,shadowmask_pars_fragment:Ed,skinbase_vertex:Td,skinning_pars_vertex:Ad,skinning_vertex:Ld,skinnormal_vertex:Rd,specularmap_fragment:Cd,specularmap_pars_fragment:Pd,tonemapping_fragment:Id,tonemapping_pars_fragment:Dd,transmissionmap_fragment:Nd,transmissionmap_pars_fragment:Od,uv_pars_fragment:Bd,uv_pars_vertex:Fd,uv_vertex:Ud,uv2_pars_fragment:zd,uv2_pars_vertex:kd,uv2_vertex:Hd,worldpos_vertex:Gd,background_frag:Vd,background_vert:Wd,cube_frag:jd,cube_vert:qd,depth_frag:Xd,depth_vert:Yd,distanceRGBA_frag:Zd,distanceRGBA_vert:Jd,equirect_frag:Qd,equirect_vert:$d,linedashed_frag:Kd,linedashed_vert:ef,meshbasic_frag:tf,meshbasic_vert:nf,meshlambert_frag:rf,meshlambert_vert:sf,meshmatcap_frag:of,meshmatcap_vert:af,meshtoon_frag:cf,meshtoon_vert:lf,meshphong_frag:hf,meshphong_vert:uf,meshphysical_frag:df,meshphysical_vert:ff,normal_frag:pf,normal_vert:mf,points_frag:gf,points_vert:yf,shadow_frag:vf,shadow_vert:xf,sprite_frag:_f,sprite_vert:bf},$={common:{diffuse:{value:new he(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new st},uv2Transform:{value:new st},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new st}},sprite:{diffuse:{value:new he(15658734)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new st}}},Dt={basic:{uniforms:nt([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Te.meshbasic_vert,fragmentShader:Te.meshbasic_frag},lambert:{uniforms:nt([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.fog,$.lights,{emissive:{value:new he(0)}}]),vertexShader:Te.meshlambert_vert,fragmentShader:Te.meshlambert_frag},phong:{uniforms:nt([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:Te.meshphong_vert,fragmentShader:Te.meshphong_frag},standard:{uniforms:nt([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag},toon:{uniforms:nt([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new he(0)}}]),vertexShader:Te.meshtoon_vert,fragmentShader:Te.meshtoon_frag},matcap:{uniforms:nt([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Te.meshmatcap_vert,fragmentShader:Te.meshmatcap_frag},points:{uniforms:nt([$.points,$.fog]),vertexShader:Te.points_vert,fragmentShader:Te.points_frag},dashed:{uniforms:nt([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Te.linedashed_vert,fragmentShader:Te.linedashed_frag},depth:{uniforms:nt([$.common,$.displacementmap]),vertexShader:Te.depth_vert,fragmentShader:Te.depth_frag},normal:{uniforms:nt([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Te.normal_vert,fragmentShader:Te.normal_frag},sprite:{uniforms:nt([$.sprite,$.fog]),vertexShader:Te.sprite_vert,fragmentShader:Te.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null}},vertexShader:Te.background_vert,fragmentShader:Te.background_frag},cube:{uniforms:nt([$.envmap,{opacity:{value:1}}]),vertexShader:Te.cube_vert,fragmentShader:Te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Te.equirect_vert,fragmentShader:Te.equirect_frag},distanceRGBA:{uniforms:nt([$.common,$.displacementmap,{referencePosition:{value:new M},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Te.distanceRGBA_vert,fragmentShader:Te.distanceRGBA_frag},shadow:{uniforms:nt([$.lights,$.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:Te.shadow_vert,fragmentShader:Te.shadow_frag}};Dt.physical={uniforms:nt([Dt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new W(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new he(0)},transmission:{value:0},transmissionMap:{value:null}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag};function wf(e,t,n,i,r){const s=new he(0);let o=0,a,c,l=null,d=0,h=null;function f(m,v,y,g){let p=v.isScene===!0?v.background:null;p&&p.isTexture&&(p=t.get(p));const E=e.xr,S=E.getSession&&E.getSession();S&&S.environmentBlendMode==="additive"&&(p=null),p===null?u(s,o):p&&p.isColor&&(u(p,1),g=!0),(e.autoClear||g)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),p&&(p.isCubeTexture||p.isWebGLCubeRenderTarget||p.mapping===gs)?(c===void 0&&(c=new et(new Qs(1,1,1),new at({name:"BackgroundCubeMaterial",uniforms:ti(Dt.cube.uniforms),vertexShader:Dt.cube.vertexShader,fragmentShader:Dt.cube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),p.isWebGLCubeRenderTarget&&(p=p.texture),c.material.uniforms.envMap.value=p,c.material.uniforms.flipEnvMap.value=p.isCubeTexture&&p._needsFlipEnvMap?-1:1,(l!==p||d!==p.version||h!==e.toneMapping)&&(c.material.needsUpdate=!0,l=p,d=p.version,h=e.toneMapping),m.unshift(c,c.geometry,c.material,0,0,null)):p&&p.isTexture&&(a===void 0&&(a=new et(new Oa(2,2),new at({name:"BackgroundMaterial",uniforms:ti(Dt.background.uniforms),vertexShader:Dt.background.vertexShader,fragmentShader:Dt.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(a)),a.material.uniforms.t2D.value=p,p.matrixAutoUpdate===!0&&p.updateMatrix(),a.material.uniforms.uvTransform.value.copy(p.matrix),(l!==p||d!==p.version||h!==e.toneMapping)&&(a.material.needsUpdate=!0,l=p,d=p.version,h=e.toneMapping),m.unshift(a,a.geometry,a.material,0,0,null))}function u(m,v){n.buffers.color.setClear(m.r,m.g,m.b,v,r)}return{getClearColor:function(){return s},setClearColor:function(m,v){s.set(m),o=v!==void 0?v:1,u(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,u(s,o)},render:f}}function Mf(e,t,n,i){const r=e.getParameter(34921),s=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},c=v(null);let l=c;function d(D,B,C,P,z){let U=!1;if(o){const ee=m(P,C,B);l!==ee&&(l=ee,f(l.object)),U=y(P,z),U&&g(P,z)}else{const ee=B.wireframe===!0;(l.geometry!==P.id||l.program!==C.id||l.wireframe!==ee)&&(l.geometry=P.id,l.program=C.id,l.wireframe=ee,U=!0)}D.isInstancedMesh===!0&&(U=!0),z!==null&&n.update(z,34963),U&&(L(D,B,C,P),z!==null&&e.bindBuffer(34963,n.get(z).buffer))}function h(){return i.isWebGL2?e.createVertexArray():s.createVertexArrayOES()}function f(D){return i.isWebGL2?e.bindVertexArray(D):s.bindVertexArrayOES(D)}function u(D){return i.isWebGL2?e.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function m(D,B,C){const P=C.wireframe===!0;let z=a[D.id];z===void 0&&(z={},a[D.id]=z);let U=z[B.id];U===void 0&&(U={},z[B.id]=U);let ee=U[P];return ee===void 0&&(ee=v(h()),U[P]=ee),ee}function v(D){const B=[],C=[],P=[];for(let z=0;z<r;z++)B[z]=0,C[z]=0,P[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:C,attributeDivisors:P,object:D,attributes:{},index:null}}function y(D,B){const C=l.attributes,P=D.attributes;if(Object.keys(C).length!==Object.keys(P).length)return!0;for(const z in P){const U=C[z],ee=P[z];if(U===void 0)return!0;if(U.attribute!==ee)return!0;if(U.data!==ee.data)return!0}return l.index!==B}function g(D,B){const C={},P=D.attributes;for(const z in P){const U=P[z],ee={};ee.attribute=U,U.data&&(ee.data=U.data),C[z]=ee}l.attributes=C,l.index=B}function p(){const D=l.newAttributes;for(let B=0,C=D.length;B<C;B++)D[B]=0}function E(D){S(D,0)}function S(D,B){const C=l.newAttributes,P=l.enabledAttributes,z=l.attributeDivisors;if(C[D]=1,P[D]===0&&(e.enableVertexAttribArray(D),P[D]=1),z[D]!==B){const U=i.isWebGL2?e:t.get("ANGLE_instanced_arrays");U[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,B),z[D]=B}}function T(){const D=l.newAttributes,B=l.enabledAttributes;for(let C=0,P=B.length;C<P;C++)B[C]!==D[C]&&(e.disableVertexAttribArray(C),B[C]=0)}function b(D,B,C,P,z,U){i.isWebGL2===!0&&(C===5124||C===5125)?e.vertexAttribIPointer(D,B,C,z,U):e.vertexAttribPointer(D,B,C,P,z,U)}function L(D,B,C,P){if(i.isWebGL2===!1&&(D.isInstancedMesh||P.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;p();const z=P.attributes,U=C.getAttributes(),ee=B.defaultAttributeValues;for(const re in U){const oe=U[re];if(oe>=0){const Se=z[re];if(Se!==void 0){const Ae=Se.normalized,He=Se.itemSize,G=n.get(Se);if(G===void 0)continue;const Ve=G.buffer,ge=G.type,Ce=G.bytesPerElement;if(Se.isInterleavedBufferAttribute){const pe=Se.data,Pe=pe.stride,V=Se.offset;pe&&pe.isInstancedInterleavedBuffer?(S(oe,pe.meshPerAttribute),P._maxInstanceCount===void 0&&(P._maxInstanceCount=pe.meshPerAttribute*pe.count)):E(oe),e.bindBuffer(34962,Ve),b(oe,He,ge,Ae,Pe*Ce,V*Ce)}else Se.isInstancedBufferAttribute?(S(oe,Se.meshPerAttribute),P._maxInstanceCount===void 0&&(P._maxInstanceCount=Se.meshPerAttribute*Se.count)):E(oe),e.bindBuffer(34962,Ve),b(oe,He,ge,Ae,0,0)}else if(re==="instanceMatrix"){const Ae=n.get(D.instanceMatrix);if(Ae===void 0)continue;const He=Ae.buffer,G=Ae.type;S(oe+0,1),S(oe+1,1),S(oe+2,1),S(oe+3,1),e.bindBuffer(34962,He),e.vertexAttribPointer(oe+0,4,G,!1,64,0),e.vertexAttribPointer(oe+1,4,G,!1,64,16),e.vertexAttribPointer(oe+2,4,G,!1,64,32),e.vertexAttribPointer(oe+3,4,G,!1,64,48)}else if(re==="instanceColor"){const Ae=n.get(D.instanceColor);if(Ae===void 0)continue;const He=Ae.buffer,G=Ae.type;S(oe,1),e.bindBuffer(34962,He),e.vertexAttribPointer(oe,3,G,!1,12,0)}else if(ee!==void 0){const Ae=ee[re];if(Ae!==void 0)switch(Ae.length){case 2:e.vertexAttrib2fv(oe,Ae);break;case 3:e.vertexAttrib3fv(oe,Ae);break;case 4:e.vertexAttrib4fv(oe,Ae);break;default:e.vertexAttrib1fv(oe,Ae)}}}}T()}function k(){R();for(const D in a){const B=a[D];for(const C in B){const P=B[C];for(const z in P)u(P[z].object),delete P[z];delete B[C]}delete a[D]}}function H(D){if(a[D.id]===void 0)return;const B=a[D.id];for(const C in B){const P=B[C];for(const z in P)u(P[z].object),delete P[z];delete B[C]}delete a[D.id]}function te(D){for(const B in a){const C=a[B];if(C[D.id]===void 0)continue;const P=C[D.id];for(const z in P)u(P[z].object),delete P[z];delete C[D.id]}}function R(){if(O(),l===c)return;l=c,f(l.object)}function O(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:R,resetDefaultState:O,dispose:k,releaseStatesOfGeometry:H,releaseStatesOfProgram:te,initAttributes:p,enableAttribute:E,disableUnusedAttributes:T}}function Sf(e,t,n,i){const r=i.isWebGL2;let s;function o(l){s=l}function a(l,d){e.drawArrays(s,l,d),n.update(d,s,1)}function c(l,d,h){if(h===0)return;let f,u;if(r)f=e,u="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),u="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[u](s,l,d,h),n.update(d,s,h)}this.setMode=o,this.render=a,this.renderInstances=c}function Ef(e,t,n){let i;function r(){if(i!==void 0)return i;const b=t.get("EXT_texture_filter_anisotropic");return b!==null?i=e.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT):i=0,i}function s(b){if(b==="highp"){if(e.getShaderPrecisionFormat(35633,36338).precision>0&&e.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";b="mediump"}return b==="mediump"&&(e.getShaderPrecisionFormat(35633,36337).precision>0&&e.getShaderPrecisionFormat(35632,36337).precision>0)?"mediump":"lowp"}const o=typeof WebGL2RenderingContext!="undefined"&&e instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext!="undefined"&&e instanceof WebGL2ComputeRenderingContext;let a=n.precision!==void 0?n.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=n.logarithmicDepthBuffer===!0,d=e.getParameter(34930),h=e.getParameter(35660),f=e.getParameter(3379),u=e.getParameter(34076),m=e.getParameter(34921),v=e.getParameter(36347),y=e.getParameter(36348),g=e.getParameter(36349),p=h>0,E=o||!!t.get("OES_texture_float"),S=p&&E,T=o?e.getParameter(36183):0;return{isWebGL2:o,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:l,maxTextures:d,maxVertexTextures:h,maxTextureSize:f,maxCubemapSize:u,maxAttributes:m,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:g,vertexTextures:p,floatFragmentTextures:E,floatVertexTextures:S,maxSamples:T}}function Tf(e){const t=this;let n=null,i=0,r=!1,s=!1;const o=new Pt,a=new st,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f,u){const m=h.length!==0||f||i!==0||r;return r=f,n=d(h,u,0),i=h.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1,l()},this.setState=function(h,f,u){const m=h.clippingPlanes,v=h.clipIntersection,y=h.clipShadows,g=e.get(h);if(!r||m===null||m.length===0||s&&!y)s?d(null):l();else{const p=s?0:i,E=p*4;let S=g.clippingState||null;c.value=S,S=d(m,f,E,u);for(let T=0;T!==E;++T)S[T]=n[T];g.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=p}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,f,u,m){const v=h!==null?h.length:0;let y=null;if(v!==0){if(y=c.value,m!==!0||y===null){const g=u+v*4,p=f.matrixWorldInverse;a.getNormalMatrix(p),(y===null||y.length<g)&&(y=new Float32Array(g));for(let E=0,S=u;E!==v;++E,S+=4)o.copy(h[E]).applyMatrix4(p,a),o.normal.toArray(y,S),y[S+3]=o.constant}c.value=y,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,y}}function Af(e){let t=new WeakMap;function n(o,a){return a===ms?o.mapping=fs:a===ia&&(o.mapping=ps),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ms||a===ia)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=e.getRenderList(),d=e.getRenderTarget(),h=e.getRenderState(),f=new Cn(c.height/2);return f.fromEquirectangularTexture(e,o),t.set(o,f),e.setRenderTarget(d),e.setRenderList(l),e.setRenderState(h),o.addEventListener("dispose",r),n(f.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}function Lf(e){const t={};return{has:function(n){if(t[n]!==void 0)return t[n]!==null;let i;switch(n){case"WEBGL_depth_texture":i=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=e.getExtension(n)}return t[n]=i,i!==null},get:function(n){return this.has(n)||console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),t[n]}}}function Rf(e,t,n,i){const r=new WeakMap,s=new WeakMap;function o(h){const f=h.target,u=r.get(f);u.index!==null&&t.remove(u.index);for(const v in u.attributes)t.remove(u.attributes[v]);f.removeEventListener("dispose",o),r.delete(f);const m=s.get(u);m&&(t.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(h,f){let u=r.get(f);return u||(f.addEventListener("dispose",o),f.isBufferGeometry?u=f:f.isGeometry&&(f._bufferGeometry===void 0&&(f._bufferGeometry=new ze().setFromObject(h)),u=f._bufferGeometry),r.set(f,u),n.memory.geometries++,u)}function c(h){const f=h.attributes;for(const m in f)t.update(f[m],34962);const u=h.morphAttributes;for(const m in u){const v=u[m];for(let y=0,g=v.length;y<g;y++)t.update(v[y],34962)}}function l(h){const f=[],u=h.index,m=h.attributes.position;let v=0;if(u!==null){const p=u.array;v=u.version;for(let E=0,S=p.length;E<S;E+=3){const T=p[E+0],b=p[E+1],L=p[E+2];f.push(T,b,b,L,L,T)}}else{const p=m.array;v=m.version;for(let E=0,S=p.length/3-1;E<S;E+=3){const T=E+0,b=E+1,L=E+2;f.push(T,b,b,L,L,T)}}const y=new(Ca(f)>65535?Gi:Jn)(f,1);y.version=v;const g=s.get(h);g&&t.remove(g),s.set(h,y)}function d(h){const f=s.get(h);if(f){const u=h.index;u!==null&&(f.version<u.version&&l(h))}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:d}}function Cf(e,t,n,i){const r=i.isWebGL2;let s;function o(f){s=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function d(f,u){e.drawElements(s,u,a,f*c),n.update(u,s,1)}function h(f,u,m){if(m===0)return;let v,y;if(r)v=e,y="drawElementsInstanced";else if(v=t.get("ANGLE_instanced_arrays"),y="drawElementsInstancedANGLE",v===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[y](s,u,a,f*c,m),n.update(u,s,m)}this.setMode=o,this.setIndex=l,this.render=d,this.renderInstances=h}function Pf(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){n.calls++;switch(o){case 4:n.triangles+=a*(s/3);break;case 1:n.lines+=a*(s/2);break;case 3:n.lines+=a*(s-1);break;case 2:n.lines+=a*s;break;case 0:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.frame++,n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function If(e,t){return e[0]-t[0]}function Df(e,t){return Math.abs(t[1])-Math.abs(e[1])}function Nf(e){const t={},n=new Float32Array(8),i=[];for(let s=0;s<8;s++)i[s]=[s,0];function r(s,o,a,c){const l=s.morphTargetInfluences,d=l===void 0?0:l.length;let h=t[o.id];if(h===void 0){h=[];for(let y=0;y<d;y++)h[y]=[y,0];t[o.id]=h}for(let y=0;y<d;y++){const g=h[y];g[0]=y,g[1]=l[y]}h.sort(Df);for(let y=0;y<8;y++)y<d&&h[y][1]?(i[y][0]=h[y][0],i[y][1]=h[y][1]):(i[y][0]=Number.MAX_SAFE_INTEGER,i[y][1]=0);i.sort(If);const f=a.morphTargets&&o.morphAttributes.position,u=a.morphNormals&&o.morphAttributes.normal;let m=0;for(let y=0;y<8;y++){const g=i[y],p=g[0],E=g[1];p!==Number.MAX_SAFE_INTEGER&&E?(f&&o.getAttribute("morphTarget"+y)!==f[p]&&o.setAttribute("morphTarget"+y,f[p]),u&&o.getAttribute("morphNormal"+y)!==u[p]&&o.setAttribute("morphNormal"+y,u[p]),n[y]=E,m+=E):(f&&o.getAttribute("morphTarget"+y)!==void 0&&o.deleteAttribute("morphTarget"+y),u&&o.getAttribute("morphNormal"+y)!==void 0&&o.deleteAttribute("morphNormal"+y),n[y]=0)}const v=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(e,"morphTargetBaseInfluence",v),c.getUniforms().setValue(e,"morphTargetInfluences",n)}return{update:r}}function Of(e,t,n,i){let r=new WeakMap;function s(a){const c=i.render.frame,l=a.geometry,d=t.get(a,l);return r.get(d)!==c&&(l.isGeometry&&d.updateFromObject(a),t.update(d),r.set(d,c)),a.isInstancedMesh&&(n.update(a.instanceMatrix,34962),a.instanceColor!==null&&n.update(a.instanceColor,34962)),d}function o(){r=new WeakMap}return{update:s,dispose:o}}function ji(e,t,n,i){Ne.call(this,null),this.image={data:e||null,width:t||1,height:n||1,depth:i||1},this.magFilter=tt,this.minFilter=tt,this.wrapR=ht,this.generateMipmaps=!1,this.flipY=!1,this.needsUpdate=!0}ji.prototype=Object.create(Ne.prototype),ji.prototype.constructor=ji,ji.prototype.isDataTexture2DArray=!0;function qi(e,t,n,i){Ne.call(this,null),this.image={data:e||null,width:t||1,height:n||1,depth:i||1},this.magFilter=tt,this.minFilter=tt,this.wrapR=ht,this.generateMipmaps=!1,this.flipY=!1,this.needsUpdate=!0}qi.prototype=Object.create(Ne.prototype),qi.prototype.constructor=qi,qi.prototype.isDataTexture3D=!0;const Ba=new Ne,Bf=new ji,Ff=new qi,Fa=new fn,Ua=[],za=[],ka=new Float32Array(16),Ha=new Float32Array(9),Ga=new Float32Array(4);function ai(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=Ua[r];if(s===void 0&&(s=new Float32Array(r),Ua[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(s,a)}return s}function _t(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function pt(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Va(e,t){let n=za[t];n===void 0&&(n=new Int32Array(t),za[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Uf(e,t){const n=this.cache;if(n[0]===t)return;e.uniform1f(this.addr,t),n[0]=t}function zf(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(_t(n,t))return;e.uniform2fv(this.addr,t),pt(n,t)}}function kf(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(_t(n,t))return;e.uniform3fv(this.addr,t),pt(n,t)}}function Hf(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(_t(n,t))return;e.uniform4fv(this.addr,t),pt(n,t)}}function Gf(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(_t(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),pt(n,t)}else{if(_t(n,i))return;Ga.set(i),e.uniformMatrix2fv(this.addr,!1,Ga),pt(n,i)}}function Vf(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(_t(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),pt(n,t)}else{if(_t(n,i))return;Ha.set(i),e.uniformMatrix3fv(this.addr,!1,Ha),pt(n,i)}}function Wf(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(_t(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),pt(n,t)}else{if(_t(n,i))return;ka.set(i),e.uniformMatrix4fv(this.addr,!1,ka),pt(n,i)}}function jf(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.safeSetTexture2D(t||Ba,r)}function qf(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||Bf,r)}function Xf(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Ff,r)}function Yf(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.safeSetTextureCube(t||Fa,r)}function Zf(e,t){const n=this.cache;if(n[0]===t)return;e.uniform1i(this.addr,t),n[0]=t}function Jf(e,t){const n=this.cache;if(_t(n,t))return;e.uniform2iv(this.addr,t),pt(n,t)}function Qf(e,t){const n=this.cache;if(_t(n,t))return;e.uniform3iv(this.addr,t),pt(n,t)}function $f(e,t){const n=this.cache;if(_t(n,t))return;e.uniform4iv(this.addr,t),pt(n,t)}function Kf(e,t){const n=this.cache;if(n[0]===t)return;e.uniform1ui(this.addr,t),n[0]=t}function ep(e){switch(e){case 5126:return Uf;case 35664:return zf;case 35665:return kf;case 35666:return Hf;case 35674:return Gf;case 35675:return Vf;case 35676:return Wf;case 5124:case 35670:return Zf;case 35667:case 35671:return Jf;case 35668:case 35672:return Qf;case 35669:case 35673:return $f;case 5125:return Kf;case 35678:case 36198:case 36298:case 36306:case 35682:return jf;case 35679:case 36299:case 36307:return Xf;case 35680:case 36300:case 36308:case 36293:return Yf;case 36289:case 36303:case 36311:case 36292:return qf}}function tp(e,t){e.uniform1fv(this.addr,t)}function np(e,t){e.uniform1iv(this.addr,t)}function ip(e,t){e.uniform2iv(this.addr,t)}function rp(e,t){e.uniform3iv(this.addr,t)}function sp(e,t){e.uniform4iv(this.addr,t)}function op(e,t){const n=ai(t,this.size,2);e.uniform2fv(this.addr,n)}function ap(e,t){const n=ai(t,this.size,3);e.uniform3fv(this.addr,n)}function cp(e,t){const n=ai(t,this.size,4);e.uniform4fv(this.addr,n)}function lp(e,t){const n=ai(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function hp(e,t){const n=ai(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function up(e,t){const n=ai(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function dp(e,t,n){const i=t.length,r=Va(n,i);e.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)n.safeSetTexture2D(t[s]||Ba,r[s])}function fp(e,t,n){const i=t.length,r=Va(n,i);e.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)n.safeSetTextureCube(t[s]||Fa,r[s])}function pp(e){switch(e){case 5126:return tp;case 35664:return op;case 35665:return ap;case 35666:return cp;case 35674:return lp;case 35675:return hp;case 35676:return up;case 5124:case 35670:return np;case 35667:case 35671:return ip;case 35668:case 35672:return rp;case 35669:case 35673:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return dp;case 35680:case 36300:case 36308:case 36293:return fp}}function mp(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=ep(t.type)}function Wa(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=pp(t.type)}Wa.prototype.updateCache=function(e){const t=this.cache;e instanceof Float32Array&&t.length!==e.length&&(this.cache=new Float32Array(e.length)),pt(t,e)};function ja(e){this.id=e,this.seq=[],this.map={}}ja.prototype.setValue=function(e,t,n){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const o=i[r];o.setValue(e,t[o.id],n)}};const $s=/([\w\d_]+)(\])?(\[|\.)?/g;function qa(e,t){e.seq.push(t),e.map[t.id]=t}function gp(e,t,n){const i=e.name,r=i.length;for($s.lastIndex=0;;){const s=$s.exec(i),o=$s.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){qa(n,l===void 0?new mp(a,e,t):new Wa(a,e,t));break}else{const d=n.map;let h=d[a];h===void 0&&(h=new ja(a),qa(n,h)),n=h}}}function pn(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),s=e.getUniformLocation(t,r.name);gp(r,s,this)}}pn.prototype.setValue=function(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)},pn.prototype.setOptional=function(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)},pn.upload=function(e,t,n,i){for(let r=0,s=t.length;r!==s;++r){const o=t[r],a=n[o.id];a.needsUpdate!==!1&&o.setValue(e,a.value,i)}},pn.seqWithValue=function(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in t&&n.push(s)}return n};function Xa(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}let yp=0;function vp(e){const t=e.split(`
`);for(let n=0;n<t.length;n++)t[n]=n+1+": "+t[n];return t.join(`
`)}function Ya(e){switch(e){case Oi:return["Linear","( value )"];case Ms:return["sRGB","( value )"];case Ch:return["RGBE","( value )"];case Ih:return["RGBM","( value, 7.0 )"];case Dh:return["RGBM","( value, 16.0 )"];case Nh:return["RGBD","( value, 256.0 )"];case Rh:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case Ph:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",e),["Linear","( value )"]}}function Za(e,t,n){const i=e.getShaderParameter(t,35713),r=e.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=e.getShaderSource(t);return"THREE.WebGLShader: gl.getShaderInfoLog() "+n+`
`+r+vp(s)}function Xi(e,t){const n=Ya(t);return"vec4 "+e+"( vec4 value ) { return "+n[0]+"ToLinear"+n[1]+"; }"}function xp(e,t){const n=Ya(t);return"vec4 "+e+"( vec4 value ) { return LinearTo"+n[0]+n[1]+"; }"}function _p(e,t){let n;switch(t){case Al:n="Linear";break;case Ll:n="Reinhard";break;case Rl:n="OptimizedCineon";break;case Cl:n="ACESFilmic";break;case Pl:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function bp(e){const t=[e.extensionDerivatives||e.envMapCubeUV||e.bumpMap||e.tangentSpaceNormalMap||e.clearcoatNormalMap||e.flatShading||e.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""];return t.filter(Yi).join(`
`)}function wp(e){const t=[];for(const n in e){const i=e[n];if(i===!1)continue;t.push("#define "+n+" "+i)}return t.join(`
`)}function Mp(e,t){const n={},i=e.getProgramParameter(t,35721);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),o=s.name;n[o]=e.getAttribLocation(t,o)}return n}function Yi(e){return e!==""}function Ja(e,t){return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qa(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Sp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ks(e){return e.replace(Sp,Ep)}function Ep(e,t){const n=Te[t];if(n===void 0)throw new Error("Can not resolve #include <"+t+">");return Ks(n)}const Tp=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,Ap=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $a(e){return e.replace(Ap,Ka).replace(Tp,Lp)}function Lp(e,t,n,i){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),Ka(e,t,n,i)}function Ka(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ec(e){let t="precision "+e.precision+` float;
precision `+e.precision+" int;";return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Rp(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Yo?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===sl?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Ei&&(t="SHADOWMAP_TYPE_VSM"),t}function Cp(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case fs:case ps:t="ENVMAP_TYPE_CUBE";break;case gs:case ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Pp(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case ps:case ys:t="ENVMAP_MODE_REFRACTION";break}return t}function Ip(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case hr:t="ENVMAP_BLENDING_MULTIPLY";break;case El:t="ENVMAP_BLENDING_MIX";break;case Tl:t="ENVMAP_BLENDING_ADD";break}return t}function Dp(e,t,n,i){const r=e.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=Rp(n),l=Cp(n),d=Pp(n),h=Ip(n),f=e.gammaFactor>0?e.gammaFactor:1,u=n.isWebGL2?"":bp(n),m=wp(s),v=r.createProgram();let y,g,p=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=[m].filter(Yi).join(`
`),y.length>0&&(y+=`
`),g=[u,m].filter(Yi).join(`
`),g.length>0&&(g+=`
`)):(y=[ec(n),"#define SHADER_NAME "+n.shaderName,m,n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+f,"#define MAX_BONES "+n.maxBones,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMap&&n.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",n.normalMap&&n.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.displacementMap&&n.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexUvs?"#define USE_UV":"",n.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.useVertexTexture?"#define BONE_TEXTURE":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#ifdef USE_COLOR","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),g=[u,ec(n),"#define SHADER_NAME "+n.shaderName,m,n.alphaTest?"#define ALPHATEST "+n.alphaTest+(n.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+f,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMap&&n.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",n.normalMap&&n.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.sheen?"#define USE_SHEEN":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexUvs?"#define USE_UV":"",n.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(n.extensionShaderTextureLOD||n.envMap)&&n.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ri?"#define TONE_MAPPING":"",n.toneMapping!==Ri?Te.tonemapping_pars_fragment:"",n.toneMapping!==Ri?_p("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",Te.encodings_pars_fragment,n.map?Xi("mapTexelToLinear",n.mapEncoding):"",n.matcap?Xi("matcapTexelToLinear",n.matcapEncoding):"",n.envMap?Xi("envMapTexelToLinear",n.envMapEncoding):"",n.emissiveMap?Xi("emissiveMapTexelToLinear",n.emissiveMapEncoding):"",n.lightMap?Xi("lightMapTexelToLinear",n.lightMapEncoding):"",xp("linearToOutputTexel",n.outputEncoding),n.depthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Yi).join(`
`)),o=Ks(o),o=Ja(o,n),o=Qa(o,n),a=Ks(a),a=Ja(a,n),a=Qa(a,n),o=$a(o),a=$a(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,y=["#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,g=["#define varying in",n.glslVersion===ya?"":"out highp vec4 pc_fragColor;",n.glslVersion===ya?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=p+y+o,S=p+g+a,T=Xa(r,35633,E),b=Xa(r,35632,S);if(r.attachShader(v,T),r.attachShader(v,b),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),e.debug.checkShaderErrors){const H=r.getProgramInfoLog(v).trim(),te=r.getShaderInfoLog(T).trim(),R=r.getShaderInfoLog(b).trim();let O=!0,D=!0;if(r.getProgramParameter(v,35714)===!1){O=!1;const B=Za(r,T,"vertex"),C=Za(r,b,"fragment");console.error("THREE.WebGLProgram: shader error: ",r.getError(),"35715",r.getProgramParameter(v,35715),"gl.getProgramInfoLog",H,B,C)}else H!==""?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",H):(te===""||R==="")&&(D=!1);D&&(this.diagnostics={runnable:O,programLog:H,vertexShader:{log:te,prefix:y},fragmentShader:{log:R,prefix:g}})}r.deleteShader(T),r.deleteShader(b);let L;this.getUniforms=function(){return L===void 0&&(L=new pn(r,v)),L};let k;return this.getAttributes=function(){return k===void 0&&(k=Mp(r,v)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.name=n.shaderName,this.id=yp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=b,this}function Np(e,t,n,i,r,s){const o=[],a=i.isWebGL2,c=i.logarithmicDepthBuffer,l=i.floatVertexTextures,d=i.maxVertexUniforms,h=i.vertexTextures;let f=i.precision;const u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},m=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmissionMap"];function v(b){const L=b.skeleton,k=L.bones;if(l)return 1024;{const H=d,te=Math.floor((H-20)/4),R=Math.min(te,k.length);return R<k.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+k.length+" bones. This GPU supports "+R+"."),0):R}}function y(b){let L;return b?b.isTexture?L=b.encoding:b.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),L=b.texture.encoding):L=Oi,L}function g(b,L,k,H,te){const R=H.fog,O=b.isMeshStandardMaterial?H.environment:null,D=t.get(b.envMap||O),B=u[b.type],C=te.isSkinnedMesh?v(te):0;b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let P,z;if(B){const re=Dt[B];P=re.vertexShader,z=re.fragmentShader}else P=b.vertexShader,z=b.fragmentShader;const U=e.getRenderTarget(),ee={isWebGL2:a,shaderID:B,shaderName:b.type,vertexShader:P,fragmentShader:z,defines:b.defines,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,instancing:te.isInstancedMesh===!0,instancingColor:te.isInstancedMesh===!0&&te.instanceColor!==null,supportsVertexTextures:h,outputEncoding:U!==null?y(U.texture):e.outputEncoding,map:!!b.map,mapEncoding:y(b.map),matcap:!!b.matcap,matcapEncoding:y(b.matcap),envMap:!!D,envMapMode:D&&D.mapping,envMapEncoding:y(D),envMapCubeUV:!!D&&(D.mapping===gs||D.mapping===ys),lightMap:!!b.lightMap,lightMapEncoding:y(b.lightMap),aoMap:!!b.aoMap,emissiveMap:!!b.emissiveMap,emissiveMapEncoding:y(b.emissiveMap),bumpMap:!!b.bumpMap,normalMap:!!b.normalMap,objectSpaceNormalMap:b.normalMapType===Bh,tangentSpaceNormalMap:b.normalMapType===En,clearcoatMap:!!b.clearcoatMap,clearcoatRoughnessMap:!!b.clearcoatRoughnessMap,clearcoatNormalMap:!!b.clearcoatNormalMap,displacementMap:!!b.displacementMap,roughnessMap:!!b.roughnessMap,metalnessMap:!!b.metalnessMap,specularMap:!!b.specularMap,alphaMap:!!b.alphaMap,gradientMap:!!b.gradientMap,sheen:!!b.sheen,transmissionMap:!!b.transmissionMap,combine:b.combine,vertexTangents:b.normalMap&&b.vertexTangents,vertexColors:b.vertexColors,vertexUvs:!!b.map||!!b.bumpMap||!!b.normalMap||!!b.specularMap||!!b.alphaMap||!!b.emissiveMap||!!b.roughnessMap||!!b.metalnessMap||!!b.clearcoatMap||!!b.clearcoatRoughnessMap||!!b.clearcoatNormalMap||!!b.displacementMap||!!b.transmissionMap,uvsVertexOnly:!(!!b.map||!!b.bumpMap||!!b.normalMap||!!b.specularMap||!!b.alphaMap||!!b.emissiveMap||!!b.roughnessMap||!!b.metalnessMap||!!b.clearcoatNormalMap||!!b.transmissionMap)&&!!b.displacementMap,fog:!!R,useFog:b.fog,fogExp2:R&&R.isFogExp2,flatShading:b.flatShading,sizeAttenuation:b.sizeAttenuation,logarithmicDepthBuffer:c,skinning:b.skinning&&C>0,maxBones:C,useVertexTexture:l,morphTargets:b.morphTargets,morphNormals:b.morphNormals,maxMorphTargets:e.maxMorphTargets,maxMorphNormals:e.maxMorphNormals,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:e.shadowMap.enabled&&k.length>0,shadowMapType:e.shadowMap.type,toneMapping:b.toneMapped?e.toneMapping:Ri,physicallyCorrectLights:e.physicallyCorrectLights,premultipliedAlpha:b.premultipliedAlpha,alphaTest:b.alphaTest,doubleSided:b.side===Ai,flipSided:b.side===Ze,depthPacking:b.depthPacking!==void 0?b.depthPacking:!1,index0AttributeName:b.index0AttributeName,extensionDerivatives:b.extensions&&b.extensions.derivatives,extensionFragDepth:b.extensions&&b.extensions.fragDepth,extensionDrawBuffers:b.extensions&&b.extensions.drawBuffers,extensionShaderTextureLOD:b.extensions&&b.extensions.shaderTextureLOD,rendererExtensionFragDepth:a||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:a||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:a||n.has("EXT_shader_texture_lod"),customProgramCacheKey:b.customProgramCacheKey()};return ee}function p(b){const L=[];if(b.shaderID?L.push(b.shaderID):(L.push(b.fragmentShader),L.push(b.vertexShader)),b.defines!==void 0)for(const k in b.defines)L.push(k),L.push(b.defines[k]);if(b.isRawShaderMaterial===!1){for(let k=0;k<m.length;k++)L.push(b[m[k]]);L.push(e.outputEncoding),L.push(e.gammaFactor)}return L.push(b.customProgramCacheKey),L.join()}function E(b){const L=u[b.type];let k;if(L){const H=Dt[L];k=Da.clone(H.uniforms)}else k=b.uniforms;return k}function S(b,L){let k;for(let H=0,te=o.length;H<te;H++){const R=o[H];if(R.cacheKey===L){k=R,++k.usedTimes;break}}return k===void 0&&(k=new Dp(e,L,b,r),o.push(k)),k}function T(b){if(--b.usedTimes===0){const L=o.indexOf(b);o[L]=o[o.length-1],o.pop(),b.destroy()}}return{getParameters:g,getProgramCacheKey:p,getUniforms:E,acquireProgram:S,releaseProgram:T,programs:o}}function Op(){let e=new WeakMap;function t(s){let o=e.get(s);return o===void 0&&(o={},e.set(s,o)),o}function n(s){e.delete(s)}function i(s,o,a){e.get(s)[o]=a}function r(){e=new WeakMap}return{get:t,remove:n,update:i,dispose:r}}function Bp(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.program!==t.program?e.program.id-t.program.id:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Fp(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function tc(e){const t=[];let n=0;const i=[],r=[],s={id:-1};function o(){n=0,i.length=0,r.length=0}function a(f,u,m,v,y,g){let p=t[n];const E=e.get(m);return p===void 0?(p={id:f.id,object:f,geometry:u,material:m,program:E.program||s,groupOrder:v,renderOrder:f.renderOrder,z:y,group:g},t[n]=p):(p.id=f.id,p.object=f,p.geometry=u,p.material=m,p.program=E.program||s,p.groupOrder=v,p.renderOrder=f.renderOrder,p.z=y,p.group=g),n++,p}function c(f,u,m,v,y,g){const p=a(f,u,m,v,y,g);(m.transparent===!0?r:i).push(p)}function l(f,u,m,v,y,g){const p=a(f,u,m,v,y,g);(m.transparent===!0?r:i).unshift(p)}function d(f,u){i.length>1&&i.sort(f||Bp),r.length>1&&r.sort(u||Fp)}function h(){for(let f=n,u=t.length;f<u;f++){const m=t[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.program=null,m.group=null}}return{opaque:i,transparent:r,init:o,push:c,unshift:l,finish:h,sort:d}}function Up(e){let t=new WeakMap;function n(r,s){const o=t.get(r);let a;return o===void 0?(a=new tc(e),t.set(r,new WeakMap),t.get(r).set(s,a)):(a=o.get(s),a===void 0&&(a=new tc(e),o.set(s,a))),a}function i(){t=new WeakMap}return{get:n,dispose:i}}function zp(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new M,color:new he};break;case"SpotLight":n={position:new M,direction:new M,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new M,color:new he,distance:0,decay:0};break;case"HemisphereLight":n={direction:new M,skyColor:new he,groundColor:new he};break;case"RectAreaLight":n={color:new he,position:new M,halfWidth:new M,halfHeight:new M};break}return e[t.id]=n,n}}}function kp(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let Hp=0;function Gp(e,t){return(t.castShadow?1:0)-(e.castShadow?1:0)}function Vp(e,t){const n=new zp,i=kp(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let l=0;l<9;l++)r.probe.push(new M);const s=new M,o=new Ee,a=new Ee;function c(l,d,h){let f=0,u=0,m=0;for(let H=0;H<9;H++)r.probe[H].set(0,0,0);let v=0,y=0,g=0,p=0,E=0,S=0,T=0,b=0;const L=h.matrixWorldInverse;l.sort(Gp);for(let H=0,te=l.length;H<te;H++){const R=l[H],O=R.color,D=R.intensity,B=R.distance,C=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)f+=O.r*D,u+=O.g*D,m+=O.b*D;else if(R.isLightProbe)for(let P=0;P<9;P++)r.probe[P].addScaledVector(R.sh.coefficients[P],D);else if(R.isDirectionalLight){const P=n.get(R);if(P.color.copy(R.color).multiplyScalar(R.intensity),P.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(L),R.castShadow){const z=R.shadow,U=i.get(R);U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,r.directionalShadow[v]=U,r.directionalShadowMap[v]=C,r.directionalShadowMatrix[v]=R.shadow.matrix,S++}r.directional[v]=P,v++}else if(R.isSpotLight){const P=n.get(R);if(P.position.setFromMatrixPosition(R.matrixWorld),P.position.applyMatrix4(L),P.color.copy(O).multiplyScalar(D),P.distance=B,P.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(L),P.coneCos=Math.cos(R.angle),P.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),P.decay=R.decay,R.castShadow){const z=R.shadow,U=i.get(R);U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,r.spotShadow[g]=U,r.spotShadowMap[g]=C,r.spotShadowMatrix[g]=R.shadow.matrix,b++}r.spot[g]=P,g++}else if(R.isRectAreaLight){const P=n.get(R);P.color.copy(O).multiplyScalar(D),P.position.setFromMatrixPosition(R.matrixWorld),P.position.applyMatrix4(L),a.identity(),o.copy(R.matrixWorld),o.premultiply(L),a.extractRotation(o),P.halfWidth.set(R.width*.5,0,0),P.halfHeight.set(0,R.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),r.rectArea[p]=P,p++}else if(R.isPointLight){const P=n.get(R);if(P.position.setFromMatrixPosition(R.matrixWorld),P.position.applyMatrix4(L),P.color.copy(R.color).multiplyScalar(R.intensity),P.distance=R.distance,P.decay=R.decay,R.castShadow){const z=R.shadow,U=i.get(R);U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,U.shadowCameraNear=z.camera.near,U.shadowCameraFar=z.camera.far,r.pointShadow[y]=U,r.pointShadowMap[y]=C,r.pointShadowMatrix[y]=R.shadow.matrix,T++}r.point[y]=P,y++}else if(R.isHemisphereLight){const P=n.get(R);P.direction.setFromMatrixPosition(R.matrixWorld),P.direction.transformDirection(L),P.direction.normalize(),P.skyColor.copy(R.color).multiplyScalar(D),P.groundColor.copy(R.groundColor).multiplyScalar(D),r.hemi[E]=P,E++}}p>0&&(t.isWebGL2||e.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):e.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=u,r.ambient[2]=m;const k=r.hash;(k.directionalLength!==v||k.pointLength!==y||k.spotLength!==g||k.rectAreaLength!==p||k.hemiLength!==E||k.numDirectionalShadows!==S||k.numPointShadows!==T||k.numSpotShadows!==b)&&(r.directional.length=v,r.spot.length=g,r.rectArea.length=p,r.point.length=y,r.hemi.length=E,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=T,r.pointShadowMap.length=T,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=T,r.spotShadowMatrix.length=b,k.directionalLength=v,k.pointLength=y,k.spotLength=g,k.rectAreaLength=p,k.hemiLength=E,k.numDirectionalShadows=S,k.numPointShadows=T,k.numSpotShadows=b,r.version=Hp++)}return{setup:c,state:r}}function nc(e,t){const n=new Vp(e,t),i=[],r=[];function s(){i.length=0,r.length=0}function o(d){i.push(d)}function a(d){r.push(d)}function c(d){n.setup(i,r,d)}const l={lightsArray:i,shadowsArray:r,lights:n};return{init:s,state:l,setupLights:c,pushLight:o,pushShadow:a}}function Wp(e,t){let n=new WeakMap;function i(s,o){let a;return n.has(s)===!1?(a=new nc(e,t),n.set(s,new WeakMap),n.get(s).set(o,a)):n.get(s).has(o)===!1?(a=new nc(e,t),n.get(s).set(o,a)):a=n.get(s).get(o),a}function r(){n=new WeakMap}return{get:i,dispose:r}}function mn(e){fe.call(this),this.type="MeshDepthMaterial",this.depthPacking=Oh,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}mn.prototype=Object.create(fe.prototype),mn.prototype.constructor=mn,mn.prototype.isMeshDepthMaterial=!0,mn.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.depthPacking=e.depthPacking,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this};function Pn(e){fe.call(this),this.type="MeshDistanceMaterial",this.referencePosition=new M,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}Pn.prototype=Object.create(fe.prototype),Pn.prototype.constructor=Pn,Pn.prototype.isMeshDistanceMaterial=!0,Pn.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this};var jp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	float mean = 0.0;
	float squared_mean = 0.0;
	float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );
	for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {
		#ifdef HORIZONAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean * HALF_SAMPLE_RATE;
	squared_mean = squared_mean * HALF_SAMPLE_RATE;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`,qp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`;function ic(e,t,n){let i=new Dr;const r=new W,s=new W,o=new Ie,a=[],c=[],l={},d={0:Ze,1:Ti,2:Ai},h=new at({defines:{SAMPLE_RATE:2/8,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:qp,fragmentShader:jp}),f=h.clone();f.defines.HORIZONAL_PASS=1;const u=new ze;u.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new et(u,h),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yo,this.render=function(T,b,L){if(v.enabled===!1)return;if(v.autoUpdate===!1&&v.needsUpdate===!1)return;if(T.length===0)return;const k=e.getRenderTarget(),H=e.getActiveCubeFace(),te=e.getActiveMipmapLevel(),R=e.state;R.setBlending(Fn),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);for(let O=0,D=T.length;O<D;O++){const B=T[O],C=B.shadow;if(C===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(C.autoUpdate===!1&&C.needsUpdate===!1)continue;r.copy(C.mapSize);const P=C.getFrameExtents();if(r.multiply(P),s.copy(C.mapSize),(r.x>n||r.y>n)&&(r.x>n&&(s.x=Math.floor(n/P.x),r.x=s.x*P.x,C.mapSize.x=s.x),r.y>n&&(s.y=Math.floor(n/P.y),r.y=s.y*P.y,C.mapSize.y=s.y)),C.map===null&&!C.isPointLightShadow&&this.type===Ei){const U={minFilter:$e,magFilter:$e,format:vt};C.map=new xt(r.x,r.y,U),C.map.texture.name=B.name+".shadowMap",C.mapPass=new xt(r.x,r.y,U),C.camera.updateProjectionMatrix()}if(C.map===null){const U={minFilter:tt,magFilter:tt,format:vt};C.map=new xt(r.x,r.y,U),C.map.texture.name=B.name+".shadowMap",C.camera.updateProjectionMatrix()}e.setRenderTarget(C.map),e.clear();const z=C.getViewportCount();for(let U=0;U<z;U++){const ee=C.getViewport(U);o.set(s.x*ee.x,s.y*ee.y,s.x*ee.z,s.y*ee.w),R.viewport(o),C.updateMatrices(B,U),i=C.getFrustum(),S(b,L,C.camera,B,this.type)}!C.isPointLightShadow&&this.type===Ei&&y(C,L),C.needsUpdate=!1}v.needsUpdate=!1,e.setRenderTarget(k,H,te)};function y(T,b){const L=t.update(m);h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(b,null,L,h,m,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(b,null,L,f,m,null)}function g(T,b,L){const k=T<<0|b<<1|L<<2;let H=a[k];return H===void 0&&(H=new mn({depthPacking:ga,morphTargets:T,skinning:b}),a[k]=H),H}function p(T,b,L){const k=T<<0|b<<1|L<<2;let H=c[k];return H===void 0&&(H=new Pn({morphTargets:T,skinning:b}),c[k]=H),H}function E(T,b,L,k,H,te,R){let O=null,D=g,B=T.customDepthMaterial;if(k.isPointLight===!0&&(D=p,B=T.customDistanceMaterial),B===void 0){let C=!1;L.morphTargets===!0&&(C=b.morphAttributes&&b.morphAttributes.position&&b.morphAttributes.position.length>0);let P=!1;T.isSkinnedMesh===!0&&(L.skinning===!0?P=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",T));const z=T.isInstancedMesh===!0;O=D(C,P,z)}else O=B;if(e.localClippingEnabled&&L.clipShadows===!0&&L.clippingPlanes.length!==0){const C=O.uuid,P=L.uuid;let z=l[C];z===void 0&&(z={},l[C]=z);let U=z[P];U===void 0&&(U=O.clone(),z[P]=U),O=U}return O.visible=L.visible,O.wireframe=L.wireframe,R===Ei?O.side=L.shadowSide!==null?L.shadowSide:L.side:O.side=L.shadowSide!==null?L.shadowSide:d[L.side],O.clipShadows=L.clipShadows,O.clippingPlanes=L.clippingPlanes,O.clipIntersection=L.clipIntersection,O.wireframeLinewidth=L.wireframeLinewidth,O.linewidth=L.linewidth,k.isPointLight===!0&&O.isMeshDistanceMaterial===!0&&(O.referencePosition.setFromMatrixPosition(k.matrixWorld),O.nearDistance=H,O.farDistance=te),O}function S(T,b,L,k,H){if(T.visible===!1)return;const te=T.layers.test(b.layers);if(te&&(T.isMesh||T.isLine||T.isPoints)&&((T.castShadow||T.receiveShadow&&H===Ei)&&(!T.frustumCulled||i.intersectsObject(T)))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const O=t.update(T),D=T.material;if(Array.isArray(D)){const B=O.groups;for(let C=0,P=B.length;C<P;C++){const z=B[C],U=D[z.materialIndex];if(U&&U.visible){const ee=E(T,O,U,k,L.near,L.far,H);e.renderBufferDirect(L,null,O,ee,T,z)}}}else if(D.visible){const B=E(T,O,D,k,L.near,L.far,H);e.renderBufferDirect(L,null,O,B,T,null)}}const R=T.children;for(let O=0,D=R.length;O<D;O++)S(R[O],b,L,k,H)}}function Xp(e,t,n){const i=n.isWebGL2;function r(){let A=!1;const q=new Ie;let Z=null;const de=new Ie(0,0,0,0);return{setMask:function(Q){Z!==Q&&!A&&(e.colorMask(Q,Q,Q,Q),Z=Q)},setLocked:function(Q){A=Q},setClear:function(Q,se,ue,xe,ie){ie===!0&&(Q*=xe,se*=xe,ue*=xe),q.set(Q,se,ue,xe),de.equals(q)===!1&&(e.clearColor(Q,se,ue,xe),de.copy(q))},reset:function(){A=!1,Z=null,de.set(-1,0,0,0)}}}function s(){let A=!1,q=null,Z=null,de=null;return{setTest:function(Q){Q?re(2929):oe(2929)},setMask:function(Q){q!==Q&&!A&&(e.depthMask(Q),q=Q)},setFunc:function(Q){if(Z!==Q){if(Q)switch(Q){case vl:e.depthFunc(512);break;case xl:e.depthFunc(519);break;case _l:e.depthFunc(513);break;case ds:e.depthFunc(515);break;case bl:e.depthFunc(514);break;case wl:e.depthFunc(518);break;case Ml:e.depthFunc(516);break;case Sl:e.depthFunc(517);break;default:e.depthFunc(515)}else e.depthFunc(515);Z=Q}},setLocked:function(Q){A=Q},setClear:function(Q){de!==Q&&(e.clearDepth(Q),de=Q)},reset:function(){A=!1,q=null,Z=null,de=null}}}function o(){let A=!1,q=null,Z=null,de=null,Q=null,se=null,ue=null,xe=null,ie=null;return{setTest:function(me){A||(me?re(2960):oe(2960))},setMask:function(me){q!==me&&!A&&(e.stencilMask(me),q=me)},setFunc:function(me,je,ct){(Z!==me||de!==je||Q!==ct)&&(e.stencilFunc(me,je,ct),Z=me,de=je,Q=ct)},setOp:function(me,je,ct){(se!==me||ue!==je||xe!==ct)&&(e.stencilOp(me,je,ct),se=me,ue=je,xe=ct)},setLocked:function(me){A=me},setClear:function(me){ie!==me&&(e.clearStencil(me),ie=me)},reset:function(){A=!1,q=null,Z=null,de=null,Q=null,se=null,ue=null,xe=null,ie=null}}}const a=new r,c=new s,l=new o;let d={},h=null,f=null,u=null,m=null,v=null,y=null,g=null,p=null,E=null,S=!1,T=null,b=null,L=null,k=null,H=null;const te=e.getParameter(35661);let R=!1,O=0;const D=e.getParameter(7938);D.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL\ ([0-9])/.exec(D)[1]),R=O>=1):D.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(D)[1]),R=O>=2);let B=null,C={};const P=new Ie,z=new Ie;function U(A,q,Z){const de=new Uint8Array(4),Q=e.createTexture();e.bindTexture(A,Q),e.texParameteri(A,10241,9728),e.texParameteri(A,10240,9728);for(let se=0;se<Z;se++)e.texImage2D(q+se,0,6408,1,1,0,6408,5121,de);return Q}const ee={};ee[3553]=U(3553,3553,1),ee[34067]=U(34067,34069,6),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),re(2929),c.setFunc(ds),ge(!1),Ce(Xo),re(2884),G(Fn);function re(A){d[A]!==!0&&(e.enable(A),d[A]=!0)}function oe(A){d[A]!==!1&&(e.disable(A),d[A]=!1)}function Se(A){return h!==A?(e.useProgram(A),h=A,!0):!1}const Ae={[Un]:32774,[al]:32778,[cl]:32779};if(i)Ae[$o]=32775,Ae[Ko]=32776;else{const A=t.get("EXT_blend_minmax");A!==null&&(Ae[$o]=A.MIN_EXT,Ae[Ko]=A.MAX_EXT)}const He={[ll]:0,[hl]:1,[ul]:768,[ea]:770,[yl]:776,[ml]:774,[fl]:772,[dl]:769,[ta]:771,[gl]:775,[pl]:773};function G(A,q,Z,de,Q,se,ue,xe){if(A===Fn){f&&(oe(3042),f=!1);return}if(f||(re(3042),f=!0),A!==ol){if(A!==u||xe!==S){if((m!==Un||g!==Un)&&(e.blendEquation(32774),m=Un,g=Un),xe)switch(A){case Li:e.blendFuncSeparate(1,771,1,771);break;case us:e.blendFunc(1,1);break;case Jo:e.blendFuncSeparate(0,0,769,771);break;case Qo:e.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}else switch(A){case Li:e.blendFuncSeparate(770,771,1,771);break;case us:e.blendFunc(770,1);break;case Jo:e.blendFunc(0,769);break;case Qo:e.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}v=null,y=null,p=null,E=null,u=A,S=xe}return}Q=Q||q,se=se||Z,ue=ue||de,(q!==m||Q!==g)&&(e.blendEquationSeparate(Ae[q],Ae[Q]),m=q,g=Q),(Z!==v||de!==y||se!==p||ue!==E)&&(e.blendFuncSeparate(He[Z],He[de],He[se],He[ue]),v=Z,y=de,p=se,E=ue),u=A,S=null}function Ve(A,q){A.side===Ai?oe(2884):re(2884);let Z=A.side===Ze;q&&(Z=!Z),ge(Z),A.blending===Li&&A.transparent===!1?G(Fn):G(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.premultipliedAlpha),c.setFunc(A.depthFunc),c.setTest(A.depthTest),c.setMask(A.depthWrite),a.setMask(A.colorWrite);const de=A.stencilWrite;l.setTest(de),de&&(l.setMask(A.stencilWriteMask),l.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),l.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),Pe(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits)}function ge(A){T!==A&&(A?e.frontFace(2304):e.frontFace(2305),T=A)}function Ce(A){A!==il?(re(2884),A!==b&&(A===Xo?e.cullFace(1029):A===rl?e.cullFace(1028):e.cullFace(1032))):oe(2884),b=A}function pe(A){A!==L&&(R&&e.lineWidth(A),L=A)}function Pe(A,q,Z){A?(re(32823),(k!==q||H!==Z)&&(e.polygonOffset(q,Z),k=q,H=Z)):oe(32823)}function V(A){A?re(3089):oe(3089)}function X(A){A===void 0&&(A=33984+te-1),B!==A&&(e.activeTexture(A),B=A)}function J(A,q){B===null&&X();let Z=C[B];Z===void 0&&(Z={type:void 0,texture:void 0},C[B]=Z),(Z.type!==A||Z.texture!==q)&&(e.bindTexture(A,q||ee[A]),Z.type=A,Z.texture=q)}function ae(){const A=C[B];A!==void 0&&A.type!==void 0&&(e.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function ne(){try{e.compressedTexImage2D.apply(e,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ve(){try{e.texImage2D.apply(e,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function w(){try{e.texImage3D.apply(e,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function _(A){P.equals(A)===!1&&(e.scissor(A.x,A.y,A.z,A.w),P.copy(A))}function Y(A){z.equals(A)===!1&&(e.viewport(A.x,A.y,A.z,A.w),z.copy(A))}function j(){d={},B=null,C={},h=null,u=null,T=null,b=null,a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:re,disable:oe,useProgram:Se,setBlending:G,setMaterial:Ve,setFlipSided:ge,setCullFace:Ce,setLineWidth:pe,setPolygonOffset:Pe,setScissorTest:V,activeTexture:X,bindTexture:J,unbindTexture:ae,compressedTexImage2D:ne,texImage2D:ve,texImage3D:w,scissor:_,viewport:Y,reset:j}}function Yp(e,t,n,i,r,s,o){const a=r.isWebGL2,c=r.maxTextures,l=r.maxCubemapSize,d=r.maxTextureSize,h=r.maxSamples,f=new WeakMap;let u,m=!1;try{m=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(w){}function v(w,_){return m?new OffscreenCanvas(w,_):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function y(w,_,Y,j){let A=1;if((w.width>j||w.height>j)&&(A=j/Math.max(w.width,w.height)),A<1||_===!0)if(typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&w instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&w instanceof ImageBitmap){const q=_?be.floorPowerOfTwo:Math.floor,Z=q(A*w.width),de=q(A*w.height);u===void 0&&(u=v(Z,de));const Q=Y?v(Z,de):u;Q.width=Z,Q.height=de;const se=Q.getContext("2d");return se.drawImage(w,0,0,Z,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+Z+"x"+de+")."),Q}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function g(w){return be.isPowerOfTwo(w.width)&&be.isPowerOfTwo(w.height)}function p(w){return a?!1:w.wrapS!==ht||w.wrapT!==ht||w.minFilter!==tt&&w.minFilter!==$e}function E(w,_){return w.generateMipmaps&&_&&w.minFilter!==tt&&w.minFilter!==$e}function S(w,_,Y,j){e.generateMipmap(w);const A=i.get(_);A.__maxMipLevel=Math.log(Math.max(Y,j))*Math.LOG2E}function T(w,_,Y){if(a===!1)return _;if(w!==null){if(e[w]!==void 0)return e[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let j=_;return _===6403&&(Y===5126&&(j=33326),Y===5131&&(j=33325),Y===5121&&(j=33321)),_===6407&&(Y===5126&&(j=34837),Y===5131&&(j=34843),Y===5121&&(j=32849)),_===6408&&(Y===5126&&(j=34836),Y===5131&&(j=34842),Y===5121&&(j=32856)),(j===33325||j===33326||j===34842||j===34836)&&t.get("EXT_color_buffer_float"),j}function b(w){return w===tt||w===vs||w===xs?9728:9729}function L(w){const _=w.target;_.removeEventListener("dispose",L),H(_),_.isVideoTexture&&f.delete(_),o.memory.textures--}function k(w){const _=w.target;_.removeEventListener("dispose",k),te(_),o.memory.textures--}function H(w){const _=i.get(w);if(_.__webglInit===void 0)return;e.deleteTexture(_.__webglTexture),i.remove(w)}function te(w){const _=i.get(w),Y=i.get(w.texture);if(!w)return;if(Y.__webglTexture!==void 0&&e.deleteTexture(Y.__webglTexture),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let j=0;j<6;j++)e.deleteFramebuffer(_.__webglFramebuffer[j]),_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[j]);else e.deleteFramebuffer(_.__webglFramebuffer),_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer&&e.deleteRenderbuffer(_.__webglColorRenderbuffer),_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer);i.remove(w.texture),i.remove(w)}let R=0;function O(){R=0}function D(){const w=R;return w>=c&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+c),R+=1,w}function B(w,_){const Y=i.get(w);if(w.isVideoTexture&&X(w),w.version>0&&Y.__version!==w.version){const j=w.image;if(j===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(Y,w,_);return}}n.activeTexture(33984+_),n.bindTexture(3553,Y.__webglTexture)}function C(w,_){const Y=i.get(w);if(w.version>0&&Y.__version!==w.version){Se(Y,w,_);return}n.activeTexture(33984+_),n.bindTexture(35866,Y.__webglTexture)}function P(w,_){const Y=i.get(w);if(w.version>0&&Y.__version!==w.version){Se(Y,w,_);return}n.activeTexture(33984+_),n.bindTexture(32879,Y.__webglTexture)}function z(w,_){const Y=i.get(w);if(w.version>0&&Y.__version!==w.version){Ae(Y,w,_);return}n.activeTexture(33984+_),n.bindTexture(34067,Y.__webglTexture)}const U={[ur]:10497,[ht]:33071,[dr]:33648},ee={[tt]:9728,[vs]:9984,[xs]:9986,[$e]:9729,[ra]:9985,[Ci]:9987};function re(w,_,Y){Y?(e.texParameteri(w,10242,U[_.wrapS]),e.texParameteri(w,10243,U[_.wrapT]),(w===32879||w===35866)&&e.texParameteri(w,32882,U[_.wrapR]),e.texParameteri(w,10240,ee[_.magFilter]),e.texParameteri(w,10241,ee[_.minFilter])):(e.texParameteri(w,10242,33071),e.texParameteri(w,10243,33071),(w===32879||w===35866)&&e.texParameteri(w,32882,33071),(_.wrapS!==ht||_.wrapT!==ht)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(w,10240,b(_.magFilter)),e.texParameteri(w,10241,b(_.minFilter)),_.minFilter!==tt&&_.minFilter!==$e&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."));const j=t.get("EXT_texture_filter_anisotropic");if(j){if(_.type===tn&&t.get("OES_texture_float_linear")===null)return;if(_.type===mr&&(a||t.get("OES_texture_half_float_linear"))===null)return;(_.anisotropy>1||i.get(_).__currentAnisotropy)&&(e.texParameterf(w,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy)}}function oe(w,_){w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",L),w.__webglTexture=e.createTexture(),o.memory.textures++)}function Se(w,_,Y){let j=3553;_.isDataTexture2DArray&&(j=35866),_.isDataTexture3D&&(j=32879),oe(w,_),n.activeTexture(33984+Y),n.bindTexture(j,w.__webglTexture),e.pixelStorei(37440,_.flipY),e.pixelStorei(37441,_.premultiplyAlpha),e.pixelStorei(3317,_.unpackAlignment);const A=p(_)&&g(_.image)===!1,q=y(_.image,A,!1,d),Z=g(q)||a,de=s.convert(_.format);let Q=s.convert(_.type),se=T(_.internalFormat,de,Q);re(j,_,Z);let ue;const xe=_.mipmaps;if(_.isDepthTexture)se=6402,a?_.type===tn?se=36012:_.type===pr?se=33190:_.type===Pi?se=35056:se=33189:_.type===tn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===zn&&se===6402&&(_.type!==fr&&_.type!==pr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=fr,Q=s.convert(_.type))),_.format===Ii&&se===6402&&(se=34041,_.type!==Pi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=Pi,Q=s.convert(_.type))),n.texImage2D(3553,0,se,q.width,q.height,0,de,Q,null);else if(_.isDataTexture)if(xe.length>0&&Z){for(let ie=0,me=xe.length;ie<me;ie++)ue=xe[ie],n.texImage2D(3553,ie,se,ue.width,ue.height,0,de,Q,ue.data);_.generateMipmaps=!1,w.__maxMipLevel=xe.length-1}else n.texImage2D(3553,0,se,q.width,q.height,0,de,Q,q.data),w.__maxMipLevel=0;else if(_.isCompressedTexture){for(let ie=0,me=xe.length;ie<me;ie++)ue=xe[ie],_.format!==vt&&_.format!==nn?de!==null?n.compressedTexImage2D(3553,ie,se,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):n.texImage2D(3553,ie,se,ue.width,ue.height,0,de,Q,ue.data);w.__maxMipLevel=xe.length-1}else if(_.isDataTexture2DArray)n.texImage3D(35866,0,se,q.width,q.height,q.depth,0,de,Q,q.data),w.__maxMipLevel=0;else if(_.isDataTexture3D)n.texImage3D(32879,0,se,q.width,q.height,q.depth,0,de,Q,q.data),w.__maxMipLevel=0;else if(xe.length>0&&Z){for(let ie=0,me=xe.length;ie<me;ie++)ue=xe[ie],n.texImage2D(3553,ie,se,de,Q,ue);_.generateMipmaps=!1,w.__maxMipLevel=xe.length-1}else n.texImage2D(3553,0,se,de,Q,q),w.__maxMipLevel=0;E(_,Z)&&S(j,_,q.width,q.height),w.__version=_.version,_.onUpdate&&_.onUpdate(_)}function Ae(w,_,Y){if(_.image.length!==6)return;oe(w,_),n.activeTexture(33984+Y),n.bindTexture(34067,w.__webglTexture),e.pixelStorei(37440,_.flipY);const j=_&&(_.isCompressedTexture||_.image[0].isCompressedTexture),A=_.image[0]&&_.image[0].isDataTexture,q=[];for(let ie=0;ie<6;ie++)!j&&!A?q[ie]=y(_.image[ie],!1,!0,l):q[ie]=A?_.image[ie].image:_.image[ie];const Z=q[0],de=g(Z)||a,Q=s.convert(_.format),se=s.convert(_.type),ue=T(_.internalFormat,Q,se);re(34067,_,de);let xe;if(j){for(let ie=0;ie<6;ie++){xe=q[ie].mipmaps;for(let me=0;me<xe.length;me++){const je=xe[me];_.format!==vt&&_.format!==nn?Q!==null?n.compressedTexImage2D(34069+ie,me,ue,je.width,je.height,0,je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):n.texImage2D(34069+ie,me,ue,je.width,je.height,0,Q,se,je.data)}}w.__maxMipLevel=xe.length-1}else{xe=_.mipmaps;for(let ie=0;ie<6;ie++)if(A){n.texImage2D(34069+ie,0,ue,q[ie].width,q[ie].height,0,Q,se,q[ie].data);for(let me=0;me<xe.length;me++){const je=xe[me],ct=je.image[ie].image;n.texImage2D(34069+ie,me+1,ue,ct.width,ct.height,0,Q,se,ct.data)}}else{n.texImage2D(34069+ie,0,ue,Q,se,q[ie]);for(let me=0;me<xe.length;me++){const je=xe[me];n.texImage2D(34069+ie,me+1,ue,Q,se,je.image[ie])}}w.__maxMipLevel=xe.length}E(_,de)&&S(34067,_,Z.width,Z.height),w.__version=_.version,_.onUpdate&&_.onUpdate(_)}function He(w,_,Y,j){const A=s.convert(_.texture.format),q=s.convert(_.texture.type),Z=T(_.texture.internalFormat,A,q);n.texImage2D(j,0,Z,_.width,_.height,0,A,q,null),e.bindFramebuffer(36160,w),e.framebufferTexture2D(36160,Y,j,i.get(_.texture).__webglTexture,0),e.bindFramebuffer(36160,null)}function G(w,_,Y){if(e.bindRenderbuffer(36161,w),_.depthBuffer&&!_.stencilBuffer){let j=33189;if(Y){const A=_.depthTexture;A&&A.isDepthTexture&&(A.type===tn?j=36012:A.type===pr&&(j=33190));const q=V(_);e.renderbufferStorageMultisample(36161,q,j,_.width,_.height)}else e.renderbufferStorage(36161,j,_.width,_.height);e.framebufferRenderbuffer(36160,36096,36161,w)}else if(_.depthBuffer&&_.stencilBuffer){if(Y){const j=V(_);e.renderbufferStorageMultisample(36161,j,35056,_.width,_.height)}else e.renderbufferStorage(36161,34041,_.width,_.height);e.framebufferRenderbuffer(36160,33306,36161,w)}else{const j=s.convert(_.texture.format),A=s.convert(_.texture.type),q=T(_.texture.internalFormat,j,A);if(Y){const Z=V(_);e.renderbufferStorageMultisample(36161,Z,q,_.width,_.height)}else e.renderbufferStorage(36161,q,_.width,_.height)}e.bindRenderbuffer(36161,null)}function Ve(w,_){const Y=_&&_.isWebGLCubeRenderTarget;if(Y)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),B(_.depthTexture,0);const j=i.get(_.depthTexture).__webglTexture;if(_.depthTexture.format===zn)e.framebufferTexture2D(36160,36096,3553,j,0);else if(_.depthTexture.format===Ii)e.framebufferTexture2D(36160,33306,3553,j,0);else throw new Error("Unknown depthTexture format")}function ge(w){const _=i.get(w),Y=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Ve(_.__webglFramebuffer,w)}else if(Y){_.__webglDepthbuffer=[];for(let j=0;j<6;j++)e.bindFramebuffer(36160,_.__webglFramebuffer[j]),_.__webglDepthbuffer[j]=e.createRenderbuffer(),G(_.__webglDepthbuffer[j],w,!1)}else e.bindFramebuffer(36160,_.__webglFramebuffer),_.__webglDepthbuffer=e.createRenderbuffer(),G(_.__webglDepthbuffer,w,!1);e.bindFramebuffer(36160,null)}function Ce(w){const _=i.get(w),Y=i.get(w.texture);w.addEventListener("dispose",k),Y.__webglTexture=e.createTexture(),o.memory.textures++;const j=w.isWebGLCubeRenderTarget===!0,A=w.isWebGLMultisampleRenderTarget===!0,q=g(w)||a;if(a&&w.texture.format===nn&&(w.texture.type===tn||w.texture.type===mr)&&(w.texture.format=vt,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),j){_.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)_.__webglFramebuffer[Z]=e.createFramebuffer()}else if(_.__webglFramebuffer=e.createFramebuffer(),A)if(a){_.__webglMultisampledFramebuffer=e.createFramebuffer(),_.__webglColorRenderbuffer=e.createRenderbuffer(),e.bindRenderbuffer(36161,_.__webglColorRenderbuffer);const Z=s.convert(w.texture.format),de=s.convert(w.texture.type),Q=T(w.texture.internalFormat,Z,de),se=V(w);e.renderbufferStorageMultisample(36161,se,Q,w.width,w.height),e.bindFramebuffer(36160,_.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(36160,36064,36161,_.__webglColorRenderbuffer),e.bindRenderbuffer(36161,null),w.depthBuffer&&(_.__webglDepthRenderbuffer=e.createRenderbuffer(),G(_.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(j){n.bindTexture(34067,Y.__webglTexture),re(34067,w.texture,q);for(let Z=0;Z<6;Z++)He(_.__webglFramebuffer[Z],w,36064,34069+Z);E(w.texture,q)&&S(34067,w.texture,w.width,w.height),n.bindTexture(34067,null)}else n.bindTexture(3553,Y.__webglTexture),re(3553,w.texture,q),He(_.__webglFramebuffer,w,36064,3553),E(w.texture,q)&&S(3553,w.texture,w.width,w.height),n.bindTexture(3553,null);w.depthBuffer&&ge(w)}function pe(w){const _=w.texture,Y=g(w)||a;if(E(_,Y)){const j=w.isWebGLCubeRenderTarget?34067:3553,A=i.get(_).__webglTexture;n.bindTexture(j,A),S(j,_,w.width,w.height),n.bindTexture(j,null)}}function Pe(w){if(w.isWebGLMultisampleRenderTarget)if(a){const _=i.get(w);e.bindFramebuffer(36008,_.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,_.__webglFramebuffer);const Y=w.width,j=w.height;let A=16384;w.depthBuffer&&(A|=256),w.stencilBuffer&&(A|=1024),e.blitFramebuffer(0,0,Y,j,0,0,Y,j,A,9728),e.bindFramebuffer(36160,_.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function V(w){return a&&w.isWebGLMultisampleRenderTarget?Math.min(h,w.samples):0}function X(w){const _=o.render.frame;f.get(w)!==_&&(f.set(w,_),w.update())}let J=!1,ae=!1;function ne(w,_){w&&w.isWebGLRenderTarget&&(J===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),J=!0),w=w.texture),B(w,_)}function ve(w,_){w&&w.isWebGLCubeRenderTarget&&(ae===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),ae=!0),w=w.texture),z(w,_)}this.allocateTextureUnit=D,this.resetTextureUnits=O,this.setTexture2D=B,this.setTexture2DArray=C,this.setTexture3D=P,this.setTextureCube=z,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=Pe,this.safeSetTexture2D=ne,this.safeSetTextureCube=ve}function Zp(e,t,n){const i=n.isWebGL2;function r(s){let o;if(s===_s)return 5121;if(s===Ol)return 32819;if(s===Bl)return 32820;if(s===Fl)return 33635;if(s===Il)return 5120;if(s===Dl)return 5122;if(s===fr)return 5123;if(s===Nl)return 5124;if(s===pr)return 5125;if(s===tn)return 5126;if(s===mr)return i?5131:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Ul)return 6406;if(s===nn)return 6407;if(s===vt)return 6408;if(s===zl)return 6409;if(s===kl)return 6410;if(s===zn)return 6402;if(s===Ii)return 34041;if(s===Hl)return 6403;if(s===Gl)return 36244;if(s===Vl)return 33319;if(s===Wl)return 33320;if(s===jl)return 36248;if(s===ql)return 36249;if(s===sa||s===oa||s===aa||s===ca)if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===sa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===oa)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===aa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ca)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===la||s===ha||s===ua||s===da)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===la)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ha)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ua)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===da)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Xl)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if((s===fa||s===pa)&&(o=t.get("WEBGL_compressed_texture_etc"),o!==null)){if(s===fa)return o.COMPRESSED_RGB8_ETC2;if(s===pa)return o.COMPRESSED_RGBA8_ETC2_EAC}if(s===Yl||s===Zl||s===Jl||s===Ql||s===$l||s===Kl||s===eh||s===th||s===nh||s===ih||s===rh||s===sh||s===oh||s===ah||s===lh||s===hh||s===uh||s===dh||s===fh||s===ph||s===mh||s===gh||s===yh||s===vh||s===xh||s===_h||s===bh||s===wh)return o=t.get("WEBGL_compressed_texture_astc"),o!==null?s:null;if(s===ch)return o=t.get("EXT_texture_compression_bptc"),o!==null?s:null;if(s===Pi)return i?34042:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:r}}function eo(e){Qe.call(this),this.cameras=e||[]}eo.prototype=Object.assign(Object.create(Qe.prototype),{constructor:eo,isArrayCamera:!0});function In(){le.call(this),this.type="Group"}In.prototype=Object.assign(Object.create(le.prototype),{constructor:In,isGroup:!0});function Zi(){this._targetRay=null,this._grip=null,this._hand=null}Object.assign(Zi.prototype,{constructor:Zi,getHandSpace:function(){if(this._hand===null&&(this._hand=new In,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints=[],this._hand.inputState={pinching:!1},window.XRHand))for(let e=0;e<=window.XRHand.LITTLE_PHALANX_TIP;e++){const t=new In;t.matrixAutoUpdate=!1,t.visible=!1,this._hand.joints.push(t),this._hand.add(t)}return this._hand},getTargetRaySpace:function(){return this._targetRay===null&&(this._targetRay=new In,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1),this._targetRay},getGripSpace:function(){return this._grip===null&&(this._grip=new In,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1),this._grip},dispatchEvent:function(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this},disconnect:function(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this},update:function(e,t,n){let i=null,r=null,s=null;const o=this._targetRay,a=this._grip,c=this._hand;if(e)if(c&&e.hand){s=!0;for(let l=0;l<=window.XRHand.LITTLE_PHALANX_TIP;l++)if(e.hand[l]){const d=t.getJointPose(e.hand[l],n),h=c.joints[l];d!==null&&(h.matrix.fromArray(d.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.jointRadius=d.radius),h.visible=d!==null;const f=c.joints[window.XRHand.INDEX_PHALANX_TIP],u=c.joints[window.XRHand.THUMB_PHALANX_TIP],m=f.position.distanceTo(u.position),v=.02,y=.005;c.inputState.pinching&&m>v+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&m<=v-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}}else o!==null&&(i=t.getPose(e.targetRaySpace,n),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale))),a!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale)));return o!==null&&(o.visible=i!==null),a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),this}});function rc(e,t){const n=this;let i=null,r=1,s=null,o="local-floor",a=null;const c=[],l=new Map,d=new Qe;d.layers.enable(1),d.viewport=new Ie;const h=new Qe;h.layers.enable(2),h.viewport=new Ie;const f=[d,h],u=new eo;u.layers.enable(1),u.layers.enable(2);let m=null,v=null;this.enabled=!1,this.isPresenting=!1,this.getController=function(R){let O=c[R];return O===void 0&&(O=new Zi,c[R]=O),O.getTargetRaySpace()},this.getControllerGrip=function(R){let O=c[R];return O===void 0&&(O=new Zi,c[R]=O),O.getGripSpace()},this.getHand=function(R){let O=c[R];return O===void 0&&(O=new Zi,c[R]=O),O.getHandSpace()};function y(R){const O=l.get(R.inputSource);O&&O.dispatchEvent({type:R.type,data:R.inputSource})}function g(){l.forEach(function(R,O){R.disconnect(O)}),l.clear(),e.setFramebuffer(null),e.setRenderTarget(e.getRenderTarget()),te.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}function p(R){s=R,te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}this.setFramebufferScaleFactor=function(R){r=R,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(R){o=R,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return s},this.getSession=function(){return i},this.setSession=function(R){if(i=R,i!==null){i.addEventListener("select",y),i.addEventListener("selectstart",y),i.addEventListener("selectend",y),i.addEventListener("squeeze",y),i.addEventListener("squeezestart",y),i.addEventListener("squeezeend",y),i.addEventListener("end",g);const O=t.getContextAttributes();O.xrCompatible!==!0&&t.makeXRCompatible();const D={antialias:O.antialias,alpha:O.alpha,depth:O.depth,stencil:O.stencil,framebufferScaleFactor:r},B=new XRWebGLLayer(i,t,D);i.updateRenderState({baseLayer:B}),i.requestReferenceSpace(o).then(p),i.addEventListener("inputsourceschange",E)}};function E(R){const O=i.inputSources;for(let D=0;D<c.length;D++)l.set(O[D],c[D]);for(let D=0;D<R.removed.length;D++){const B=R.removed[D],C=l.get(B);C&&(C.dispatchEvent({type:"disconnected",data:B}),l.delete(B))}for(let D=0;D<R.added.length;D++){const B=R.added[D],C=l.get(B);C&&C.dispatchEvent({type:"connected",data:B})}}const S=new M,T=new M;function b(R,O,D){S.setFromMatrixPosition(O.matrixWorld),T.setFromMatrixPosition(D.matrixWorld);const B=S.distanceTo(T),C=O.projectionMatrix.elements,P=D.projectionMatrix.elements,z=C[14]/(C[10]-1),U=C[14]/(C[10]+1),ee=(C[9]+1)/C[5],re=(C[9]-1)/C[5],oe=(C[8]-1)/C[0],Se=(P[8]+1)/P[0],Ae=z*oe,He=z*Se,G=B/(-oe+Se),Ve=G*-oe;O.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(Ve),R.translateZ(G),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.getInverse(R.matrixWorld);const ge=z+G,Ce=U+G,pe=Ae-Ve,Pe=He+(B-Ve),V=ee*U/Ce*ge,X=re*U/Ce*ge;R.projectionMatrix.makePerspective(pe,Pe,V,X,ge,Ce)}function L(R,O){O===null?R.matrixWorld.copy(R.matrix):R.matrixWorld.multiplyMatrices(O.matrixWorld,R.matrix),R.matrixWorldInverse.getInverse(R.matrixWorld)}this.getCamera=function(R){u.near=h.near=d.near=R.near,u.far=h.far=d.far=R.far,(m!==u.near||v!==u.far)&&(i.updateRenderState({depthNear:u.near,depthFar:u.far}),m=u.near,v=u.far);const O=R.parent,D=u.cameras;L(u,O);for(let C=0;C<D.length;C++)L(D[C],O);R.matrixWorld.copy(u.matrixWorld);const B=R.children;for(let C=0,P=B.length;C<P;C++)B[C].updateMatrixWorld(!0);return D.length===2?b(u,d,h):u.projectionMatrix.copy(d.projectionMatrix),u};let k=null;function H(R,O){if(a=O.getViewerPose(s),a!==null){const B=a.views,C=i.renderState.baseLayer;e.setFramebuffer(C.framebuffer);let P=!1;B.length!==u.cameras.length&&(u.cameras.length=0,P=!0);for(let z=0;z<B.length;z++){const U=B[z],ee=C.getViewport(U),re=f[z];re.matrix.fromArray(U.transform.matrix),re.projectionMatrix.fromArray(U.projectionMatrix),re.viewport.set(ee.x,ee.y,ee.width,ee.height),z===0&&u.matrix.copy(re.matrix),P===!0&&u.cameras.push(re)}}const D=i.inputSources;for(let B=0;B<c.length;B++){const C=c[B],P=D[B];C.update(P,O,s)}k&&k(R,O)}const te=new Na;te.setAnimationLoop(H),this.setAnimationLoop=function(R){k=R},this.dispose=function(){}}Object.assign(rc.prototype,Wt.prototype);function Jp(e){function t(g,p){g.fogColor.value.copy(p.color),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function n(g,p,E,S){p.isMeshBasicMaterial?i(g,p):p.isMeshLambertMaterial?(i(g,p),c(g,p)):p.isMeshToonMaterial?(i(g,p),d(g,p)):p.isMeshPhongMaterial?(i(g,p),l(g,p)):p.isMeshStandardMaterial?(i(g,p),p.isMeshPhysicalMaterial?f(g,p):h(g,p)):p.isMeshMatcapMaterial?(i(g,p),u(g,p)):p.isMeshDepthMaterial?(i(g,p),m(g,p)):p.isMeshDistanceMaterial?(i(g,p),v(g,p)):p.isMeshNormalMaterial?(i(g,p),y(g,p)):p.isLineBasicMaterial?(r(g,p),p.isLineDashedMaterial&&s(g,p)):p.isPointsMaterial?o(g,p,E,S):p.isSpriteMaterial?a(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function i(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map),p.alphaMap&&(g.alphaMap.value=p.alphaMap),p.specularMap&&(g.specularMap.value=p.specularMap);const E=e.get(p).envMap;if(E){g.envMap.value=E,g.flipEnvMap.value=E.isCubeTexture&&E._needsFlipEnvMap?-1:1,g.reflectivity.value=p.reflectivity,g.refractionRatio.value=p.refractionRatio;const b=e.get(E).__maxMipLevel;b!==void 0&&(g.maxMipLevel.value=b)}p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity);let S;p.map?S=p.map:p.specularMap?S=p.specularMap:p.displacementMap?S=p.displacementMap:p.normalMap?S=p.normalMap:p.bumpMap?S=p.bumpMap:p.roughnessMap?S=p.roughnessMap:p.metalnessMap?S=p.metalnessMap:p.alphaMap?S=p.alphaMap:p.emissiveMap?S=p.emissiveMap:p.clearcoatMap?S=p.clearcoatMap:p.clearcoatNormalMap?S=p.clearcoatNormalMap:p.clearcoatRoughnessMap&&(S=p.clearcoatRoughnessMap),S!==void 0&&(S.isWebGLRenderTarget&&(S=S.texture),S.matrixAutoUpdate===!0&&S.updateMatrix(),g.uvTransform.value.copy(S.matrix));let T;p.aoMap?T=p.aoMap:p.lightMap&&(T=p.lightMap),T!==void 0&&(T.isWebGLRenderTarget&&(T=T.texture),T.matrixAutoUpdate===!0&&T.updateMatrix(),g.uv2Transform.value.copy(T.matrix))}function r(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity}function s(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function o(g,p,E,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=S*.5,p.map&&(g.map.value=p.map),p.alphaMap&&(g.alphaMap.value=p.alphaMap);let T;p.map?T=p.map:p.alphaMap&&(T=p.alphaMap),T!==void 0&&(T.matrixAutoUpdate===!0&&T.updateMatrix(),g.uvTransform.value.copy(T.matrix))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map),p.alphaMap&&(g.alphaMap.value=p.alphaMap);let E;p.map?E=p.map:p.alphaMap&&(E=p.alphaMap),E!==void 0&&(E.matrixAutoUpdate===!0&&E.updateMatrix(),g.uvTransform.value.copy(E.matrix))}function c(g,p){p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap)}function l(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap),p.bumpMap&&(g.bumpMap.value=p.bumpMap,g.bumpScale.value=p.bumpScale,p.side===Ze&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,g.normalScale.value.copy(p.normalScale),p.side===Ze&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap),p.bumpMap&&(g.bumpMap.value=p.bumpMap,g.bumpScale.value=p.bumpScale,p.side===Ze&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,g.normalScale.value.copy(p.normalScale),p.side===Ze&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias)}function h(g,p){g.roughness.value=p.roughness,g.metalness.value=p.metalness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap),p.bumpMap&&(g.bumpMap.value=p.bumpMap,g.bumpScale.value=p.bumpScale,p.side===Ze&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,g.normalScale.value.copy(p.normalScale),p.side===Ze&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias);const E=e.get(p).envMap;E&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p){h(g,p),g.reflectivity.value=p.reflectivity,g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.sheen&&g.sheen.value.copy(p.sheen),p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),g.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===Ze&&g.clearcoatNormalScale.value.negate()),g.transmission.value=p.transmission,p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap)}function u(g,p){p.matcap&&(g.matcap.value=p.matcap),p.bumpMap&&(g.bumpMap.value=p.bumpMap,g.bumpScale.value=p.bumpScale,p.side===Ze&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,g.normalScale.value.copy(p.normalScale),p.side===Ze&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias)}function m(g,p){p.displacementMap&&(g.displacementMap.value=p.displacementMap,g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias)}function v(g,p){p.displacementMap&&(g.displacementMap.value=p.displacementMap,g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),g.referencePosition.value.copy(p.referencePosition),g.nearDistance.value=p.nearDistance,g.farDistance.value=p.farDistance}function y(g,p){p.bumpMap&&(g.bumpMap.value=p.bumpMap,g.bumpScale.value=p.bumpScale,p.side===Ze&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,g.normalScale.value.copy(p.normalScale),p.side===Ze&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias)}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function Nr(e){e=e||{};const t=e.canvas!==void 0?e.canvas:document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),n=e.context!==void 0?e.context:null,i=e.alpha!==void 0?e.alpha:!1,r=e.depth!==void 0?e.depth:!0,s=e.stencil!==void 0?e.stencil:!0,o=e.antialias!==void 0?e.antialias:!1,a=e.premultipliedAlpha!==void 0?e.premultipliedAlpha:!0,c=e.preserveDrawingBuffer!==void 0?e.preserveDrawingBuffer:!1,l=e.powerPreference!==void 0?e.powerPreference:"default",d=e.failIfMajorPerformanceCaveat!==void 0?e.failIfMajorPerformanceCaveat:!1;let h=null,f=null;this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=Oi,this.physicallyCorrectLights=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.maxMorphTargets=8,this.maxMorphNormals=4;const u=this;let m=!1,v=null,y=0,g=0,p=null,E=null,S=-1,T=null,b=null;const L=new Ie,k=new Ie;let H=null,te=t.width,R=t.height,O=1,D=null,B=null;const C=new Ie(0,0,te,R),P=new Ie(0,0,te,R);let z=!1;const U=new Dr;let ee=!1,re=!1;const oe=new Ee,Se=new M,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function He(){return p===null?O:1}let G=n;function Ve(x,N){for(let I=0;I<x.length;I++){const F=x[I],K=t.getContext(F,N);if(K!==null)return K}return null}try{const x={alpha:i,depth:r,stencil:s,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:d};if(t.addEventListener("webglcontextlost",je,!1),t.addEventListener("webglcontextrestored",ct,!1),G===null){const N=["webgl2","webgl","experimental-webgl"];if(u.isWebGL1Renderer===!0&&N.shift(),G=Ve(N,x),G===null)throw Ve(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let ge,Ce,pe,Pe,V,X,J,ae,ne,ve,w,_,Y,j,A,q,Z,de,Q,se,ue;function xe(){ge=new Lf(G),Ce=new Ef(G,ge,e),Ce.isWebGL2===!1&&(ge.get("WEBGL_depth_texture"),ge.get("OES_texture_float"),ge.get("OES_texture_half_float"),ge.get("OES_texture_half_float_linear"),ge.get("OES_standard_derivatives"),ge.get("OES_element_index_uint"),ge.get("OES_vertex_array_object"),ge.get("ANGLE_instanced_arrays")),ge.get("OES_texture_float_linear"),se=new Zp(G,ge,Ce),pe=new Xp(G,ge,Ce),pe.scissor(k.copy(P).multiplyScalar(O).floor()),pe.viewport(L.copy(C).multiplyScalar(O).floor()),Pe=new Pf(G),V=new Op,X=new Yp(G,ge,pe,V,Ce,se,Pe),J=new Af(u),ae=new Kh(G,Ce),ue=new Mf(G,ge,ae,Ce),ne=new Rf(G,ae,Pe,ue),ve=new Of(G,ne,ae,Pe),Z=new Nf(G),A=new Tf(V),w=new Np(u,J,ge,Ce,ue,A),_=new Jp(V),Y=new Up(V),j=new Wp(ge,Ce),q=new wf(u,J,pe,ve,a),de=new Sf(G,ge,Pe,Ce),Q=new Cf(G,ge,Pe,Ce),Pe.programs=w.programs,u.capabilities=Ce,u.extensions=ge,u.properties=V,u.renderLists=Y,u.state=pe,u.info=Pe}xe();const ie=new rc(u,G);this.xr=ie;const me=new ic(u,ve,Ce.maxTextureSize);this.shadowMap=me,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const x=ge.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=ge.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(x){if(x===void 0)return;O=x,this.setSize(te,R,!1)},this.getSize=function(x){return x===void 0&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),x=new W),x.set(te,R)},this.setSize=function(x,N,I){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=x,R=N,t.width=Math.floor(x*O),t.height=Math.floor(N*O),I!==!1&&(t.style.width=x+"px",t.style.height=N+"px"),this.setViewport(0,0,x,N)},this.getDrawingBufferSize=function(x){return x===void 0&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),x=new W),x.set(te*O,R*O).floor()},this.setDrawingBufferSize=function(x,N,I){te=x,R=N,O=I,t.width=Math.floor(x*I),t.height=Math.floor(N*I),this.setViewport(0,0,x,N)},this.getCurrentViewport=function(x){return x===void 0&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),x=new Ie),x.copy(L)},this.getViewport=function(x){return x.copy(C)},this.setViewport=function(x,N,I,F){x.isVector4?C.set(x.x,x.y,x.z,x.w):C.set(x,N,I,F),pe.viewport(L.copy(C).multiplyScalar(O).floor())},this.getScissor=function(x){return x.copy(P)},this.setScissor=function(x,N,I,F){x.isVector4?P.set(x.x,x.y,x.z,x.w):P.set(x,N,I,F),pe.scissor(k.copy(P).multiplyScalar(O).floor())},this.getScissorTest=function(){return z},this.setScissorTest=function(x){pe.setScissorTest(z=x)},this.setOpaqueSort=function(x){D=x},this.setTransparentSort=function(x){B=x},this.getClearColor=function(){return q.getClearColor()},this.setClearColor=function(){q.setClearColor.apply(q,arguments)},this.getClearAlpha=function(){return q.getClearAlpha()},this.setClearAlpha=function(){q.setClearAlpha.apply(q,arguments)},this.clear=function(x,N,I){let F=0;(x===void 0||x)&&(F|=16384),(N===void 0||N)&&(F|=256),(I===void 0||I)&&(F|=1024),G.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",je,!1),t.removeEventListener("webglcontextrestored",ct,!1),Y.dispose(),j.dispose(),V.dispose(),J.dispose(),ve.dispose(),ue.dispose(),ie.dispose(),wi.stop()};function je(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),m=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),m=!1,xe()}function Ho(x){const N=x.target;N.removeEventListener("dispose",Ho),Qc(N)}function Qc(x){Go(x),V.remove(x)}function Go(x){const N=V.get(x).program;N!==void 0&&w.releaseProgram(N)}function $c(x,N){x.render(function(I){u.renderBufferImmediate(I,N)})}this.renderBufferImmediate=function(x,N){ue.initAttributes();const I=V.get(x);x.hasPositions&&!I.position&&(I.position=G.createBuffer()),x.hasNormals&&!I.normal&&(I.normal=G.createBuffer()),x.hasUvs&&!I.uv&&(I.uv=G.createBuffer()),x.hasColors&&!I.color&&(I.color=G.createBuffer());const F=N.getAttributes();x.hasPositions&&(G.bindBuffer(34962,I.position),G.bufferData(34962,x.positionArray,35048),ue.enableAttribute(F.position),G.vertexAttribPointer(F.position,3,5126,!1,0,0)),x.hasNormals&&(G.bindBuffer(34962,I.normal),G.bufferData(34962,x.normalArray,35048),ue.enableAttribute(F.normal),G.vertexAttribPointer(F.normal,3,5126,!1,0,0)),x.hasUvs&&(G.bindBuffer(34962,I.uv),G.bufferData(34962,x.uvArray,35048),ue.enableAttribute(F.uv),G.vertexAttribPointer(F.uv,2,5126,!1,0,0)),x.hasColors&&(G.bindBuffer(34962,I.color),G.bufferData(34962,x.colorArray,35048),ue.enableAttribute(F.color),G.vertexAttribPointer(F.color,3,5126,!1,0,0)),ue.disableUnusedAttributes(),G.drawArrays(4,0,x.count),x.count=0},this.renderBufferDirect=function(x,N,I,F,K,Le){N===null&&(N=Ae);const we=K.isMesh&&K.matrixWorld.determinant()<0,Re=qo(x,N,F,K);pe.setMaterial(F,we);let Me=I.index;const Xe=I.attributes.position;if(Me===null){if(Xe===void 0||Xe.count===0)return}else if(Me.count===0)return;let qe=1;F.wireframe===!0&&(Me=ne.getWireframeAttribute(I),qe=2),(F.morphTargets||F.morphNormals)&&Z.update(K,I,F,Re),ue.setup(K,F,Re,I,Me);let _e,Be=de;Me!==null&&(_e=ae.get(Me),Be=Q,Be.setIndex(_e));const Vt=Me!==null?Me.count:Xe.count,Fe=I.drawRange.start*qe,Sn=I.drawRange.count*qe,Ye=Le!==null?Le.start*qe:0,hs=Le!==null?Le.count*qe:Infinity,lt=Math.max(Fe,Ye),Mi=Math.min(Vt,Fe+Sn,Ye+hs)-1,Bn=Math.max(0,Mi-lt+1);if(Bn===0)return;if(K.isMesh)F.wireframe===!0?(pe.setLineWidth(F.wireframeLinewidth*He()),Be.setMode(1)):Be.setMode(4);else if(K.isLine){let Si=F.linewidth;Si===void 0&&(Si=1),pe.setLineWidth(Si*He()),K.isLineSegments?Be.setMode(1):K.isLineLoop?Be.setMode(2):Be.setMode(3)}else K.isPoints?Be.setMode(0):K.isSprite&&Be.setMode(4);if(K.isInstancedMesh)Be.renderInstances(lt,Bn,K.count);else if(I.isInstancedBufferGeometry){const Si=Math.min(I.instanceCount,I._maxInstanceCount);Be.renderInstances(lt,Bn,Si)}else Be.render(lt,Bn)},this.compile=function(x,N){f=j.get(x,N),f.init(),x.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights(N);const I=new WeakMap;x.traverse(function(F){const K=F.material;if(K)if(Array.isArray(K))for(let Le=0;Le<K.length;Le++){const we=K[Le];I.has(we)===!1&&(Gt(we,x,F),I.set(we))}else I.has(K)===!1&&(Gt(K,x,F),I.set(K))})};let ls=null;function Kc(x){if(ie.isPresenting)return;ls&&ls(x)}const wi=new Na;wi.setAnimationLoop(Kc),typeof window!="undefined"&&wi.setContext(window),this.setAnimationLoop=function(x){ls=x,ie.setAnimationLoop(x),x===null?wi.stop():wi.start()},this.render=function(x,N){let I,F;if(arguments[2]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),I=arguments[2]),arguments[3]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),F=arguments[3]),N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(m===!0)return;ue.resetDefaultState(),S=-1,T=null,x.autoUpdate===!0&&x.updateMatrixWorld(),N.parent===null&&N.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(N=ie.getCamera(N)),x.isScene===!0&&x.onBeforeRender(u,x,N,I||p),f=j.get(x,N),f.init(),oe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),U.setFromProjectionMatrix(oe),re=this.localClippingEnabled,ee=A.init(this.clippingPlanes,re,N),h=Y.get(x,N),h.init(),Vo(x,N,0,u.sortObjects),h.finish(),u.sortObjects===!0&&h.sort(D,B),ee===!0&&A.beginShadows();const K=f.state.shadowsArray;me.render(K,x,N),f.setupLights(N),ee===!0&&A.endShadows(),this.info.autoReset===!0&&this.info.reset(),I!==void 0&&this.setRenderTarget(I),q.render(h,x,N,F);const Le=h.opaque,we=h.transparent;Le.length>0&&Wo(Le,x,N),we.length>0&&Wo(we,x,N),x.isScene===!0&&x.onAfterRender(u,x,N),p!==null&&(X.updateRenderTargetMipmap(p),X.updateMultisampleRenderTarget(p)),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1),h=null,f=null};function Vo(x,N,I,F){if(x.visible===!1)return;const K=x.layers.test(N.layers);if(K){if(x.isGroup)I=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(N);else if(x.isLight)f.pushLight(x),x.castShadow&&f.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||U.intersectsSprite(x)){F&&Se.setFromMatrixPosition(x.matrixWorld).applyMatrix4(oe);const we=ve.update(x),Re=x.material;Re.visible&&h.push(x,we,Re,I,Se.z,null)}}else if(x.isImmediateRenderObject)F&&Se.setFromMatrixPosition(x.matrixWorld).applyMatrix4(oe),h.push(x,null,x.material,I,Se.z,null);else if((x.isMesh||x.isLine||x.isPoints)&&(x.isSkinnedMesh&&(x.skeleton.frame!==Pe.render.frame&&(x.skeleton.update(),x.skeleton.frame=Pe.render.frame)),!x.frustumCulled||U.intersectsObject(x))){F&&Se.setFromMatrixPosition(x.matrixWorld).applyMatrix4(oe);const we=ve.update(x),Re=x.material;if(Array.isArray(Re)){const Me=we.groups;for(let Xe=0,qe=Me.length;Xe<qe;Xe++){const _e=Me[Xe],Be=Re[_e.materialIndex];Be&&Be.visible&&h.push(x,we,Be,I,Se.z,_e)}}else Re.visible&&h.push(x,we,Re,I,Se.z,null)}}const Le=x.children;for(let we=0,Re=Le.length;we<Re;we++)Vo(Le[we],N,I,F)}function Wo(x,N,I){const F=N.isScene===!0?N.overrideMaterial:null;for(let K=0,Le=x.length;K<Le;K++){const we=x[K],Re=we.object,Me=we.geometry,Xe=F===null?we.material:F,qe=we.group;if(I.isArrayCamera){b=I;const _e=I.cameras;for(let Be=0,Vt=_e.length;Be<Vt;Be++){const Fe=_e[Be];Re.layers.test(Fe.layers)&&(pe.viewport(L.copy(Fe.viewport)),f.setupLights(Fe),jo(Re,N,Fe,Me,Xe,qe))}}else b=null,jo(Re,N,I,Me,Xe,qe)}}function jo(x,N,I,F,K,Le){if(x.onBeforeRender(u,N,I,F,K,Le),f=j.get(N,b||I),x.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),x.isImmediateRenderObject){const we=qo(I,N,K,x);pe.setMaterial(K),ue.reset(),$c(x,we)}else u.renderBufferDirect(I,N,F,K,x,Le);x.onAfterRender(u,N,I,F,K,Le),f=j.get(N,b||I)}function Gt(x,N,I){N.isScene!==!0&&(N=Ae);const F=V.get(x),K=f.state.lights,Le=f.state.shadowsArray,we=K.state.version,Re=w.getParameters(x,K.state,Le,N,I),Me=w.getProgramCacheKey(Re);let Xe=F.program,qe=!0;if(Xe===void 0)x.addEventListener("dispose",Ho);else if(Xe.cacheKey!==Me)Go(x);else if(F.lightsStateVersion!==we)qe=!1;else if(Re.shaderID!==void 0){const Fe=x.isMeshStandardMaterial?N.environment:null;F.envMap=J.get(x.envMap||Fe);return}else qe=!1;qe&&(Re.uniforms=w.getUniforms(x),x.onBeforeCompile(Re,u),Xe=w.acquireProgram(Re,Me),F.program=Xe,F.uniforms=Re.uniforms,F.outputEncoding=Re.outputEncoding);const _e=F.uniforms;(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(F.numClippingPlanes=A.numPlanes,F.numIntersection=A.numIntersection,_e.clippingPlanes=A.uniform),F.environment=x.isMeshStandardMaterial?N.environment:null,F.fog=N.fog,F.envMap=J.get(x.envMap||F.environment),F.needsLights=tl(x),F.lightsStateVersion=we,F.needsLights&&(_e.ambientLightColor.value=K.state.ambient,_e.lightProbe.value=K.state.probe,_e.directionalLights.value=K.state.directional,_e.directionalLightShadows.value=K.state.directionalShadow,_e.spotLights.value=K.state.spot,_e.spotLightShadows.value=K.state.spotShadow,_e.rectAreaLights.value=K.state.rectArea,_e.ltc_1.value=K.state.rectAreaLTC1,_e.ltc_2.value=K.state.rectAreaLTC2,_e.pointLights.value=K.state.point,_e.pointLightShadows.value=K.state.pointShadow,_e.hemisphereLights.value=K.state.hemi,_e.directionalShadowMap.value=K.state.directionalShadowMap,_e.directionalShadowMatrix.value=K.state.directionalShadowMatrix,_e.spotShadowMap.value=K.state.spotShadowMap,_e.spotShadowMatrix.value=K.state.spotShadowMatrix,_e.pointShadowMap.value=K.state.pointShadowMap,_e.pointShadowMatrix.value=K.state.pointShadowMatrix);const Be=F.program.getUniforms(),Vt=pn.seqWithValue(Be.seq,_e);F.uniformsList=Vt}function qo(x,N,I,F){N.isScene!==!0&&(N=Ae),X.resetTextureUnits();const K=N.fog,Le=I.isMeshStandardMaterial?N.environment:null,we=p===null?u.outputEncoding:p.texture.encoding,Re=J.get(I.envMap||Le),Me=V.get(I),Xe=f.state.lights;if(ee===!0&&(re===!0||x!==T)){const Ye=x===T&&I.id===S;A.setState(I,x,Ye)}I.version===Me.__version?(I.fog&&Me.fog!==K||(Me.environment!==Le||(Me.needsLights&&Me.lightsStateVersion!==Xe.state.version||(Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==A.numPlanes||Me.numIntersection!==A.numIntersection)||(Me.outputEncoding!==we||Me.envMap!==Re)))))&&Gt(I,N,F):(Gt(I,N,F),Me.__version=I.version);let qe=!1,_e=!1,Be=!1;const Vt=Me.program,Fe=Vt.getUniforms(),Sn=Me.uniforms;if(pe.useProgram(Vt.program)&&(qe=!0,_e=!0,Be=!0),I.id!==S&&(S=I.id,_e=!0),qe||T!==x){if(Fe.setValue(G,"projectionMatrix",x.projectionMatrix),Ce.logarithmicDepthBuffer&&Fe.setValue(G,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),T!==x&&(T=x,_e=!0,Be=!0),I.isShaderMaterial||I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshStandardMaterial||I.envMap){const Ye=Fe.map.cameraPosition;Ye!==void 0&&Ye.setValue(G,Se.setFromMatrixPosition(x.matrixWorld))}(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial)&&Fe.setValue(G,"isOrthographic",x.isOrthographicCamera===!0),(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial||I.isShadowMaterial||I.skinning)&&Fe.setValue(G,"viewMatrix",x.matrixWorldInverse)}if(I.skinning){Fe.setOptional(G,F,"bindMatrix"),Fe.setOptional(G,F,"bindMatrixInverse");const Ye=F.skeleton;if(Ye){const hs=Ye.bones;if(Ce.floatVertexTextures){if(Ye.boneTexture===void 0){let lt=Math.sqrt(hs.length*4);lt=be.ceilPowerOfTwo(lt),lt=Math.max(lt,4);const Mi=new Float32Array(lt*lt*4);Mi.set(Ye.boneMatrices);const Bn=new si(Mi,lt,lt,vt,tn);Ye.boneMatrices=Mi,Ye.boneTexture=Bn,Ye.boneTextureSize=lt}Fe.setValue(G,"boneTexture",Ye.boneTexture,X),Fe.setValue(G,"boneTextureSize",Ye.boneTextureSize)}else Fe.setOptional(G,Ye,"boneMatrices")}}return(_e||Me.receiveShadow!==F.receiveShadow)&&(Me.receiveShadow=F.receiveShadow,Fe.setValue(G,"receiveShadow",F.receiveShadow)),_e&&(Fe.setValue(G,"toneMappingExposure",u.toneMappingExposure),Me.needsLights&&el(Sn,Be),K&&I.fog&&_.refreshFogUniforms(Sn,K),_.refreshMaterialUniforms(Sn,I,O,R),pn.upload(G,Me.uniformsList,Sn,X)),I.isShaderMaterial&&I.uniformsNeedUpdate===!0&&(pn.upload(G,Me.uniformsList,Sn,X),I.uniformsNeedUpdate=!1),I.isSpriteMaterial&&Fe.setValue(G,"center",F.center),Fe.setValue(G,"modelViewMatrix",F.modelViewMatrix),Fe.setValue(G,"normalMatrix",F.normalMatrix),Fe.setValue(G,"modelMatrix",F.matrixWorld),Vt}function el(x,N){x.ambientLightColor.needsUpdate=N,x.lightProbe.needsUpdate=N,x.directionalLights.needsUpdate=N,x.directionalLightShadows.needsUpdate=N,x.pointLights.needsUpdate=N,x.pointLightShadows.needsUpdate=N,x.spotLights.needsUpdate=N,x.spotLightShadows.needsUpdate=N,x.rectAreaLights.needsUpdate=N,x.hemisphereLights.needsUpdate=N}function tl(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.setFramebuffer=function(x){v!==x&&p===null&&G.bindFramebuffer(36160,x),v=x},this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return g},this.getRenderList=function(){return h},this.setRenderList=function(x){h=x},this.getRenderState=function(){return f},this.setRenderState=function(x){f=x},this.getRenderTarget=function(){return p},this.setRenderTarget=function(x,N=0,I=0){p=x,y=N,g=I,x&&V.get(x).__webglFramebuffer===void 0&&X.setupRenderTarget(x);let F=v,K=!1;if(x){const Le=V.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(F=Le[N],K=!0):x.isWebGLMultisampleRenderTarget?F=V.get(x).__webglMultisampledFramebuffer:F=Le,L.copy(x.viewport),k.copy(x.scissor),H=x.scissorTest}else L.copy(C).multiplyScalar(O).floor(),k.copy(P).multiplyScalar(O).floor(),H=z;if(E!==F&&(G.bindFramebuffer(36160,F),E=F),pe.viewport(L),pe.scissor(k),pe.setScissorTest(H),K){const Le=V.get(x.texture);G.framebufferTexture2D(36160,36064,34069+N,Le.__webglTexture,I)}},this.readRenderTargetPixels=function(x,N,I,F,K,Le,we){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=V.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&we!==void 0&&(Re=Re[we]),Re){let Me=!1;Re!==E&&(G.bindFramebuffer(36160,Re),Me=!0);try{const Xe=x.texture,qe=Xe.format,_e=Xe.type;if(qe!==vt&&se.convert(qe)!==G.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(_e!==_s&&se.convert(_e)!==G.getParameter(35738)&&!(_e===tn&&(Ce.isWebGL2||ge.get("OES_texture_float")||ge.get("WEBGL_color_buffer_float")))&&!(_e===mr&&(Ce.isWebGL2?ge.get("EXT_color_buffer_float"):ge.get("EXT_color_buffer_half_float")))){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G.checkFramebufferStatus(36160)===36053?N>=0&&N<=x.width-F&&I>=0&&I<=x.height-K&&G.readPixels(N,I,F,K,se.convert(qe),se.convert(_e),Le):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{Me&&G.bindFramebuffer(36160,E)}}},this.copyFramebufferToTexture=function(x,N,I){I===void 0&&(I=0);const F=Math.pow(2,-I),K=Math.floor(N.image.width*F),Le=Math.floor(N.image.height*F),we=se.convert(N.format);X.setTexture2D(N,0),G.copyTexImage2D(3553,I,we,x.x,x.y,K,Le,0),pe.unbindTexture()},this.copyTextureToTexture=function(x,N,I,F){F===void 0&&(F=0);const K=N.image.width,Le=N.image.height,we=se.convert(I.format),Re=se.convert(I.type);X.setTexture2D(I,0),G.pixelStorei(37440,I.flipY),G.pixelStorei(37441,I.premultiplyAlpha),G.pixelStorei(3317,I.unpackAlignment),N.isDataTexture?G.texSubImage2D(3553,F,x.x,x.y,K,Le,we,Re,N.image.data):N.isCompressedTexture?G.compressedTexSubImage2D(3553,F,x.x,x.y,N.mipmaps[0].width,N.mipmaps[0].height,we,N.mipmaps[0].data):G.texSubImage2D(3553,F,x.x,x.y,we,Re,N.image),F===0&&I.generateMipmaps&&G.generateMipmap(3553),pe.unbindTexture()},this.initTexture=function(x){X.setTexture2D(x,0),pe.unbindTexture()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}function sc(e){Nr.call(this,e)}sc.prototype=Object.assign(Object.create(Nr.prototype),{constructor:sc,isWebGL1Renderer:!0});class Qp extends le{constructor(){super();Object.defineProperty(this,"isScene",{value:!0}),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.background!==null&&(t.object.background=this.background.toJSON(e)),this.environment!==null&&(t.object.environment=this.environment.toJSON(e)),this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}}function mt(e,t){this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=yr,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=be.generateUUID()}Object.defineProperty(mt.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}}),Object.assign(mt.prototype,{isInterleavedBuffer:!0,onUploadCallback:function(){},setUsage:function(e){return this.usage=e,this},copy:function(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this},copyAt:function(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this},set:function(e,t){return t===void 0&&(t=0),this.array.set(e,t),this},clone:function(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=be.generateUUID()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new mt(t,this.stride);return n.setUsage(this.usage),n},onUpload:function(e){return this.onUploadCallback=e,this},toJSON:function(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=be.generateUUID()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}});const Dn=new M;function gn(e,t,n,i){this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i===!0}Object.defineProperties(gn.prototype,{count:{get:function(){return this.data.count}},array:{get:function(){return this.data.array}},needsUpdate:{set:function(e){this.data.needsUpdate=e}}}),Object.assign(gn.prototype,{isInterleavedBufferAttribute:!0,applyMatrix4:function(e){for(let t=0,n=this.data.count;t<n;t++)Dn.x=this.getX(t),Dn.y=this.getY(t),Dn.z=this.getZ(t),Dn.applyMatrix4(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this},setX:function(e,t){return this.data.array[e*this.data.stride+this.offset]=t,this},setY:function(e,t){return this.data.array[e*this.data.stride+this.offset+1]=t,this},setZ:function(e,t){return this.data.array[e*this.data.stride+this.offset+2]=t,this},setW:function(e,t){return this.data.array[e*this.data.stride+this.offset+3]=t,this},getX:function(e){return this.data.array[e*this.data.stride+this.offset]},getY:function(e){return this.data.array[e*this.data.stride+this.offset+1]},getZ:function(e){return this.data.array[e*this.data.stride+this.offset+2]},getW:function(e){return this.data.array[e*this.data.stride+this.offset+3]},setXY:function(e,t,n){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this},setXYZ:function(e,t,n,i){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this},setXYZW:function(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this},clone:function(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new ye(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new gn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)},toJSON:function(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}});function yn(e){fe.call(this),this.type="SpriteMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(e)}yn.prototype=Object.create(fe.prototype),yn.prototype.constructor=yn,yn.prototype.isSpriteMaterial=!0,yn.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this};let ci;const Ji=new M,li=new M,hi=new M,ui=new W,Qi=new W,oc=new Ee,Or=new M,$i=new M,Br=new M,ac=new W,to=new W,cc=new W;function no(e){if(le.call(this),this.type="Sprite",ci===void 0){ci=new ze;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new mt(t,5);ci.setIndex([0,1,2,0,2,3]),ci.setAttribute("position",new gn(n,3,0,!1)),ci.setAttribute("uv",new gn(n,2,3,!1))}this.geometry=ci,this.material=e!==void 0?e:new yn,this.center=new W(.5,.5)}no.prototype=Object.assign(Object.create(le.prototype),{constructor:no,isSprite:!0,raycast:function(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),li.setFromMatrixScale(this.matrixWorld),oc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),hi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&li.multiplyScalar(-hi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const s=this.center;Fr(Or.set(-.5,-.5,0),hi,s,li,i,r),Fr($i.set(.5,-.5,0),hi,s,li,i,r),Fr(Br.set(.5,.5,0),hi,s,li,i,r),ac.set(0,0),to.set(1,0),cc.set(1,1);let o=e.ray.intersectTriangle(Or,$i,Br,!1,Ji);if(o===null&&(Fr($i.set(-.5,.5,0),hi,s,li,i,r),to.set(0,1),o=e.ray.intersectTriangle(Or,Br,$i,!1,Ji),o===null))return;const a=e.ray.origin.distanceTo(Ji);if(a<e.near||a>e.far)return;t.push({distance:a,point:Ji.clone(),uv:ot.getUV(Ji,Or,$i,Br,ac,to,cc,new W),face:null,object:this})},copy:function(e){return le.prototype.copy.call(this,e),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}});function Fr(e,t,n,i,r,s){ui.subVectors(e,n).addScalar(.5).multiply(i),r!==void 0?(Qi.x=s*ui.x-r*ui.y,Qi.y=r*ui.x+s*ui.y):Qi.copy(ui),e.copy(t),e.x+=Qi.x,e.y+=Qi.y,e.applyMatrix4(oc)}const Ur=new M,lc=new M;function io(){le.call(this),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}io.prototype=Object.assign(Object.create(le.prototype),{constructor:io,isLOD:!0,copy:function(e){le.prototype.copy.call(this,e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance)}return this.autoUpdate=e.autoUpdate,this},addLevel:function(e,t){t===void 0&&(t=0),t=Math.abs(t);const n=this.levels;let i;for(i=0;i<n.length&&!(t<n[i].distance);i++);return n.splice(i,0,{distance:t,object:e}),this.add(e),this},getCurrentLevel:function(){return this._currentLevel},getObjectForDistance:function(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i&&!(e<t[n].distance);n++);return t[n-1].object}return null},raycast:function(e,t){const n=this.levels;if(n.length>0){Ur.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Ur);this.getObjectForDistance(i).raycast(e,t)}},update:function(e){const t=this.levels;if(t.length>1){Ur.setFromMatrixPosition(e.matrixWorld),lc.setFromMatrixPosition(this.matrixWorld);const n=Ur.distanceTo(lc)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r&&n>=t[i].distance;i++)t[i-1].object.visible=!1,t[i].object.visible=!0;for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}},toJSON:function(e){const t=le.prototype.toJSON.call(this,e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const s=n[i];t.object.levels.push({object:s.object.uuid,distance:s.distance})}return t}});function zr(e,t){e&&e.isGeometry&&console.error("THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."),et.call(this,e,t),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Ee,this.bindMatrixInverse=new Ee}zr.prototype=Object.assign(Object.create(et.prototype),{constructor:zr,isSkinnedMesh:!0,copy:function(e){return et.prototype.copy.call(this,e),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this},bind:function(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.getInverse(t)},pose:function(){this.skeleton.pose()},normalizeSkinWeights:function(){const e=new Ie,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.x=t.getX(n),e.y=t.getY(n),e.z=t.getZ(n),e.w=t.getW(n);const r=1/e.manhattanLength();r!==Infinity?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}},updateMatrixWorld:function(e){et.prototype.updateMatrixWorld.call(this,e),this.bindMode==="attached"?this.bindMatrixInverse.getInverse(this.matrixWorld):this.bindMode==="detached"?this.bindMatrixInverse.getInverse(this.bindMatrix):console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)},boneTransform:function(){const e=new M,t=new Ie,n=new Ie,i=new M,r=new Ee;return function(s,o){const a=this.skeleton,c=this.geometry;t.fromBufferAttribute(c.attributes.skinIndex,s),n.fromBufferAttribute(c.attributes.skinWeight,s),e.fromBufferAttribute(c.attributes.position,s).applyMatrix4(this.bindMatrix),o.set(0,0,0);for(let l=0;l<4;l++){const d=n.getComponent(l);if(d!==0){const h=t.getComponent(l);r.multiplyMatrices(a.bones[h].matrixWorld,a.boneInverses[h]),o.addScaledVector(i.copy(e).applyMatrix4(r),d)}}return o.applyMatrix4(this.bindMatrixInverse)}}()});const hc=new Ee,$p=new Ee;function kr(e,t){if(e=e||[],this.bones=e.slice(0),this.boneMatrices=new Float32Array(this.bones.length*16),this.frame=-1,t===void 0)this.calculateInverses();else if(this.bones.length===t.length)this.boneInverses=t.slice(0);else{console.warn("THREE.Skeleton boneInverses is the wrong length."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ee)}}Object.assign(kr.prototype,{calculateInverses:function(){this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++){const n=new Ee;this.bones[e]&&n.getInverse(this.bones[e].matrixWorld),this.boneInverses.push(n)}},pose:function(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.getInverse(this.boneInverses[e])}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.getInverse(n.parent.matrixWorld),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}},update:function(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,s=e.length;r<s;r++){const o=e[r]?e[r].matrixWorld:$p;hc.multiplyMatrices(o,t[r]),hc.toArray(n,r*16)}i!==void 0&&(i.needsUpdate=!0)},clone:function(){return new kr(this.bones,this.boneInverses)},getBoneByName:function(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}return},dispose:function(){this.boneTexture&&(this.boneTexture.dispose(),this.boneTexture=void 0)}});function ro(){le.call(this),this.type="Bone"}ro.prototype=Object.assign(Object.create(le.prototype),{constructor:ro,isBone:!0});const uc=new Ee,dc=new Ee,Hr=[],Ki=new et;function fc(e,t,n){et.call(this,e,t),this.instanceMatrix=new ye(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1}fc.prototype=Object.assign(Object.create(et.prototype),{constructor:fc,isInstancedMesh:!0,copy:function(e){return et.prototype.copy.call(this,e),this.instanceMatrix.copy(e.instanceMatrix),this.count=e.count,this},setColorAt:function(e,t){this.instanceColor===null&&(this.instanceColor=new ye(new Float32Array(this.count*3),3)),t.toArray(this.instanceColor.array,e*3)},getMatrixAt:function(e,t){t.fromArray(this.instanceMatrix.array,e*16)},raycast:function(e,t){const n=this.matrixWorld,i=this.count;if(Ki.geometry=this.geometry,Ki.material=this.material,Ki.material===void 0)return;for(let r=0;r<i;r++){this.getMatrixAt(r,uc),dc.multiplyMatrices(n,uc),Ki.matrixWorld=dc,Ki.raycast(e,Hr);for(let s=0,o=Hr.length;s<o;s++){const a=Hr[s];a.instanceId=r,a.object=this,t.push(a)}Hr.length=0}},setMatrixAt:function(e,t){t.toArray(this.instanceMatrix.array,e*16)},updateMorphTargets:function(){}});function Et(e){fe.call(this),this.type="LineBasicMaterial",this.color=new he(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.morphTargets=!1,this.setValues(e)}Et.prototype=Object.create(fe.prototype),Et.prototype.constructor=Et,Et.prototype.isLineBasicMaterial=!0,Et.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.morphTargets=e.morphTargets,this};const pc=new M,mc=new M,gc=new Ee,Gr=new zi,Vr=new Xt;function Nn(e,t,n){n===1&&console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead."),le.call(this),this.type="Line",this.geometry=e!==void 0?e:new ze,this.material=t!==void 0?t:new Et,this.updateMorphTargets()}Nn.prototype=Object.assign(Object.create(le.prototype),{constructor:Nn,isLine:!0,copy:function(e){return le.prototype.copy.call(this,e),this.material=e.material,this.geometry=e.geometry,this},computeLineDistances:function(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)pc.fromBufferAttribute(t,i-1),mc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=pc.distanceTo(mc);e.setAttribute("lineDistance",new Oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else if(e.isGeometry){const t=e.vertices,n=e.lineDistances;n[0]=0;for(let i=1,r=t.length;i<r;i++)n[i]=n[i-1],n[i]+=t[i-1].distanceTo(t[i])}return this},raycast:function(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(i),Vr.radius+=r,e.ray.intersectsSphere(Vr)===!1)return;gc.getInverse(i),Gr.copy(e.ray).applyMatrix4(gc);const s=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,a=new M,c=new M,l=new M,d=new M,h=this.isLineSegments?2:1;if(n.isBufferGeometry){const f=n.index,u=n.attributes,m=u.position;if(f!==null){const v=f.array;for(let y=0,g=v.length-1;y<g;y+=h){const p=v[y],E=v[y+1];a.fromBufferAttribute(m,p),c.fromBufferAttribute(m,E);const S=Gr.distanceSqToSegment(a,c,d,l);if(S>o)continue;d.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(d);if(T<e.near||T>e.far)continue;t.push({distance:T,point:l.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else for(let v=0,y=m.count-1;v<y;v+=h){a.fromBufferAttribute(m,v),c.fromBufferAttribute(m,v+1);const g=Gr.distanceSqToSegment(a,c,d,l);if(g>o)continue;d.applyMatrix4(this.matrixWorld);const p=e.ray.origin.distanceTo(d);if(p<e.near||p>e.far)continue;t.push({distance:p,point:l.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else if(n.isGeometry){const f=n.vertices,u=f.length;for(let m=0;m<u-1;m+=h){const v=Gr.distanceSqToSegment(f[m],f[m+1],d,l);if(v>o)continue;d.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(d);if(y<e.near||y>e.far)continue;t.push({distance:y,point:l.clone().applyMatrix4(this.matrixWorld),index:m,face:null,faceIndex:null,object:this})}}},updateMorphTargets:function(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}});const Wr=new M,jr=new M;function so(e,t){Nn.call(this,e,t),this.type="LineSegments"}so.prototype=Object.assign(Object.create(Nn.prototype),{constructor:so,isLineSegments:!0,computeLineDistances:function(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Wr.fromBufferAttribute(t,i),jr.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Wr.distanceTo(jr);e.setAttribute("lineDistance",new Oe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else if(e.isGeometry){const t=e.vertices,n=e.lineDistances;for(let i=0,r=t.length;i<r;i+=2)Wr.copy(t[i]),jr.copy(t[i+1]),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Wr.distanceTo(jr)}return this}});function oo(e,t){Nn.call(this,e,t),this.type="LineLoop"}oo.prototype=Object.assign(Object.create(Nn.prototype),{constructor:oo,isLineLoop:!0});function vn(e){fe.call(this),this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(e)}vn.prototype=Object.create(fe.prototype),vn.prototype.constructor=vn,vn.prototype.isPointsMaterial=!0,vn.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.morphTargets=e.morphTargets,this};const yc=new Ee,ao=new zi,qr=new Xt,Xr=new M;function co(e,t){le.call(this),this.type="Points",this.geometry=e!==void 0?e:new ze,this.material=t!==void 0?t:new vn,this.updateMorphTargets()}co.prototype=Object.assign(Object.create(le.prototype),{constructor:co,isPoints:!0,copy:function(e){return le.prototype.copy.call(this,e),this.material=e.material,this.geometry=e.geometry,this},raycast:function(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(i),qr.radius+=r,e.ray.intersectsSphere(qr)===!1)return;yc.getInverse(i),ao.copy(e.ray).applyMatrix4(yc);const s=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s;if(n.isBufferGeometry){const a=n.index,c=n.attributes,l=c.position;if(a!==null){const d=a.array;for(let h=0,f=d.length;h<f;h++){const u=d[h];Xr.fromBufferAttribute(l,u),lo(Xr,u,o,i,e,t,this)}}else for(let d=0,h=l.count;d<h;d++)Xr.fromBufferAttribute(l,d),lo(Xr,d,o,i,e,t,this)}else{const a=n.vertices;for(let c=0,l=a.length;c<l;c++)lo(a[c],c,o,i,e,t,this)}},updateMorphTargets:function(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}});function lo(e,t,n,i,r,s,o){const a=ao.distanceSqToPoint(e);if(a<n){const c=new M;ao.closestPointToPoint(e,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,object:o})}}function vc(e,t,n,i,r,s,o,a,c){Ne.call(this,e,t,n,i,r,s,o,a,c),this.format=o!==void 0?o:nn,this.minFilter=s!==void 0?s:$e,this.magFilter=r!==void 0?r:$e,this.generateMipmaps=!1;const l=this;function d(){l.needsUpdate=!0,e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(d)}vc.prototype=Object.assign(Object.create(Ne.prototype),{constructor:vc,clone:function(){return new this.constructor(this.image).copy(this)},isVideoTexture:!0,update:function(){const e=this.image,t="requestVideoFrameCallback"in e;t===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}});function er(e,t,n,i,r,s,o,a,c,l,d,h){Ne.call(this,null,s,o,a,c,l,i,r,d,h),this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}er.prototype=Object.create(Ne.prototype),er.prototype.constructor=er,er.prototype.isCompressedTexture=!0;function tr(e,t,n,i,r,s,o,a,c){Ne.call(this,e,t,n,i,r,s,o,a,c),this.needsUpdate=!0}tr.prototype=Object.create(Ne.prototype),tr.prototype.constructor=tr,tr.prototype.isCanvasTexture=!0;function Yr(e,t,n,i,r,s,o,a,c,l){if(l=l!==void 0?l:zn,l!==zn&&l!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&l===zn&&(n=fr),n===void 0&&l===Ii&&(n=Pi),Ne.call(this,null,i,r,s,o,a,l,n,c),this.image={width:e,height:t},this.magFilter=o!==void 0?o:tt,this.minFilter=a!==void 0?a:tt,this.flipY=!1,this.generateMipmaps=!1}Yr.prototype=Object.create(Ne.prototype),Yr.prototype.constructor=Yr,Yr.prototype.isDepthTexture=!0;let Kp=0;const Nt=new Ee,ho=new le,Zr=new M;function Tt(){Object.defineProperty(this,"id",{value:Kp+=2}),this.uuid=be.generateUUID(),this.name="",this.type="Geometry",this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.elementsNeedUpdate=!1,this.verticesNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.groupsNeedUpdate=!1}Tt.prototype=Object.assign(Object.create(Wt.prototype),{constructor:Tt,isGeometry:!0,applyMatrix4:function(e){const t=new st().getNormalMatrix(e);for(let n=0,i=this.vertices.length;n<i;n++){const r=this.vertices[n];r.applyMatrix4(e)}for(let n=0,i=this.faces.length;n<i;n++){const r=this.faces[n];r.normal.applyMatrix3(t).normalize();for(let s=0,o=r.vertexNormals.length;s<o;s++)r.vertexNormals[s].applyMatrix3(t).normalize()}return this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this.verticesNeedUpdate=!0,this.normalsNeedUpdate=!0,this},rotateX:function(e){return Nt.makeRotationX(e),this.applyMatrix4(Nt),this},rotateY:function(e){return Nt.makeRotationY(e),this.applyMatrix4(Nt),this},rotateZ:function(e){return Nt.makeRotationZ(e),this.applyMatrix4(Nt),this},translate:function(e,t,n){return Nt.makeTranslation(e,t,n),this.applyMatrix4(Nt),this},scale:function(e,t,n){return Nt.makeScale(e,t,n),this.applyMatrix4(Nt),this},lookAt:function(e){return ho.lookAt(e),ho.updateMatrix(),this.applyMatrix4(ho.matrix),this},fromBufferGeometry:function(e){const t=this,n=e.index!==null?e.index:void 0,i=e.attributes;if(i.position===void 0)return console.error("THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion."),this;const r=i.position,s=i.normal,o=i.color,a=i.uv,c=i.uv2;c!==void 0&&(this.faceVertexUvs[1]=[]);for(let h=0;h<r.count;h++)t.vertices.push(new M().fromBufferAttribute(r,h)),o!==void 0&&t.colors.push(new he().fromBufferAttribute(o,h));function l(h,f,u,m){const v=o===void 0?[]:[t.colors[h].clone(),t.colors[f].clone(),t.colors[u].clone()],y=s===void 0?[]:[new M().fromBufferAttribute(s,h),new M().fromBufferAttribute(s,f),new M().fromBufferAttribute(s,u)],g=new zs(h,f,u,y,v,m);t.faces.push(g),a!==void 0&&t.faceVertexUvs[0].push([new W().fromBufferAttribute(a,h),new W().fromBufferAttribute(a,f),new W().fromBufferAttribute(a,u)]),c!==void 0&&t.faceVertexUvs[1].push([new W().fromBufferAttribute(c,h),new W().fromBufferAttribute(c,f),new W().fromBufferAttribute(c,u)])}const d=e.groups;if(d.length>0)for(let h=0;h<d.length;h++){const f=d[h],u=f.start,m=f.count;for(let v=u,y=u+m;v<y;v+=3)n!==void 0?l(n.getX(v),n.getX(v+1),n.getX(v+2),f.materialIndex):l(v,v+1,v+2,f.materialIndex)}else if(n!==void 0)for(let h=0;h<n.count;h+=3)l(n.getX(h),n.getX(h+1),n.getX(h+2));else for(let h=0;h<r.count;h+=3)l(h,h+1,h+2);return this.computeFaceNormals(),e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this},center:function(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zr).negate(),this.translate(Zr.x,Zr.y,Zr.z),this},normalize:function(){this.computeBoundingSphere();const e=this.boundingSphere.center,t=this.boundingSphere.radius,n=t===0?1:1/t,i=new Ee;return i.set(n,0,0,-n*e.x,0,n,0,-n*e.y,0,0,n,-n*e.z,0,0,0,1),this.applyMatrix4(i),this},computeFaceNormals:function(){const e=new M,t=new M;for(let n=0,i=this.faces.length;n<i;n++){const r=this.faces[n],s=this.vertices[r.a],o=this.vertices[r.b],a=this.vertices[r.c];e.subVectors(a,o),t.subVectors(s,o),e.cross(t),e.normalize(),r.normal.copy(e)}},computeVertexNormals:function(e){e===void 0&&(e=!0);const t=new Array(this.vertices.length);for(let n=0,i=this.vertices.length;n<i;n++)t[n]=new M;if(e){const n=new M,i=new M;for(let r=0,s=this.faces.length;r<s;r++){const o=this.faces[r],a=this.vertices[o.a],c=this.vertices[o.b],l=this.vertices[o.c];n.subVectors(l,c),i.subVectors(a,c),n.cross(i),t[o.a].add(n),t[o.b].add(n),t[o.c].add(n)}}else{this.computeFaceNormals();for(let n=0,i=this.faces.length;n<i;n++){const r=this.faces[n];t[r.a].add(r.normal),t[r.b].add(r.normal),t[r.c].add(r.normal)}}for(let n=0,i=this.vertices.length;n<i;n++)t[n].normalize();for(let n=0,i=this.faces.length;n<i;n++){const r=this.faces[n],s=r.vertexNormals;s.length===3?(s[0].copy(t[r.a]),s[1].copy(t[r.b]),s[2].copy(t[r.c])):(s[0]=t[r.a].clone(),s[1]=t[r.b].clone(),s[2]=t[r.c].clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function(){this.computeFaceNormals();for(let e=0,t=this.faces.length;e<t;e++){const n=this.faces[e],i=n.vertexNormals;i.length===3?(i[0].copy(n.normal),i[1].copy(n.normal),i[2].copy(n.normal)):(i[0]=n.normal.clone(),i[1]=n.normal.clone(),i[2]=n.normal.clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function(){for(let t=0,n=this.faces.length;t<n;t++){const i=this.faces[t];i.__originalFaceNormal?i.__originalFaceNormal.copy(i.normal):i.__originalFaceNormal=i.normal.clone(),i.__originalVertexNormals||(i.__originalVertexNormals=[]);for(let r=0,s=i.vertexNormals.length;r<s;r++)i.__originalVertexNormals[r]?i.__originalVertexNormals[r].copy(i.vertexNormals[r]):i.__originalVertexNormals[r]=i.vertexNormals[r].clone()}const e=new Tt;e.faces=this.faces;for(let t=0,n=this.morphTargets.length;t<n;t++){if(!this.morphNormals[t]){this.morphNormals[t]={},this.morphNormals[t].faceNormals=[],this.morphNormals[t].vertexNormals=[];const r=this.morphNormals[t].faceNormals,s=this.morphNormals[t].vertexNormals;for(let o=0,a=this.faces.length;o<a;o++){const c=new M,l={a:new M,b:new M,c:new M};r.push(c),s.push(l)}}const i=this.morphNormals[t];e.vertices=this.morphTargets[t].vertices,e.computeFaceNormals(),e.computeVertexNormals();for(let r=0,s=this.faces.length;r<s;r++){const o=this.faces[r],a=i.faceNormals[r],c=i.vertexNormals[r];a.copy(o.normal),c.a.copy(o.vertexNormals[0]),c.b.copy(o.vertexNormals[1]),c.c.copy(o.vertexNormals[2])}}for(let t=0,n=this.faces.length;t<n;t++){const i=this.faces[t];i.normal=i.__originalFaceNormal,i.vertexNormals=i.__originalVertexNormals}},computeBoundingBox:function(){this.boundingBox===null&&(this.boundingBox=new jt),this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){this.boundingSphere===null&&(this.boundingSphere=new Xt),this.boundingSphere.setFromPoints(this.vertices)},merge:function(e,t,n){if(!(e&&e.isGeometry)){console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",e);return}let i;const r=this.vertices.length,s=this.vertices,o=e.vertices,a=this.faces,c=e.faces,l=this.colors,d=e.colors;n===void 0&&(n=0),t!==void 0&&(i=new st().getNormalMatrix(t));for(let h=0,f=o.length;h<f;h++){const u=o[h],m=u.clone();t!==void 0&&m.applyMatrix4(t),s.push(m)}for(let h=0,f=d.length;h<f;h++)l.push(d[h].clone());for(let h=0,f=c.length;h<f;h++){const u=c[h];let m,v;const y=u.vertexNormals,g=u.vertexColors,p=new zs(u.a+r,u.b+r,u.c+r);p.normal.copy(u.normal),i!==void 0&&p.normal.applyMatrix3(i).normalize();for(let E=0,S=y.length;E<S;E++)m=y[E].clone(),i!==void 0&&m.applyMatrix3(i).normalize(),p.vertexNormals.push(m);p.color.copy(u.color);for(let E=0,S=g.length;E<S;E++)v=g[E],p.vertexColors.push(v.clone());p.materialIndex=u.materialIndex+n,a.push(p)}for(let h=0,f=e.faceVertexUvs.length;h<f;h++){const u=e.faceVertexUvs[h];this.faceVertexUvs[h]===void 0&&(this.faceVertexUvs[h]=[]);for(let m=0,v=u.length;m<v;m++){const y=u[m],g=[];for(let p=0,E=y.length;p<E;p++)g.push(y[p].clone());this.faceVertexUvs[h].push(g)}}},mergeMesh:function(e){if(!(e&&e.isMesh)){console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",e);return}e.matrixAutoUpdate&&e.updateMatrix(),this.merge(e.geometry,e.matrix)},mergeVertices:function(){const e={},t=[],n=[],i=4,r=Math.pow(10,i);for(let a=0,c=this.vertices.length;a<c;a++){const l=this.vertices[a],d=Math.round(l.x*r)+"_"+Math.round(l.y*r)+"_"+Math.round(l.z*r);e[d]===void 0?(e[d]=a,t.push(this.vertices[a]),n[a]=t.length-1):n[a]=n[e[d]]}const s=[];for(let a=0,c=this.faces.length;a<c;a++){const l=this.faces[a];l.a=n[l.a],l.b=n[l.b],l.c=n[l.c];const d=[l.a,l.b,l.c];for(let h=0;h<3;h++)if(d[h]===d[(h+1)%3]){s.push(a);break}}for(let a=s.length-1;a>=0;a--){const c=s[a];this.faces.splice(c,1);for(let l=0,d=this.faceVertexUvs.length;l<d;l++)this.faceVertexUvs[l].splice(c,1)}const o=this.vertices.length-t.length;return this.vertices=t,o},setFromPoints:function(e){this.vertices=[];for(let t=0,n=e.length;t<n;t++){const i=e[t];this.vertices.push(new M(i.x,i.y,i.z||0))}return this},sortFacesByMaterialIndex:function(){const e=this.faces,t=e.length;for(let a=0;a<t;a++)e[a]._id=a;function n(a,c){return a.materialIndex-c.materialIndex}e.sort(n);const i=this.faceVertexUvs[0],r=this.faceVertexUvs[1];let s,o;i&&i.length===t&&(s=[]),r&&r.length===t&&(o=[]);for(let a=0;a<t;a++){const c=e[a]._id;s&&s.push(i[c]),o&&o.push(r[c])}s&&(this.faceVertexUvs[0]=s),o&&(this.faceVertexUvs[1]=o)},toJSON:function(){const e={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),this.parameters!==void 0){const u=this.parameters;for(const m in u)u[m]!==void 0&&(e[m]=u[m]);return e}const t=[];for(let u=0;u<this.vertices.length;u++){const m=this.vertices[u];t.push(m.x,m.y,m.z)}const n=[],i=[],r={},s=[],o={},a=[],c={};for(let u=0;u<this.faces.length;u++){const m=this.faces[u],v=!0,y=!1,g=this.faceVertexUvs[0][u]!==void 0,p=m.normal.length()>0,E=m.vertexNormals.length>0,S=m.color.r!==1||m.color.g!==1||m.color.b!==1,T=m.vertexColors.length>0;let b=0;if(b=l(b,0,0),b=l(b,1,v),b=l(b,2,y),b=l(b,3,g),b=l(b,4,p),b=l(b,5,E),b=l(b,6,S),b=l(b,7,T),n.push(b),n.push(m.a,m.b,m.c),n.push(m.materialIndex),g){const L=this.faceVertexUvs[0][u];n.push(f(L[0]),f(L[1]),f(L[2]))}if(p&&n.push(d(m.normal)),E){const L=m.vertexNormals;n.push(d(L[0]),d(L[1]),d(L[2]))}if(S&&n.push(h(m.color)),T){const L=m.vertexColors;n.push(h(L[0]),h(L[1]),h(L[2]))}}function l(u,m,v){return v?u|1<<m:u&~(1<<m)}function d(u){const m=u.x.toString()+u.y.toString()+u.z.toString();return r[m]!==void 0||(r[m]=i.length/3,i.push(u.x,u.y,u.z)),r[m]}function h(u){const m=u.r.toString()+u.g.toString()+u.b.toString();return o[m]!==void 0||(o[m]=s.length,s.push(u.getHex())),o[m]}function f(u){const m=u.x.toString()+u.y.toString();return c[m]!==void 0||(c[m]=a.length/2,a.push(u.x,u.y)),c[m]}return e.data={},e.data.vertices=t,e.data.normals=i,s.length>0&&(e.data.colors=s),a.length>0&&(e.data.uvs=[a]),e.data.faces=n,e},clone:function(){return new Tt().copy(this)},copy:function(e){this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name;const t=e.vertices;for(let h=0,f=t.length;h<f;h++)this.vertices.push(t[h].clone());const n=e.colors;for(let h=0,f=n.length;h<f;h++)this.colors.push(n[h].clone());const i=e.faces;for(let h=0,f=i.length;h<f;h++)this.faces.push(i[h].clone());for(let h=0,f=e.faceVertexUvs.length;h<f;h++){const u=e.faceVertexUvs[h];this.faceVertexUvs[h]===void 0&&(this.faceVertexUvs[h]=[]);for(let m=0,v=u.length;m<v;m++){const y=u[m],g=[];for(let p=0,E=y.length;p<E;p++){const S=y[p];g.push(S.clone())}this.faceVertexUvs[h].push(g)}}const r=e.morphTargets;for(let h=0,f=r.length;h<f;h++){const u={};if(u.name=r[h].name,r[h].vertices!==void 0){u.vertices=[];for(let m=0,v=r[h].vertices.length;m<v;m++)u.vertices.push(r[h].vertices[m].clone())}if(r[h].normals!==void 0){u.normals=[];for(let m=0,v=r[h].normals.length;m<v;m++)u.normals.push(r[h].normals[m].clone())}this.morphTargets.push(u)}const s=e.morphNormals;for(let h=0,f=s.length;h<f;h++){const u={};if(s[h].vertexNormals!==void 0){u.vertexNormals=[];for(let m=0,v=s[h].vertexNormals.length;m<v;m++){const y=s[h].vertexNormals[m],g={};g.a=y.a.clone(),g.b=y.b.clone(),g.c=y.c.clone(),u.vertexNormals.push(g)}}if(s[h].faceNormals!==void 0){u.faceNormals=[];for(let m=0,v=s[h].faceNormals.length;m<v;m++)u.faceNormals.push(s[h].faceNormals[m].clone())}this.morphNormals.push(u)}const o=e.skinWeights;for(let h=0,f=o.length;h<f;h++)this.skinWeights.push(o[h].clone());const a=e.skinIndices;for(let h=0,f=a.length;h<f;h++)this.skinIndices.push(a[h].clone());const c=e.lineDistances;for(let h=0,f=c.length;h<f;h++)this.lineDistances.push(c[h]);const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.elementsNeedUpdate=e.elementsNeedUpdate,this.verticesNeedUpdate=e.verticesNeedUpdate,this.uvsNeedUpdate=e.uvsNeedUpdate,this.normalsNeedUpdate=e.normalsNeedUpdate,this.colorsNeedUpdate=e.colorsNeedUpdate,this.lineDistancesNeedUpdate=e.lineDistancesNeedUpdate,this.groupsNeedUpdate=e.groupsNeedUpdate,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});const tg=new M,ng=new M,ig=new M,rg=new ot,em={triangulate:function(e,t,n){n=n||2;const i=t&&t.length,r=i?t[0]*n:e.length;let s=xc(e,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,d,h,f,u;if(i&&(s=sm(e,t,s,n)),e.length>80*n){a=l=e[0],c=d=e[1];for(let m=n;m<r;m+=n)h=e[m],f=e[m+1],h<a&&(a=h),f<c&&(c=f),h>l&&(l=h),f>d&&(d=f);u=Math.max(l-a,d-c),u=u!==0?1/u:0}return nr(s,o,n,a,c,u),o}};function xc(e,t,n,i,r){let s,o;if(r===gm(e,t,n,i)>0)for(s=t;s<n;s+=i)o=wc(s,e[s],e[s+1],o);else for(s=n-i;s>=t;s-=i)o=wc(s,e[s],e[s+1],o);return o&&Jr(o,o.next)&&(rr(o),o=o.next),o}function xn(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(Jr(n,n.next)||We(n.prev,n,n.next)===0)){if(rr(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function nr(e,t,n,i,r,s,o){if(!e)return;!o&&s&&hm(e,i,r,s);let a=e,c,l;for(;e.prev!==e.next;){if(c=e.prev,l=e.next,s?nm(e,i,r,s):tm(e)){t.push(c.i/n),t.push(e.i/n),t.push(l.i/n),rr(e),e=l.next,a=l.next;continue}if(e=l,e===a){o?o===1?(e=im(xn(e),t,n),nr(e,t,n,i,r,s,2)):o===2&&rm(e,t,n,i,r,s):nr(xn(e),t,n,i,r,s,1);break}}}function tm(e){const t=e.prev,n=e,i=e.next;if(We(t,n,i)>=0)return!1;let r=e.next.next;for(;r!==e.prev;){if(di(t.x,t.y,n.x,n.y,i.x,i.y,r.x,r.y)&&We(r.prev,r,r.next)>=0)return!1;r=r.next}return!0}function nm(e,t,n,i){const r=e.prev,s=e,o=e.next;if(We(r,s,o)>=0)return!1;const a=r.x<s.x?r.x<o.x?r.x:o.x:s.x<o.x?s.x:o.x,c=r.y<s.y?r.y<o.y?r.y:o.y:s.y<o.y?s.y:o.y,l=r.x>s.x?r.x>o.x?r.x:o.x:s.x>o.x?s.x:o.x,d=r.y>s.y?r.y>o.y?r.y:o.y:s.y>o.y?s.y:o.y,h=uo(a,c,t,n,i),f=uo(l,d,t,n,i);let u=e.prevZ,m=e.nextZ;for(;u&&u.z>=h&&m&&m.z<=f;){if(u!==e.prev&&u!==e.next&&di(r.x,r.y,s.x,s.y,o.x,o.y,u.x,u.y)&&We(u.prev,u,u.next)>=0)return!1;if(u=u.prevZ,m!==e.prev&&m!==e.next&&di(r.x,r.y,s.x,s.y,o.x,o.y,m.x,m.y)&&We(m.prev,m,m.next)>=0)return!1;m=m.nextZ}for(;u&&u.z>=h;){if(u!==e.prev&&u!==e.next&&di(r.x,r.y,s.x,s.y,o.x,o.y,u.x,u.y)&&We(u.prev,u,u.next)>=0)return!1;u=u.prevZ}for(;m&&m.z<=f;){if(m!==e.prev&&m!==e.next&&di(r.x,r.y,s.x,s.y,o.x,o.y,m.x,m.y)&&We(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function im(e,t,n){let i=e;do{const r=i.prev,s=i.next.next;!Jr(r,s)&&_c(r,i,i.next,s)&&ir(r,s)&&ir(s,r)&&(t.push(r.i/n),t.push(i.i/n),t.push(s.i/n),rr(i),rr(i.next),i=e=s),i=i.next}while(i!==e);return xn(i)}function rm(e,t,n,i,r,s){let o=e;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&fm(o,a)){let c=bc(o,a);o=xn(o,o.next),c=xn(c,c.next),nr(o,t,n,i,r,s),nr(c,t,n,i,r,s);return}a=a.next}o=o.next}while(o!==e)}function sm(e,t,n,i){const r=[];let s,o,a,c,l;for(s=0,o=t.length;s<o;s++)a=t[s]*i,c=s<o-1?t[s+1]*i:e.length,l=xc(e,a,c,i,!1),l===l.next&&(l.steiner=!0),r.push(dm(l));for(r.sort(om),s=0;s<r.length;s++)am(r[s],n),n=xn(n,n.next);return n}function om(e,t){return e.x-t.x}function am(e,t){if(t=cm(e,t),t){const n=bc(t,e);xn(t,t.next),xn(n,n.next)}}function cm(e,t){let n=t;const i=e.x,r=e.y;let s=-Infinity,o;do{if(r<=n.y&&r>=n.next.y&&n.next.y!==n.y){const f=n.x+(r-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=i&&f>s){if(s=f,f===i){if(r===n.y)return n;if(r===n.next.y)return n.next}o=n.x<n.next.x?n:n.next}}n=n.next}while(n!==t);if(!o)return null;if(i===s)return o;const a=o,c=o.x,l=o.y;let d=Infinity,h;n=o;do i>=n.x&&n.x>=c&&i!==n.x&&di(r<l?i:s,r,c,l,r<l?s:i,r,n.x,n.y)&&(h=Math.abs(r-n.y)/(i-n.x),ir(n,e)&&(h<d||h===d&&(n.x>o.x||n.x===o.x&&lm(o,n)))&&(o=n,d=h)),n=n.next;while(n!==a);return o}function lm(e,t){return We(e.prev,e,t.prev)<0&&We(t.next,e,e.next)<0}function hm(e,t,n,i){let r=e;do r.z===null&&(r.z=uo(r.x,r.y,t,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==e);r.prevZ.nextZ=null,r.prevZ=null,um(r)}function um(e){let t,n,i,r,s,o,a,c,l=1;do{for(n=e,e=null,s=null,o=0;n;){for(o++,i=n,a=0,t=0;t<l&&!(a++,i=i.nextZ,!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,c--),s?s.nextZ=r:e=r,r.prevZ=s,s=r;n=i}s.nextZ=null,l*=2}while(o>1);return e}function uo(e,t,n,i,r){return e=32767*(e-n)*r,t=32767*(t-i)*r,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function dm(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function di(e,t,n,i,r,s,o,a){return(r-o)*(t-a)-(e-o)*(s-a)>=0&&(e-o)*(i-a)-(n-o)*(t-a)>=0&&(n-o)*(s-a)-(r-o)*(i-a)>=0}function fm(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!pm(e,t)&&(ir(e,t)&&ir(t,e)&&mm(e,t)&&(We(e.prev,e,t.prev)||We(e,t.prev,t))||Jr(e,t)&&We(e.prev,e,e.next)>0&&We(t.prev,t,t.next)>0)}function We(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Jr(e,t){return e.x===t.x&&e.y===t.y}function _c(e,t,n,i){const r=$r(We(e,t,n)),s=$r(We(e,t,i)),o=$r(We(n,i,e)),a=$r(We(n,i,t));return r!==s&&o!==a||(r===0&&Qr(e,n,t)||(s===0&&Qr(e,i,t)||o===0&&Qr(n,e,i)))?!0:!!(a===0&&Qr(n,t,i))}function Qr(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function $r(e){return e>0?1:e<0?-1:0}function pm(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&_c(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function ir(e,t){return We(e.prev,e,e.next)<0?We(e,t,e.next)>=0&&We(e,e.prev,t)>=0:We(e,t,e.prev)<0||We(e,e.next,t)<0}function mm(e,t){let n=e,i=!1;const r=(e.x+t.x)/2,s=(e.y+t.y)/2;do n.y>s!==n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function bc(e,t){const n=new fo(e.i,e.x,e.y),i=new fo(t.i,t.x,t.y),r=e.next,s=t.prev;return e.next=t,t.prev=e,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function wc(e,t,n,i){const r=new fo(e,t,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function rr(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function fo(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function gm(e,t,n,i){let r=0;for(let s=t,o=n-i;s<n;s+=i)r+=(e[o]-e[s])*(e[s+1]+e[o+1]),o=s;return r}const _n={area:function(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5},isClockWise:function(e){return _n.area(e)<0},triangulateShape:function(e,t){const n=[],i=[],r=[];Mc(e),Sc(n,e);let s=e.length;t.forEach(Mc);for(let a=0;a<t.length;a++)i.push(s),s+=t[a].length,Sc(n,t[a]);const o=em.triangulate(n,i);for(let a=0;a<o.length;a+=3)r.push(o.slice(a,a+3));return r}};function Mc(e){const t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Sc(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}class Ec extends ze{constructor(e,t){super();this.type="ExtrudeBufferGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let o=0,a=e.length;o<a;o++){const c=e[o];s(c)}this.setAttribute("position",new Oe(i,3)),this.setAttribute("uv",new Oe(r,2)),this.computeVertexNormals();function s(o){const a=[],c=t.curveSegments!==void 0?t.curveSegments:12,l=t.steps!==void 0?t.steps:1;let d=t.depth!==void 0?t.depth:100,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:6,u=t.bevelSize!==void 0?t.bevelSize:f-2,m=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3;const y=t.extrudePath,g=t.UVGenerator!==void 0?t.UVGenerator:ym;t.amount!==void 0&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),d=t.amount);let p,E=!1,S,T,b,L;y&&(p=y.getSpacedPoints(l),E=!0,h=!1,S=y.computeFrenetFrames(l,!1),T=new M,b=new M,L=new M),h||(v=0,f=0,u=0,m=0);const k=o.extractPoints(c);let H=k.shape;const te=k.holes,R=!_n.isClockWise(H);if(R){H=H.reverse();for(let V=0,X=te.length;V<X;V++){const J=te[V];_n.isClockWise(J)&&(te[V]=J.reverse())}}const O=_n.triangulateShape(H,te),D=H;for(let V=0,X=te.length;V<X;V++){const J=te[V];H=H.concat(J)}function B(V,X,J){return X||console.error("THREE.ExtrudeGeometry: vec does not exist"),X.clone().multiplyScalar(J).add(V)}const C=H.length,P=O.length;function z(V,X,J){let ae,ne,ve;const w=V.x-X.x,_=V.y-X.y,Y=J.x-V.x,j=J.y-V.y,A=w*w+_*_,q=w*j-_*Y;if(Math.abs(q)>Number.EPSILON){const Z=Math.sqrt(A),de=Math.sqrt(Y*Y+j*j),Q=X.x-_/Z,se=X.y+w/Z,ue=J.x-j/de,xe=J.y+Y/de,ie=((ue-Q)*j-(xe-se)*Y)/(w*j-_*Y);ae=Q+w*ie-V.x,ne=se+_*ie-V.y;const me=ae*ae+ne*ne;if(me<=2)return new W(ae,ne);ve=Math.sqrt(me/2)}else{let Z=!1;w>Number.EPSILON?Y>Number.EPSILON&&(Z=!0):w<-Number.EPSILON?Y<-Number.EPSILON&&(Z=!0):Math.sign(_)===Math.sign(j)&&(Z=!0),Z?(ae=-_,ne=w,ve=Math.sqrt(A)):(ae=w,ne=_,ve=Math.sqrt(A/2))}return new W(ae/ve,ne/ve)}const U=[];for(let V=0,X=D.length,J=X-1,ae=V+1;V<X;V++,J++,ae++)J===X&&(J=0),ae===X&&(ae=0),U[V]=z(D[V],D[J],D[ae]);const ee=[];let re,oe=U.concat();for(let V=0,X=te.length;V<X;V++){const J=te[V];re=[];for(let ae=0,ne=J.length,ve=ne-1,w=ae+1;ae<ne;ae++,ve++,w++)ve===ne&&(ve=0),w===ne&&(w=0),re[ae]=z(J[ae],J[ve],J[w]);ee.push(re),oe=oe.concat(re)}for(let V=0;V<v;V++){const X=V/v,J=f*Math.cos(X*Math.PI/2),ae=u*Math.sin(X*Math.PI/2)+m;for(let ne=0,ve=D.length;ne<ve;ne++){const w=B(D[ne],U[ne],ae);Ve(w.x,w.y,-J)}for(let ne=0,ve=te.length;ne<ve;ne++){const w=te[ne];re=ee[ne];for(let _=0,Y=w.length;_<Y;_++){const j=B(w[_],re[_],ae);Ve(j.x,j.y,-J)}}}const Se=u+m;for(let V=0;V<C;V++){const X=h?B(H[V],oe[V],Se):H[V];E?(b.copy(S.normals[0]).multiplyScalar(X.x),T.copy(S.binormals[0]).multiplyScalar(X.y),L.copy(p[0]).add(b).add(T),Ve(L.x,L.y,L.z)):Ve(X.x,X.y,0)}for(let V=1;V<=l;V++)for(let X=0;X<C;X++){const J=h?B(H[X],oe[X],Se):H[X];E?(b.copy(S.normals[V]).multiplyScalar(J.x),T.copy(S.binormals[V]).multiplyScalar(J.y),L.copy(p[V]).add(b).add(T),Ve(L.x,L.y,L.z)):Ve(J.x,J.y,d/l*V)}for(let V=v-1;V>=0;V--){const X=V/v,J=f*Math.cos(X*Math.PI/2),ae=u*Math.sin(X*Math.PI/2)+m;for(let ne=0,ve=D.length;ne<ve;ne++){const w=B(D[ne],U[ne],ae);Ve(w.x,w.y,d+J)}for(let ne=0,ve=te.length;ne<ve;ne++){const w=te[ne];re=ee[ne];for(let _=0,Y=w.length;_<Y;_++){const j=B(w[_],re[_],ae);E?Ve(j.x,j.y+p[l-1].y,p[l-1].x+J):Ve(j.x,j.y,d+J)}}}Ae(),He();function Ae(){const V=i.length/3;if(h){let X=0,J=C*X;for(let ae=0;ae<P;ae++){const ne=O[ae];ge(ne[2]+J,ne[1]+J,ne[0]+J)}X=l+v*2,J=C*X;for(let ae=0;ae<P;ae++){const ne=O[ae];ge(ne[0]+J,ne[1]+J,ne[2]+J)}}else{for(let X=0;X<P;X++){const J=O[X];ge(J[2],J[1],J[0])}for(let X=0;X<P;X++){const J=O[X];ge(J[0]+C*l,J[1]+C*l,J[2]+C*l)}}n.addGroup(V,i.length/3-V,0)}function He(){const V=i.length/3;let X=0;G(D,X),X+=D.length;for(let J=0,ae=te.length;J<ae;J++){const ne=te[J];G(ne,X),X+=ne.length}n.addGroup(V,i.length/3-V,1)}function G(V,X){let J=V.length;for(;--J>=0;){const ae=J;let ne=J-1;ne<0&&(ne=V.length-1);for(let ve=0,w=l+v*2;ve<w;ve++){const _=C*ve,Y=C*(ve+1),j=X+ae+_,A=X+ne+_,q=X+ne+Y,Z=X+ae+Y;Ce(j,A,q,Z)}}}function Ve(V,X,J){a.push(V),a.push(X),a.push(J)}function ge(V,X,J){pe(V),pe(X),pe(J);const ae=i.length/3,ne=g.generateTopUV(n,i,ae-3,ae-2,ae-1);Pe(ne[0]),Pe(ne[1]),Pe(ne[2])}function Ce(V,X,J,ae){pe(V),pe(X),pe(ae),pe(X),pe(J),pe(ae);const ne=i.length/3,ve=g.generateSideWallUV(n,i,ne-6,ne-3,ne-2,ne-1);Pe(ve[0]),Pe(ve[1]),Pe(ve[3]),Pe(ve[1]),Pe(ve[2]),Pe(ve[3])}function pe(V){i.push(a[V*3+0]),i.push(a[V*3+1]),i.push(a[V*3+2])}function Pe(V){r.push(V.x),r.push(V.y)}}}toJSON(){const e=ze.prototype.toJSON.call(this),t=this.parameters.shapes,n=this.parameters.options;return vm(t,n,e)}}const ym={generateTopUV:function(e,t,n,i,r){const s=t[n*3],o=t[n*3+1],a=t[i*3],c=t[i*3+1],l=t[r*3],d=t[r*3+1];return[new W(s,o),new W(a,c),new W(l,d)]},generateSideWallUV:function(e,t,n,i,r,s){const o=t[n*3],a=t[n*3+1],c=t[n*3+2],l=t[i*3],d=t[i*3+1],h=t[i*3+2],f=t[r*3],u=t[r*3+1],m=t[r*3+2],v=t[s*3],y=t[s*3+1],g=t[s*3+2];return Math.abs(a-d)<.01?[new W(o,1-c),new W(l,1-h),new W(f,1-m),new W(v,1-g)]:[new W(a,1-c),new W(d,1-h),new W(u,1-m),new W(y,1-g)]}};function vm(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,r=e.length;i<r;i++){const s=e[i];n.shapes.push(s.uuid)}else n.shapes.push(e.uuid);return t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}class xm extends Tt{constructor(e,t){super();this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},this.fromBufferGeometry(new Ec(e,t)),this.mergeVertices()}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return _m(t,n,e)}}function _m(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,r=e.length;i<r;i++){const s=e[i];n.shapes.push(s.uuid)}else n.shapes.push(e.uuid);return t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}function Kr(e,t,n){ze.call(this),this.type="ParametricBufferGeometry",this.parameters={func:e,slices:t,stacks:n};const i=[],r=[],s=[],o=[],a=1e-5,c=new M,l=new M,d=new M,h=new M,f=new M;e.length<3&&console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");const u=t+1;for(let m=0;m<=n;m++){const v=m/n;for(let y=0;y<=t;y++){const g=y/t;e(g,v,l),r.push(l.x,l.y,l.z),g-a>=0?(e(g-a,v,d),h.subVectors(l,d)):(e(g+a,v,d),h.subVectors(d,l)),v-a>=0?(e(g,v-a,d),f.subVectors(l,d)):(e(g,v+a,d),f.subVectors(d,l)),c.crossVectors(h,f).normalize(),s.push(c.x,c.y,c.z),o.push(g,v)}}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const y=m*u+v,g=m*u+v+1,p=(m+1)*u+v+1,E=(m+1)*u+v;i.push(y,g,E),i.push(g,p,E)}this.setIndex(i),this.setAttribute("position",new Oe(r,3)),this.setAttribute("normal",new Oe(s,3)),this.setAttribute("uv",new Oe(o,2))}Kr.prototype=Object.create(ze.prototype),Kr.prototype.constructor=Kr;function po(e,t,n){Tt.call(this),this.type="ParametricGeometry",this.parameters={func:e,slices:t,stacks:n},this.fromBufferGeometry(new Kr(e,t,n)),this.mergeVertices()}po.prototype=Object.create(Tt.prototype),po.prototype.constructor=po;class Tc extends ze{constructor(e,t){super();this.type="ShapeBufferGeometry",this.parameters={shapes:e,curveSegments:t},t=t||12;const n=[],i=[],r=[],s=[];let o=0,a=0;if(Array.isArray(e)===!1)c(e);else for(let l=0;l<e.length;l++)c(e[l]),this.addGroup(o,a,l),o+=a,a=0;this.setIndex(n),this.setAttribute("position",new Oe(i,3)),this.setAttribute("normal",new Oe(r,3)),this.setAttribute("uv",new Oe(s,2));function c(l){const d=i.length/3,h=l.extractPoints(t);let f=h.shape;const u=h.holes;_n.isClockWise(f)===!1&&(f=f.reverse());for(let v=0,y=u.length;v<y;v++){const g=u[v];_n.isClockWise(g)===!0&&(u[v]=g.reverse())}const m=_n.triangulateShape(f,u);for(let v=0,y=u.length;v<y;v++){const g=u[v];f=f.concat(g)}for(let v=0,y=f.length;v<y;v++){const g=f[v];i.push(g.x,g.y,0),r.push(0,0,1),s.push(g.x,g.y)}for(let v=0,y=m.length;v<y;v++){const g=m[v],p=g[0]+d,E=g[1]+d,S=g[2]+d;n.push(p,E,S),a+=3}}}toJSON(){const e=ze.prototype.toJSON.call(this),t=this.parameters.shapes;return bm(t,e)}}function bm(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){const r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}class wm extends Tt{constructor(e,t){super();this.type="ShapeGeometry",typeof t=="object"&&(console.warn("THREE.ShapeGeometry: Options parameter has been removed."),t=t.curveSegments),this.parameters={shapes:e,curveSegments:t},this.fromBufferGeometry(new Tc(e,t)),this.mergeVertices()}toJSON(){const e=Tt.prototype.toJSON.call(this),t=this.parameters.shapes;return Mm(t,e)}}function Mm(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){const r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}function fi(e){fe.call(this),this.type="ShadowMaterial",this.color=new he(0),this.transparent=!0,this.setValues(e)}fi.prototype=Object.create(fe.prototype),fi.prototype.constructor=fi,fi.prototype.isShadowMaterial=!0,fi.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this};function sr(e){at.call(this,e),this.type="RawShaderMaterial"}sr.prototype=Object.create(at.prototype),sr.prototype.constructor=sr,sr.prototype.isRawShaderMaterial=!0;function Ot(e){fe.call(this),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=En,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.vertexTangents=!1,this.setValues(e)}Ot.prototype=Object.create(fe.prototype),Ot.prototype.constructor=Ot,Ot.prototype.isMeshStandardMaterial=!0,Ot.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.vertexTangents=e.vertexTangents,this};function bn(e){Ot.call(this),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoat=0,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new W(1,1),this.clearcoatNormalMap=null,this.reflectivity=.5,Object.defineProperty(this,"ior",{get:function(){return(1+.4*this.reflectivity)/(1-.4*this.reflectivity)},set:function(t){this.reflectivity=be.clamp(2.5*(t-1)/(t+1),0,1)}}),this.sheen=null,this.transmission=0,this.transmissionMap=null,this.setValues(e)}bn.prototype=Object.create(Ot.prototype),bn.prototype.constructor=bn,bn.prototype.isMeshPhysicalMaterial=!0,bn.prototype.copy=function(e){return Ot.prototype.copy.call(this,e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.reflectivity=e.reflectivity,e.sheen?this.sheen=(this.sheen||new he).copy(e.sheen):this.sheen=null,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this};function wn(e){fe.call(this),this.type="MeshPhongMaterial",this.color=new he(16777215),this.specular=new he(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=En,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=hr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}wn.prototype=Object.create(fe.prototype),wn.prototype.constructor=wn,wn.prototype.isMeshPhongMaterial=!0,wn.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function pi(e){fe.call(this),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new he(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=En,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}pi.prototype=Object.create(fe.prototype),pi.prototype.constructor=pi,pi.prototype.isMeshToonMaterial=!0,pi.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function mi(e){fe.call(this),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=En,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}mi.prototype=Object.create(fe.prototype),mi.prototype.constructor=mi,mi.prototype.isMeshNormalMaterial=!0,mi.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function On(e){fe.call(this),this.type="MeshLambertMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=hr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}On.prototype=Object.create(fe.prototype),On.prototype.constructor=On,On.prototype.isMeshLambertMaterial=!0,On.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function gi(e){fe.call(this),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new he(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=En,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}gi.prototype=Object.create(fe.prototype),gi.prototype.constructor=gi,gi.prototype.isMeshMatcapMaterial=!0,gi.prototype.copy=function(e){return fe.prototype.copy.call(this,e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function yi(e){Et.call(this),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}yi.prototype=Object.create(Et.prototype),yi.prototype.constructor=yi,yi.prototype.isLineDashedMaterial=!0,yi.prototype.copy=function(e){return Et.prototype.copy.call(this,e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this};var Sm=Object.freeze({__proto__:null,ShadowMaterial:fi,SpriteMaterial:yn,RawShaderMaterial:sr,ShaderMaterial:at,PointsMaterial:vn,MeshPhysicalMaterial:bn,MeshStandardMaterial:Ot,MeshPhongMaterial:wn,MeshToonMaterial:pi,MeshNormalMaterial:mi,MeshLambertMaterial:On,MeshDepthMaterial:mn,MeshDistanceMaterial:Pn,MeshBasicMaterial:cn,MeshMatcapMaterial:gi,LineDashedMaterial:yi,LineBasicMaterial:Et,Material:fe});const Ge={arraySlice:function(e,t,n){return Ge.isTypedArray(e)?new e.constructor(e.subarray(t,n!==void 0?n:e.length)):e.slice(t,n)},convertArray:function(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)},isTypedArray:function(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)},getKeyframeOrder:function(e){function t(r,s){return e[r]-e[s]}const n=e.length,i=new Array(n);for(let r=0;r!==n;++r)i[r]=r;return i.sort(t),i},sortedArray:function(e,t,n){const i=e.length,r=new e.constructor(i);for(let s=0,o=0;o!==i;++s){const a=n[s]*t;for(let c=0;c!==t;++c)r[o++]=e[a+c]}return r},flattenJSON:function(e,t,n,i){let r=1,s=e[0];for(;s!==void 0&&s[i]===void 0;)s=e[r++];if(s===void 0)return;let o=s[i];if(o===void 0)return;if(Array.isArray(o))do o=s[i],o!==void 0&&(t.push(s.time),n.push.apply(n,o)),s=e[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(t.push(s.time),o.toArray(n,n.length)),s=e[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(t.push(s.time),n.push(o)),s=e[r++];while(s!==void 0)},subclip:function(e,t,n,i,r){r=r||30;const s=e.clone();s.name=t;const o=[];for(let c=0;c<s.tracks.length;++c){const l=s.tracks[c],d=l.getValueSize(),h=[],f=[];for(let u=0;u<l.times.length;++u){const m=l.times[u]*r;if(m<n||m>=i)continue;h.push(l.times[u]);for(let v=0;v<d;++v)f.push(l.values[u*d+v])}if(h.length===0)continue;l.times=Ge.convertArray(h,l.times.constructor),l.values=Ge.convertArray(f,l.values.constructor),o.push(l)}s.tracks=o;let a=Infinity;for(let c=0;c<s.tracks.length;++c)a>s.tracks[c].times[0]&&(a=s.tracks[c].times[0]);for(let c=0;c<s.tracks.length;++c)s.tracks[c].shift(-1*a);return s.resetDuration(),s},makeClipAdditive:function(e,t,n,i){t===void 0&&(t=0),n===void 0&&(n=e),(i===void 0||i<=0)&&(i=30);const r=n.tracks.length,s=t/i;for(let o=0;o<r;++o){const a=n.tracks[o],c=a.ValueTypeName;if(c==="bool"||c==="string")continue;const l=e.tracks.find(function(g){return g.name===a.name&&g.ValueTypeName===c});if(l===void 0)continue;let d=0;const h=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=h/3);let f=0;const u=l.getValueSize();l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(f=u/3);const m=a.times.length-1;let v;if(s<=a.times[0]){const g=d,p=h-d;v=Ge.arraySlice(a.values,g,p)}else if(s>=a.times[m]){const g=m*h+d,p=g+h-d;v=Ge.arraySlice(a.values,g,p)}else{const g=a.createInterpolant(),p=d,E=h-d;g.evaluate(s),v=Ge.arraySlice(g.resultBuffer,p,E)}if(c==="quaternion"){const g=new ut().fromArray(v).normalize().conjugate();g.toArray(v)}const y=l.times.length;for(let g=0;g<y;++g){const p=g*u+f;if(c==="quaternion")ut.multiplyQuaternionsFlat(l.values,p,v,0,l.values,p);else{const E=u-f*2;for(let S=0;S<E;++S)l.values[p+S]-=v[S]}}}return e.blendMode=ma,e}};function gt(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n}Object.assign(gt.prototype,{evaluate:function(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let s;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,e,r)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}s=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let a=n-2;;){if(r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(n===a)break;if(i=r,r=t[--n-1],e>=r)break t}s=n,n=0;break n}break e}for(;n<s;){const o=n+s>>>1;e<t[o]?s=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(i===void 0)return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,r,e)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)},settings:null,DefaultSettings_:{},getSettings_:function(){return this.settings||this.DefaultSettings_},copySampleValue_:function(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let s=0;s!==i;++s)t[s]=n[r+s];return t},interpolate_:function(){throw new Error("call to abstract method")},intervalChanged_:function(){}}),Object.assign(gt.prototype,{beforeStart_:gt.prototype.copySampleValue_,afterEnd_:gt.prototype.copySampleValue_});function mo(e,t,n,i){gt.call(this,e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0}mo.prototype=Object.assign(Object.create(gt.prototype),{constructor:mo,DefaultSettings_:{endingStart:kn,endingEnd:kn},intervalChanged_:function(e,t,n){const i=this.parameterPositions;let r=e-2,s=e+1,o=i[r],a=i[s];if(o===void 0)switch(this.getSettings_().endingStart){case Hn:r=e,o=2*t-n;break;case gr:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case Hn:s=e,a=2*n-t;break;case gr:s=1,a=n+i[1]-i[0];break;default:s=e-1,a=t}const c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(a-n),this._offsetPrev=r*l,this._offsetNext=s*l},interpolate_:function(e,t,n,i){const r=this.resultBuffer,s=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,l=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,u=(n-t)/(i-t),m=u*u,v=m*u,y=-h*v+2*h*m-h*u,g=(1+h)*v+(-1.5-2*h)*m+(-.5+h)*u+1,p=(-1-f)*v+(1.5+f)*m+.5*u,E=f*v-f*m;for(let S=0;S!==o;++S)r[S]=y*s[l+S]+g*s[c+S]+p*s[a+S]+E*s[d+S];return r}});function es(e,t,n,i){gt.call(this,e,t,n,i)}es.prototype=Object.assign(Object.create(gt.prototype),{constructor:es,interpolate_:function(e,t,n,i){const r=this.resultBuffer,s=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,l=(n-t)/(i-t),d=1-l;for(let h=0;h!==o;++h)r[h]=s[c+h]*d+s[a+h]*l;return r}});function go(e,t,n,i){gt.call(this,e,t,n,i)}go.prototype=Object.assign(Object.create(gt.prototype),{constructor:go,interpolate_:function(e){return this.copySampleValue_(e-1)}});function it(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ge.convertArray(t,this.TimeBufferType),this.values=Ge.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}Object.assign(it,{toJSON:function(e){const t=e.constructor;let n;if(t.toJSON!==void 0)n=t.toJSON(e);else{n={name:e.name,times:Ge.convertArray(e.times,Array),values:Ge.convertArray(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}}),Object.assign(it.prototype,{constructor:it,TimeBufferType:Float32Array,ValueBufferType:Float32Array,DefaultInterpolation:Ni,InterpolantFactoryMethodDiscrete:function(e){return new go(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodLinear:function(e){return new es(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodSmooth:function(e){return new mo(this.times,this.values,this.getValueSize(),e)},setInterpolation:function(e){let t;switch(e){case Di:t=this.InterpolantFactoryMethodDiscrete;break;case Ni:t=this.InterpolantFactoryMethodLinear;break;case bs:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this},getInterpolation:function(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Di;case this.InterpolantFactoryMethodLinear:return Ni;case this.InterpolantFactoryMethodSmooth:return bs}},getValueSize:function(){return this.values.length/this.times.length},shift:function(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this},scale:function(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this},trim:function(e,t){const n=this.times,i=n.length;let r=0,s=i-1;for(;r!==i&&n[r]<e;)++r;for(;s!==-1&&n[s]>t;)--s;if(++s,r!==0||s!==i){r>=s&&(s=Math.max(s,1),r=s-1);const o=this.getValueSize();this.times=Ge.arraySlice(n,r,s),this.values=Ge.arraySlice(this.values,r*o,s*o)}return this},validate:function(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let o=0;o!==r;o++){const a=n[o];if(typeof a=="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,a),e=!1;break}if(s!==null&&s>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,a,s),e=!1;break}s=a}if(i!==void 0&&Ge.isTypedArray(i))for(let o=0,a=i.length;o!==a;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e},optimize:function(){const e=Ge.arraySlice(this.times),t=Ge.arraySlice(this.values),n=this.getValueSize(),i=this.getInterpolation()===bs,r=e.length-1;let s=1;for(let o=1;o<r;++o){let a=!1;const c=e[o],l=e[o+1];if(c!==l&&(o!==1||c!==c[0]))if(i)a=!0;else{const d=o*n,h=d-n,f=d+n;for(let u=0;u!==n;++u){const m=t[d+u];if(m!==t[h+u]||m!==t[f+u]){a=!0;break}}}if(a){if(o!==s){e[s]=e[o];const d=o*n,h=s*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++s}}if(r>0){e[s]=e[r];for(let o=r*n,a=s*n,c=0;c!==n;++c)t[a+c]=t[o+c];++s}return s!==e.length?(this.times=Ge.arraySlice(e,0,s),this.values=Ge.arraySlice(t,0,s*n)):(this.times=e,this.values=t),this},clone:function(){const e=Ge.arraySlice(this.times,0),t=Ge.arraySlice(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}});function yo(e,t,n){it.call(this,e,t,n)}yo.prototype=Object.assign(Object.create(it.prototype),{constructor:yo,ValueTypeName:"bool",ValueBufferType:Array,DefaultInterpolation:Di,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});function vo(e,t,n,i){it.call(this,e,t,n,i)}vo.prototype=Object.assign(Object.create(it.prototype),{constructor:vo,ValueTypeName:"color"});function vi(e,t,n,i){it.call(this,e,t,n,i)}vi.prototype=Object.assign(Object.create(it.prototype),{constructor:vi,ValueTypeName:"number"});function xo(e,t,n,i){gt.call(this,e,t,n,i)}xo.prototype=Object.assign(Object.create(gt.prototype),{constructor:xo,interpolate_:function(e,t,n,i){const r=this.resultBuffer,s=this.sampleValues,o=this.valueSize,a=(n-t)/(i-t);let c=e*o;for(let l=c+o;c!==l;c+=4)ut.slerpFlat(r,0,s,c-o,s,c,a);return r}});function or(e,t,n,i){it.call(this,e,t,n,i)}or.prototype=Object.assign(Object.create(it.prototype),{constructor:or,ValueTypeName:"quaternion",DefaultInterpolation:Ni,InterpolantFactoryMethodLinear:function(e){return new xo(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodSmooth:void 0});function _o(e,t,n,i){it.call(this,e,t,n,i)}_o.prototype=Object.assign(Object.create(it.prototype),{constructor:_o,ValueTypeName:"string",ValueBufferType:Array,DefaultInterpolation:Di,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});function xi(e,t,n,i){it.call(this,e,t,n,i)}xi.prototype=Object.assign(Object.create(it.prototype),{constructor:xi,ValueTypeName:"vector"});function At(e,t,n,i){this.name=e,this.tracks=n,this.duration=t!==void 0?t:-1,this.blendMode=i!==void 0?i:ws,this.uuid=be.generateUUID(),this.duration<0&&this.resetDuration()}function Em(e){switch(e.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vi;case"vector":case"vector2":case"vector3":case"vector4":return xi;case"color":return vo;case"quaternion":return or;case"bool":case"boolean":return yo;case"string":return _o}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+e)}function Tm(e){if(e.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Em(e.type);if(e.times===void 0){const n=[],i=[];Ge.flattenJSON(e.keys,n,i,"value"),e.times=n,e.values=i}return t.parse!==void 0?t.parse(e):new t(e.name,e.times,e.values,e.interpolation)}Object.assign(At,{parse:function(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,s=n.length;r!==s;++r)t.push(Tm(n[r]).scale(i));return new At(e.name,e.duration,t,e.blendMode)},toJSON:function(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,s=n.length;r!==s;++r)t.push(it.toJSON(n[r]));return i},CreateFromMorphTargetSequence:function(e,t,n,i){const r=t.length,s=[];for(let o=0;o<r;o++){let a=[],c=[];a.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const l=Ge.getKeyframeOrder(a);a=Ge.sortedArray(a,1,l),c=Ge.sortedArray(c,1,l),!i&&a[0]===0&&(a.push(r),c.push(c[0])),s.push(new vi(".morphTargetInfluences["+t[o].name+"]",a,c).scale(1/n))}return new At(e,-1,s)},findByName:function(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null},CreateClipsFromMorphTargetSequences:function(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,a=e.length;o<a;o++){const c=e[o],l=c.name.match(r);if(l&&l.length>1){const d=l[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const s=[];for(const o in i)s.push(At.CreateFromMorphTargetSequence(o,i[o],t,n));return s},parseAnimation:function(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,u,m){if(f.length!==0){const v=[],y=[];Ge.flattenJSON(f,v,y,u),v.length!==0&&m.push(new d(h,v,y))}},i=[],r=e.name||"default",s=e.fps||30,o=e.blendMode;let a=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!h||h.length===0)continue;if(h[0].morphTargets){const f={};let u;for(u=0;u<h.length;u++)if(h[u].morphTargets)for(let m=0;m<h[u].morphTargets.length;m++)f[h[u].morphTargets[m]]=-1;for(const m in f){const v=[],y=[];for(let g=0;g!==h[u].morphTargets.length;++g){const p=h[u];v.push(p.time),y.push(p.morphTarget===m?1:0)}i.push(new vi(".morphTargetInfluence["+m+"]",v,y))}a=f.length*(s||1)}else{const f=".bones["+t[d].name+"]";n(xi,f+".position",h,"pos",i),n(or,f+".quaternion",h,"rot",i),n(xi,f+".scale",h,"scl",i)}}if(i.length===0)return null;const l=new At(r,a,i,o);return l}}),Object.assign(At.prototype,{resetDuration:function(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this},trim:function(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this},validate:function(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e},optimize:function(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this},clone:function(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new At(this.name,this.duration,e,this.blendMode)}});const _i={enabled:!1,files:{},add:function(e,t){if(this.enabled===!1)return;this.files[e]=t},get:function(e){return this.enabled===!1?void 0:this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Am(e,t,n){const i=this;let r=!1,s=0,o=0,a;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(l){o++,r===!1&&(i.onStart!==void 0&&i.onStart(l,s,o)),r=!0},this.itemEnd=function(l){s++,i.onProgress!==void 0&&i.onProgress(l,s,o),s===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(l){i.onError!==void 0&&i.onError(l)},this.resolveURL=function(l){return a?a(l):l},this.setURLModifier=function(l){return a=l,this},this.addHandler=function(l,d){return c.push(l,d),this},this.removeHandler=function(l){const d=c.indexOf(l);return d!==-1&&c.splice(d,2),this},this.getHandler=function(l){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],u=c[d+1];if(f.global&&(f.lastIndex=0),f.test(l))return u}return null}}const Lm=new Am;function De(e){this.manager=e!==void 0?e:Lm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}Object.assign(De.prototype,{load:function(){},loadAsync:function(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})},parse:function(){},setCrossOrigin:function(e){return this.crossOrigin=e,this},setWithCredentials:function(e){return this.withCredentials=e,this},setPath:function(e){return this.path=e,this},setResourcePath:function(e){return this.resourcePath=e,this},setRequestHeader:function(e){return this.requestHeader=e,this}});const Lt={};function Bt(e){De.call(this,e)}Bt.prototype=Object.assign(Object.create(De.prototype),{constructor:Bt,load:function(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=_i.get(e);if(s!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0),s;if(Lt[e]!==void 0){Lt[e].push({onLoad:t,onProgress:n,onError:i});return}const o=/^data:(.*?)(;base64)?,(.*)$/,a=e.match(o);let c;if(a){const l=a[1],d=!!a[2];let h=a[3];h=decodeURIComponent(h),d&&(h=atob(h));try{let f;const u=(this.responseType||"").toLowerCase();switch(u){case"arraybuffer":case"blob":const m=new Uint8Array(h.length);for(let y=0;y<h.length;y++)m[y]=h.charCodeAt(y);u==="blob"?f=new Blob([m.buffer],{type:l}):f=m.buffer;break;case"document":const v=new DOMParser;f=v.parseFromString(h,l);break;case"json":f=JSON.parse(h);break;default:f=h;break}setTimeout(function(){t&&t(f),r.manager.itemEnd(e)},0)}catch(f){setTimeout(function(){i&&i(f),r.manager.itemError(e),r.manager.itemEnd(e)},0)}}else{Lt[e]=[],Lt[e].push({onLoad:t,onProgress:n,onError:i}),c=new XMLHttpRequest,c.open("GET",e,!0),c.addEventListener("load",function(l){const d=this.response,h=Lt[e];if(delete Lt[e],this.status===200||this.status===0){this.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),_i.add(e,d);for(let f=0,u=h.length;f<u;f++){const m=h[f];m.onLoad&&m.onLoad(d)}r.manager.itemEnd(e)}else{for(let f=0,u=h.length;f<u;f++){const m=h[f];m.onError&&m.onError(l)}r.manager.itemError(e),r.manager.itemEnd(e)}},!1),c.addEventListener("progress",function(l){const d=Lt[e];for(let h=0,f=d.length;h<f;h++){const u=d[h];u.onProgress&&u.onProgress(l)}},!1),c.addEventListener("error",function(l){const d=Lt[e];delete Lt[e];for(let h=0,f=d.length;h<f;h++){const u=d[h];u.onError&&u.onError(l)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),c.addEventListener("abort",function(l){const d=Lt[e];delete Lt[e];for(let h=0,f=d.length;h<f;h++){const u=d[h];u.onError&&u.onError(l)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),this.responseType!==void 0&&(c.responseType=this.responseType),this.withCredentials!==void 0&&(c.withCredentials=this.withCredentials),c.overrideMimeType&&c.overrideMimeType(this.mimeType!==void 0?this.mimeType:"text/plain");for(const l in this.requestHeader)c.setRequestHeader(l,this.requestHeader[l]);c.send(null)}return r.manager.itemStart(e),c},setResponseType:function(e){return this.responseType=e,this},setMimeType:function(e){return this.mimeType=e,this}});function Ac(e){De.call(this,e)}Ac.prototype=Object.assign(Object.create(De.prototype),{constructor:Ac,load:function(e,t,n,i){const r=this,s=new Bt(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)},parse:function(e){const t=[];for(let n=0;n<e.length;n++){const i=At.parse(e[n]);t.push(i)}return t}});function Lc(e){De.call(this,e)}Lc.prototype=Object.assign(Object.create(De.prototype),{constructor:Lc,load:function(e,t,n,i){const r=this,s=[],o=new er;o.image=s;const a=new Bt(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(r.withCredentials);let c=0;function l(d){a.load(e[d],function(h){const f=r.parse(h,!0);s[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=$e),o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let d=0,h=e.length;d<h;++d)l(d);else a.load(e,function(d){const h=r.parse(d,!0);if(h.isCubemap){const f=h.mipmaps.length/h.mipmapCount;for(let u=0;u<f;u++){s[u]={mipmaps:[]};for(let m=0;m<h.mipmapCount;m++)s[u].mipmaps.push(h.mipmaps[u*h.mipmapCount+m]),s[u].format=h.format,s[u].width=h.width,s[u].height=h.height}}else o.image.width=h.width,o.image.height=h.height,o.mipmaps=h.mipmaps;h.mipmapCount===1&&(o.minFilter=$e),o.format=h.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}});function ts(e){De.call(this,e)}ts.prototype=Object.assign(Object.create(De.prototype),{constructor:ts,load:function(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=_i.get(e);if(s!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0),s;const o=document.createElementNS("http://www.w3.org/1999/xhtml","img");function a(){o.removeEventListener("load",a,!1),o.removeEventListener("error",c,!1),_i.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(l){o.removeEventListener("load",a,!1),o.removeEventListener("error",c,!1),i&&i(l),r.manager.itemError(e),r.manager.itemEnd(e)}return o.addEventListener("load",a,!1),o.addEventListener("error",c,!1),e.substr(0,5)!=="data:"&&(this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin)),r.manager.itemStart(e),o.src=e,o}});function bo(e){De.call(this,e)}bo.prototype=Object.assign(Object.create(De.prototype),{constructor:bo,load:function(e,t,n,i){const r=new fn,s=new ts(this.manager);s.setCrossOrigin(this.crossOrigin),s.setPath(this.path);let o=0;function a(c){s.load(e[c],function(l){r.images[c]=l,o++,o===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)a(c);return r}});function Rc(e){De.call(this,e)}Rc.prototype=Object.assign(Object.create(De.prototype),{constructor:Rc,load:function(e,t,n,i){const r=this,s=new si,o=new Bt(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(a){const c=r.parse(a);if(!c)return;c.image!==void 0?s.image=c.image:c.data!==void 0&&(s.image.width=c.width,s.image.height=c.height,s.image.data=c.data),s.wrapS=c.wrapS!==void 0?c.wrapS:ht,s.wrapT=c.wrapT!==void 0?c.wrapT:ht,s.magFilter=c.magFilter!==void 0?c.magFilter:$e,s.minFilter=c.minFilter!==void 0?c.minFilter:$e,s.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.format!==void 0&&(s.format=c.format),c.type!==void 0&&(s.type=c.type),c.mipmaps!==void 0&&(s.mipmaps=c.mipmaps,s.minFilter=Ci),c.mipmapCount===1&&(s.minFilter=$e),s.needsUpdate=!0,t&&t(s,c)},n,i),s}});function ns(e){De.call(this,e)}ns.prototype=Object.assign(Object.create(De.prototype),{constructor:ns,load:function(e,t,n,i){const r=new Ne,s=new ts(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){r.image=o;const a=e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0;r.format=a?nn:vt,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}});function ce(){this.type="Curve",this.arcLengthDivisions=200}Object.assign(ce.prototype,{getPoint:function(){return console.warn("THREE.Curve: .getPoint() not implemented."),null},getPointAt:function(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)},getPoints:function(e){e===void 0&&(e=5);const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t},getSpacedPoints:function(e){e===void 0&&(e=5);const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t},getLength:function(){const e=this.getLengths();return e[e.length-1]},getLengths:function(e){if(e===void 0&&(e=this.arcLengthDivisions),this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t},updateArcLengths:function(){this.needsUpdate=!0,this.getLengths()},getUtoTmapping:function(e,t){const n=this.getLengths();let i=0;const r=n.length;let s;t?s=t:s=e*n[r-1];let o=0,a=r-1,c;for(;o<=a;)if(i=Math.floor(o+(a-o)/2),c=n[i]-s,c<0)o=i+1;else if(c>0)a=i-1;else{a=i;break}if(i=a,n[i]===s)return i/(r-1);const l=n[i],d=n[i+1],h=d-l,f=(s-l)/h,u=(i+f)/(r-1);return u},getTangent:function(e,t){const n=1e-4;let i=e-n,r=e+n;i<0&&(i=0),r>1&&(r=1);const s=this.getPoint(i),o=this.getPoint(r),a=t||(s.isVector2?new W:new M);return a.copy(o).sub(s).normalize(),a},getTangentAt:function(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)},computeFrenetFrames:function(e,t){const n=new M,i=[],r=[],s=[],o=new M,a=new Ee;for(let f=0;f<=e;f++){const u=f/e;i[f]=this.getTangentAt(u,new M),i[f].normalize()}r[0]=new M,s[0]=new M;let c=Number.MAX_VALUE;const l=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);l<=c&&(c=l,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),s[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),s[f]=s[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const u=Math.acos(be.clamp(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(a.makeRotationAxis(o,u))}s[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(be.clamp(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let u=1;u<=e;u++)r[u].applyMatrix4(a.makeRotationAxis(i[u],f*u)),s[u].crossVectors(i[u],r[u])}return{tangents:i,normals:r,binormals:s}},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.arcLengthDivisions=e.arcLengthDivisions,this},toJSON:function(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e},fromJSON:function(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}});function bt(e,t,n,i,r,s,o,a){ce.call(this),this.type="EllipseCurve",this.aX=e||0,this.aY=t||0,this.xRadius=n||1,this.yRadius=i||1,this.aStartAngle=r||0,this.aEndAngle=s||2*Math.PI,this.aClockwise=o||!1,this.aRotation=a||0}bt.prototype=Object.create(ce.prototype),bt.prototype.constructor=bt,bt.prototype.isEllipseCurve=!0,bt.prototype.getPoint=function(e,t){const n=t||new W,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(s?r=0:r=i),this.aClockwise===!0&&!s&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let a=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const l=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=a-this.aX,f=c-this.aY;a=h*l-f*d+this.aX,c=h*d+f*l+this.aY}return n.set(a,c)},bt.prototype.copy=function(e){return ce.prototype.copy.call(this,e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this},bt.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e},bt.prototype.fromJSON=function(e){return ce.prototype.fromJSON.call(this,e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this};function ar(e,t,n,i,r,s){bt.call(this,e,t,n,n,i,r,s),this.type="ArcCurve"}ar.prototype=Object.create(bt.prototype),ar.prototype.constructor=ar,ar.prototype.isArcCurve=!0;function wo(){let e=0,t=0,n=0,i=0;function r(s,o,a,c){e=s,t=a,n=-3*s+3*o-2*a-c,i=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,d,h){let f=(o-s)/l-(a-s)/(l+d)+(a-o)/d,u=(a-o)/d-(c-o)/(d+h)+(c-a)/h;f*=d,u*=d,r(o,a,f,u)},calc:function(s){const o=s*s,a=o*s;return e+t*s+n*o+i*a}}}const is=new M,Mo=new wo,So=new wo,Eo=new wo;function Rt(e,t,n,i){ce.call(this),this.type="CatmullRomCurve3",this.points=e||[],this.closed=t||!1,this.curveType=n||"centripetal",this.tension=i!==void 0?i:.5}Rt.prototype=Object.create(ce.prototype),Rt.prototype.constructor=Rt,Rt.prototype.isCatmullRomCurve3=!0,Rt.prototype.getPoint=function(e,t){const n=t||new M,i=this.points,r=i.length,s=(r-(this.closed?0:1))*e;let o=Math.floor(s),a=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:a===0&&o===r-1&&(o=r-2,a=1);let c,l;this.closed||o>0?c=i[(o-1)%r]:(is.subVectors(i[0],i[1]).add(i[0]),c=is);const d=i[o%r],h=i[(o+1)%r];if(this.closed||o+2<r?l=i[(o+2)%r]:(is.subVectors(i[r-1],i[r-2]).add(i[r-1]),l=is),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let u=Math.pow(c.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f),v=Math.pow(h.distanceToSquared(l),f);m<1e-4&&(m=1),u<1e-4&&(u=m),v<1e-4&&(v=m),Mo.initNonuniformCatmullRom(c.x,d.x,h.x,l.x,u,m,v),So.initNonuniformCatmullRom(c.y,d.y,h.y,l.y,u,m,v),Eo.initNonuniformCatmullRom(c.z,d.z,h.z,l.z,u,m,v)}else this.curveType==="catmullrom"&&(Mo.initCatmullRom(c.x,d.x,h.x,l.x,this.tension),So.initCatmullRom(c.y,d.y,h.y,l.y,this.tension),Eo.initCatmullRom(c.z,d.z,h.z,l.z,this.tension));return n.set(Mo.calc(a),So.calc(a),Eo.calc(a)),n},Rt.prototype.copy=function(e){ce.prototype.copy.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this},Rt.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e},Rt.prototype.fromJSON=function(e){ce.prototype.fromJSON.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new M().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this};function Cc(e,t,n,i,r){const s=(i-t)*.5,o=(r-n)*.5,a=e*e,c=e*a;return(2*n-2*i+s+o)*c+(-3*n+3*i-2*s-o)*a+s*e+n}function Rm(e,t){const n=1-e;return n*n*t}function Cm(e,t){return 2*(1-e)*e*t}function Pm(e,t){return e*e*t}function cr(e,t,n,i){return Rm(e,t)+Cm(e,n)+Pm(e,i)}function Im(e,t){const n=1-e;return n*n*n*t}function Dm(e,t){const n=1-e;return 3*n*n*e*t}function Nm(e,t){return 3*(1-e)*e*e*t}function Om(e,t){return e*e*e*t}function lr(e,t,n,i,r){return Im(e,t)+Dm(e,n)+Nm(e,i)+Om(e,r)}function Ft(e,t,n,i){ce.call(this),this.type="CubicBezierCurve",this.v0=e||new W,this.v1=t||new W,this.v2=n||new W,this.v3=i||new W}Ft.prototype=Object.create(ce.prototype),Ft.prototype.constructor=Ft,Ft.prototype.isCubicBezierCurve=!0,Ft.prototype.getPoint=function(e,t){const n=t||new W,i=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(lr(e,i.x,r.x,s.x,o.x),lr(e,i.y,r.y,s.y,o.y)),n},Ft.prototype.copy=function(e){return ce.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this},Ft.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e},Ft.prototype.fromJSON=function(e){return ce.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this};function $t(e,t,n,i){ce.call(this),this.type="CubicBezierCurve3",this.v0=e||new M,this.v1=t||new M,this.v2=n||new M,this.v3=i||new M}$t.prototype=Object.create(ce.prototype),$t.prototype.constructor=$t,$t.prototype.isCubicBezierCurve3=!0,$t.prototype.getPoint=function(e,t){const n=t||new M,i=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(lr(e,i.x,r.x,s.x,o.x),lr(e,i.y,r.y,s.y,o.y),lr(e,i.z,r.z,s.z,o.z)),n},$t.prototype.copy=function(e){return ce.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this},$t.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e},$t.prototype.fromJSON=function(e){return ce.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this};function yt(e,t){ce.call(this),this.type="LineCurve",this.v1=e||new W,this.v2=t||new W}yt.prototype=Object.create(ce.prototype),yt.prototype.constructor=yt,yt.prototype.isLineCurve=!0,yt.prototype.getPoint=function(e,t){const n=t||new W;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n},yt.prototype.getPointAt=function(e,t){return this.getPoint(e,t)},yt.prototype.getTangent=function(e,t){const n=t||new W;return n.copy(this.v2).sub(this.v1).normalize(),n},yt.prototype.copy=function(e){return ce.prototype.copy.call(this,e),this.v1.copy(e.v1),this.v2.copy(e.v2),this},yt.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},yt.prototype.fromJSON=function(e){return ce.prototype.fromJSON.call(this,e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function Ut(e,t){ce.call(this),this.type="LineCurve3",this.v1=e||new M,this.v2=t||new M}Ut.prototype=Object.create(ce.prototype),Ut.prototype.constructor=Ut,Ut.prototype.isLineCurve3=!0,Ut.prototype.getPoint=function(e,t){const n=t||new M;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n},Ut.prototype.getPointAt=function(e,t){return this.getPoint(e,t)},Ut.prototype.copy=function(e){return ce.prototype.copy.call(this,e),this.v1.copy(e.v1),this.v2.copy(e.v2),this},Ut.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},Ut.prototype.fromJSON=function(e){return ce.prototype.fromJSON.call(this,e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function zt(e,t,n){ce.call(this),this.type="QuadraticBezierCurve",this.v0=e||new W,this.v1=t||new W,this.v2=n||new W}zt.prototype=Object.create(ce.prototype),zt.prototype.constructor=zt,zt.prototype.isQuadraticBezierCurve=!0,zt.prototype.getPoint=function(e,t){const n=t||new W,i=this.v0,r=this.v1,s=this.v2;return n.set(cr(e,i.x,r.x,s.x),cr(e,i.y,r.y,s.y)),n},zt.prototype.copy=function(e){return ce.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this},zt.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},zt.prototype.fromJSON=function(e){return ce.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function Kt(e,t,n){ce.call(this),this.type="QuadraticBezierCurve3",this.v0=e||new M,this.v1=t||new M,this.v2=n||new M}Kt.prototype=Object.create(ce.prototype),Kt.prototype.constructor=Kt,Kt.prototype.isQuadraticBezierCurve3=!0,Kt.prototype.getPoint=function(e,t){const n=t||new M,i=this.v0,r=this.v1,s=this.v2;return n.set(cr(e,i.x,r.x,s.x),cr(e,i.y,r.y,s.y),cr(e,i.z,r.z,s.z)),n},Kt.prototype.copy=function(e){return ce.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this},Kt.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},Kt.prototype.fromJSON=function(e){return ce.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function kt(e){ce.call(this),this.type="SplineCurve",this.points=e||[]}kt.prototype=Object.create(ce.prototype),kt.prototype.constructor=kt,kt.prototype.isSplineCurve=!0,kt.prototype.getPoint=function(e,t){const n=t||new W,i=this.points,r=(i.length-1)*e,s=Math.floor(r),o=r-s,a=i[s===0?s:s-1],c=i[s],l=i[s>i.length-2?i.length-1:s+1],d=i[s>i.length-3?i.length-1:s+2];return n.set(Cc(o,a.x,c.x,l.x,d.x),Cc(o,a.y,c.y,l.y,d.y)),n},kt.prototype.copy=function(e){ce.prototype.copy.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this},kt.prototype.toJSON=function(){const e=ce.prototype.toJSON.call(this);e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e},kt.prototype.fromJSON=function(e){ce.prototype.fromJSON.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new W().fromArray(i))}return this};var Bm=Object.freeze({__proto__:null,ArcCurve:ar,CatmullRomCurve3:Rt,CubicBezierCurve:Ft,CubicBezierCurve3:$t,EllipseCurve:bt,LineCurve:yt,LineCurve3:Ut,QuadraticBezierCurve:zt,QuadraticBezierCurve3:Kt,SplineCurve:kt});function Mn(){ce.call(this),this.type="CurvePath",this.curves=[],this.autoClose=!1}Mn.prototype=Object.assign(Object.create(ce.prototype),{constructor:Mn,add:function(e){this.curves.push(e)},closePath:function(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new yt(t,e))},getPoint:function(e){const t=e*this.getLength(),n=this.getCurveLengths();let i=0;for(;i<n.length;){if(n[i]>=t){const r=n[i]-t,s=this.curves[i],o=s.getLength(),a=o===0?0:1-r/o;return s.getPointAt(a)}i++}return null},getLength:function(){const e=this.getCurveLengths();return e[e.length-1]},updateArcLengths:function(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()},getCurveLengths:function(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e},getSpacedPoints:function(e){e===void 0&&(e=40);const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t},getPoints:function(e){e=e||12;const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const s=r[i],o=s&&s.isEllipseCurve?e*2:s&&(s.isLineCurve||s.isLineCurve3)?1:s&&s.isSplineCurve?e*s.points.length:e,a=s.getPoints(o);for(let c=0;c<a.length;c++){const l=a[c];if(n&&n.equals(l))continue;t.push(l),n=l}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t},copy:function(e){ce.prototype.copy.call(this,e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this},toJSON:function(){const e=ce.prototype.toJSON.call(this);e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e},fromJSON:function(e){ce.prototype.fromJSON.call(this,e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Bm[i.type]().fromJSON(i))}return this}});function Ct(e){Mn.call(this),this.type="Path",this.currentPoint=new W,e&&this.setFromPoints(e)}Ct.prototype=Object.assign(Object.create(Mn.prototype),{constructor:Ct,setFromPoints:function(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this},moveTo:function(e,t){return this.currentPoint.set(e,t),this},lineTo:function(e,t){const n=new yt(this.currentPoint.clone(),new W(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this},quadraticCurveTo:function(e,t,n,i){const r=new zt(this.currentPoint.clone(),new W(e,t),new W(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this},bezierCurveTo:function(e,t,n,i,r,s){const o=new Ft(this.currentPoint.clone(),new W(e,t),new W(n,i),new W(r,s));return this.curves.push(o),this.currentPoint.set(r,s),this},splineThru:function(e){const t=[this.currentPoint.clone()].concat(e),n=new kt(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this},arc:function(e,t,n,i,r,s){const o=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(e+o,t+a,n,i,r,s),this},absarc:function(e,t,n,i,r,s){return this.absellipse(e,t,n,n,i,r,s),this},ellipse:function(e,t,n,i,r,s,o,a){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,i,r,s,o,a),this},absellipse:function(e,t,n,i,r,s,o,a){const c=new bt(e,t,n,i,r,s,o,a);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const l=c.getPoint(1);return this.currentPoint.copy(l),this},copy:function(e){return Mn.prototype.copy.call(this,e),this.currentPoint.copy(e.currentPoint),this},toJSON:function(){const e=Mn.prototype.toJSON.call(this);return e.currentPoint=this.currentPoint.toArray(),e},fromJSON:function(e){return Mn.prototype.fromJSON.call(this,e),this.currentPoint.fromArray(e.currentPoint),this}});function bi(e){Ct.call(this,e),this.uuid=be.generateUUID(),this.type="Shape",this.holes=[]}bi.prototype=Object.assign(Object.create(Ct.prototype),{constructor:bi,getPointsHoles:function(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t},extractPoints:function(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}},copy:function(e){Ct.prototype.copy.call(this,e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this},toJSON:function(){const e=Ct.prototype.toJSON.call(this);e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e},fromJSON:function(e){Ct.prototype.fromJSON.call(this,e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Ct().fromJSON(i))}return this}});function ke(e,t){le.call(this),this.type="Light",this.color=new he(e),this.intensity=t!==void 0?t:1}ke.prototype=Object.assign(Object.create(le.prototype),{constructor:ke,isLight:!0,copy:function(e){return le.prototype.copy.call(this,e),this.color.copy(e.color),this.intensity=e.intensity,this},toJSON:function(e){const t=le.prototype.toJSON.call(this,e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}});function Pc(e,t,n){ke.call(this,e,n),this.type="HemisphereLight",this.position.copy(le.DefaultUp),this.updateMatrix(),this.groundColor=new he(t)}Pc.prototype=Object.assign(Object.create(ke.prototype),{constructor:Pc,isHemisphereLight:!0,copy:function(e){return ke.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}});function en(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new W(512,512),this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dr,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}Object.assign(en.prototype,{_projScreenMatrix:new Ee,_lightPositionWorld:new M,_lookTarget:new M,getViewportCount:function(){return this._viewportCount},getFrustum:function(){return this._frustum},updateMatrices:function(e){const t=this.camera,n=this.matrix,i=this._projScreenMatrix,r=this._lookTarget,s=this._lightPositionWorld;s.setFromMatrixPosition(e.matrixWorld),t.position.copy(s),r.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(r),t.updateMatrixWorld(),i.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(i),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(t.projectionMatrix),n.multiply(t.matrixWorldInverse)},getViewport:function(e){return this._viewports[e]},getFrameExtents:function(){return this._frameExtents},copy:function(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this},clone:function(){return new this.constructor().copy(this)},toJSON:function(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}});function To(){en.call(this,new Qe(50,1,.5,500)),this.focus=1}To.prototype=Object.assign(Object.create(en.prototype),{constructor:To,isSpotLightShadow:!0,updateMatrices:function(e){const t=this.camera,n=be.RAD2DEG*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),en.prototype.updateMatrices.call(this,e)}});function Ao(e,t,n,i,r,s){ke.call(this,e,t),this.type="SpotLight",this.position.copy(le.DefaultUp),this.updateMatrix(),this.target=new le,Object.defineProperty(this,"power",{get:function(){return this.intensity*Math.PI},set:function(o){this.intensity=o/Math.PI}}),this.distance=n!==void 0?n:0,this.angle=i!==void 0?i:Math.PI/3,this.penumbra=r!==void 0?r:0,this.decay=s!==void 0?s:1,this.shadow=new To}Ao.prototype=Object.assign(Object.create(ke.prototype),{constructor:Ao,isSpotLight:!0,copy:function(e){return ke.prototype.copy.call(this,e),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}});function Lo(){en.call(this,new Qe(90,1,.5,500)),this._frameExtents=new W(4,2),this._viewportCount=6,this._viewports=[new Ie(2,1,1,1),new Ie(0,1,1,1),new Ie(3,1,1,1),new Ie(1,1,1,1),new Ie(3,0,1,1),new Ie(1,0,1,1)],this._cubeDirections=[new M(1,0,0),new M(-1,0,0),new M(0,0,1),new M(0,0,-1),new M(0,1,0),new M(0,-1,0)],this._cubeUps=[new M(0,1,0),new M(0,1,0),new M(0,1,0),new M(0,1,0),new M(0,0,1),new M(0,0,-1)]}Lo.prototype=Object.assign(Object.create(en.prototype),{constructor:Lo,isPointLightShadow:!0,updateMatrices:function(e,t){t===void 0&&(t=0);const n=this.camera,i=this.matrix,r=this._lightPositionWorld,s=this._lookTarget,o=this._projScreenMatrix;r.setFromMatrixPosition(e.matrixWorld),n.position.copy(r),s.copy(n.position),s.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(s),n.updateMatrixWorld(),i.makeTranslation(-r.x,-r.y,-r.z),o.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(o)}});function Ro(e,t,n,i){ke.call(this,e,t),this.type="PointLight",Object.defineProperty(this,"power",{get:function(){return this.intensity*4*Math.PI},set:function(r){this.intensity=r/(4*Math.PI)}}),this.distance=n!==void 0?n:0,this.decay=i!==void 0?i:1,this.shadow=new Lo}Ro.prototype=Object.assign(Object.create(ke.prototype),{constructor:Ro,isPointLight:!0,copy:function(e){return ke.prototype.copy.call(this,e),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}});function rs(e,t,n,i,r,s){dn.call(this),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e!==void 0?e:-1,this.right=t!==void 0?t:1,this.top=n!==void 0?n:1,this.bottom=i!==void 0?i:-1,this.near=r!==void 0?r:.1,this.far=s!==void 0?s:2e3,this.updateProjectionMatrix()}rs.prototype=Object.assign(Object.create(dn.prototype),{constructor:rs,isOrthographicCamera:!0,copy:function(e,t){return dn.prototype.copy.call(this,e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this},setViewOffset:function(e,t,n,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()},clearViewOffset:function(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,s=n+e,o=i+t,a=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=l*this.view.offsetY,a=o-l*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,a,this.near,this.far),this.projectionMatrixInverse.getInverse(this.projectionMatrix)},toJSON:function(e){const t=le.prototype.toJSON.call(this,e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}});function Co(){en.call(this,new rs(-5,5,5,-5,.5,500))}Co.prototype=Object.assign(Object.create(en.prototype),{constructor:Co,isDirectionalLightShadow:!0,updateMatrices:function(e){en.prototype.updateMatrices.call(this,e)}});function Po(e,t){ke.call(this,e,t),this.type="DirectionalLight",this.position.copy(le.DefaultUp),this.updateMatrix(),this.target=new le,this.shadow=new Co}Po.prototype=Object.assign(Object.create(ke.prototype),{constructor:Po,isDirectionalLight:!0,copy:function(e){return ke.prototype.copy.call(this,e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}});function Io(e,t){ke.call(this,e,t),this.type="AmbientLight"}Io.prototype=Object.assign(Object.create(ke.prototype),{constructor:Io,isAmbientLight:!0});function Ic(e,t,n,i){ke.call(this,e,t),this.type="RectAreaLight",this.width=n!==void 0?n:10,this.height=i!==void 0?i:10}Ic.prototype=Object.assign(Object.create(ke.prototype),{constructor:Ic,isRectAreaLight:!0,copy:function(e){return ke.prototype.copy.call(this,e),this.width=e.width,this.height=e.height,this},toJSON:function(e){const t=ke.prototype.toJSON.call(this,e);return t.object.width=this.width,t.object.height=this.height,t}});class Fm{constructor(){Object.defineProperty(this,"isSphericalHarmonics3",{value:!0}),this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new M)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,s=this.coefficients;return t.copy(s[0]).multiplyScalar(.282095),t.addScaledVector(s[1],.488603*i),t.addScaledVector(s[2],.488603*r),t.addScaledVector(s[3],.488603*n),t.addScaledVector(s[4],1.092548*(n*i)),t.addScaledVector(s[5],1.092548*(i*r)),t.addScaledVector(s[6],.315392*(3*r*r-1)),t.addScaledVector(s[7],1.092548*(n*r)),t.addScaledVector(s[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,s=this.coefficients;return t.copy(s[0]).multiplyScalar(.886227),t.addScaledVector(s[1],2*.511664*i),t.addScaledVector(s[2],2*.511664*r),t.addScaledVector(s[3],2*.511664*n),t.addScaledVector(s[4],2*.429043*n*i),t.addScaledVector(s[5],2*.429043*i*r),t.addScaledVector(s[6],.743125*r*r-.247708),t.addScaledVector(s[7],2*.429043*n*r),t.addScaledVector(s[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}function Ht(e,t){ke.call(this,void 0,t),this.type="LightProbe",this.sh=e!==void 0?e:new Fm}Ht.prototype=Object.assign(Object.create(ke.prototype),{constructor:Ht,isLightProbe:!0,copy:function(e){return ke.prototype.copy.call(this,e),this.sh.copy(e.sh),this},fromJSON:function(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this},toJSON:function(e){const t=ke.prototype.toJSON.call(this,e);return t.object.sh=this.sh.toArray(),t}});function Dc(e){De.call(this,e),this.textures={}}Dc.prototype=Object.assign(Object.create(De.prototype),{constructor:Dc,load:function(e,t,n,i){const r=this,s=new Bt(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)},parse:function(e){const t=this.textures;function n(r){return t[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),t[r]}const i=new Sm[e.type];if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=new he().setHex(e.sheen)),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==1&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.skinning!==void 0&&(i.skinning=e.skinning),e.morphTargets!==void 0&&(i.morphTargets=e.morphTargets),e.morphNormals!==void 0&&(i.morphNormals=e.morphNormals),e.dithering!==void 0&&(i.dithering=e.dithering),e.vertexTangents!==void 0&&(i.vertexTangents=e.vertexTangents),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const r in e.uniforms){const s=e.uniforms[r];i.uniforms[r]={};switch(s.type){case"t":i.uniforms[r].value=n(s.value);break;case"c":i.uniforms[r].value=new he().setHex(s.value);break;case"v2":i.uniforms[r].value=new W().fromArray(s.value);break;case"v3":i.uniforms[r].value=new M().fromArray(s.value);break;case"v4":i.uniforms[r].value=new Ie().fromArray(s.value);break;case"m3":i.uniforms[r].value=new st().fromArray(s.value);break;case"m4":i.uniforms[r].value=new Ee().fromArray(s.value);break;default:i.uniforms[r].value=s.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.extensions!==void 0)for(const r in e.extensions)i.extensions[r]=e.extensions[r];if(e.shading!==void 0&&(i.flatShading=e.shading===1),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new W().fromArray(r)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.transmission!==void 0&&(i.transmission=e.transmission),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),i},setTextures:function(e){return this.textures=e,this}});const Nc={decodeText:function(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch(n){return t}},extractUrlBase:function(e){const t=e.lastIndexOf("/");return t===-1?"./":e.substr(0,t+1)}};function ss(){ze.call(this),this.type="InstancedBufferGeometry",this.instanceCount=Infinity}ss.prototype=Object.assign(Object.create(ze.prototype),{constructor:ss,isInstancedBufferGeometry:!0,copy:function(e){return ze.prototype.copy.call(this,e),this.instanceCount=e.instanceCount,this},clone:function(){return new this.constructor().copy(this)},toJSON:function(){const e=ze.prototype.toJSON.call(this);return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}});function Do(e,t,n,i){typeof n=="number"&&(i=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),ye.call(this,e,t,n),this.meshPerAttribute=i||1}Do.prototype=Object.assign(Object.create(ye.prototype),{constructor:Do,isInstancedBufferAttribute:!0,copy:function(e){return ye.prototype.copy.call(this,e),this.meshPerAttribute=e.meshPerAttribute,this},toJSON:function(){const e=ye.prototype.toJSON.call(this);return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}});function Oc(e){De.call(this,e)}Oc.prototype=Object.assign(Object.create(De.prototype),{constructor:Oc,load:function(e,t,n,i){const r=this,s=new Bt(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)},parse:function(e){const t={},n={};function i(f,u){if(t[u]!==void 0)return t[u];const m=f.interleavedBuffers,v=m[u],y=r(f,v.buffer),g=new os[v.type](y),p=new mt(g,v.stride);return p.uuid=v.uuid,t[u]=p,p}function r(f,u){if(n[u]!==void 0)return n[u];const m=f.arrayBuffers,v=m[u],y=new Uint32Array(v).buffer;return n[u]=y,y}const s=e.isInstancedBufferGeometry?new ss:new ze,o=e.data.index;if(o!==void 0){const f=new os[o.type](o.array);s.setIndex(new ye(f,1))}const a=e.data.attributes;for(const f in a){const u=a[f];let m;if(u.isInterleavedBufferAttribute){const v=i(e.data,u.data);m=new gn(v,u.itemSize,u.offset,u.normalized)}else{const v=new os[u.type](u.array),y=u.isInstancedBufferAttribute?Do:ye;m=new y(v,u.itemSize,u.normalized)}u.name!==void 0&&(m.name=u.name),s.setAttribute(f,m)}const c=e.data.morphAttributes;if(c)for(const f in c){const u=c[f],m=[];for(let v=0,y=u.length;v<y;v++){const g=u[v];let p;if(g.isInterleavedBufferAttribute){const E=i(e.data,g.data);p=new gn(E,g.itemSize,g.offset,g.normalized)}else{const E=new os[g.type](g.array);p=new ye(E,g.itemSize,g.normalized)}g.name!==void 0&&(p.name=g.name),m.push(p)}s.morphAttributes[f]=m}const l=e.data.morphTargetsRelative;l&&(s.morphTargetsRelative=!0);const d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,u=d.length;f!==u;++f){const m=d[f];s.addGroup(m.start,m.count,m.materialIndex)}const h=e.data.boundingSphere;if(h!==void 0){const f=new M;h.center!==void 0&&f.fromArray(h.center),s.boundingSphere=new Xt(f,h.radius)}return e.name&&(s.name=e.name),e.userData&&(s.userData=e.userData),s}});const os={Int8Array,Uint8Array,Uint8ClampedArray:typeof Uint8ClampedArray!="undefined"?Uint8ClampedArray:Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function No(e){typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),De.call(this,e),this.options={premultiplyAlpha:"none"}}No.prototype=Object.assign(Object.create(De.prototype),{constructor:No,isImageBitmapLoader:!0,setOptions:function(t){return this.options=t,this},load:function(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=_i.get(e);if(s!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0),s;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",fetch(e,o).then(function(a){return a.blob()}).then(function(a){return createImageBitmap(a,r.options)}).then(function(a){_i.add(e,a),t&&t(a),r.manager.itemEnd(e)}).catch(function(a){i&&i(a),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}});function Oo(){this.type="ShapePath",this.color=new he,this.subPaths=[],this.currentPath=null}Object.assign(Oo.prototype,{moveTo:function(e,t){return this.currentPath=new Ct,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this},lineTo:function(e,t){return this.currentPath.lineTo(e,t),this},quadraticCurveTo:function(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this},bezierCurveTo:function(e,t,n,i,r,s){return this.currentPath.bezierCurveTo(e,t,n,i,r,s),this},splineThru:function(e){return this.currentPath.splineThru(e),this},toShapes:function(e,t){function n(g){const p=[];for(let E=0,S=g.length;E<S;E++){const T=g[E],b=new bi;b.curves=T.curves,p.push(b)}return p}function i(g,p){const E=p.length;let S=!1;for(let T=E-1,b=0;b<E;T=b++){let L=p[T],k=p[b],H=k.x-L.x,te=k.y-L.y;if(Math.abs(te)>Number.EPSILON){if(te<0&&(L=p[b],H=-H,k=p[T],te=-te),g.y<L.y||g.y>k.y)continue;if(g.y===L.y){if(g.x===L.x)return!0}else{const R=te*(g.x-L.x)-H*(g.y-L.y);if(R===0)return!0;if(R<0)continue;S=!S}}else{if(g.y!==L.y)continue;if(k.x<=g.x&&g.x<=L.x||L.x<=g.x&&g.x<=k.x)return!0}}return S}const r=_n.isClockWise,s=this.subPaths;if(s.length===0)return[];if(t===!0)return n(s);let o,a,c;const l=[];if(s.length===1)return a=s[0],c=new bi,c.curves=a.curves,l.push(c),l;let d=!r(s[0].getPoints());d=e?!d:d;const h=[],f=[];let u=[],m=0,v;f[m]=void 0,u[m]=[];for(let g=0,p=s.length;g<p;g++)a=s[g],v=a.getPoints(),o=r(v),o=e?!o:o,o?(!d&&f[m]&&m++,f[m]={s:new bi,p:v},f[m].s.curves=a.curves,d&&m++,u[m]=[]):u[m].push({h:a,p:v[0]});if(!f[0])return n(s);if(f.length>1){let g=!1;const p=[];for(let E=0,S=f.length;E<S;E++)h[E]=[];for(let E=0,S=f.length;E<S;E++){const T=u[E];for(let b=0;b<T.length;b++){const L=T[b];let k=!0;for(let H=0;H<f.length;H++)i(L.p,f[H].p)&&(E!==H&&p.push({froms:E,tos:H,hole:b}),k?(k=!1,h[H].push(L)):g=!0);k&&h[E].push(L)}}p.length>0&&(g||(u=h))}let y;for(let g=0,p=f.length;g<p;g++){c=f[g].s,l.push(c),y=u[g];for(let E=0,S=y.length;E<S;E++)c.holes.push(y[E].h)}return l}});function Bc(e){this.type="Font",this.data=e}Object.assign(Bc.prototype,{isFont:!0,generateShapes:function(e,t){t===void 0&&(t=100);const n=[],i=Um(e,t,this.data);for(let r=0,s=i.length;r<s;r++)Array.prototype.push.apply(n,i[r].toShapes());return n}});function Um(e,t,n){const i=Array.from?Array.from(e):String(e).split(""),r=t/n.resolution,s=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*r,o=[];let a=0,c=0;for(let l=0;l<i.length;l++){const d=i[l];if(d===`
`)a=0,c-=s;else{const h=zm(d,r,a,c,n);a+=h.offsetX,o.push(h.path)}}return o}function zm(e,t,n,i,r){const s=r.glyphs[e]||r.glyphs["?"];if(!s){console.error('THREE.Font: character "'+e+'" does not exists in font family '+r.familyName+".");return}const o=new Oo;let a,c,l,d,h,f,u,m;if(s.o){const v=s._cachedOutline||(s._cachedOutline=s.o.split(" "));for(let y=0,g=v.length;y<g;){const p=v[y++];switch(p){case"m":a=v[y++]*t+n,c=v[y++]*t+i,o.moveTo(a,c);break;case"l":a=v[y++]*t+n,c=v[y++]*t+i,o.lineTo(a,c);break;case"q":l=v[y++]*t+n,d=v[y++]*t+i,h=v[y++]*t+n,f=v[y++]*t+i,o.quadraticCurveTo(h,f,l,d);break;case"b":l=v[y++]*t+n,d=v[y++]*t+i,h=v[y++]*t+n,f=v[y++]*t+i,u=v[y++]*t+n,m=v[y++]*t+i,o.bezierCurveTo(h,f,u,m,l,d);break}}}return{offsetX:s.ha*t,path:o}}function Fc(e){De.call(this,e)}Fc.prototype=Object.assign(Object.create(De.prototype),{constructor:Fc,load:function(e,t,n,i){const r=this,s=new Bt(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){let a;try{a=JSON.parse(o)}catch(l){console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),a=JSON.parse(o.substring(65,o.length-2))}const c=r.parse(a);t&&t(c)},n,i)},parse:function(e){return new Bc(e)}});let as;const km={getContext:function(){return as===void 0&&(as=new(window.AudioContext||window.webkitAudioContext)),as},setContext:function(e){as=e}};function Bo(e){De.call(this,e)}Bo.prototype=Object.assign(Object.create(De.prototype),{constructor:Bo,load:function(e,t,n,i){const r=this,s=new Bt(r.manager);s.setResponseType("arraybuffer"),s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{const a=o.slice(0),c=km.getContext();c.decodeAudioData(a,function(l){t(l)})}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)}});function Uc(e,t,n){Ht.call(this,void 0,n);const i=new he().set(e),r=new he().set(t),s=new M(i.r,i.g,i.b),o=new M(r.r,r.g,r.b),a=Math.sqrt(Math.PI),c=a*Math.sqrt(.75);this.sh.coefficients[0].copy(s).add(o).multiplyScalar(a),this.sh.coefficients[1].copy(s).sub(o).multiplyScalar(c)}Uc.prototype=Object.assign(Object.create(Ht.prototype),{constructor:Uc,isHemisphereLightProbe:!0,copy:function(e){return Ht.prototype.copy.call(this,e),this},toJSON:function(e){const t=Ht.prototype.toJSON.call(this,e);return t}});function zc(e,t){Ht.call(this,void 0,t);const n=new he().set(e);this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI))}zc.prototype=Object.assign(Object.create(Ht.prototype),{constructor:zc,isAmbientLightProbe:!0,copy:function(e){return Ht.prototype.copy.call(this,e),this},toJSON:function(e){const t=Ht.prototype.toJSON.call(this,e);return t}});const kc=new Ee,Hc=new Ee;function Hm(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Qe,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Qe,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}Object.assign(Hm.prototype,{update:function(e){const t=this._cache,n=t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep;if(n){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep;const i=e.projectionMatrix.clone(),r=t.eyeSep/2,s=r*t.near/t.focus,o=t.near*Math.tan(be.DEG2RAD*t.fov*.5)/t.zoom;let a,c;Hc.elements[12]=-r,kc.elements[12]=r,a=-o*t.aspect+s,c=o*t.aspect+s,i.elements[0]=2*t.near/(c-a),i.elements[8]=(c+a)/(c-a),this.cameraL.projectionMatrix.copy(i),a=-o*t.aspect-s,c=o*t.aspect-s,i.elements[0]=2*t.near/(c-a),i.elements[8]=(c+a)/(c-a),this.cameraR.projectionMatrix.copy(i)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Hc),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(kc)}});class Gm{constructor(e){this.autoStart=e!==void 0?e:!0,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=(typeof performance=="undefined"?Date:performance).now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=(typeof performance=="undefined"?Date:performance).now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class Vm extends le{constructor(e){super();this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e){if(e===void 0&&(e=0),this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.source.detune===void 0?void 0:(this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this)}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}function Gc(e,t,n){this.binding=e,this.valueSize=n;let i,r,s;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,s=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,s=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,s=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=s,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}Object.assign(Gc.prototype,{accumulate:function(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let s=this.cumulativeWeight;if(s===0){for(let o=0;o!==i;++o)n[r+o]=n[o];s=t}else{s+=t;const o=t/s;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=s},accumulateAdditive:function(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e},apply:function(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,s=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const a=t*this._origIndex;this._mixBufferRegion(n,i,a,1-r,t)}s>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let a=t,c=t+t;a!==c;++a)if(n[a]!==n[a+t]){o.setValue(n,i);break}},saveOriginalState:function(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,s=i;r!==s;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0},restoreOriginalState:function(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)},_setAdditiveIdentityNumeric:function(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0},_setAdditiveIdentityQuaternion:function(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1},_setAdditiveIdentityOther:function(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]},_select:function(e,t,n,i,r){if(i>=.5)for(let s=0;s!==r;++s)e[t+s]=e[n+s]},_slerp:function(e,t,n,i){ut.slerpFlat(e,t,e,t,e,n,i)},_slerpAdditive:function(e,t,n,i,r){const s=this._workIndex*r;ut.multiplyQuaternionsFlat(e,s,e,t,e,n),ut.slerpFlat(e,t,e,t,e,s,i)},_lerp:function(e,t,n,i,r){const s=1-i;for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]*s+e[n+o]*i}},_lerpAdditive:function(e,t,n,i,r){for(let s=0;s!==r;++s){const o=t+s;e[o]=e[o]+e[n+s]*i}}});const Fo="\\[\\]\\.:\\/",Wm=new RegExp("["+Fo+"]","g"),Uo="[^"+Fo+"]",jm="[^"+Fo.replace("\\.","")+"]",qm=/((?:WC+[\/:])*)/.source.replace("WC",Uo),Xm=/(WCOD+)?/.source.replace("WCOD",jm),Ym=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uo),Zm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uo),Jm=new RegExp("^"+qm+Xm+Ym+Zm+"$"),Qm=["material","materials","bones"];function Vc(e,t,n){const i=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}Object.assign(Vc.prototype,{getValue:function(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)},setValue:function(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)},bind:function(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()},unbind:function(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}});function rt(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e}Object.assign(rt,{Composite:Vc,create:function(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)},sanitizeNodeName:function(e){return e.replace(/\s/g,"_").replace(Wm,"")},parseTrackName:function(e){const t=Jm.exec(e);if(!t)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Qm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n},findNode:function(e,t){if(!t||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let s=0;s<r.length;s++){const o=r[s];if(o.name===t||o.uuid===t)return o;const a=n(o.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}}),Object.assign(rt.prototype,{_getValue_unavailable:function(){},_setValue_unavailable:function(){},BindingType:{Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Versioning:{None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},GetterByBindingType:[function(t,n){t[n]=this.node[this.propertyName]},function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)t[n++]=i[r]},function(t,n){t[n]=this.resolvedProperty[this.propertyIndex]},function(t,n){this.resolvedProperty.toArray(t,n)}],SetterByBindingTypeAndVersioning:[[function(t,n){this.targetObject[this.propertyName]=t[n]},function(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0},function(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[n++]},function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[n++];this.targetObject.needsUpdate=!0},function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,n){this.resolvedProperty[this.propertyIndex]=t[n]},function(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0},function(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,n){this.resolvedProperty.fromArray(t,n)},function(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0},function(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}]],getValue:function(t,n){this.bind(),this.getValue(t,n)},setValue:function(t,n){this.bind(),this.setValue(t,n)},bind:function(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let l=0;l<e.length;l++)if(e[l].name===c){c=l;break}break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const s=e[i];if(s===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(e.geometry.isBufferGeometry){if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}else{console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);return}}a=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else s.fromArray!==void 0&&s.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(a=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]},unbind:function(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}),Object.assign(rt.prototype,{_getValue_unbound:rt.prototype.getValue,_setValue_unbound:rt.prototype.setValue});function $m(){this.uuid=be.generateUUID(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}Object.assign($m.prototype,{isAnimationObjectGroup:!0,add:function(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,s=r.length;let o,a=e.length,c=this.nCachedObjects_;for(let l=0,d=arguments.length;l!==d;++l){const h=arguments[l],f=h.uuid;let u=t[f];if(u===void 0){u=a++,t[f]=u,e.push(h);for(let m=0,v=s;m!==v;++m)r[m].push(new rt(h,n[m],i[m]))}else if(u<c){o=e[u];const m=--c,v=e[m];t[v.uuid]=u,e[u]=v,t[f]=m,e[m]=h;for(let y=0,g=s;y!==g;++y){const p=r[y],E=p[m];let S=p[u];p[u]=E,S===void 0&&(S=new rt(h,n[y],i[y])),p[m]=S}}else e[u]!==o&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c},remove:function(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let s=0,o=arguments.length;s!==o;++s){const a=arguments[s],c=a.uuid,l=t[c];if(l!==void 0&&l>=r){const d=r++,h=e[d];t[h.uuid]=l,e[l]=h,t[c]=d,e[d]=a;for(let f=0,u=i;f!==u;++f){const m=n[f],v=m[d],y=m[l];m[l]=v,m[d]=y}}}this.nCachedObjects_=r},uncache:function(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,s=e.length;for(let o=0,a=arguments.length;o!==a;++o){const c=arguments[o],l=c.uuid,d=t[l];if(d!==void 0)if(delete t[l],d<r){const h=--r,f=e[h],u=--s,m=e[u];t[f.uuid]=d,e[d]=f,t[m.uuid]=h,e[h]=m,e.pop();for(let v=0,y=i;v!==y;++v){const g=n[v],p=g[h],E=g[u];g[d]=p,g[h]=E,g.pop()}}else{const h=--s,f=e[h];h>0&&(t[f.uuid]=d),e[d]=f,e.pop();for(let u=0,m=i;u!==m;++u){const v=n[u];v[d]=v[h],v.pop()}}}this.nCachedObjects_=r},subscribe_:function(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const r=this._bindings;if(i!==void 0)return r[i];const s=this._paths,o=this._parsedPaths,a=this._objects,c=a.length,l=this.nCachedObjects_,d=new Array(c);i=r.length,n[e]=i,s.push(e),o.push(t),r.push(d);for(let h=l,f=a.length;h!==f;++h){const u=a[h];d[h]=new rt(u,e,t)}return d},unsubscribe_:function(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,r=this._parsedPaths,s=this._bindings,o=s.length-1,a=s[o],c=e[o];t[c]=n,s[n]=a,s.pop(),r[n]=r[o],r.pop(),i[n]=i[o],i.pop()}}});class Km{constructor(e,t,n,i){this._mixer=e,this._clip=t,this._localRoot=n||null,this.blendMode=i||t.blendMode;const r=t.tracks,s=r.length,o=new Array(s),a={endingStart:kn,endingEnd:kn};for(let c=0;c!==s;++c){const l=r[c].createInterpolant(null);o[c]=l,l.settings=a}this._interpolantSettings=a,this._interpolants=o,this._propertyBindings=new Array(s),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Sh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=Infinity,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,s=r/i,o=i/r;e.warp(1,s,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,s=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=r,a[1]=r+n,c[0]=e/s,c[1]=t/s,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const a=(e-r)*n;if(a<0||n===0)return;this._startTime=null,t=n*a}t*=this._updateTimeScale(e);const s=this._updateTime(t),o=this._updateWeight(e);if(o>0){const a=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case ma:for(let l=0,d=a.length;l!==d;++l)a[l].evaluate(s),c[l].accumulateAdditive(o);break;case ws:default:for(let l=0,d=a.length;l!==d;++l)a[l].evaluate(s),c[l].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const s=n===Eh;if(e===0)return r===-1?i:s&&(r&1)===1?t-i:i;if(n===Mh){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,s)):this._setEndings(this.repetitions===0,!0,s)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);const a=this.repetitions-r;if(a<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(a===1){const c=e<0;this._setEndings(c,!c,s)}else this._setEndings(!1,!1,s);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(s&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Hn,i.endingEnd=Hn):(e?i.endingStart=this.zeroSlopeAtStart?Hn:kn:i.endingStart=gr,t?i.endingEnd=this.zeroSlopeAtEnd?Hn:kn:i.endingEnd=gr)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let s=this._weightInterpolant;s===null&&(s=i._lendControlInterpolant(),this._weightInterpolant=s);const o=s.parameterPositions,a=s.sampleValues;return o[0]=r,a[0]=t,o[1]=r+e,a[1]=n,this}}function Wc(e){this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}Wc.prototype=Object.assign(Object.create(Wt.prototype),{constructor:Wc,_bindAction:function(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,s=e._propertyBindings,o=e._interpolants,a=n.uuid,c=this._bindingsByRootAndName;let l=c[a];l===void 0&&(l={},c[a]=l);for(let d=0;d!==r;++d){const h=i[d],f=h.name;let u=l[f];if(u!==void 0)s[d]=u;else{if(u=s[d],u!==void 0){u._cacheIndex===null&&(++u.referenceCount,this._addInactiveBinding(u,a,f));continue}const m=t&&t._propertyBindings[d].binding.parsedPath;u=new Gc(rt.create(n,f,m),h.ValueTypeName,h.getValueSize()),++u.referenceCount,this._addInactiveBinding(u,a,f),s[d]=u}o[d].resultBuffer=u.buffer}},_activateAction:function(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}},_deactivateAction:function(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}},_initMemoryManager:function(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}},_isActiveAction:function(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions},_addInactiveAction:function(e,t,n){const i=this._actions,r=this._actionsByClip;let s=r[t];if(s===void 0)s={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=s;else{const o=s.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),s.actionByRoot[n]=e},_removeInactiveAction:function(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,s=this._actionsByClip,o=s[r],a=o.knownActions,c=a[a.length-1],l=e._byClipCacheIndex;c._byClipCacheIndex=l,a[l]=c,a.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],a.length===0&&delete s[r],this._removeInactiveBindingsForAction(e)},_removeInactiveBindingsForAction:function(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}},_lendAction:function(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_takeBackAction:function(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_addInactiveBinding:function(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let s=i[t];s===void 0&&(s={},i[t]=s),s[n]=e,e._cacheIndex=r.length,r.push(e)},_removeInactiveBinding:function(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,s=this._bindingsByRootAndName,o=s[i],a=t[t.length-1],c=e._cacheIndex;a._cacheIndex=c,t[c]=a,t.pop(),delete o[r],Object.keys(o).length===0&&delete s[i]},_lendBinding:function(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_takeBackBinding:function(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_lendControlInterpolant:function(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new es(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),n.__cacheIndex=t,e[t]=n),n},_takeBackControlInterpolant:function(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r},_controlInterpolantsResultBuffer:new Float32Array(1),clipAction:function(e,t,n){const i=t||this._root,r=i.uuid;let s=typeof e=="string"?At.findByName(i,e):e;const o=s!==null?s.uuid:e,a=this._actionsByClip[o];let c=null;if(n===void 0&&(s!==null?n=s.blendMode:n=ws),a!==void 0){const d=a.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=a.knownActions[0],s===null&&(s=c._clip)}if(s===null)return null;const l=new Km(this,s,t,n);return this._bindAction(l,c),this._addInactiveAction(l,o,r),l},existingAction:function(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?At.findByName(n,e):e,s=r?r.uuid:e,o=this._actionsByClip[s];return o!==void 0&&o.actionByRoot[i]||null},stopAllAction:function(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this},update:function(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),s=this._accuIndex^=1;for(let c=0;c!==n;++c){const l=t[c];l._update(i,e,r,s)}const o=this._bindings,a=this._nActiveBindings;for(let c=0;c!==a;++c)o[c].apply(s);return this},setTime:function(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)},getRoot:function(){return this._root},uncacheClip:function(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const s=r.knownActions;for(let o=0,a=s.length;o!==a;++o){const c=s[o];this._deactivateAction(c);const l=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=l,t[l]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}},uncacheRoot:function(e){const t=e.uuid,n=this._actionsByClip;for(const s in n){const o=n[s].actionByRoot,a=o[t];a!==void 0&&(this._deactivateAction(a),this._removeInactiveAction(a))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const s in r){const o=r[s];o.restoreOriginalState(),this._removeInactiveBinding(o)}},uncacheAction:function(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}});class jc{constructor(e){typeof e=="string"&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),e=arguments[1]),this.value=e}clone(){return new jc(this.value.clone===void 0?this.value:this.value.clone())}}function qc(e,t,n){mt.call(this,e,t),this.meshPerAttribute=n||1}qc.prototype=Object.assign(Object.create(mt.prototype),{constructor:qc,isInstancedInterleavedBuffer:!0,copy:function(e){return mt.prototype.copy.call(this,e),this.meshPerAttribute=e.meshPerAttribute,this},clone:function(e){const t=mt.prototype.clone.call(this,e);return t.meshPerAttribute=this.meshPerAttribute,t},toJSON:function(e){const t=mt.prototype.toJSON.call(this,e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}});function Xc(e,t,n,i,r){this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}Object.defineProperty(Xc.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}}),Object.assign(Xc.prototype,{isGLBufferAttribute:!0,setBuffer:function(e){return this.buffer=e,this},setType:function(e,t){return this.type=e,this.elementSize=t,this},setItemSize:function(e){return this.itemSize=e,this},setCount:function(e){return this.count=e,this}});function zo(e,t,n,i){this.ray=new zi(e,t),this.near=n||0,this.far=i||Infinity,this.camera=null,this.layers=new wa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}},Object.defineProperties(this.params,{PointCloud:{get:function(){return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."),this.Points}}})}function Yc(e,t){return e.distance-t.distance}function ko(e,t,n,i){if(e.layers.test(t.layers)&&e.raycast(t,n),i===!0){const r=e.children;for(let s=0,o=r.length;s<o;s++)ko(r[s],t,n,!0)}}Object.assign(zo.prototype,{set:function(e,t){this.ray.set(e,t)},setFromCamera:function(e,t){t&&t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t&&t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type.")},intersectObject:function(e,t,n){const i=n||[];return ko(e,this,i,t),i.sort(Yc),i},intersectObjects:function(e,t,n){const i=n||[];if(Array.isArray(e)===!1)return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),i;for(let r=0,s=e.length;r<s;r++)ko(e[r],this,i,t);return i.sort(Yc),i}});const Zc=new W;class eg{constructor(e,t){Object.defineProperty(this,"isBox2",{value:!0}),this.min=e!==void 0?e:new W(Infinity,Infinity),this.max=t!==void 0?t:new W(-Infinity,-Infinity)}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Zc.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=Infinity,this.max.x=this.max.y=-Infinity,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return e===void 0&&(console.warn("THREE.Box2: .getCenter() target is now required"),e=new W),this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return e===void 0&&(console.warn("THREE.Box2: .getSize() target is now required"),e=new W),this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t===void 0&&(console.warn("THREE.Box2: .getParameter() target is now required"),t=new W),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y)}clampPoint(e,t){return t===void 0&&(console.warn("THREE.Box2: .clampPoint() target is now required"),t=new W),t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){const t=Zc.copy(e).clamp(this.min,this.max);return t.sub(e).length()}intersect(e){return this.min.max(e.min),this.max.min(e.max),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}function cs(e){le.call(this),this.material=e,this.render=function(){},this.hasPositions=!1,this.hasNormals=!1,this.hasColors=!1,this.hasUvs=!1,this.positionArray=null,this.normalArray=null,this.colorArray=null,this.uvArray=null,this.count=0}cs.prototype=Object.create(le.prototype),cs.prototype.constructor=cs,cs.prototype.isImmediateRenderObject=!0,ce.create=function(e,t){return console.log("THREE.Curve.create() has been deprecated"),e.prototype=Object.create(ce.prototype),e.prototype.constructor=e,e.prototype.getPoint=t,e},Object.assign(Mn.prototype,{createPointsGeometry:function(e){console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");const t=this.getPoints(e);return this.createGeometry(t)},createSpacedPointsGeometry:function(e){console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");const t=this.getSpacedPoints(e);return this.createGeometry(t)},createGeometry:function(e){console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");const t=new Tt;for(let n=0,i=e.length;n<i;n++){const r=e[n];t.vertices.push(new M(r.x,r.y,r.z||0))}return t}}),Object.assign(Ct.prototype,{fromPoints:function(e){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(e)}});function Jc(e){console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."),Rt.call(this,e),this.type="catmullrom"}Jc.prototype=Object.create(Rt.prototype),Object.assign(Jc.prototype,{initFromArray:function(){console.error("THREE.Spline: .initFromArray() has been removed.")},getControlPointsArray:function(){console.error("THREE.Spline: .getControlPointsArray() has been removed.")},reparametrizeByArcLength:function(){console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")}}),Object.assign(De.prototype,{extractUrlBase:function(e){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),Nc.extractUrlBase(e)}}),De.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}},Object.assign(eg.prototype,{center:function(e){return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),this.getCenter(e)},empty:function(){return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),this.isEmpty()},isIntersectionBox:function(e){return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},size:function(e){return console.warn("THREE.Box2: .size() has been renamed to .getSize()."),this.getSize(e)}}),Object.assign(jt.prototype,{center:function(e){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(e)},empty:function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()},isIntersectionBox:function(e){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},isIntersectionSphere:function(e){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(e)},size:function(e){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(e)}}),Object.assign(Xt.prototype,{empty:function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()}}),Dr.prototype.setFromMatrix=function(e){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(e)},Object.assign(be,{random16:function(){return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."),Math.random()},nearestPowerOfTwo:function(e){return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."),be.floorPowerOfTwo(e)},nextPowerOfTwo:function(e){return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."),be.ceilPowerOfTwo(e)}}),Object.assign(st.prototype,{flattenToArrayOffset:function(e,t){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(e,t)},multiplyVector3:function(e){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),e.applyMatrix3(this)},multiplyVector3Array:function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")},applyToBufferAttribute:function(e){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),e.applyMatrix3(this)},applyToVector3Array:function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")}}),Object.assign(Ee.prototype,{extractPosition:function(e){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(e)},flattenToArrayOffset:function(e,t){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(e,t)},getPosition:function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new M().setFromMatrixColumn(this,3)},setRotationFromQuaternion:function(e){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(e)},multiplyToArray:function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")},multiplyVector3:function(e){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},multiplyVector4:function(e){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},multiplyVector3Array:function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")},rotateAxis:function(e){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),e.transformDirection(this)},crossVector:function(e){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},translate:function(){console.error("THREE.Matrix4: .translate() has been removed.")},rotateX:function(){console.error("THREE.Matrix4: .rotateX() has been removed.")},rotateY:function(){console.error("THREE.Matrix4: .rotateY() has been removed.")},rotateZ:function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")},rotateByAxis:function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")},applyToBufferAttribute:function(e){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},applyToVector3Array:function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")},makeFrustum:function(e,t,n,i,r,s){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(e,t,i,n,r,s)}}),Pt.prototype.isIntersectionLine=function(e){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(e)},ut.prototype.multiplyVector3=function(e){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),e.applyQuaternion(this)},Object.assign(zi.prototype,{isIntersectionBox:function(e){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},isIntersectionPlane:function(e){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(e)},isIntersectionSphere:function(e){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(e)}}),Object.assign(ot.prototype,{area:function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()},barycoordFromPoint:function(e,t){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(e,t)},midpoint:function(e){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(e)},normal:function(e){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(e)},plane:function(e){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(e)}}),Object.assign(ot,{barycoordFromPoint:function(e,t,n,i,r){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),ot.getBarycoord(e,t,n,i,r)},normal:function(e,t,n,i){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),ot.getNormal(e,t,n,i)}}),Object.assign(bi.prototype,{extractAllPoints:function(e){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(e)},extrude:function(e){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new xm(this,e)},makeGeometry:function(e){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new wm(this,e)}}),Object.assign(W.prototype,{fromAttribute:function(e,t,n){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,n)},distanceToManhattan:function(e){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(e)},lengthManhattan:function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(M.prototype,{setEulerFromRotationMatrix:function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")},setEulerFromQuaternion:function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")},getPositionFromMatrix:function(e){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(e)},getScaleFromMatrix:function(e){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(e)},getColumnFromMatrix:function(e,t){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(t,e)},applyProjection:function(e){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(e)},fromAttribute:function(e,t,n){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,n)},distanceToManhattan:function(e){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(e)},lengthManhattan:function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(Ie.prototype,{fromAttribute:function(e,t,n){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,n)},lengthManhattan:function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(Tt.prototype,{computeTangents:function(){console.error("THREE.Geometry: .computeTangents() has been removed.")},computeLineDistances:function(){console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.")},applyMatrix:function(e){return console.warn("THREE.Geometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.assign(le.prototype,{getChildByName:function(e){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(e)},renderDepth:function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")},translate:function(e,t){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(t,e)},getWorldRotation:function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")},applyMatrix:function(e){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.defineProperties(le.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(e){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=e}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}}),Object.assign(et.prototype,{setDrawMode:function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}),Object.defineProperties(et.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),Th},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}}),Object.defineProperties(io.prototype,{objects:{get:function(){return console.warn("THREE.LOD: .objects has been renamed to .levels."),this.levels}}}),Object.defineProperty(kr.prototype,"useVertexTexture",{get:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")},set:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")}}),zr.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")},Object.defineProperty(ce.prototype,"__arcLengthDivisions",{get:function(){return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions},set:function(e){console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions=e}}),Qe.prototype.setLens=function(e,t){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),t!==void 0&&(this.filmGauge=t),this.setFocalLength(e)},Object.defineProperties(ke.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(e){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=e}},shadowCameraLeft:{set:function(e){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=e}},shadowCameraRight:{set:function(e){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=e}},shadowCameraTop:{set:function(e){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=e}},shadowCameraBottom:{set:function(e){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=e}},shadowCameraNear:{set:function(e){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=e}},shadowCameraFar:{set:function(e){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=e}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(e){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=e}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(e){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=e}},shadowMapHeight:{set:function(e){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=e}}}),Object.defineProperties(ye.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===Bi},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(Bi)}}}),Object.assign(ye.prototype,{setDynamic:function(e){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(e===!0?Bi:yr),this},copyIndicesArray:function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},setArray:function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")}}),Object.assign(ze.prototype,{addIndex:function(e){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(e)},addAttribute:function(e,t){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),!(t&&t.isBufferAttribute)&&!(t&&t.isInterleavedBufferAttribute)?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(e,new ye(arguments[1],arguments[2]))):e==="index"?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(t),this):this.setAttribute(e,t)},addDrawCall:function(e,t,n){n!==void 0&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(e,t)},clearDrawCalls:function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()},computeTangents:function(){console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")},computeOffsets:function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")},removeAttribute:function(e){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(e)},applyMatrix:function(e){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.defineProperties(ze.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}}),Object.defineProperties(ss.prototype,{maxInstancedCount:{get:function(){return console.warn("THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."),this.instanceCount},set:function(e){console.warn("THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."),this.instanceCount=e}}}),Object.defineProperties(zo.prototype,{linePrecision:{get:function(){return console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."),this.params.Line.threshold},set:function(e){console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."),this.params.Line.threshold=e}}}),Object.defineProperties(mt.prototype,{dynamic:{get:function(){return console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."),this.usage===Bi},set:function(e){console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."),this.setUsage(e)}}}),Object.assign(mt.prototype,{setDynamic:function(e){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(e===!0?Bi:yr),this},setArray:function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")}}),Object.assign(Ec.prototype,{getArrays:function(){console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.")},addShapeList:function(){console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.")},addShape:function(){console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.")}}),Object.assign(Qp.prototype,{dispose:function(){console.error("THREE.Scene: .dispose() has been removed.")}}),Object.defineProperties(jc.prototype,{dynamic:{set:function(){console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")}},onUpdate:{value:function(){return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."),this}}}),Object.defineProperties(fe.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new he}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(e){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=e===Zo}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(e){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=e}}}),Object.defineProperties(wn.prototype,{metal:{get:function(){return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."),!1},set:function(){console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")}}}),Object.defineProperties(bn.prototype,{transparency:{get:function(){return console.warn("THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."),this.transmission},set:function(e){console.warn("THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."),this.transmission=e}}}),Object.defineProperties(at.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(e){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=e}}}),Object.assign(Nr.prototype,{clearTarget:function(e,t,n,i){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(e),this.clear(t,n,i)},animate:function(e){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(e)},getCurrentRenderTarget:function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()},getMaxAnisotropy:function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()},getPrecision:function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision},resetGLState:function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()},supportsFloatTextures:function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")},supportsHalfFloatTextures:function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")},supportsStandardDerivatives:function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")},supportsCompressedTextureS3TC:function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")},supportsCompressedTexturePVRTC:function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")},supportsBlendMinMax:function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")},supportsVertexTextures:function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures},supportsInstancedArrays:function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")},enableScissorTest:function(e){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(e)},initMaterial:function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")},addPrePlugin:function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")},addPostPlugin:function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")},updateShadowMap:function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")},setFaceCulling:function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")},allocTextureUnit:function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")},setTexture:function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")},setTexture2D:function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")},setTextureCube:function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")},getActiveMipMapLevel:function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()}}),Object.defineProperties(Nr.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(e){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=e}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(e){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=e}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.");return},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(e){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=e===!0?Ms:Oi}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}}}),Object.defineProperties(ic.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.");return},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.");return},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.");return},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}}),Object.defineProperties(xt.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(e){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=e}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(e){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=e}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(e){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=e}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(e){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=e}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(e){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=e}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(e){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=e}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(e){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=e}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(e){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=e}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(e){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=e}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(e){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=e}}}),Object.defineProperties(Vm.prototype,{load:{value:function(e){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");const t=this,n=new Bo;return n.load(e,function(i){t.setBuffer(i)}),this}},startTime:{set:function(){console.warn("THREE.Audio: .startTime is now .play( delay ).")}}}),ri.prototype.updateCubeMap=function(e,t){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(e,t)},ri.prototype.clear=function(e,t,n,i){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(e,t,n,i)},Tn.crossOrigin=void 0,Tn.loadTexture=function(e,t,n,i){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");const r=new ns;r.setCrossOrigin(this.crossOrigin);const s=r.load(e,n,void 0,i);return t&&(s.mapping=t),s},Tn.loadTextureCube=function(e,t,n,i){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");const r=new bo;r.setCrossOrigin(this.crossOrigin);const s=r.load(e,n,void 0,i);return t&&(s.mapping=t),s},Tn.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")},Tn.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nl}}));export{Ot as $,kr as A,ro as B,Gm as C,Ai as D,ms as E,Bt as F,In as G,Io as H,ze as I,Oe as J,st as K,$e as L,cn as M,ye as N,le as O,Oa as P,At as Q,zo as R,no as S,Ne as T,Jn as U,M as V,ut as W,ki as X,xi as Y,or as Z,vi as _,yn as a,En as a0,No as a1,mt as a2,nn as a3,Ci as a4,vn as a5,fe as a6,W as a7,so as a8,oo as a9,ga as aA,Fn as aB,us as aC,co as aa,Ni as ab,bn as ac,gt as ad,tt as ae,vs as af,ra as ag,xs as ah,dr as ai,Di as aj,Ti as ak,gn as al,tr as am,Lh as an,Ah as ao,jt as ap,Xt as aq,Ct as ar,Pt as as,xt as at,at as au,Da as av,Ze as aw,Qs as ax,vt as ay,mn as az,et as b,Tc as c,Oo as d,Ie as e,ce as f,De as g,Nc as h,ns as i,ur as j,ht as k,wn as l,On as m,he as n,Ee as o,rt as p,rs as q,Qe as r,Ms as s,Ro as t,be as u,Ao as v,Po as w,zr as x,Et as y,Nn as z};
