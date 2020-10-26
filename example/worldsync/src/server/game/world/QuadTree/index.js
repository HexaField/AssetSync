import { Box } from './Box.js'
import { Entry } from './Entry.js'
import { Circle } from './Circle.js'
import { RegionConfig } from '../RegionConfig.js'
import { sqrDistance } from '../MathUtil.js'

export { Box, Entry, Circle }

export class QuadTree {
    constructor(bounds, depth, region, { genFunc, loadFunc }) {
        this.region = region
        this.bounds = bounds
        this.size = bounds.w
        this.depth = depth
        this.center = {
            x: this.bounds.x + (0.5 * this.size),
            y: this.bounds.y + (0.5 * this.size)
        }
        this.loadDistance = (RegionConfig.regionSize * RegionConfig.regionScale) / (this.depth * this.depth)

        this.genFunc = genFunc
        this.loadFunc = loadFunc
    }

    divide() {

        if(this.depth >= RegionConfig.maxDepth) return

        this.isDivided = true

        const x = this.bounds.x
        const y = this.bounds.y
        const size = this.size / 2

        this.ne = new QuadTree(new Box(x + size, y, size, size), this.depth + 1, this.region, { genFunc: this.genFunc, loadFunc: this.loadFunc })
        this.nw = new QuadTree(new Box(x, y, size, size), this.depth + 1, this.region, { genFunc: this.genFunc, loadFunc: this.loadFunc })
        this.se = new QuadTree(new Box(x + size, y + size, size, size), this.depth + 1, this.region, { genFunc: this.genFunc, loadFunc: this.loadFunc })
        this.sw = new QuadTree(new Box(x, y + size, size, size), this.depth + 1, this.region, { genFunc: this.genFunc, loadFunc: this.loadFunc })

        this.ne.divide()
        this.nw.divide()
        this.se.divide()
        this.sw.divide()
    }

    // setActive(active) {
    //     this.isActive = active
    // }

    load(x, y) {
        if(!this.hasMesh)

        this.genFunc(this).then((data) => {
            this.meshData = data
            this.hasMesh = true
            this.loadFunc(this, true)
        })

        const dist = sqrDistance(this.center, { x, y })
        if(this.isDivided) {
            if(dist < this.loadDistance) {
                this.ne.load(x, y)
                this.nw.load(x, y)
                this.se.load(x, y)
                this.sw.load(x, y)
                this.loadFunc(this, false)
            } else {
                this.ne.unload(x, y)
                this.nw.unload(x, y)
                this.se.unload(x, y)
                this.sw.unload(x, y)
                this.loadFunc(this, true)
            }
        } else {
            this.loadFunc(this, true)
        }
    }

    unload(x, y) {
        if(this.isDivided) {
            this.ne.unload(x, y)
            this.nw.unload(x, y)
            this.se.unload(x, y)
            this.sw.unload(x, y)
        }
        if(this.hasMesh) {
            this.loadFunc(this, false)
        }
    }
}