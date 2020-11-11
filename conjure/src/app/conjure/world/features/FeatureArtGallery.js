import * as THREE from 'three'
import Feature from "./Feature"
import abiDecoder from 'abi-decoder'
import StructureRoom from '../structures/StructureRoom'
import TextRenderer3D from '../../screens/text/TextRenderer3D';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import GifLoader from '../../util/three-gif-loader/gif-loader';
import { encode, decode } from '../../util/base64-arraybuffer.js'

//https://stackoverflow.com/questions/12586353/three-js-texture-to-datatexture
export default class FeatureArtGallery extends Feature
{
    constructor(realm)
    {
        super(realm)
        this.piecesCount = 16
        this.room = new StructureRoom(realm.conjure, realm.group, { roomHeight: 0.1, roomWidth: this.piecesCount * 4 })
        this.superrareABI = [{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_enabled","type":"bool"}],"name":"enableWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_uri","type":"string"}],"name":"updateTokenMetadata","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenCreator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"deleteToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_removedAddress","type":"address"}],"name":"removeFromWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_whitelistees","type":"address[]"}],"name":"initWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_uri","type":"string"}],"name":"addNewToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newAddress","type":"address"}],"name":"addToWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_oldSuperRare","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_tokenId","type":"uint256"},{"indexed":false,"name":"_uri","type":"string"}],"name":"TokenURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newAddress","type":"address"}],"name":"AddToWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_removedAddress","type":"address"}],"name":"RemoveFromWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}]
        this.pieces = []
        this.gifLoader = new GifLoader();
    }

    async preload()
    {
        this.sky = new Sky();   
        this.sky.scale.setScalar(450000);
        this.realm.group.add(this.sky);

        var uniforms = this.sky.material.uniforms;
        uniforms[ "turbidity" ].value = 1;
        uniforms[ "rayleigh" ].value = 1;
        uniforms[ "mieCoefficient" ].value = 0.005;
        uniforms[ "mieDirectionalG" ].value = 0.7;

        var theta = Math.PI * ( 0.05 - 0.5 );
        var phi = 2 * Math.PI * ( 0.2 - 0.5 );

        this.realm.conjure.sunPos.x = Math.cos( phi );   
        this.realm.conjure.sunPos.y = Math.sin( phi ) * Math.sin( theta );
        this.realm.conjure.sunPos.z = Math.sin( phi ) * Math.cos( theta );
        this.realm.conjure.dirLight.intensity = 1.2

        this.realm.conjure.dirLight.position.copy(this.realm.conjure.sunPos)
        uniforms[ "sunPosition" ].value.copy(this.realm.conjure.sunPos);

        this.realm.conjure.loadingScreen.setText('Creating gallery...')
        console.log('Creating gallery...')

        this.loadingTex = await this.realm.conjure.load.texture('/assets/icons/loading.png')

        console.log('Creating pieces...')
        for(let i = 0; i < this.piecesCount; i++)
        {
            let isSecondHalf = i >= this.piecesCount / 2
            let x = (this.room.roomWidth / this.piecesCount) * ((isSecondHalf ? i - (this.piecesCount / 2) : i)) - (this.room.roomWidth / 4) + 1
            let mesh = this.createPainting(new THREE.Vector3(
                x * 2 * (isSecondHalf ? -1 : 1),
                2.5,
                (isSecondHalf ? 1 : -1) * this.room.roomLength * 0.45)
            )
            if(isSecondHalf)
                mesh.rotateY(Math.PI)
        }
        this.loadArtwork()
        this.realm.conjure.getLoadingScreen().setText('WARNING!\n\nThis realm displays artwork from an external gallery and may feature adult material.\nIf you not an adult, please close the window or explore another realm.') 
        await this.realm.conjure.getLoadingScreen().awaitInput()
    }

    async load()
    {
    }

    async unload()
    {
        this.room.destroy()
        for(let piece of this.pieces)
        {
            if(piece.element && piece.element.remove)
                piece.element.remove()
            piece.mesh.material.dispose()
        }
    }

    update(updateArgs)
    {
    }

    async loadArtwork()
    {
        abiDecoder.addABI(this.superrareABI);
        let txlist = await(await fetch((location.href.includes('localhost') ? 'https://cors-anywhere.herokuapp.com/' : '') + 'https://api.etherscan.io/api?module=account&action=txlist&address=0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0&startblock=0&endblock=latest&page=1&sort=desc&offset=100')).json();
        if(!txlist.result) return
        this.loadedPieces = 0;
        this.timer = Date.now()
        for(let txn of txlist.result)
        {
            let input = abiDecoder.decodeMethod(txn.input)
            if(!input || !input.params) continue
            
            if(input.name === 'addNewToken')
            {
                let i = this.loadedPieces
                this.loadPiece(input, i).then((error) => {
                    if(error)
                        console.log('Artwork number', i, 'failed with error"', error, '"')
                })
                this.loadedPieces++;
                if(this.loadedPieces >= this.piecesCount) return
            }
                
        }
    }

    async loadPiece(input, i) 
    {
        // let hash = input.params[0].value.split('/').slice(-1).pop()
        let metadata = await(await fetch(input.params[0].value)).json()
        if(Number(metadata.media.size) > 100 * 1000 * 1000) // limit each piece to 100Mb
            return 'file too big'
        let type = metadata.media.mimeType.toString()
        // console.log(type, metadata)
        if(type.includes('gltf-binary'))
        {
            let model = await this.realm.conjure.load.gltf(metadata.media.uri)
            if(!model || !model.scene) 
                return 'invalid gltf file'
            this.pieces[i].mesh.material.visible = false
            this.pieces[i].mesh.add(model.scene)
        }
        else 
        {
            let dimensions = metadata.media.dimensions.split('x')

            if(type.includes('mp4'))
            {
                let video = document.createElement( 'video' );
                video.crossOrigin = "anonymous";
                video.loop = true
                // video.src = metadata.media.uri;
                // video.load()
                this.pieces[i].mesh.material.map = new THREE.VideoTexture(video)
                this.realm.conjure.getAudioManager().createFromMediaSource(video, this.pieces[i].mesh)
                this.pieces[i].mesh.userData.media = video

                var req = new XMLHttpRequest();
                req.open('GET', metadata.media.uri, true);
                req.responseType = 'blob';

                req.onload = (result) => {
                    if (result.target.status === 200)
                    {
                        let videoBlob = result.target.response;
                        let vid = URL.createObjectURL(videoBlob);
                        video.src = vid;
                        video.play();
                        video.volume = 0
                    }
                }
                req.onerror = function() {
                    console.log('Failed to get video at', metadata.media.uri)
                }
                req.send();
            }
            else if(type.includes('gif'))
            {
                this.pieces[i].mesh.material.map = await this.gifLoader.load(metadata.media.uri)
            }
            else if(type.includes('png') || type.includes('jpg') || type.includes('jpeg'))
            {
                this.pieces[i].mesh.material.map = await this.realm.conjure.load.texture(metadata.media.uri)
            }
            else
            {
                return 'ArtGallery: Received unsupported file type:' + type
            }

            this.pieces[i].mesh.material.transparent = type.includes('png')

            let aspectRatio = Number(dimensions[0]) / Number(dimensions[1])

            if(aspectRatio > 1)
                this.pieces[i].mesh.geometry.scale(aspectRatio, 1, 1)
            if(aspectRatio < 1)
            {
                this.pieces[i].createdBy.group.position.setY(-aspectRatio * 1.75)
                this.pieces[i].name.group.position.setY(aspectRatio * 1.75)
                this.pieces[i].description.group.position.setY(aspectRatio * 2)
                this.pieces[i].mesh.geometry.scale(1, aspectRatio, 1)
            }
        }
        this.pieces[i].createdBy.setText(metadata.createdBy.trim())
        this.pieces[i].name.setText(metadata.name.trim() + ', ' + metadata.yearCreated.trim() + ', ' + Math.round(Number(metadata.media.size) / (1024 * 1024)) + 'Mb')
        this.pieces[i].description.setText(this.explodeString(metadata.description.trim().replace('\n', ''), 100))
        
        this.pieces[i].mesh.material.map.generateMipmaps = false;
        this.pieces[i].mesh.material.map.wrapS = this.pieces[i].mesh.material.map.wrapT = THREE.ClampToEdgeWrapping;
        this.pieces[i].mesh.material.map.minFilter = THREE.LinearFilter;
      
        console.log('Artwork number', i, 'of type', type, 'took', Date.now()-this.timer, 'ms to load ')
    }

    createPainting(pos)
    {
        let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(3, 3), new THREE.MeshBasicMaterial({ map:this.loadingTex, side:THREE.DoubleSide }))
        
        let flip = this.pieces.length % 2 ? 1 : -1

        let createdBy = new TextRenderer3D(this.realm.conjure, mesh, { text: 'Loading...', width: 1, scale: 2, color: 0x000000 });
        createdBy.group.position.set(0, -1.75, 0);

        let name = new TextRenderer3D(this.realm.conjure, mesh, { text: '', width: 1, scale: 2, color: 0x000000 });
        name.group.position.set(0, 1.75, 0);

        let description = new TextRenderer3D(this.realm.conjure, mesh, { text: '', width: 1, scale: 2, color: 0x000000, alignY: 'bottom' });
        description.group.position.set(0, 2, 0);

        let light = new THREE.PointLight( 0xffee88, 0.4, 20, 2 );
        light.position.set(0, 1, 1)
        mesh.add(light)

        mesh.receiveShadow = false
        mesh.castShadow = true
        mesh.position.copy(pos)
        this.realm.group.add(mesh)

        this.pieces.push({ mesh, createdBy, description, name })
        return mesh
    }

    explodeString(str, maxLength) {
        var buff = "";
        var numOfLines = Math.floor(str.length/maxLength);
        for(var i = 0; i<numOfLines+1; i++) {
            buff += str.substr(i*maxLength, maxLength); if(i !== numOfLines) { buff += "\n"; }
        }
        return buff;
    }
}