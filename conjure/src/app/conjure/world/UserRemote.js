import User from './User'
import TextRenderer3D from '../screens/text/TextRenderer3D'
import * as THREE from 'three'

export default class UserRemote extends User {
    constructor(conjure, data, peerID) {
        super(conjure, true)
        // this.connectionID = connectionID // peerjs
        this.peerID = peerID // libp2p

        this.velocity = new THREE.Vector3()

        this.username = data.username
        this.group.name = data.username

        this.nameplate = new TextRenderer3D(conjure, this.group, { text: this.username })
        this.nameplate.group.position.setY(2)
        this.nameplate.group.rotation.set(0, Math.PI, 0)
        this.nameplate.group.visible = this.username !== 'undefined' && this.username !== ''
        
        this.videoScreen = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 0.8), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true }))
        this.videoScreen.position.setY(0.6)
        this.nameplate.group.add(this.videoScreen)
        this.videoScreen.visible = false

        this.timeoutLimit = 5 * 60 // if don't receive a heartbeat for 5 seconds, die
        this.timeoutCount = 0
        this.addMedia = () => {}
        this.removeMedia = () => {}
    }

    getConnection() {
        try {
            let conn = this.conjure.assetSync.transportPlugin._libp2p.connectionManager.connections.get(this.peerID)
            if(Array.isArray(conn)) {
                conn = conn[0]
            }
            if(!conn) return
            if(!this.rawConn) {
                conn.rawConn.on('stream', stream => {
                    this.incomingStream = stream
                    // console.log(stream)
                    if(this.conjure.allowIncomingFeeds) {
                        this.addVideo(stream)
                    }
                })
            }
            this.rawConn = conn.rawConn
            this.addMedia = (stream) => {
                if(!stream) {
                    console.log('no stream buddy')
                    return
                }
                try {
                    this.outgoingStream = stream
                    this.rawConn.addStream(stream)
                } catch (err) { console.log(err) }
            }
            this.removeMedia = () => {
                if(this.outgoingStream) {
                    try {
                        this.rawConn.removeStream(this.outgoingStream)
                    } catch (err) { console.log(err) }
                    this.outgoingStream = undefined
                }
            }
            if(this.conjure.userMediaStream) {
                this.addMedia(this.conjure.userMediaStream)
            }
            if(this.rawConn._remoteStreams && this.rawConn._remoteStreams.length > 0) {
                this.incomingStream = this.rawConn._remoteStreams[0]
                // console.log(this.incomingStream)
                if(this.conjure.allowIncomingFeeds) {
                    this.addVideo(this.incomingStream)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    getIncomingMediaStreams() {
        try {
            if(this.incomingStream && this.conjure.allowIncomingFeeds) {
                this.addVideo(this.incomingStream)
            } else {
                if(this.video) {
                    this.video = undefined
                    this.videoScreen.visible = false
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    addVideo(stream) {

        this.removeVideo()

        const video = document.createElement('video')
        
        this.videoScreen.material.map = new THREE.VideoTexture(video)
        this.videoScreen.material.map.format = THREE.RGBAFormat
        this.soundObject = this.conjure.getAudioManager().createFromMediaSource(stream, this.videoScreen, { refDistance: 20 })
        this.videoScreen.visible = true

        this.video = video

        if ('srcObject' in video) {
            video.srcObject = stream
        } else {
            video.src = window.URL.createObjectURL(stream) // for older browsers
        }

        video.play()
        video.volume = 0
    }

    removeVideo() {
        if(this.video) {
            this.soundObject.destroy()
            // this.video.pause()
            this.video.src = undefined
            this.video.srcObject = undefined
            this.video.removeAttribute('src')
            this.video.removeAttribute('srcObject')
            this.video.load()
            this.video.remove()
            delete this.video
            this.removeMedia()
        }
    }

    onCreate() {
        super.onCreate()
        // this.group.body.setCollisionFlags(2)
    }

    updateInfo(data) {
        this.timeoutCount = 0
        if (data.username) {
            this.username = data.username
            this.nameplate.setText(this.username)
            this.nameplate.group.visible = this.username !== 'undefined' && this.username !== ''
        }
    }

    update(updateArgs) {
        this.timeoutCount++
        if (this.timeoutCount > this.timeoutLimit) {
            console.log(this.group.name + ' has timed out')
            this.conjure.getWorld().onUserLeave(this.peerID)
            return
        }
        this.group.position.set(this.group.position.x + (this.velocity.x * updateArgs.delta), this.group.position.y + (this.velocity.y * updateArgs.delta), this.group.position.z + (this.velocity.z * updateArgs.delta))
        // this.group.body.needUpdate = true
    }

    setPhysics(physics) {
        // console.log(physics)
        this.timeoutCount = 0
        this.group.position.set(physics.position.x * 0.01, physics.position.y * 0.01, physics.position.z * 0.01)
        this.group.quaternion.set(physics.rotation.x * 0.01, physics.rotation.y * 0.01, physics.rotation.z * 0.01, physics.rotation.w * 0.01)
        this.velocity.set(physics.velocity.x * 0.01, physics.velocity.y * 0.01, physics.velocity.z * 0.01)
        // this.group.body.needUpdate = true
    }

    destroy() {
        this.removeVideo()
        this.removeMedia()
        // this.conjure.getWorld().onUserLeave(this.peerID)
        // this.conjure.physics.destroy(this.group.body)
        this.conjure.scene.remove(this.group)
        // this.timedOut = true

    }

    async makeConnection(peerID) {

        const successfulDirectConnection = await new Promise(async (resolve) => {

            try {

                const isInitiator = this.conjure.assetSync.networkPlugin.getPeerID() > peerID // always deterministic
                const conn = await this.conjure.assetSync.connectionPlugin.createConnection(peerID, isInitiator)

                console.log('isInitiator', isInitiator)

                conn.on('ready', () => {

                    // this.conjure.world.realm.sendTo = (opcode, content, peerID) => {
                    //     this.conjure.assetSync.connectionPlugin.sendToPeer(this.conjure.networkingSchemas.toBuffer(opcode, content), peerID)
                    // }

                    // this.conjure.world.realm.sendData = (opcode, content) => {
                    //     this.conjure.assetSync.connectionPlugin.sendToAll(this.conjure.networkingSchemas.toBuffer(opcode, content))
                    // }

                    resolve(true)
                })

                conn.on('error', () => resolve(false))
                conn.on('close', () => resolve(false))

                if (isInitiator) {
                    this.conjure.world.realm.sendTo('connection.signal.' + this.conjure.assetSync.networkPlugin.getPeerID(), conn.peerData, peerID)
                }

                this.conjure.world.realm.database.on('connection.signal.' + peerID, async (signalData, from) => {
                    console.log('connection.signal.' + peerID)
                    if (from !== peerID)
                        return
                    conn.signal(signalData)
                    conn.on('signal', () => {
                        this.conjure.world.realm.sendTo('connection.signal.' + this.conjure.assetSync.networkPlugin.getPeerID(), conn.peerData, peerID)
                    })
                })

                // conn.on('message', buffer => {
                //     const { opcode, content } = this.conjure.networkingSchemas.fromBuffer(buffer)
                //     this.conjure.world.realm.database.emit(opcode, content, peerID)
                // })
            } catch (err) {
                console.log('CONNECTION ERROR', err)
                resolve(false)
            }
        })
        if (successfulDirectConnection)
            console.log('Direct connection establish to', peerID)
        else
            console.log('Could not establish direct connection to', peerID, '. Falling back to libp2p.')
    }
}