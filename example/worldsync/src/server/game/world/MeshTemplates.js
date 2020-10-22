import * as THREE from 'three'

export function easyOrigin()
{	
    let group = new THREE.Group()
    group.add(easyLine({ points: [new THREE.Vector3(), new THREE.Vector3(1,0,0)] }, { color: 0xff0000 } ))
    group.add(easyLine({ points: [new THREE.Vector3(), new THREE.Vector3(0,1,0)] }, { color: 0x00ff00 } ))
    group.add(easyLine({ points: [new THREE.Vector3(), new THREE.Vector3(0,0,1)] }, { color: 0x0000ff } ))
    return group
}

export function easyWorldOrigin(scale)
{	
    let group = new THREE.Group()
    group.add(easyLine({ points: [new THREE.Vector3(-scale, 0, 0), new THREE.Vector3(scale,0,0)] }, { color: 0xff0000 } ))
    group.add(easyLine({ points: [new THREE.Vector3(0, -scale, 0), new THREE.Vector3(0,scale,0)] }, { color: 0x00ff00 } ))
    group.add(easyLine({ points: [new THREE.Vector3(0, 0, -scale), new THREE.Vector3(0,0,scale)] }, { color: 0x0000ff } ))
    return group
}

export function easyLine(args = {}, matArgs = {})
{				
    return new THREE.Line( new THREE.BufferGeometry().setFromPoints( args.points ), args.material || new THREE.LineBasicMaterial(matArgs))
}

export function easyBox(args = {}, matArgs = {})
{
    return new THREE.Mesh( new THREE.BoxGeometry(args.width, args.height, args.depth), args.material || easyMaterial(matArgs))
}

export function easyPlane(args = {}, matArgs = {})
{				
    return new THREE.Mesh( new THREE.PlaneGeometry(args.width, args.height), args.material || easyMaterial(matArgs))
}

export function easySphere(args = {}, matArgs = {})
{
    return new THREE.Mesh( new THREE.SphereGeometry(args.radius, args.segments, args.segments), args.material || easyMaterial(matArgs));
}

export function easyMaterial(args = {})
{
    return new THREE.MeshBasicMaterial(args)
}

export function createLineGeometry(a, b)
{
    let geom = new THREE.BufferGeometry().setFromPoints([a, b]);
    return geom
}

export function createCircleGeometry(radius, segments)
{
    let curve = new THREE.EllipseCurve(
        0,  0,
        radius, radius,
        0,  2 * Math.PI,
        false,
        0
    )
    let points = curve.getPoints(segments || radius * 32);
    let geom = new THREE.BufferGeometry().setFromPoints(points);
    geom.rotateX(Math.PI / 2)
    return geom
}