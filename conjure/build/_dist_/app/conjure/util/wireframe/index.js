import*as a from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{addBarycentricCoordinates as t}from"./geom.js";import l from"./frag.js";import o from"./vert.js";export function createGeometry(s,e,r){t(s,e,r)}export function createMaterial(s={}){let e={time:0,fill:new a.Color("aqua"),stroke:new a.Color("aqua"),dualStroke:!0,seeThrough:!0,insideAltColor:!1,thickness:.01,secondThickness:.05,dashEnabled:!1,dashRepeats:2,dashOverlap:!1,dashLength:.55,dashAnimate:!1,squeeze:!1,squeezeMin:.1,squeezeMax:1,...s};return new a.ShaderMaterial({extensions:{derivatives:!0},transparent:!0,side:a.DoubleSide,uniforms:{time:{value:e.time},fill:{value:e.fill},stroke:{value:e.stroke},dualStroke:{value:e.dualStroke},seeThrough:{value:e.seeThrough},insideAltColor:{value:e.insideAltColor},thickness:{value:e.thickness},secondThickness:{value:e.secondThickness},dashEnabled:{value:e.dashEnabled},dashRepeats:{value:e.dashRepeats},dashOverlap:{value:e.dashOverlap},dashLength:{value:e.dashLength},dashAnimate:{value:e.dashAnimate},squeeze:{value:e.squeeze},squeezeMin:{value:e.squeezeMin},squeezeMax:{value:e.squeezeMax}},fragmentShader:l,vertexShader:o})}
