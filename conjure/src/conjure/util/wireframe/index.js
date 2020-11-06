import * as THREE from 'three'
import { addBarycentricCoordinates, unindexBufferGeometry } from './geom'
import frag from './frag.js'
import vert from './vert.js'

export function createGeometry(geometry, edgeRemoval, isTerrain)
{
    // unindexBufferGeometry(geometry);
    addBarycentricCoordinates(geometry, edgeRemoval, isTerrain);
}

export function createMaterial(params = {})
{
    let args = {
        time: 0.0,
        fill: new THREE.Color('aqua'),
        stroke: new THREE.Color('aqua'),
        // noiseA: false,
        // noiseB: false,
        dualStroke: true,
        seeThrough: true,
        insideAltColor: false,
        thickness: 0.01,
        secondThickness: 0.05,
        dashEnabled: false,
        dashRepeats: 2.0,
        dashOverlap: false,
        dashLength: 0.55,
        dashAnimate: false,
        squeeze: false,
        squeezeMin: 0.1,
        squeezeMax: 1.0,
         ...params
    }

    // let fragShader = glsl(frag)
    // let vertShader = glsl(vert)
    // console.log(fragShader === frag)
    // console.log(vertShader === vert)

    return new THREE.ShaderMaterial({
        extensions: {
          // needed for anti-alias smoothstep, aastep()
          derivatives: true
        },
        // fog:true, 
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: { // some parameters for the shader
          time: { value: args.time },
          fill: { value: args.fill },
          stroke: { value: args.stroke },
        //   noiseA: { value: args.noiseA },
        //   noiseB: { value: args.noiseB },
          dualStroke: { value: args.dualStroke },
          seeThrough: { value: args.seeThrough },
          insideAltColor: { value: args.insideAltColor },
          thickness: { value: args.thickness },
          secondThickness: { value: args.secondThickness },
          dashEnabled: { value: args.dashEnabled },
          dashRepeats: { value: args.dashRepeats },
          dashOverlap: { value: args.dashOverlap },
          dashLength: { value: args.dashLength },
          dashAnimate: { value: args.dashAnimate },
          squeeze: { value: args.squeeze },
          squeezeMin: { value: args.squeezeMin },
          squeezeMax: { value: args.squeezeMax }
        },
        // use glslify here to bring in the GLSL code
        fragmentShader: frag,
        vertexShader: vert
    });
}