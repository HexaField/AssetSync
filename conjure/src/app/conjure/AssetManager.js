import * as THREE from 'three'
import { TextureLoader } from './util/BitmapTextureLoader'
import _ from 'lodash'
import { createGeometry, createMaterial } from './util/wireframe'
import { number } from './util/number'

export const ASSET_TYPE = {
    TEXTURE: 'Texture', // THREE.Texture
    MATERIAL: 'Material', // THREE.Material
    GEOMETRY: 'Geometry', // THREE.Geometry
    STRUCTURE: 'Structure', // THREE.Group
    MESH: 'Mesh', // THREE.Mesh
}

/* 
Schema:
    data: the asset data
    name: the name of the asset
    type: the ASSET_TYPE of the asset
    lastUsed: timestamp
    metadata: extra data to be contained within the asset
*/

// TODO: add type specific comparisons to find duplicate assets (which may have different UUIDs) and then return original asset

export default class AssetManager
{  
    constructor(conjure)
    {
        this.conjure = conjure;
        this.enableCaching = true;
        this.assets = {};
        for(let assetType of Object.values(ASSET_TYPE))
            this.assets[assetType] = {};
        this.textureLoader = new TextureLoader();
    }

    createB64FromImage(image)
    {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        return dataURL;
    }

    createSingleMenger(iteration, totalIterations)
    {
        let geometry = new THREE.Geometry()
        for(let x = -1; x <= 1; x++)
        {       
            for(let y = -1; y <= 1; y++)
            {
                for(let z = -1; z <= 1; z++)
                {
                    if((!x && !y) || (!y && !z) || (!x && !z)) continue
                    else
                    {
                        let cube = new THREE.Mesh(iteration ? this.createSingleMenger(iteration - 1, totalIterations) : new THREE.BoxGeometry())
                        cube.scale.set(1/3, 1/3, 1/3)
                        cube.position.set(x/3, y/3, z/3)
                        cube.updateMatrix()
                        geometry.mergeMesh(cube)
                    }
                }
            }    
        }
        return geometry
    }
    // refactor this to its own class
    createMengerGeometry(iterations)
    {
        let bufferGeometry = new THREE.BufferGeometry()
        bufferGeometry.fromGeometry(this.createSingleMenger(iterations, iterations))
        return bufferGeometry
    }

    async createDefaultAssets()
    {
        this.mengerGeometry = this.createMengerGeometry(1)
        this.tronMaterial = createMaterial({thickness: 0.01})

        this.missingTexture = await this.conjure.load.texture('missing_texture');
        // this.missingTextureData = this.createB64FromImage(this.missingTexture.image)
        
        this.mengerTexture = await this.conjure.load.texture('menger_texture');
        // this.mengerImage = this.createB64FromImage(this.mengerTexture.image)
        this.mengerTextureAssetHash = await this.saveAsset(ASSET_TYPE.TEXTURE, 'Menger', this.mengerTexture, 'Menger', { src:this.mengerImage });
        this.mengerMaterial = new THREE.MeshBasicMaterial({map: this.mengerTexture});
        this.mengerMaterialAssetHash = await this.saveAsset(ASSET_TYPE.MATERIAL, this.mengerMaterial.uuid, this.mengerMaterial, 'Menger');
        
        this.ponderTexture = await this.conjure.load.texture('ponder_texture');
        // this.ponderImage = this.createB64FromImage(this.ponderTexture.image)
        this.ponderTextureAssetHash = await this.saveAsset(ASSET_TYPE.TEXTURE, 'Ponder', this.ponderTexture, 'Ponder', { src:this.ponderImage });
        this.ponderMaterial = new THREE.MeshBasicMaterial({map: this.ponderTexture});
        this.ponderMaterialAssetHash = await this.saveAsset(ASSET_TYPE.MATERIAL, this.ponderMaterial.uuid, this.ponderMaterial, 'Ponder');

        this.defaultTexture = await this.conjure.load.texture('default_texture');
        // this.defaultImage = this.createB64FromImage(this.defaultTexture.image)
        this.defaultTextureAssetHash = await this.saveAsset(ASSET_TYPE.TEXTURE, 'Default', this.defaultTexture, 'Default', { src:this.defaultImage });
        this.defaultMaterial = new THREE.MeshBasicMaterial({map: this.defaultTexture});
        this.defaultMaterialAssetHash = await this.saveAsset(ASSET_TYPE.MATERIAL, this.defaultMaterial.uuid, this.defaultMaterial, 'Default');
        
        this.normalMaterial = new THREE.MeshNormalMaterial();
        this.normalMaterialAssetHash = await this.saveAsset(ASSET_TYPE.MATERIAL, this.normalMaterial.uuid, this.normalMaterial, 'Normal');
        this.defaultGeometry = new THREE.BoxBufferGeometry(1, 1);
        this.defaultGeometryAssetHash = await this.saveAsset(ASSET_TYPE.GEOMETRY, this.defaultGeometry.uuid, this.defaultGeometry, 'Default');
        
        this.defaultMesh = (await this.conjure.load.gltf('sword')).scene;
        this.defaultMeshAssetHash = await this.saveAsset(ASSET_TYPE.STRUCTURE, this.defaultMesh.uuid, this.defaultMesh, 'Chevalier');
    }

    // this is where you check to see if duplicate assets already exist
    async createAsset(type, data, name)
    {
        if(!data) return;
        switch(type)
        {
            case ASSET_TYPE.TEXTURE:  // this expects data to be in base 64
                let exists = this.getIdenticalTextureByImage(data);
                if(exists)
                    return exists;
                let texture = await this.conjure.load.texture(data);
                return await this.saveAsset(ASSET_TYPE.TEXTURE, name, texture, name, {src: data});
            
            case ASSET_TYPE.MATERIAL:
                let material = this.getIdenticalMaterial(data);
                if(material)
                    return material;
                return await this.saveAsset(ASSET_TYPE.MATERIAL, name, data, name);

            case ASSET_TYPE.GEOMETRY:
                let geometry = this.getIdenticalGeometry(data);
                if(geometry)
                    return geometry;
                return await this.saveAsset(ASSET_TYPE.GEOMETRY, name, data, name);
        
            case ASSET_TYPE.MESH:
                let mesh = this.getIdenticalMesh(data);
                if(mesh)
                    return mesh;
                return await this.saveAsset(ASSET_TYPE.MESH, name, data, name);
                
            case 'fbx':
                let structureFBX = await this.conjure.load.fbx(data);
                await this.saveAssets(structureFBX)
                return await this.saveAsset(ASSET_TYPE.STRUCTURE, name, structureFBX, name)

            case 'gltf':
                let structureGLTF = await this.conjure.load.gltf(data);
                await this.saveAssets(structureGLTF)
                return await this.saveAsset(ASSET_TYPE.STRUCTURE, name, structureGLTF, name)
            
            default:return;
        }
    }

// TODO: use DHT
    async loadImageAssetFromHash(name)
    {
        // let asset = this.getByIPFSHash(ASSET_TYPE.TEXTURE, name)
        // if(asset)
        //     return asset.data.metaData.src
        
        // if(this.enableCaching)
        //     asset = await this.conjure.getDataHandler(SERVER_PROTOCOLS.LOAD_ASSET, 'assets/' + name)
        // else
        //     asset = await this.conjure.getDataHandler(SERVER_PROTOCOLS.REQUEST_ASSET, 'assets/' + name)

        // if(!asset)
        //     return this.missingTextureData

        // let identical = this.getIdenticalTextureByImage(asset.metaData.src)
        // if(identical)
        //     return this.getByIPFSHash(ASSET_TYPE.TEXTURE, identical).metaData.src;
        // this.setByIPFSHash(ASSET_TYPE.TEXTURE, name, asset.data, undefined, asset.metaData);
        // return asset.metaData.src
    }
    
    getIdenticalMaterial(material)
    {
        // let keys = Object.keys(this.assets[ASSET_TYPE.MATERIAL])
        // for(let key of keys)
        // {
        //     if(_.isMatchWith(
        //             this.assets[ASSET_TYPE.MATERIAL][key].data,
        //             material,
        //             (value1, value2, k) => {
        //                 if(!value1 === value2 || !_.isMatch(value1, value2))
        //                 return k === "uuid" ? true : undefined;
        //             }
        //         )
        //     )
        //     {
        //         // console.log('found duplicate material', key)
        //         return key;
        //     }
        // }
        // // console.log('found unique material')
        // return;
    }

    getIdenticalGeometry(geometry)
    {
        // let keys = Object.keys(this.assets[ASSET_TYPE.GEOMETRY])
        // for(let key of keys)
        // {
        //     if(_.isMatchWith(
        //             this.assets[ASSET_TYPE.GEOMETRY][key].data,
        //             geometry,
        //             (value1, value2, k) => {
        //                 return k === "id" || k === "uuid" ? true : undefined;
        //             }
        //         )
        //     )
        //     {
        //         // console.log('found duplicate geometry', key)
        //         return key;
        //     }
        // }
        // return;
    }

    getIdenticalMesh(mesh)
    {
        // TODO
    }

    getIdenticalTextureByImage(src) // returns hash
    {
        let keys = Object.keys(this.assets[ASSET_TYPE.TEXTURE])
        for(let key of keys)
            if(src === this.assets[ASSET_TYPE.TEXTURE][key].metaData.src)
                return key;
        return false;
    }

    async saveAsset(type, path, data, name, metaData = {})
    {
        let id = this.getHashByTypeAndData(type, data)
        if(id)
            return id;
        
        // if(this.enableCaching)
        //     await this.conjure.getDataHandler(SERVER_PROTOCOLS.SAVE_ASSET, { data: data, metaData:metaData })
        id = String(Date.now()) // temp
        
        this.setByIPFSHash(type, id, data, name, metaData);
        return id;
    }

    async saveAssets(object)
    {
        // console.log('saveAssets', object)
        if(!object) return;
        if(object.geometry)
            object.geometry = this.getByIPFSHash(ASSET_TYPE.GEOMETRY, await this.createAsset(ASSET_TYPE.GEOMETRY, object.geometry, object.geometry.uuid)).data
        if(object.material)
        {
            if(object.material.map)
               object.material.map = this.getByIPFSHash(ASSET_TYPE.TEXTURE, await this.createAsset(ASSET_TYPE.TEXTURE, object.material.map.image.currentSrc, object.material.map.uuid)).data
            object.material = this.getByIPFSHash(ASSET_TYPE.MATERIAL, await this.createAsset(ASSET_TYPE.MATERIAL, object.material, object.material.uuid)).data
        }
        if(object.children && object.children.length > 0)
        for(let child of object.children)
            await this.saveAssets(child)
    }

    getHashByTypeAndData(type, data)
    {
        let keys = Object.keys(this.assets[type])
        for(let key of keys)
        {
            // console.log(data, this.assets[type][key].data)
            if(data === this.assets[type][key].data || _.isMatch(data, this.assets[type][key].data))
               return key;
        }
        return false;
    }

    updateLastUsed(asset)
    {
        asset.lastUsed = String(Date.now());
    }

    getAllOfTypeByLastUsed(type)
    {
        let assets = [];
        let keys = Object.keys(this.assets[type])
        for(let key of keys)
            assets.push(this.assets[type][key])
        assets.sort(function(a, b){return number(b.lastUsed) - number(a.lastUsed)})
        return assets;
    }

    getByIPFSHash(type, hash)
    {
        if(this.assets[type][hash])
            return this.assets[type][hash]
        return
    }

    setByIPFSHash(type, hash, data, name, metaData = {})
    {
        this.assets[type][hash] = { data: data, name: name ? name : type + '-' + Math.round(Math.random()*10000), lastUsed: String(Date.now()), metaData: metaData, type: type }
        if(!this.assets[type][hash].data.userData)
            this.assets[type][hash].data.userData = {}
        this.assets[type][hash].data.userData.hash = hash;
        this.assets[type][hash].metaData.hash = hash;
        // console.log('AssetManager: added new asset: ', this.assets[type][hash])
        if(this.conjure.getScreens())
        {
            this.conjure.getScreens().screenAssets.updateAssets();
            this.conjure.getScreens().screenAssetSelect.updateAssets();
        }
        return this.assets[type][hash];
    }

    removeAssetByHash(type, hash)
    {
        if(this.assets[type][hash])
        {
            delete this.assets[type][hash];
            return true;
        }
        return false;
    }

    removeAsset(asset)
    {
        if(!asset || !asset.type) return;
        let keys = Object.keys(this.assets[asset.type])
        for(let key of keys)
            if(asset === this.assets[asset.type][key])
            {
                delete this.assets[asset.type][key];
                return true;
            }
    }
}