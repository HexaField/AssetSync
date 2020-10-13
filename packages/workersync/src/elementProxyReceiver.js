import RemoteResponseInterface from './RemoteResponseInterface.js';
import { EventDispatcher } from './EventDispatcher.js';

export function elementProxyReceiver(init) {

  const functionProxies = [
    'hasFocus',
    'exitPointerLock',
    'requestPointerLock'
  ]

  class ElementProxyReceiver extends EventDispatcher {
    constructor() {
      super();
      this.sendRequest = this.sendRequest.bind(this)
      this.requester = new RemoteResponseInterface(this.sendRequest)
      this.requests = {}

      for(let func of functionProxies)
      {
        this[func] = async (...args) => {
          return await this.requester.request('func', '', { args, func })
        }
      }
    }

    sendRequest(type, data) {
      self.postMessage({
        type: 'request',
        request: {
          type,
          data
        }
      });
    }

    receiveReply(data) {
      this.requester.receiveReply(data)
    }

    async request(protocol, data) {
      if(data && typeof data === 'object')
      {

        const keys = Object.keys(data)
        for(let key of keys)
        {
          if(typeof data[key] === 'function')
          {
            //temp
            delete data[key]
          }
        }
      }
      return await this.requester.request('serverRequest', protocol, data)
    }

    addEventListener(event, listener) {
      super.addEventListener(event, listener);
      self.postMessage({
        type: 'addEventListener',
        data: event,
      });
    }

    removeEventListener(event, listener) {
      super.removeEventListener(event, listener);
      self.postMessage({
        type: 'removeEventListener',
        data: event,
      });
    }

    getBoundingClientRect() {

      return {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
        right: this.left + this.width,
        bottom: this.top + this.height,
      };

    }

    handleEvent(data) {

      if(data.type === 'requestReply') {

        this.receiveReply(data.data)
        return

      } else if (data.type === 'size') {

        this.clientWidth = data.width;
        this.clientHeight = data.height;
        return;

      }
      
      data.preventDefault = () => {};
      data.stopPropagation = () => {};
      this.dispatchEvent(data);
    }

    focus() {
      // no-op
    }
  }

  class ProxyManager {
    constructor() {
      this.targets = {};
      this.handleEvent = this.handleEvent.bind(this);
    }

    makeProxy(data) {
      const { id } = data;
      const proxy = new ElementProxyReceiver();
      this.targets[id] = proxy;
    }

    getProxy(id) {
      return this.targets[id];
    }

    handleEvent(data) {
      this.targets[data.id].handleEvent(data.data);
    }
  }

  const proxyManager = new ProxyManager();

  function start(data) {
    const proxy = proxyManager.getProxy(data.canvasId);
    Object.assign(proxy, data.userData);
    proxy.ownerDocument = proxy;
    self.global = proxy;
    self.document = proxy;
    self.window = proxy;
    init({
      canvas: data.canvas,
      inputElement: proxy,
      userData: data.userData
    });
  }

  function makeProxy(data) {
    proxyManager.makeProxy(data);
  }

  const handlers = {
    start,
    makeProxy,
    event: proxyManager.handleEvent,
  };

  self.onmessage = function (e) {
    const fn = handlers[e.data.type];
    if (!fn) {
      throw new Error('no handler for type: ' + e.data.type);
    }
    fn(e.data);
  };
}
