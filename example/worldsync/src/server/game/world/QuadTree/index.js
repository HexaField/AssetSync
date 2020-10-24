import { Box } from './Box.js'
import { Entry } from './Entry.js'
import { Circle } from './Circle.js'
import { RegionConfig } from '../RegionConfig.js'

export { Box, Entry, Circle }

export class QuadTree {
    constructor(bounds, depth, region) {
        this.region = region
        this.bounds = bounds
        this.size = bounds.w
        this.depth = depth
        this.center = {
            x: this.bounds.x + (0.5 * this.size),
            y: this.bounds.y + (0.5 * this.size)
        }
    }

    divide(generateFunction) {

        if(this.depth > RegionConfig.maxDepth) return

        generateFunction(this).then(() => {
            this.hasMesh = true
        })

        this.isDivided = true

        const x = this.bounds.x
        const y = this.bounds.y
        const size = this.size / 2

        this.ne = new QuadTree(new Box(x + size, y, size, size), this.depth + 1, this.region)
        this.nw = new QuadTree(new Box(x, y, size, size), this.depth + 1, this.region)
        this.se = new QuadTree(new Box(x + size, y + size, size, size), this.depth + 1, this.region)
        this.sw = new QuadTree(new Box(x, y + size, size, size), this.depth + 1, this.region)

        this.ne.divide(generateFunction)
        this.nw.divide(generateFunction)
        this.se.divide(generateFunction)
        this.sw.divide(generateFunction)
    }
}