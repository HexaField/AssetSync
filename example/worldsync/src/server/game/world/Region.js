import { QuadTree, Box } from './QuadTree/index.js'
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
    constructor(x, y, genFunc, loadFunc) {

        this.coords = { x, y }
        this.bounds = new Box(
            this.coords.x * RegionConfig.regionSize,
            this.coords.y * RegionConfig.regionSize,
            RegionConfig.regionSize,
            RegionConfig.regionSize
        )
        this.center = {
            x: (this.coords.x + 0.5) * RegionConfig.regionSize,
            y: (this.coords.y + 0.5) * RegionConfig.regionSize
        }
        this.quadtree = new QuadTree(this.bounds, 1, this, { genFunc, loadFunc })

        this.isVisible = false
        this.hasMesh = false
        this.isLoaded = false
        this.needsUpdate = false

        this.label = coordsToLabel(this.coords.x, this.coords.y)
    }

    updateView(x, y) {
        const dist = sqrDistance(this.center, { x, y }) 
        if (dist > RegionConfig.regionSize * RegionConfig.viewDistance) {
            // if (this.isLoaded)
                this.unloadRegion(x, y)
        }
        else
            this.loadRegion(x, y)
    }

    async generateRegion() {
        this.quadtree.divide(0, this.region)
        if(this.needsUpdate)
            this.loadRegion()
    }

    loadRegion(x, y) {
        // this.isLoaded = true
        this.quadtree.load(x, y)
    }

    unloadRegion(x, y) {
        // this.isLoaded = false
        this.quadtree.unload(x, y)
    }
}