import * as THREE from 'three'

export default class FeatureArtGallery
{
    constructor(parent, args = {})
    {
        var geometry = new THREE.SphereGeometry(64, 60, 40);
        let texture = new THREE.TextureLoader().load( 'assets/textures/milkyway.jpg' );
        var material = new THREE.MeshStandardMaterial( {  
            side: THREE.BackSide,
            opacity: args.opacity || 1,
            transparent: true,
            map: texture,
            color: 0xaaaaaa
        });

        let skyBox = new THREE.Mesh(geometry, material);
        skyBox.renderDepth = 1000.0;  
        parent.add(skyBox); 
    }
}