export default async function h(){try{const o=320,a=240,t=document.createElement("video");t.width=o,t.height=a;const e=document.createElement("canvas");e.width=o,e.height=a;const i=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),g=i.getAudioTracks();"srcObject"in t?t.srcObject=i:t.src=window.URL.createObjectURL(i),t.play(),t.volume=0;const m=await bodyPix.load({architecture:"MobileNetV1",outputStride:16,multiplier:1,quantBytes:2}),c=e.captureStream(60);console.log(c.getTracks()),s();async function s(){const n=await m.segmentPerson(t,{flipHorizontal:!0,internalResolution:"low",segmentationThreshold:.33});u(n),requestAnimationFrame(s)}function u(n){e.getContext("2d").clearRect(0,0,o,a),e.getContext("2d").drawImage(t,0,0,o,a);for(var d=e.getContext("2d").getImageData(0,0,o,a),l=d.data,r=0;r<l.length;r+=4)n.data[r/4]==0&&(l[r+3]=0);e.getContext("2d").imageSmoothingEnabled=!0,e.getContext("2d").putImageData(d,0,0)}return g.forEach(n=>{c.addTrack(n)}),c}catch(o){console.log(o)}}
