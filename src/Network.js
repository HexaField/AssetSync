import Room from './ipfs-pubsub-room'
// import Room from 'ipfs-pubsub-room'

export default class Network
{  
    constructor(ipfs, peerID, topic, onMessage, onPeerJoin, onPeerLeave, params = {})
    {
        this.topic = (global.isDevelopment ? '/conjure-dev/' : '/conjure/') + topic
        this.room = new Room(ipfs, this.topic)
        this.myPeerID = peerID
        this.userData = params
        this.roomStats = {}

        this.room.on('subscribed', () => {
            console.log('Now connected!')
            // TODO
        })

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

            let data = Buffer.from(message.data).toString()

            try
            {
                data = JSON.parse(data);
            } 
            catch(error)
            { 
                console.log('Network: received bad json data', data, 'from peer', message.from); 
                return;
            }

            // this is a hack for this.sendTo while pubsubroom is broken --- see this.sendTo below
            if(data.intendedRecipient !== undefined && data.intendedRecipient !== this.myPeerID) 
                return
            
            onMessage(data, message.from);
        })

        if(params.showStats)
            this.showStatsRoom();
    }
    
    async leave()
    {
        await this.room.leave()
    }

    async sendTo(protocol, content, peerID)
    {
        if(!peerID) return;
        if(!content) content = '';

        let data = JSON.stringify({ protocol: protocol, content: content, intendedRecipient: peerID });
        await this.room.broadcast(Buffer.from(data));

        // let data = JSON.stringify({ protocol:protocol, content:content });
        // await this.room.sendTo(peerID, Buffer(data)); // sendTo is broken with new version of IPFS
    }

    async sendData(protocol, content)
    {
        if(!content) content = '';

        let data = JSON.stringify({ protocol: protocol, content: content });
        await this.room.broadcast(Buffer.from(data));
    }

    showStatsRoom()
    {
        setInterval(async () => {
            try {
                console.log(await this.room.getPeers())
            } catch (err) {
                console.log('An error occurred trying to check our peers:', err)
            }
        }, 5000)
    }
}