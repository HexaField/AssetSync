import { Region, labelToCoords, coordsToLabel } from "./Region"
import hyperdiff from 'hyperdiff'
import { RegionConfig } from './RegionConfig.js'
import { sqrDistance } from './MathUtil.js'

export class Regions {
    constructor(config = {}) {
        this.regions = {}

        this.moveDistanceChangeThreshold = RegionConfig.regionSize / 2

        this.viewDistance = config.viewDistance || 16 // number of regions to view at once
        this.generateFunction = config.generateFunction
        this.loadFunction = config.loadFunction
        this.unloadFunction = config.unloadFunction

        this.lastViewPosition = { x: -1000, y: -10000 }

        this.viewPosition = { x: 0, y: 0 }
    }

    async createRegion(x, y) {
        const region = new Region(x, y)
        this.regions[region.getLabel()] = region
        
        region.generateFunction = this.generateFunction
        region.loadFunction = this.loadFunction
        region.unloadFunction = this.unloadFunction

        region.generateRegion().then(() => {
            region.isLoaded = false
            region.updateView(this.viewPosition.x, this.viewPosition.y)
        })
    }

    updatePosition(_x, _y) {
        this.viewPosition.x = _x
        this.viewPosition.y = _y
        const currentRegions = Object.values(this.regions)

        for(let region of currentRegions)
            region.needsUpdate = true

        const x = Math.round(_x / RegionConfig.regionSize)
        const y = Math.round(_y / RegionConfig.regionSize)

        const dist = sqrDistance({ x: _x, y: _y }, this.lastViewPosition)
        if (dist < this.moveDistanceChangeThreshold)
            return


        for (let i = x - this.viewDistance; i < x + this.viewDistance; i++) {
            for (let j = y - this.viewDistance; j < y + this.viewDistance; j++) {
                if (!this.regions[coordsToLabel(i, j)]) {
                    this.createRegion(i, j)
                }
            }
        }

        for(let region of currentRegions)
            region.updateView(_x, _y)

        this.lastViewPosition = { x: _x, y: _y }
    }

    getRegionByCoords(x, y) {
        const label = coordsToLabel(x, y)
        if (this.regions[label])
            return this.regions[label]
    }

    getRegionByLabel(label) {
        if (this.regions[label])
            return this.regions[label]
    }

    getRegions() {
        return Object.values(this.regions)
    }
}