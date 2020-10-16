import { getCircularReplacer, simplifyObject } from '@AssetSync/common'

let nextProxyId = 0

class ElementProxy {
  constructor(worker) {
    this.id = nextProxyId++

    // this.canvas = canvas
    this.worker = worker

    this.sendEvent = this.sendEvent.bind(this)
    this.sendSize = this.sendSize.bind(this)
    this.handleMessageFromWorker = this.handleMessageFromWorker.bind(this)

    this.addEventListener = this.addEventListener.bind(this)
    this.removeEventListener = this.removeEventListener.bind(this)
    this.dispatchEvent = this.dispatchEvent.bind(this)

    this.receiveRequest = this.receiveRequest.bind(this)
    this.func = this.func.bind(this)

    this.handlers = {
      addEventListener: this.addEventListener,
      removeEventListener: this.removeEventListener,
      request: this.receiveRequest,
    }

    this.requestHandlers = {}

    this.initialise()
  }

  addHandler(key, value) {
    this.requestHandlers[key] = value
  }

  addHandlers(obj) {
    for (let key of Object.keys(obj))
      this.requestHandlers[key] = obj[key]
  }

  removeHandler(key) {
    if (this.requestHandlers[key])
      delete this.requestHandlers[key]
  }

  sendRequestReply(timestamp, replyData) {
    this.worker.postMessage({
      type: 'requestReply',
      id: this.id,
      data: {
        requestTimestamp: timestamp,
        data: replyData
      }
    })
  }

  addEventListener(message) {
    // this.element.addEventListener(message.data, this.dispatchEvent)
  }

  removeEventListener(message) {
    // this.element.removeEventListener(message.data, this.dispatchEvent)
  }

  // DataHandler request
  async receiveRequest(message) {

    if (this.requestHandlers[message.request.protocol]) {
      let response
      if (Array.isArray(message.request.data))
        response = await this.requestHandlers[message.request.protocol](...message.request.data)
      else
        response = await this.requestHandlers[message.request.protocol](message.request.data)
      this.worker.postMessage({
        type: 'requestReply',
        id: this.id,
        data: {
          requestTimestamp: message.request.requestTimestamp,
          data: typeof response === 'object' ? simplifyObject(response) : response
        }
      })
    } else {
      console.log('sorry, could not parse request', message)
    }

      //   this.element.receiveRequest(message.request.data, (returnData) => {
      //     this.worker.postMessage({
      //       type: 'event',
      //       id: this.id,
      //       data: {
      //         type: 'requestReply',
      //         data: returnData
      //       }
      //     })
      //   })
      // }
      // else if (message.request.type === 'func') {
      //   this.worker.postMessage({
      //     type: 'event',
      //     id: this.id,
      //     data: {
      //       type: 'requestReply',
      //       data: {
      //         data: this.func(message.request.data.data),
      //         requestTimestamp: message.request.data.requestTimestamp
      //       }
      //     }
      //   })
  }

  // // document or window function
  func(data) {
    //   if (typeof this.element[data.func] === 'function') {
    //     return this.element[data.func](...(data.args || []))
    //   }
    //   if (typeof window[data.func] === 'function') {
    //     return window[data.func](...(data.args || [])) 
    //   }
    //   else if (typeof document[data.func] === 'function') {
    //     return document[data.func](...(data.args || []))
    //   }
  }

  handleMessageFromWorker(message) {
    const fn = this.handlers[message.data.type]
    if (!fn) {
      throw new Error('no handler for type: ' + message.data.type)
    }
    fn(message.data)

  }

  dispatchEvent(event) {
    this.worker.postMessage({
      type: 'event',
      id: this.id,
      data: simplifyObject(event),
    })
  }

  sendEvent(data) {
    this.worker.postMessage({
      type: 'event',
      id: this.id,
      data,
    })
  }

  sendSize() {
    this.sendEvent({
      type: 'size',
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight,
    })
  }

  initialise() {
    // register an id
    this.worker.postMessage({
      type: 'makeProxy',
      id: this.id,
    })

    this.worker.addEventListener('message', this.handleMessageFromWorker)
  }

  start(canvas, args = {}) {

    if (canvas.transferControlToOffscreen) { // make sure our browser supports offscreencanvas

      const offscreen = canvas.transferControlToOffscreen()
      this.canvas = canvas

      this.worker.postMessage({
        type: 'start',
        canvas: offscreen,
        canvasId: this.id,
        userData: args.userData
      }, [offscreen])

      this.sendSize()
      window.addEventListener('resize', this.sendSize)
    }
  }
}

export function createWorker(workerURL) {
  const worker = new Worker(workerURL, { type: 'module' })
  const proxy = new ElementProxy(worker)
  return proxy
}
