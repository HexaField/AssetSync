import { THREE, ExtendedGroup } from 'enable3d'
export default class Fonts
{  
    constructor()
    {
        this.fonts = {}
        this.fontLoader = new THREE.FontLoader() 
        this.default = undefined
    }

    async addFont(name, font)
    {
        this.fonts[String(name).toLowerCase()] = await this.fontLoader.loadAsync(font)
    }

    setDefault(name)
    {
        this.default = String(name).toLowerCase()
    }

    getFont(name)
    {
        return this.fonts[String(name).toLowerCase()]
    }

    getDefault()
    {
        if(this.default)
            return this.fonts[this.default]
    }
}