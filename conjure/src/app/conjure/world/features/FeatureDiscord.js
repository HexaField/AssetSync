import * as THREE from 'three'
import Feature from "./Feature"
import StructurePortal from "../structures/StructurePortal"
import { POSTPROCESSING } from '../../PostProcessing';
import { createLineGeometry, createCircleGeometry } from '../../util/MeshTemplates'
import TextRenderer3D from '../../screens/text/TextRenderer3D';

export default class FeatureDiscord extends Feature
{
    constructor(realm)
    {
        super(realm)
    }

    async preload()
    {
        const request = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ 
                guildID: this.realm.realmData.getData().worldData.guildID, 
                userID: this.realm.conjure.getProfile().getServiceManager().getService('Discord').getData().discordID
            })
        }

        try {
            this.guildData = await (await fetch('http://localhost:5600/', request)).json()
        } catch(error) {
            console.log('Could not access discord bot!', error);
            return false
        }

        console.log(this.guildData)

        this.nodeSize = {
            guild: 5,
            category: 2,
            voice: 5,
            text: 2,
            undefined: 1,
        }

        this.nodeColors = {
            guild: new THREE.Color('aqua'),
            category: new THREE.Color('aqua'),
            voice: new THREE.Color('yellow'),
            text: new THREE.Color('green'),
            undefined: new THREE.Color('white'),
        }

        this.createNode({
            parent: this.realm.group,
            origin: new THREE.Vector3(),
            data: this.guildData,
            depth: 1,
        })
    }

    createNode(args = {})
    {
        let distance = 50 / (args.depth * args.depth)
        let radius = this.nodeSize[args.data.type.toString()] || 1
        let color = this.nodeColors[args.data.type.toString()]

        let group = new THREE.Group()
        args.parent.add(group)
        group.position.copy(args.origin)

        let nameplate = new TextRenderer3D(this.realm.conjure, group, { text: args.data.name, color, glow: true });
        nameplate.group.lookAt(args.parent.position)
        nameplate.group.position.setY(4)
        nameplate.group.scale.setScalar(radius * 2  )

        let groundMesh = new THREE.Line(createCircleGeometry(radius), new THREE.LineBasicMaterial({ color, linewidth: 2 }))
        groundMesh.layers.enable(POSTPROCESSING.BLOOM_SCENE)
        group.add(groundMesh)
        let i = 0
        let nodes = []

        if(args.data.categories)
            nodes.push(...args.data.categories)
        if(args.data.channels)
            nodes.push(...args.data.channels)

        for(let node of nodes)
        {
            let angle = (i * (args.angle ? 0.75 : 1) * Math.PI * 2 / nodes.length) - (Math.PI / 2) + (args.angle || 0)
            i ++

            let point = new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance)

            this.createNode({
                parent: group,
                origin: point,
                data: node,
                angle, 
                depth: args.depth + 1,
            })

            // line

            let pointOnCircumference = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
            let nodeRadius = this.nodeSize[node.type.toString()] || 1
            let pointOnNodeCircumference = new THREE.Vector3(Math.cos(angle) * (distance - nodeRadius), 0, Math.sin(angle) * (distance - nodeRadius))

            let line = new THREE.Line(
                createLineGeometry(
                    new THREE.Vector3(pointOnCircumference.x, 0, pointOnCircumference.z),
                    new THREE.Vector3(pointOnNodeCircumference.x, 0, pointOnNodeCircumference.z)
                ),
                new THREE.LineBasicMaterial({ 
                    color: 0xffffff,
                    linewidth: 2,
                    vertexColors: true
                })
            )
            line.layers.enable(POSTPROCESSING.BLOOM_SCENE)
            line.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute([...color.clone().toArray() , ...this.nodeColors[node.type.toString()].clone().toArray() ], 3 ) );
            group.add(line)
        }
    }

    async load()
    {
    }

    async unload()
    {

    }

    update(updateArgs)
    {

    }
} 