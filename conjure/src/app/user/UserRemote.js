import User from './User';
import TextRenderer3D from '../screens/text/TextRenderer3D';
import * as THREE from 'three'

export default class UserRemote extends User
{
    constructor(conjure, username, peerID)
    {
        super(conjure, true);
        this.isRemote = true;
        this.username = username;
        this.peerID = peerID;
        this.remoteEntity = true;
        this.group.name = username;

        this.nameplate = new TextRenderer3D(conjure, this.group, { text: username });
        this.nameplate.group.position.setY(2);
        this.nameplate.group.rotation.set(0, Math.PI, 0)
        this.nameplate.group.visible = String(this.username) !== 'undefined'    
        this.timeoutLimit = 3 * 60; // if don't receive a heartbeat for 3 seconds, die
        this.timeoutCount = 0;

        this.velocity = new THREE.Vector3();
    }

    onCreate()
    {
        super.onCreate()
        // this.group.body.setCollisionFlags(2);
    }

    updateInfo(data)
    {
        this.timeoutCount = 0;
        if(data.username)
        {
            this.username = data.username
            this.nameplate.setText(this.username)
        }
    }

    update(updateArgs)
    {
        this.timeoutCount++;
        if(this.timeoutCount > this.timeoutLimit)
        {
            console.log(this.group.name + ' has timed out')
            this.conjure.world.onUserLeave(this.peerID);
            return
        }
        this.group.position.set(this.group.position.x + (this.velocity.x * updateArgs.delta), this.group.position.y + (this.velocity.y * updateArgs.delta), this.group.position.z + (this.velocity.z * updateArgs.delta))
        // this.group.body.needUpdate = true;
    }

    setPhysics(physics)
    {
        this.timeoutCount = 0;
        this.group.position.set(physics.p.x, physics.p.y, physics.p.z);
        this.group.quaternion.set(physics.r._x, physics.r._y, physics.r._z, physics.r._w);
        this.velocity.set(physics.v.x, physics.v.y, physics.v.z);
        // this.group.body.needUpdate = true;
    }

    destroy()
    {
        // this.conjure.world.onUserLeave(this.peerID)
        // this.conjure.physics.destroy(this.group.body)
        // this.scene.remove(this.group)
        // this.timedOut = true;
    }
}