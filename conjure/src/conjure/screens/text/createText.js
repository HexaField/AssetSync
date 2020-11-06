import * as THREE from 'three'

export default function(font, args = {})
{
    var shapes = font.generateShapes(args.string || '', 0.05);
    var geometry = new THREE.ShapeBufferGeometry(shapes);

    geometry.computeBoundingBox();

    let xOffset = args.alignX === 'left' ? 0 : (args.alignX === 'right' ? -1.0 : -0.5)
    let yOffset = args.alignY === 'bottom' ? 1.0 : (args.alignY === 'top' ? 0 : -0.5)

    geometry.translate(
        xOffset * (geometry.boundingBox.max.x - geometry.boundingBox.min.x),
        yOffset * (geometry.boundingBox.max.y - geometry.boundingBox.min.y), 
        0
    );

    return geometry

    // if(outline)
    // {
    //     var holeShapes = [];
    //     for ( var i = 0; i < shapes.length; i ++ ) {
    //         var shape = shapes[ i ];
    //         if ( shape.holes && shape.holes.length > 0 ) {
    //             for ( var j = 0; j < shape.holes.length; j ++ ) {
    //                 var hole = shape.holes[ j ];
    //                 holeShapes.push( hole );
    //             }
    //         }
    //     }
    //     shapes.push.apply( shapes, holeShapes );

    //     var lineText = new THREE.Object3D();
    //     for ( var i = 0; i < shapes.length; i ++ ) {
    //         var shape = shapes[ i ];
    //         var points = shape.getPoints();
    //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
    //         geometry.translate( xMid, 0, 0 );
    //         var lineMesh = new THREE.Line( geometry, material );
    //         lineText.add( lineMesh );
    //     }
    //     return lineText;
    // }
    // return text;
}