import { THREE, ExtendedObject3D } from 'enable3d'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'
import { POSTPROCESSING } from '../../PostProcessing';
import { createGeometry, createMaterial } from '../../util/wireframe/'

export default class Terrain
{  
    constructor(conjure, parentGroup, terrainSettings)
    {
        let time = Date.now()
        this.conjure = conjure
        this.terrainObject = new ExtendedObject3D();
        this.parentGroup = parentGroup

        this.vec3 = new THREE.Vector3();
        this.grid_size = 32;
        this.grid_scale = 2;
        
        var meshMaterial = createMaterial({thickness: 0.01}, true)
        // meshMaterial.depthTest = false
        var geometry = new THREE.BufferGeometry();
        var vertices = [];
        var indices = [];
        let index = 0;
        var width = this.grid_size
        var height = this.grid_size
        var data = this.generateHeight(this.grid_size, this.grid_size, 0.25);
        
        for(let x = 0; x < width; x++)
        {
            for(let y = 0; y < height; y++)
            {
                vertices.push(
                    x * this.grid_scale, 
                    // data[index] * 0.1, 
                    0,
                    y * this.grid_scale
                )
                if(x < width - 1 && y < height - 1)
                {
                    indices.push(index, index + width + 1, index + width)
                    indices.push(index + width + 1, index, index + 1)
                }
                index++;
            }
        }

        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
        geometry.setIndex(indices);
        geometry = geometry.toNonIndexed()
        geometry.computeVertexNormals()
        createGeometry(geometry, true, true)

        this.mesh = new THREE.Mesh( geometry, meshMaterial );
        this.terrainObject.add(this.mesh);

        this.mesh.layers.enable(POSTPROCESSING.BLOOM_SCENE)
        this.terrainObject.name = 'platform'
        this.terrainObject.receiveShadow = true;
        this.terrainObject.position.set(-this.grid_scale * this.grid_size * 0.5, -2, -this.grid_scale * this.grid_size * 0.5)

        this.parentGroup.add(this.terrainObject);

        this.conjure.physics.add.existing(this.terrainObject, { shape:'concaveMesh', mass:0 });
        this.terrainObject.body.setAngularFactor(0, 0, 0);
        this.terrainObject.body.setLinearFactor(0, 0, 0);
        // global.CONSOLE.log('Terrain took ', (Date.now() - time), 'ms to generate')
    }

    generateHeight( width, length, heightScale)
    {
        var size = width * length
        let data = new Uint8Array( size ) 
        let perlin = new ImprovedNoise()
        let quality = 1
        let z = 0//Math.random() * 10;
        for ( var j = 0; j < 4; j ++ ) {
            for ( var i = 0; i < size; i ++ ) {
                var x = i % width, y = ~ ~ ( i / width );
                data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75  * heightScale);
            }
            quality *= 3;
        }
        return data;
    }

    destroy()
    {
        if(this.terrainObject.body)
            this.conjure.physics.destroy(this.terrainObject.body)
        this.parentGroup.remove(this.terrainObject)
    }
}