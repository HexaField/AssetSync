
import * as THREE from 'three'
import createText from './createText'
import { number } from '../../util/number'
import { POSTPROCESSING } from '../../PostProcessing';

export default class TextRenderer3D
{
    constructor(conjure, parent, params = {})
    {
        this.conjure = conjure
        this.x = number(params.x)
        this.y = number(params.y)
        this.scale = number(params.scale) || 1
        this.alignX = params.alignX || 'center'
        this.alignY = params.alignY || 'center'
        this.renderSide = params.renderSide || THREE.DoubleSide
        this.color = params.color === undefined ? 0xffffff : params.color
        this.fit = params.fit // { x, y }
        this.fitScale = this.scale
        // console.log(params)
        this.glow = Boolean(params.glow)


        this.string = String(params.string || params.text || '')

        this.group = new THREE.Group()
        this.font = conjure.getFonts().getFont(params.font || 'Helvetiker')
        this.geometry = createText(this.font, { string: this.string, alignX: this.alignX, alignY: this.alignY })
        
        this.material = new THREE.MeshBasicMaterial({
            // transparent: true,
            color: this.color,
            side: this.renderSide,
        })

        
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.group.add(this.mesh)
        parent.add(this.group)

        if(this.glow)
            this.mesh.layers.enable(POSTPROCESSING.BLOOM_SCENE)
        
        // this.group.add(easySphere(0.01)) // use this for debugging
        this.scaleText()
    }

    setText(text, font)
    {
        if(font !== undefined)
            this.font = font
        
        if(String(text) === this.string) return

        this.string = String(text)
        this.geometry = createText(this.font, { string: this.string, alignX: this.alignX, alignY: this.alignY })
        this.mesh.geometry = this.geometry
        
        this.scaleText()
    }

    scaleText(fit)
    {
        if(fit)
            this.fit = fit
        
        if(this.fit)
        {
            if(this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x > this.fit.x)
                this.fitScale = this.fit.x / (this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x)
        }
        this.mesh.scale.set(this.fitScale, this.fitScale, 1) // will need to change z when bevel is added
    }

    getBounds()
    {
        return this.geometry.getBounds()
    }

    getText()
    {
        return this.string
    }
}