import User from './User'
import TextRenderer3D from '../screens/text/TextRenderer3D'
import * as THREE from 'three'

const USER_OPCODES = {
    CONNECT: 0,
    DISCONNECT: 1,
    UPDATE: 2,
    MOVE: 3,
    ANIMATION: 4,
}

export default class UserRemote extends User
{
    constructor(conjure, data, peerID)
    {
        super(conjure, true)
        // this.connectionID = connectionID // peerjs
        this.peerID = peerID // libp2p
        
        this.velocity = new THREE.Vector3()
        console.log(data)

        this.username = data.username
        this.group.name = data.username

        this.nameplate = new TextRenderer3D(conjure, this.group, { text: this.username })
        this.nameplate.group.position.setY(2)
        this.nameplate.group.rotation.set(0, Math.PI, 0)
        this.nameplate.group.visible = this.username !== 'undefined' && this.username !== ''
        this.timeoutLimit = 603 * 60 // if don't receive a heartbeat for 3 seconds, die
        this.timeoutCount = 0
    }

    onCreate()
    {
        super.onCreate()
        // this.group.body.setCollisionFlags(2)
    }

    updateInfo(data)
    {

        this.timeoutCount = 0
        if(data.username)
        {
            this.username = data.username
            this.nameplate.setText(this.username)
            this.nameplate.group.visible = this.username !== 'undefined' && this.username !== ''
        }
    }

    update(updateArgs)
    {
        this.timeoutCount++
        if(this.timeoutCount > this.timeoutLimit)
        {
            console.log(this.group.name + ' has timed out')
            this.conjure.getWorld().onUserLeave(this.peerID)
            return
        }
        this.group.position.set(this.group.position.x + (this.velocity.x * updateArgs.delta), this.group.position.y + (this.velocity.y * updateArgs.delta), this.group.position.z + (this.velocity.z * updateArgs.delta))
        // this.group.body.needUpdate = true
    }

    setPhysics(physics)
    {
        this.timeoutCount = 0
        this.group.position.set(physics.position.x, physics.position.y, physics.position.z)
        this.group.quaternion.set(physics.rotation.x, physics.rotation.y, physics.rotation.z, physics.rotation.w)
        this.velocity.set(physics.velocity.x, physics.velocity.y, physics.velocity.z)
        // this.group.body.needUpdate = true
    }

    destroy()
    {
        // this.conjure.getWorld().onUserLeave(this.peerID)
        // this.conjure.physics.destroy(this.group.body)
        // this.scene.remove(this.group)
        // this.timedOut = true
    }
}