import*as t from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{ImprovedNoise as g}from"../../../../../web_modules/three/examples/jsm/math/ImprovedNoise.js";import{WEBGL as v}from"../../../../../web_modules/three/examples/jsm/WebGL.js";export default class y{constructor(i={}){v.isWebGL2Available()===!1&&console.log(v.getWebGL2ErrorMessage()),this.threshold=i.threshold,this.opacity=i.opacity,this.range=i.range,this.steps=i.steps;const e=128,c=new Uint8Array(e*e*e);let m=0;const s=.05,d=new g,p=new t.Vector3;for(let r=0;r<e;r++)for(let a=0;a<e;a++)for(let n=0;n<e;n++){const l=1-p.set(n,a,r).subScalar(e/2).divideScalar(e).length();c[m]=(128+128*d.noise(n*s/1.5,a*s,r*s/1.5))*l*l,m++}const o=new t.DataTexture3D(c,e,e,e);o.format=t.RedFormat,o.minFilter=t.LinearFilter,o.magFilter=t.LinearFilter,o.unpackAlignment=1;const u=`#version 300 es
            in vec3 position;
            uniform mat4 modelMatrix;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform vec3 cameraPos;
            out vec3 vOrigin;
            out vec3 vDirection;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
                vDirection = position - vOrigin;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,h=`#version 300 es
            precision highp float;
            precision highp sampler3D;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            in vec3 vOrigin;
            in vec3 vDirection;
            out vec4 color;
            uniform vec3 base;
            uniform sampler3D map;
            uniform float threshold;
            uniform float range;
            uniform float opacity;
            uniform float steps;
            vec2 hitBox( vec3 orig, vec3 dir ) {
                const vec3 box_min = vec3( - 0.5 );
                const vec3 box_max = vec3( 0.5 );
                vec3 inv_dir = 1.0 / dir;
                vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
                vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
                vec3 tmin = min( tmin_tmp, tmax_tmp );
                vec3 tmax = max( tmin_tmp, tmax_tmp );
                float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
                float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
                return vec2( t0, t1 );
            }
            float sample1( vec3 p ) {
                return texture( map, p ).r;
            }
            float shading( vec3 coord ) {
                float step = 0.01;
                return sample1( coord + vec3( - step ) ) - sample1( coord + vec3( step ) );
            }
            void main(){
                vec3 rayDir = normalize( vDirection );
                vec2 bounds = hitBox( vOrigin, rayDir );
                if ( bounds.x > bounds.y ) discard;
                bounds.x = max( bounds.x, 0.0 );
                vec3 p = vOrigin + bounds.x * rayDir;
                vec3 inc = 1.0 / abs( rayDir );
                float delta = min( inc.x, min( inc.y, inc.z ) );
                delta /= steps;
                vec4 ac = vec4( base, 0.0 );
                for ( float t = bounds.x; t < bounds.y; t += delta ) {
                    float d = sample1( p + 0.5 );
                    d = smoothstep( threshold - range, threshold + range, d ) * opacity;
                    float col = shading( p + 0.5 ) * 3.0 + ( ( p.x + p.y ) * 0.25 ) + 0.2;
                    ac.rgb += ( 1.0 - ac.a ) * d * col;
                    ac.a += ( 1.0 - ac.a ) * d;
                    if ( ac.a >= 0.95 ) break;
                    p += rayDir * delta;
                }
                color = ac;
                if ( color.a == 0.0 ) discard;
            }
        `,x=new t.BoxBufferGeometry(i.size.x,i.size.y,i.size.z),f=new t.RawShaderMaterial({uniforms:{base:{value:new t.Color(7965344)},map:{value:o},cameraPos:{value:new t.Vector3},threshold:{value:this.threshold},opacity:{value:this.opacity},range:{value:this.range},steps:{value:this.steps}},vertexShader:u,fragmentShader:h,side:t.BackSide,transparent:!0});return this.mesh=new t.Mesh(x,f),this.mesh}update(i){this.mesh.material.uniforms.cameraPos.value.copy(i.position),this.mesh.rotation.y=-performance.now()/7500}}
