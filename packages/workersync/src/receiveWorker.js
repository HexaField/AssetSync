import RemoteResponseInterface from './RemoteResponseInterface.js'
import { simplifyObject } from '@AssetSync/common'
import { EventEmitter } from 'events'

export function receiveWorker(init) {

  const functionProxies = [
    'hasFocus',
    'exitPointerLock',
    'requestPointerLock'
  ]

  class ElementProxyReceiver extends EventEmitter {
    constructor() {
      super()
      this.sendRequest = this.sendRequest.bind(this)
      this.requester = new RemoteResponseInterface(this.sendRequest)
      this.requests = {}

      // for(let func of functionProxies)
      // {
      //   this[func] = async (...args) => {
      //     return await this.requester.request('func', '', { args, func })
      //   }
      // }
    }

    sendRequest(type, request) {
      self.postMessage({ type, request })
    }

    receiveReply(data) {
      this.requester.receiveReply(data)
    }

    async request(protocol, data) {
      if (typeof data === 'object' && !Array.isArray(data))
        data = simplifyObject(data)
      return await this.requester.request(protocol, data)
    }

    addEventListener(event, listener, dom) {
      super.addEventListener(event, listener)
      if(dom)
        self.postMessage({
          type: 'addEventListener',
          data: event,
        })
    }

    removeEventListener(event, listener, dom) {
      super.removeEventListener(event, listener)
      if(dom)
        self.postMessage({
          type: 'removeEventListener',
          data: event,
        })
    }

    getBoundingClientRect() {

      return {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
        right: this.left + this.width,
        bottom: this.top + this.height,
      }

    }

    handleEvent(data) {

      if (data.type === 'size') {

        this.clientWidth = data.width
        this.clientHeight = data.height
        return

      }

      data.preventDefault = () => { }
      data.stopPropagation = () => { }
      if(Array.isArray(data.data))
        this.emit(data.event, ...data.data)
      else
        this.emit(data.event, data.data)
    }

    focus() {
      // no-op
    }
  }

  class ProxyManager {
    constructor() {
      this.targets = {}
      this.handleEvent = this.handleEvent.bind(this)
      this.receiveReply = this.receiveReply.bind(this)
    }

    makeProxy(data) {
      const { id } = data
      const proxy = new ElementProxyReceiver()
      this.targets[id] = proxy
    }

    getProxy(id) {
      return this.targets[id]
    }

    handleEvent(data) {
      this.targets[data.id].handleEvent(data.data)
    }

    receiveReply(data) {
      this.targets[data.id].receiveReply(data.data)
    }
  }

  const proxyManager = new ProxyManager()

  function start(data) {
    const proxy = proxyManager.getProxy(data.canvasId)
    Object.assign(proxy, data.userData)
    proxy.ownerDocument = proxy
    self.global = proxy
    self.document = proxy
    self.window = proxy
    init({
      canvas: data.canvas,
      inputElement: proxy,
      userData: data.userData
    })
  }

  function makeProxy(data) {
    proxyManager.makeProxy(data)
  }

  const handlers = {
    start,
    makeProxy,
    event: proxyManager.handleEvent,
    requestReply: proxyManager.receiveReply
  }

  self.onmessage = function (e) {
    const fn = handlers[e.data.type]
    if (!fn) {
      throw new Error('no handler for type: ' + e.data.type)
    }
    fn(e.data)
  }
}
