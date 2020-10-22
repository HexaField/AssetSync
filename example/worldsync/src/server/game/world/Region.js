import { QuadTree, Box } from 'js-quadtree'
import { RegionConfig } from './RegionConfig.js'
import { sqrDistance } from './MathUtil.js'

export function coordsToLabel(x, y) {
    return 'x' + x + 'y' + y
}

export function labelToCoords(label) {
    const vals = String(label).split(/(?=xy)/g).filter((val) => val.trim() !== '')
    const x = Number(vals[0].substr(1)) * vals[0][0] === 'x' ? 1 : -1
    const y = Number(vals[1].substr(1)) * vals[1][0] === 'y' ? 1 : -1
    return { x, y }
}

export class Region {
    constructor(x, y) {

        this.coords = { x, y }
        this.bounds = new Box(
            (this.coords.x - 1) * RegionConfig.regionSize,
            (this.coords.y - 1) * RegionConfig.regionSize,
            this.coords.x * RegionConfig.regionSize,
            this.coords.y * RegionConfig.regionSize
        )
        this.center = {
            x: (this.coords.x + 0.5) * RegionConfig.regionSize,
            y: (this.coords.y + 0.5) * RegionConfig.regionSize
        }
        this.quadtree = new QuadTree(this.bounds, { capacity: 16, removeEmptyNodes: true, maximumDepth: 5 })
        this.visible = false

        this.loadThreshold = RegionConfig.regionSize * 8
    }

    getLabel() {
        return coordsToLabel(this.coords.x, this.coords.y)
    }

    updateView(x, y) {
        if(!this.needsUpdate) return
        if(this.isLoaded) {
            if (sqrDistance(this.center, { x, y }) > this.loadThreshold * 2)
                this.unloadRegion()
        } else  {
            if (sqrDistance(this.center, { x, y }) <= this.loadThreshold)
                this.loadRegion()
        }
        this.needsUpdate = false
    }

    async generateRegion() {
        await this.generateFunction(this)
        this.isLoaded = false
    }

    loadRegion() {
        this.loadFunction(this)
        this.isLoaded = true
    }

    unloadRegion() {
        this.unloadFunction(this)
        this.isLoaded = false
    }
}