const Room = require('./ipfs-pubsub-room')

class Network
{  
    constructor(ipfs, peerID, topic, onMessage, onPeerJoin, onPeerLeave)
    {
        this.topic = topic
        this.room = new Room(ipfs, this.topic)
        this.myPeerID = peerID

        this.room.on('peer joined', (peer) => {
            onPeerJoin(peer)
        })

        this.room.on('peer left', (peer) => {
            onPeerLeave(peer)
        })

        this.room.on('message', (message) => {
            if(message.from === this.myPeerID) return

            if(message.data === undefined || message.data === null) 
            {
                console.log('Network: received bad buffer data', message.data, 'from peer', message.from)
                return
            }

            let data = message.data

            try
            {
                data = JSON.parse(data);
            } 
            catch(error)
            { 
                console.log('Network: received bad json data', data, 'from peer', message.from); 
                return;
            }

            onMessage(data, message.from);
        })
    }
    
    async leave()
    {
        await this.room.leave()
    }

    async sendTo(protocol, content, peerID)
    {
        if(!peerID) return;
        if(!content) content = '';

        let data = JSON.stringify({ protocol:protocol, content:content });
        await this.room.sendTo(peerID, data); // sendTo is broken with new version of IPFS
    }

    async sendData(protocol, content)
    {
        if(!content) content = '';

        let data = JSON.stringify({ protocol: protocol, content: content });
        await this.room.broadcast(data);
    }
}


module.exports = Network