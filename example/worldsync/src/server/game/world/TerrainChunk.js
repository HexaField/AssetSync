import { TerrainChunkConfig } from './TerrainChunkConfig.js'
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

class Box {
    constructor(minX, minY, maxX, maxY) {
        this.x = minX
        this.y = minY
        this.minX = minX
        this.minY = minY
        this.maxX = maxX
        this.maxY = maxY
        this.centerX = (minX + maxX) / 2
        this.centerY = (minY + maxY) / 2
    }
}

export class Chunk {
    constructor(x, y) {

        this.coords = { x, y }
        this.bounds = new Box(
            this.coords.x * TerrainChunkConfig.chunkSize,
            this.coords.y * TerrainChunkConfig.chunkSize,
            (this.coords.x + 1) * TerrainChunkConfig.chunkSize,
            (this.coords.y + 1) * TerrainChunkConfig.chunkSize
        )
        this.center = {
            x: this.bounds.centerX,
            y: this.bounds.centerY
        }

        this.isVisible = false
        this.hasMesh = false
        this.isLoaded = false
        this.needsUpdate = false
        this.meshSimplification = -1

        this.objects = []

        this.label = coordsToLabel(this.coords.x, this.coords.y)
    }

    updateView(x, y) {
        const dist = sqrDistance(this.center, { x, y }) 
        const level = Math.min(Math.max(1, Math.round(Math.log2(dist / TerrainChunkConfig.chunkSize))), TerrainChunkConfig.viewLevels)
        this.meshSimplification = Math.pow(2, level - 1)
        this.isLoaded = TerrainChunkConfig.viewDistance * TerrainChunkConfig.chunkSize > this.meshSimplification
    }

    uncache() {
        // TODO: delete heightmap entries from heightmap thread
    }
}