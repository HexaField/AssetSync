import { Chunk, labelToCoords, coordsToLabel } from "./TerrainChunk.js"
import { TerrainChunkConfig } from './TerrainChunkConfig.js'
import { sqrDistance } from './MathUtil.js'

export class TerrainChunkGenerator {
    constructor(config = {}) {
        this.chunks = {}

        this.moveDistanceChangeThreshold = TerrainChunkConfig.chunkSize / 4

        this.config = config

        this.lastViewPosition = { x: -1000, y: -10000 }

        this.viewPosition = { x: 0, y: 0 }
        this.loadedChunks = 0
    }

    async createChunk(x, y) {
        const chunk = new Chunk(x, y)
        this.chunks[chunk.label] = chunk

        this.config.generateFunction(chunk)
        chunk.updateView(this.viewPosition.x, this.viewPosition.y)
        this.config.loadFunction(chunk)
    }

    updatePosition(_x, _y) {
        
        const dist = sqrDistance({ x: _x, y: _y }, this.lastViewPosition)
        if (this.loadedChunks && dist < this.moveDistanceChangeThreshold)
            return

        this.viewPosition.x = _x
        this.viewPosition.y = _y
        const currentChunks = Object.values(this.chunks)

        for (let chunk of currentChunks)
            chunk.needsUpdate = true

        const x = Math.round(_x / TerrainChunkConfig.chunkSize)
        const y = Math.round(_y / TerrainChunkConfig.chunkSize)

        // spiral

        let delta = [0, -1]
        let i = 0
        let j = 0
        const genDist = (TerrainChunkConfig.viewDistance * 2) + 1

        for (let iter = Math.pow(genDist, 2); iter > 0; iter--) {
            if ((-genDist / 2 < i && i <= genDist / 2) && (-genDist / 2 < j && j <= genDist / 2)) {
                if (!this.chunks[coordsToLabel(i + x - 1, j + y - 1)]) {
                    this.createChunk(i + x - 1, j + y - 1)
                }
            }

            if (i === j || (i < 0 && i === -j) || (i > 0 && i === 1 - j)) {
                delta = [-delta[1], delta[0]]
            }

            i += delta[0];
            j += delta[1];
        }

        // end spiral

        for (let chunk of currentChunks) {
            chunk.updateView(_x, _y)
            this.config.loadFunction(chunk)
        }

        this.lastViewPosition = { x: _x, y: _y }
    }

    getChunkByCoords(x, y) {
        const label = coordsToLabel(x, y)
        if (this.chunks[label])
            return this.chunks[label]
    }

    getChunkByLabel(label) {
        if (this.chunks[label])
            return this.chunks[label]
    }

    getChunks() {
        return Object.values(this.chunks)
    }
}
// change direction