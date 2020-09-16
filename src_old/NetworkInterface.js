export default class NetworkInterface 
{
    constructor()
    {
        this.callProtocol = this.callProtocol.bind(this)
        this.protocolCallbacks = {}
    }

    // add callback for a certain protocol
    setProtocolCallback(protocol, callback)
    {
        this.protocolCallbacks[protocol] = callback
    }

    // remove callback for a certain protocol
    removeProtocolCallback(protocol)
    {
        delete this.protocolCallbacks[protocol]
    }

    callProtocol(data, from)
    {
        // console.log('GlobalNetwork: parseReceiveData: ', data.protocol)
        if(this.protocolCallbacks[data.protocol] !== undefined)
            this.protocolCallbacks[data.protocol](data.content, from);
    }
}