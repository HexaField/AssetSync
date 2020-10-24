import { receiveWorker } from '@AssetSync/WorkerSync'
import { BufferAttribute, BufferGeometry } from 'three';
export default function hello () {

    console.log('hello heightmap')
}
hello()
const proxy = await receiveWorker()
console.log(proxy)

const persistence = 0.78;
const lacunarity = 2;
const octaves = 6
const sampleScale = 0.001
const levels = 4

function noise(x, y, z = 1) {

    var total = 0;
    let frequency = 1;
    let amplitude = 1;

    for (var i = 0; i < octaves; i++) {

        total += perlin2D(x * frequency * sampleScale, y * frequency * sampleScale) * amplitude;

        amplitude *= persistence;
        frequency *= lacunarity;
    }


    return total;
}

proxy.addRequestOpcode('gen', (data) => {

    console.log('gen', data)
    const { coords, config } = data

    const gridSize = config.regionSize
    const scale = config.scale

    var vertices = [];
    var indices = [];
    let index = 0;
    var width = gridSize + 1
    var height = gridSize + 1
    const offsetX = coords.x * config.regionSize
    const offsetY = coords.y * config.regionSize

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let h = 0
            for (let level = 1; level <= levels; level++) {
                const multi = level * level
                h += noise((x + offsetX + 0.5) / multi, (y + offsetY + 0.5) / multi) * multi
            }
            vertices.push(
                x,
                h * 10,
                y
            )
            if (x < width - 1 && y < height - 1) {
                indices.push(index, index + width + 1, index + width)
                indices.push(index + width + 1, index, index + 1)
            }
            index++;
        }
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    
    return geometry
})