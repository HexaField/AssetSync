export default class RemoteResponseInterface
{
    constructor(sendRequest)
    {
        this.sendRequest = sendRequest
        this.dataCallbacks = {}
    }

    // creates a promise and waits for response
    async request(type, protocol, data)
    {
        if(!data) data = ''

        return await new Promise((resolve, reject) => {

            const requestTimestamp = protocol + '-' + Date.now() + '-' + Math.round(Math.random() * 1000)
            
            this.addDataListener(requestTimestamp, (_returnedData) => { 
                
                _returnedData === undefined 
                    ? reject('Data Module: WebSocket request timed out')
                    : resolve(_returnedData.data) 
            })
            
            this.sendRequest(type, { protocol: protocol, requestTimestamp: requestTimestamp, data: data })
        })
    }

    receiveReply(data)
    {
        // if(!data) return
        try
        {
            if(data.requestTimestamp) // if this is a valid request
            {
                // call the callback function
                this.dataCallbacks[data.requestTimestamp](data)
                
                // remove it from our list
                delete this.dataCallbacks[data.requestTimestamp]
            }
            else // this might be a one way event from
            {
                this.dataCallback(data)
            }
        }
        catch(error)
        {
            console.log(error, data, this.dataCallbacks)
        }
    }
    
    addDataListener(requestTimestamp, callback)
    {
        // right now this creates a memory leak where unfulfilled requests pile up
        // TODO: add interval callback, check if entry exists, then delete and return undefined to reject promise
        this.dataCallbacks[requestTimestamp] = callback
    }
}