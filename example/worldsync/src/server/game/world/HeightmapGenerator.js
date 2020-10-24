import { RegionConfig } from './RegionConfig.js'
import { InlineWorker } from '@AssetSync/common'

const defaultConfig = {
    gridSize: RegionConfig.regionSize,
    gridScale: RegionConfig.regionScale
}

export class HeightmapGenerator {

    constructor() {
        this.generatorThread = new InlineWorker(_generate)
    }

    async generate(args) {
        return await this.generatorThread.makeRequest(Object.assign({}, args, defaultConfig))
    }
}

function _generate() {

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

    self.onmessage = (message) => {

        const { data, timestamp } = message.data

        const { detail, origin, gridSize, gridScale } = data

        const meshScale = gridScale / detail
        // const meshScale = Math.pow(2, scale)

        var vertices = [];
        var indices = [];
        let index = 0;
        var width = (gridSize / meshScale) + 1
        var height = (gridSize / meshScale) + 1
        const offsetX = origin.x
        const offsetY = origin.y

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let _x = x * meshScale
                let _y = y * meshScale
                let h = 0
                for(let level = 1; level <= levels; level++) {
                    const multi = level * level * 0.1
                    h += noise((_x + offsetX + 0.5) / multi, (_y + offsetY + 0.5) / multi) * multi
                }
                vertices.push(
                    _x,
                    h * 10,
                    _y
                )
                if (x < width - 1 && y < height - 1) {
                    indices.push(index, index + width + 1, index + width)
                    indices.push(index + width + 1, index, index + 1)
                }
                index++;
            }
        }

        self.postMessage({ timestamp, data: { vertices, indices } })
    }
    /**
     * Perlin Noise functions for 1D, 2D, 3D and 4D.
     *
     * The 3D-Noise is a port of Ken Perlin's Java code. The
     * original Java code is at http://cs.nyu.edu/%7Eperlin/noise/.
     *
     * 1D, 2D and 4D versions are simple variations of Perlins concept 
    **/

    var permutation = [
        151, 160, 137, 91, 90, 15,
        131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
        190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
        88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
        77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
        102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
        135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
        5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
        223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
        129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
        251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
        49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
        138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
    ];

    // build the perm array to avoid overflow
    var p = new Array(512);

    for (var i = 0; i < 256; i++) {
        p[256 + i] = p[i] = permutation[i];
    }

    // fade: 6t^5-15t^4+10t^3
    function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    // linear interpolation between a and b by amount t (0, 1)
    function lerp(t, a, b) {
        return a + t * (b - a);
    }

    function grad1D(hash, x) {
        // only two cases in one dimension
        return (hash & 1) == 0 ? x : -x;
    }

    function grad2D(hash, x, y) {
        /**
         * return ((hash & 1) == 0 ? x : -x) + ((hash & 2) == 0 ? y : -y);
         **/
        switch (hash & 3) {
            case 0: return x + y;
            case 1: return -x + y;
            case 2: return x - y;
            case 3: return -x - y;
            default: return 0; // never happens
        }
    }

    function grad3D(hash, x, y, z) {
        /**
         * Ken Perlins original implementation:
         * var h = hash & 15,       // convert lo 4 bits of hash code
         * u = h < 8 ? x : y,   // into 12 gradient directions
         * v = h < 4 ? y : h == 12 || h == 14 ? x : z;
         *
         * return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
         *
         * The switch-statement seems to run faster in JS
        **/
        switch (hash & 0xF) {
            case 0x0: return x + y;
            case 0x1: return -x + y;
            case 0x2: return x - y;
            case 0x3: return -x - y;
            case 0x4: return x + z;
            case 0x5: return -x + z;
            case 0x6: return x - z;
            case 0x7: return -x - z;
            case 0x8: return y + z;
            case 0x9: return -y + z;
            case 0xA: return y - z;
            case 0xB: return -y - z;
            case 0xC: return y + x;
            case 0xD: return -y + z;
            case 0xE: return y - x;
            case 0xF: return -y - z;
            default: return 0; // never happens
        }
    }

    function grad4D(hash, x, y, z, t) {
        switch (hash & 31) {
            case 0: return x + y;
            case 1: return -x + y;
            case 2: return x - y;
            case 3: return -x - y;
            case 4: return x + z;
            case 5: return -x + z;
            case 6: return x - z;
            case 7: return -x - z;
            case 8: return x + t;
            case 9: return -x + t;
            case 10: return x - t;
            case 11: return -x - t;
            case 12: return y + z;
            case 13: return -y + z;
            case 14: return y - z;
            case 15: return -y - z;
            case 16: return y + t;
            case 17: return -y + t;
            case 18: return y - t;
            case 19: return -y - t;
            // double cases
            case 20: return y + x;
            case 21: return y - x;
            case 22: return y + z;
            case 23: return y - z;
            case 24: return y + t;
            case 25: return y - t;
            case 26: return -y + x;
            case 27: return -y - x;
            case 28: return -y + z;
            case 29: return -y - z;
            case 30: return -y + t;
            case 31: return -y - t;
            // never happens
            default: return 0;
        }
    }

    var perlin1D = function (x) {

        // find interval that contains this point
        var X = Math.floor(x) & 255;

        // find relative x of point in interval
        x -= Math.floor(x);

        // compute fade curves for x
        var u = fade(x);

        // hash coordinates of the interval
        var a = p[X],
            b = p[X + 1];

        // return blended result
        return lerp(u, grad1D(a, x),
            grad1D(b, x - 1));
    }

    var perlin2D = function (x, y) {

        // find square that contains this point
        var X = Math.floor(x) & 255,
            Y = Math.floor(y) & 255;

        // find relative x, y, z of point in square
        x -= Math.floor(x);
        y -= Math.floor(y);

        // compute fade curves for x, y
        var u = fade(x),
            v = fade(y);

        // hash coordinates of the 4 square corners
        var aa = p[p[X] + Y],
            ab = p[p[X] + Y + 1],
            ba = p[p[X + 1] + Y],
            bb = p[p[X + 1] + Y + 1];

        // add blended results from 4 corners of square
        return lerp(v, lerp(u, grad2D(aa, x, y),
            grad2D(ba, x - 1, y)),
            lerp(u, grad2D(ab, x, y - 1),
                grad2D(bb, x - 1, y - 1)));

    }

    var perlin3D = function (x, y, z) {

        // find unit cube that contains this point
        var X = Math.floor(x) & 255,
            Y = Math.floor(y) & 255,
            Z = Math.floor(z) & 255;

        // find relative x, y, z of point in cube
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        // compute fade curves for each of x, y, z
        var u = fade(x),
            v = fade(y),
            w = fade(z);

        // hash coordinates of the 8 cube corners
        var aaa = p[p[p[X] + Y] + Z],
            aab = p[p[p[X] + Y] + Z + 1],
            aba = p[p[p[X] + Y + 1] + Z],
            abb = p[p[p[X] + Y + 1] + Z + 1],
            baa = p[p[p[X + 1] + Y] + Z],
            bab = p[p[p[X + 1] + Y] + Z + 1],
            bba = p[p[p[X + 1] + Y + 1] + Z],
            bbb = p[p[p[X + 1] + Y + 1] + Z + 1];

        // add blended results from 8 corners of cube
        return lerp(w, lerp(v, lerp(u, grad3D(aaa, x, y, z),
            grad3D(baa, x - 1, y, z)),
            lerp(u, grad3D(aba, x, y - 1, z),
                grad3D(bba, x - 1, y - 1, z))),
            lerp(v, lerp(u, grad3D(aab, x, y, z - 1),
                grad3D(bab, x - 1, y, z - 1)),
                lerp(u, grad3D(abb, x, y - 1, z - 1),
                    grad3D(bbb, x - 1, y - 1, z - 1))));
    };


    var perlin4D = function (x, y, z, t) {

        // find unit cube that contains this point
        var X = Math.floor(x) & 255,
            Y = Math.floor(y) & 255,
            Z = Math.floor(z) & 255,
            T = Math.floor(t) & 255;

        // find relative x, y, z of point in cube
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        t -= Math.floor(t);

        // compute fade curves for each of x, y, z
        var u = fade(x),
            v = fade(y),
            w = fade(z);
        _t = fade(t);

        // hash coordinates of the 16 cube corners
        var aaaa = p[p[p[p[X] + Y] + Z] + T],
            aaab = p[p[p[p[X] + Y] + Z] + T + 1],
            aaba = p[p[p[p[X] + Y] + Z + 1] + T],
            aabb = p[p[p[p[X] + Y] + Z + 1] + T + 1],
            abaa = p[p[p[p[X] + Y + 1] + Z] + T],
            abab = p[p[p[p[X] + Y + 1] + Z] + T + 1],
            abba = p[p[p[p[X] + Y + 1] + Z + 1] + T],
            abbb = p[p[p[p[X] + Y + 1] + Z + 1] + T + 1],
            baaa = p[p[p[p[X + 1] + Y] + Z] + T],
            baab = p[p[p[p[X + 1] + Y] + Z] + T + 1],
            baba = p[p[p[p[X + 1] + Y] + Z + 1] + T],
            babb = p[p[p[p[X + 1] + Y] + Z + 1] + T + 1],
            bbaa = p[p[p[p[X + 1] + Y + 1] + Z] + T],
            bbab = p[p[p[p[X + 1] + Y + 1] + Z] + T + 1],
            bbba = p[p[p[p[X + 1] + Y + 1] + Z + 1] + T],
            bbbb = p[p[p[p[X + 1] + Y + 1] + Z + 1] + T + 1];

        // add blended results from 16 corners of cube
        return lerp(_t, lerp(w, lerp(v, lerp(u, grad4D(aaaa, x, y, z, t),
            grad4D(baaa, x - 1, y, z, t)),
            lerp(u, grad4D(abaa, x, y - 1, z, t),
                grad4D(bbaa, x - 1, y - 1, z, t))),
            lerp(v, lerp(u, grad4D(aaba, x, y, z - 1, t),
                grad4D(baba, x - 1, y, z - 1, t)),
                lerp(u, grad4D(abba, x, y - 1, z - 1, t),
                    grad4D(bbba, x - 1, y - 1, z - 1, t)))),
            lerp(w, lerp(v, lerp(u, grad4D(aaab, x, y, z, t - 1),
                grad4D(baab, x - 1, y, z, t - 1)),
                lerp(u, grad4D(abab, x, y - 1, z, t - 1),
                    grad4D(bbab, x - 1, y - 1, z, t - 1))),
                lerp(v, lerp(u, grad4D(aabb, x, y, z - 1, t - 1),
                    grad4D(babb, x - 1, y, z - 1, t - 1)),
                    lerp(u, grad4D(abbb, x, y - 1, z - 1, t - 1),
                        grad4D(bbbb, x - 1, y - 1, z - 1, t - 1)))));

    };
}