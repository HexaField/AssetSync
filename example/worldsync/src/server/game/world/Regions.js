import { Region, labelToCoords, coordsToLabel } from "./Region"
import { RegionConfig } from './RegionConfig.js'
import { sqrDistance } from './MathUtil.js'

export class Regions {
    constructor(config = {}) {
        this.regions = {}

        this.moveDistanceChangeThreshold = RegionConfig.regionSize / 4

        this.generateFunction = config.generateFunction
        this.loadFunction = config.loadFunction
        this.unloadFunction = config.unloadFunction

        this.lastViewPosition = { x: -1000, y: -10000 }

        this.viewPosition = { x: 0, y: 0 }
    }

    async createRegion(x, y) {
        const region = new Region(x, y)
        this.regions[region.label] = region

        region.generateFunction = this.generateFunction
        region.loadFunction = this.loadFunction
        region.unloadFunction = this.unloadFunction

        region.generateRegion()
        region.updateView(this.viewPosition.x, this.viewPosition.y)
    }

    updatePosition(_x, _y) {
        
        const dist = sqrDistance({ x: _x, y: _y }, this.lastViewPosition)
        if (dist < this.moveDistanceChangeThreshold)
            return

        this.viewPosition.x = _x
        this.viewPosition.y = _y
        const currentRegions = Object.values(this.regions)

        for (let region of currentRegions)
            region.needsUpdate = true

        const x = Math.round(_x / RegionConfig.regionSize)
        const y = Math.round(_y / RegionConfig.regionSize)

        // spiral

        let delta = [0, -1]
        let i = 0
        let j = 0
        const genDist = (RegionConfig.viewDistance * 2) + 1

        for (let iter = Math.pow(genDist, 2); iter > 0; iter--) {
            if ((-genDist / 2 < i && i <= genDist / 2) && (-genDist / 2 < j && j <= genDist / 2)) {
                if (!this.regions[coordsToLabel(i + x - 1, j + y - 1)]) {
                    this.createRegion(i + x - 1, j + y - 1)
                }
            }

            if (i === j || (i < 0 && i === -j) || (i > 0 && i === 1 - j)) {
                delta = [-delta[1], delta[0]]
            }

            i += delta[0];
            j += delta[1];
        }

        // end spiral

        for (let region of currentRegions)
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
// change direction