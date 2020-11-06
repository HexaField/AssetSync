import * as THREE from 'three'
import Feature from "./Feature"
import StructurePortal from "../structures/StructurePortal"
import { POSTPROCESSING } from '../../PostProcessing';
import { REALM_VISIBILITY, REALM_WHITELIST } from '../realm/RealmData';

export default class FeatureLobby extends Feature
{
    constructor(realm)
    {
        super(realm)
    }

    async preload()
    {
        this.portals = []
        this.realmDatas = (await this.realm.world.getRealms()).filter(realmData => realmData.id !== 'Lobby')
        if(this.realmDatas.length < 8)
            this.realmDatas.push(...new Array(8 - this.realmDatas.length).fill(''))
        this.portalsCount = this.realmDatas.length

        let groundMesh = new THREE.Line(this.createCircleGeometry(2), new THREE.LineBasicMaterial({ color: new THREE.Color('aqua'), linewidth: 2 }))
        groundMesh.layers.enable(POSTPROCESSING.BLOOM_SCENE)
        this.realm.group.add(groundMesh)
        
        for(let i = 0; i < this.portalsCount; i++)
        {
            let angle = ((i + 0.5) * Math.PI * 2 / this.portalsCount) + (Math.PI / 2)
            let point = new THREE.Vector2(Math.cos(angle), Math.sin(angle))

            let color = new THREE.Color('aqua')

            if(this.realmDatas[i] !== '')
            {
                if(this.realmDatas[i].visibility === REALM_VISIBILITY.GLOBAL)
                    color = new THREE.Color('green')
                else if(this.realmDatas[i].whitelist.type !== REALM_WHITELIST.NONE)
                    color = new THREE.Color('red')

                let portal = new StructurePortal(this.realm.conjure, this.realm.group, { realmData: this.realmDatas[i], position: { x: -point.x * 10, y: 2, z: -point.y * 10 }, color })
                this.portals.push(portal)
            
                let line = new THREE.Line(
                    this.createLineGeometry(new THREE.Vector3(-point.x * 2, 0, -point.y * 2), new THREE.Vector3(-point.x * 9, 0, -point.y * 9)),
                    new THREE.LineBasicMaterial({ 
                        color: 0xffffff,
                        linewidth: 2,
                        vertexColors: true
                    })
                )
                line.layers.enable(POSTPROCESSING.BLOOM_SCENE)
                line.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute([...new THREE.Color('aqua').toArray(), ...color.clone().toArray() ], 3 ) );
                this.realm.group.add(line)
            }

            groundMesh = new THREE.Line(
                this.createCircleGeometry(1),
                new THREE.LineBasicMaterial({ 
                    color: color,
                    linewidth: 2
                })
            )
            if(this.realmDatas[i] !== '')
                groundMesh.layers.enable(POSTPROCESSING.BLOOM_SCENE)
            groundMesh.position.set(-point.x * 10, 0, -point.y * 10)

            this.realm.group.add(groundMesh)
        }

        groundMesh = new THREE.Line(
            this.createCircleGeometry(20, this.portalsCount),
            new THREE.LineBasicMaterial({ 
                color: new THREE.Color('aqua'),
                linewidth: 2
            })
        )
        groundMesh.layers.enable(POSTPROCESSING.BLOOM_SCENE)
        this.realm.group.add(groundMesh)
    }

    createLineGeometry(a, b)
    {
        let geom = new THREE.BufferGeometry().setFromPoints([a, b]);
        return geom
    }

    createCircleGeometry(radius, segments)
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

    async load()
    {
    }

    async unload()
    {
        this.portals.forEach((portal) => portal.destroy())
    }

    update(updateArgs)
    {
        
    }
}