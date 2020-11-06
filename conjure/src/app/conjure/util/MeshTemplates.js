import * as THREE from 'three'

export function easyOrigin()
{	
    let group = new THREE.Group()
    group.add(easyLine({ points: [new THREE.Vector3(), new THREE.Vector3(1,0,0)] }, { color: 0xff0000 } ))
    group.add(easyLine({ points: [new THREE.Vector3(), new THREE.Vector3(0,1,0)] }, { color: 0x00ff00 } ))
    group.add(easyLine({ points: [new THREE.Vector3(), new THREE.Vector3(0,0,1)] }, { color: 0x0000ff } ))
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