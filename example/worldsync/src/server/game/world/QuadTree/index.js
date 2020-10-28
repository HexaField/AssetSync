import { Box } from './Box.js'
import { Entry } from './Entry.js'
import { Circle } from './Circle.js'
import { TerrainChunkConfig } from '../TerrainChunkConfig.js'
import { sqrDistance } from '../MathUtil.js'

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

        this.isDivided = false
        this.isLoaded = false

        this.loadDistance = (TerrainChunkConfig.chunkSize) / (this.depth * this.depth * this.depth)
    }

    divide() {

        if(this.depth >= TerrainChunkConfig.maxDepth) return

        this.isDivided = true

        const x = this.bounds.x
        const y = this.bounds.y
        const size = this.size / 2

        this.ne = new QuadTree(new Box(x + size, y, size, size), this.depth + 1, this.region)
        this.se = new QuadTree(new Box(x + size, y + size, size, size), this.depth + 1, this.region)
        this.nw = new QuadTree(new Box(x, y, size, size), this.depth + 1, this.region)
        this.sw = new QuadTree(new Box(x, y + size, size, size), this.depth + 1, this.region)

        this.ne.divide()
        this.se.divide()
        this.nw.divide()
        this.sw.divide()
    }

    // setActive(active) {
    //     this.isActive = active
    // }

    load(x, y) {
        const dist = sqrDistance(this.center, { x, y })
        if(this.isDivided) {
            if(dist < this.loadDistance) {
                this.ne.load(x, y)
                this.nw.load(x, y)
                this.se.load(x, y)
                this.sw.load(x, y)
                this.isLoaded = true
            } else {
                this.ne.unload()
                this.se.unload()
                this.nw.unload()
                this.sw.unload()
                this.isLoaded = true
            }
        } else {
            this.isLoaded = true
        }
    }

    unload() {
        if(this.isDivided) {
            this.ne.unload()
            this.se.unload()
            this.nw.unload()
            this.sw.unload()
        }
        this.isLoaded = false
    }

    getTreeLoadedMinimal() {
        let tree = []
        if (this.isDivided) {
            tree.push(this.ne.getTreeLoadedMinimal())
            tree.push(this.se.getTreeLoadedMinimal())
            tree.push(this.nw.getTreeLoadedMinimal())
            tree.push(this.sw.getTreeLoadedMinimal())
        } else {
            tree = { x: this.bounds.x, y: this.bounds.y }
        }
        return tree
    }

    getTree() {
        let tree = {
            bounds: this.bounds,
            loaded: this.isLoaded
        }

        if (this.isDivided) {
            tree.ne = this.ne.getTree()
            tree.se = this.se.getTree()
            tree.nw = this.nw.getTree()
            tree.sw = this.sw.getTree()
        }

        return tree
    }
}