import { RGBAFormat, FileLoader, ImageBitmapLoader } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { TextureLoader } from './BitmapTextureLoader'

export default class Loaders {

    constructor(cache, textureAnisotropy) {
        this.cache = cache
        this.textureAnisotropy = textureAnisotropy

        this.fileLoader = new FileLoader()
        this.imgLoader = new ImageBitmapLoader()
        this.svgLoader = new SVGLoader()
        this.textureLoader = new TextureLoader()
        this.gltfLoader = new GLTFLoader()
        this.fbxLoader = new FBXLoader()
    }

    async preload(key, url) {
        this.cache.add(key, url)

        return new Promise(resolve => {
            const isModel = /\.fbx$|\.glb$|\.gltf$/.test(url)
            const isTexture = /\.jpe?g$|\.png$/.test(url)

            if (isTexture) {
                this.textureLoader.load(url, texture => {
                    return resolve(texture)
                })
            } else {
                if (isModel) this.fileLoader.setResponseType('arraybuffer')
                this.fileLoader.load(url, file => {
                    return resolve(file)
                })
            }
        })
    }

    async file(url) {
        const key = this.cache.get(url)
        url = key ? key : url

        return new Promise(resolve => {
            this.fileLoader.load(url, file => {
                return resolve(file)
            })
        })
    }

    async svg(url) {
        const key = this.cache.get(url)
        url = key ? key : url

        return new Promise(resolve => {
            this.svgLoader.load(url, svg => {
                return resolve(svg)
            })
        })
    }

    async texture(url) {
        const key = this.cache.get(url)
        url = key ? key : url

        return new Promise(resolve => {
            this.textureLoader.load(url, (texture) => {
                // options
                texture.anisotropy = this.textureAnisotropy
                texture.format = RGBAFormat
                texture.needsUpdate = true
                texture.anisotropy = this.textureAnisotropy
                // texture.encoding = sRGBEncoding
                resolve(texture)
            })
        })
    }

    async gltf(url) {
        const key = this.cache.get(url)
        url = key ? key : url

        return new Promise(resolve => {
            this.gltfLoader.load(url, (gltf) => {
                resolve(gltf)
            })
        })
    }

    async fbx(url) {
        const key = this.cache.get(url)
        url = key ? key : url

        return new Promise(resolve => {
            this.fbxLoader.load(url, (fbx) => {
                resolve(fbx)
            })
        })
    }
}
