const f=(d,e)=>{let a=[];for(let s=0;s<d;s++){const h=["standard","basic","normal","phong","line","points"],t=(o,r)=>Math.floor(Math.random()*(r-o+1)+o),n=o=>o[Math.floor(Math.random()*o.length)];if(Math.random()>.5){let o=e.add.box({x:t(-10,10),y:t(10,20),z:t(-10,10),width:t(1,2)/10,height:t(1,2)/10,depth:t(1,2)/10,mass:1},{[n(h)]:{color:Math.floor(Math.random()*16777215)}});o.body.setRestitution(Math.floor(Math.random()*10)/20),a.push(o)}else{let o=e.add.sphere({x:t(-10,10),y:t(10,20),z:t(-10,10),radius:t(1,2)/10,mass:1},{[n(h)]:{color:Math.floor(Math.random()*16777215)}});o.body.setRestitution(Math.floor(Math.random()*10)/20),a.push(o)}}return a};export default f;