import*as r from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import c from"./Feature.js";import d from"../../../../../web_modules/abi-decoder.js";import f from"../structures/StructureRoom.js";import l from"../../screens/text/TextRenderer3D.js";import{Sky as h}from"../../../../../web_modules/three/examples/jsm/objects/Sky.js";import b from"../../util/three-gif-loader/gif-loader.js";import"../../util/base64-arraybuffer.js";export default class w extends c{constructor(a){super(a);this.piecesCount=16,this.room=new f(a.conjure,a.group,{roomHeight:.1,roomWidth:this.piecesCount*4}),this.superrareABI=[{constant:!0,inputs:[{name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_enabled",type:"bool"}],name:"enableWhitelist",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"tokenId",type:"uint256"}],name:"getApproved",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"to",type:"address"},{name:"tokenId",type:"uint256"}],name:"approve",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"tokenId",type:"uint256"}],name:"transferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"},{name:"_uri",type:"string"}],name:"updateTokenMetadata",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"owner",type:"address"},{name:"index",type:"uint256"}],name:"tokenOfOwnerByIndex",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_address",type:"address"}],name:"isWhitelisted",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"tokenCreator",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"tokenId",type:"uint256"}],name:"safeTransferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"index",type:"uint256"}],name:"tokenByIndex",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"}],name:"deleteToken",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"tokenId",type:"uint256"}],name:"ownerOf",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"owner",type:"address"}],name:"balanceOf",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"renounceOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_removedAddress",type:"address"}],name:"removeFromWhitelist",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"isOwner",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"to",type:"address"},{name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_whitelistees",type:"address[]"}],name:"initWhitelist",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"tokenId",type:"uint256"},{name:"_data",type:"bytes"}],name:"safeTransferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_uri",type:"string"}],name:"addNewToken",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_newAddress",type:"address"}],name:"addToWhitelist",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"owner",type:"address"},{name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"_name",type:"string"},{name:"_symbol",type:"string"},{name:"_oldSuperRare",type:"address"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,name:"_tokenId",type:"uint256"},{indexed:!1,name:"_uri",type:"string"}],name:"TokenURIUpdated",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_newAddress",type:"address"}],name:"AddToWhitelist",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_removedAddress",type:"address"}],name:"RemoveFromWhitelist",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"previousOwner",type:"address"},{indexed:!0,name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!0,name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"approved",type:"address"},{indexed:!0,name:"tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"operator",type:"address"},{indexed:!1,name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"}],this.pieces=[],this.gifLoader=new b}async preload(){this.sky=new h,this.sky.scale.setScalar(45e4),this.realm.group.add(this.sky);var a=this.sky.material.uniforms;a.turbidity.value=1,a.rayleigh.value=1,a.mieCoefficient.value=.005,a.mieDirectionalG.value=.7;var e=Math.PI*(.05-.5),t=2*Math.PI*(.2-.5);this.realm.conjure.sunPos.x=Math.cos(t),this.realm.conjure.sunPos.y=Math.sin(t)*Math.sin(e),this.realm.conjure.sunPos.z=Math.sin(t)*Math.cos(e),this.realm.conjure.dirLight.intensity=1.2,this.realm.conjure.dirLight.position.copy(this.realm.conjure.sunPos),a.sunPosition.value.copy(this.realm.conjure.sunPos),this.realm.conjure.loadingScreen.setText("Creating gallery..."),console.log("Creating gallery..."),this.loadingTex=await this.realm.conjure.load.texture("/assets/icons/loading.png"),console.log("Creating pieces...");for(let n=0;n<this.piecesCount;n++){let s=n>=this.piecesCount/2,o=this.room.roomWidth/this.piecesCount*(s?n-this.piecesCount/2:n)-this.room.roomWidth/4+1,i=this.createPainting(new r.Vector3(o*2*(s?-1:1),2.5,(s?1:-1)*this.room.roomLength*.45));s&&i.rotateY(Math.PI)}this.loadArtwork(),this.realm.conjure.getLoadingScreen().setText(`WARNING!

This realm displays artwork from an external gallery and may feature adult material.
If you not an adult, please close the window or explore another realm.`),await this.realm.conjure.getLoadingScreen().awaitInput()}async load(){}async unload(){this.room.destroy();for(let a of this.pieces)a.element&&a.element.remove&&a.element.remove(),a.mesh.material.dispose()}update(a){}async loadArtwork(){d.addABI(this.superrareABI);let a=await(await fetch((location.href.includes("localhost")?"https://cors-anywhere.herokuapp.com/":"")+"https://api.etherscan.io/api?module=account&action=txlist&address=0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0&startblock=0&endblock=latest&page=1&sort=desc&offset=100")).json();if(!a.result)return;this.loadedPieces=0,this.timer=Date.now();for(let e of a.result){let t=d.decodeMethod(e.input);if(!t||!t.params)continue;if(t.name==="addNewToken"){let n=this.loadedPieces;if(this.loadPiece(t,n).then(s=>{s&&console.log("Artwork number",n,'failed with error"',s,'"')}),this.loadedPieces++,this.loadedPieces>=this.piecesCount)return}}}async loadPiece(a,e){let t=await(await fetch(a.params[0].value)).json();if(Number(t.media.size)>100*1e3*1e3)return"file too big";let n=t.media.mimeType.toString();if(n.includes("gltf-binary")){let o=await this.realm.conjure.load.gltf(t.media.uri);if(!o||!o.scene)return"invalid gltf file";this.pieces[e].mesh.material.visible=!1,this.pieces[e].mesh.add(o.scene)}else{let o=t.media.dimensions.split("x");if(n.includes("mp4")){let p=document.createElement("video");p.crossOrigin="anonymous",p.loop=!0,this.pieces[e].mesh.material.map=new r.VideoTexture(p),this.realm.conjure.getAudioManager().createFromMediaSource(p,this.pieces[e].mesh),this.pieces[e].mesh.userData.media=p;var s=new XMLHttpRequest;s.open("GET",t.media.uri,!0),s.responseType="blob",s.onload=u=>{if(u.target.status===200){let m=u.target.response,y=URL.createObjectURL(m);p.src=y,p.play(),p.volume=0}},s.onerror=function(){console.log("Failed to get video at",t.media.uri)},s.send()}else if(n.includes("gif"))this.pieces[e].mesh.material.map=await this.gifLoader.load(t.media.uri);else if(n.includes("png")||n.includes("jpg")||n.includes("jpeg"))this.pieces[e].mesh.material.map=await this.realm.conjure.load.texture(t.media.uri);else return"ArtGallery: Received unsupported file type:"+n;this.pieces[e].mesh.material.transparent=n.includes("png");let i=Number(o[0])/Number(o[1]);i>1&&this.pieces[e].mesh.geometry.scale(i,1,1),i<1&&(this.pieces[e].createdBy.group.position.setY(-i*1.75),this.pieces[e].name.group.position.setY(i*1.75),this.pieces[e].description.group.position.setY(i*2),this.pieces[e].mesh.geometry.scale(1,i,1))}this.pieces[e].createdBy.setText(t.createdBy.trim()),this.pieces[e].name.setText(t.name.trim()+", "+t.yearCreated.trim()+", "+Math.round(Number(t.media.size)/(1024*1024))+"Mb"),this.pieces[e].description.setText(this.explodeString(t.description.trim().replace(`
`,""),100)),this.pieces[e].mesh.material.map.generateMipmaps=!1,this.pieces[e].mesh.material.map.wrapS=this.pieces[e].mesh.material.map.wrapT=r.ClampToEdgeWrapping,this.pieces[e].mesh.material.map.minFilter=r.LinearFilter,console.log("Artwork number",e,"of type",n,"took",Date.now()-this.timer,"ms to load ")}createPainting(a){let e=new r.Mesh(new r.PlaneBufferGeometry(3,3),new r.MeshBasicMaterial({map:this.loadingTex,side:r.DoubleSide})),t=this.pieces.length%2?1:-1,n=new l(this.realm.conjure,e,{text:"Loading...",width:1,scale:2,color:0});n.group.position.set(0,-1.75,0);let s=new l(this.realm.conjure,e,{text:"",width:1,scale:2,color:0});s.group.position.set(0,1.75,0);let o=new l(this.realm.conjure,e,{text:"",width:1,scale:2,color:0,alignY:"bottom"});o.group.position.set(0,2,0);let i=new r.PointLight(16772744,.4,20,2);return i.position.set(0,1,1),e.add(i),e.receiveShadow=!1,e.castShadow=!0,e.position.copy(a),this.realm.group.add(e),this.pieces.push({mesh:e,createdBy:n,description:o,name:s}),e}explodeString(a,e){for(var t="",n=Math.floor(a.length/e),s=0;s<n+1;s++)t+=a.substr(s*e,e),s!==n&&(t+=`
`);return t}}
