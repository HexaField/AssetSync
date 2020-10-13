let nextProxyId = 0;

class ElementProxy {
  constructor(element, worker) {
    this.id = nextProxyId++;

    this.element = element;
    this.worker = worker;

    this.sendEvent = this.sendEvent.bind(this);
    this.sendSize = this.sendSize.bind(this);
    this.handleMessageFromWorker = this.handleMessageFromWorker.bind(this);
    
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.dispatchEvent = this.dispatchEvent.bind(this);

    this.receiveRequest = this.receiveRequest.bind(this)
    this.func = this.func.bind(this)

    this.handlers = {
      addEventListener: this.addEventListener,
      removeEventListener: this.removeEventListener,
      request: this.receiveRequest,
    };

    this.initialise();
  }

  addEventListener(message) {
    this.element.addEventListener(message.data, this.dispatchEvent);
  }

  removeEventListener(message) {
    this.element.removeEventListener(message.data, this.dispatchEvent);
  }

  // DataHandler request
  receiveRequest(message) {
    if(message.request.type === 'serverRequest') {
      this.element.receiveRequest(message.request.data, (returnData) => {
        this.worker.postMessage({
          type: 'event',
          id: this.id,
          data: {
            type: 'requestReply',
            data: returnData
          }
        });
      })
    }
    else if(message.request.type === 'func') {
      this.worker.postMessage({
        type: 'event',
        id: this.id,
        data: {
          type: 'requestReply',
          data: {
            data: this.func(message.request.data.data),
            requestTimestamp: message.request.data.requestTimestamp
          }
        }
      });
    }
  }

  // document or window function
  func(data) {
    if(typeof this.element[data.func] === 'function')
    {
      if(data.args.length > 0)
        return this.element[data.func](...data.args)
      else
        return this.element[data.func]()
    }
    if(typeof window[data.func] === 'function')
    {
      if(data.args.length > 0)
        return window[data.func](...data.args)
      else
        return window[data.func]()
    }
    else if(typeof document[data.func] === 'function')
    {
      if(data.args.length > 0)
        return document[data.func](...data.args)
      else
        return document[data.func]()
    }
  }

  handleMessageFromWorker(message) {
    const fn = this.handlers[message.data.type];
    if (!fn) {
      throw new Error('no handler for type: ' + message.data.type);
    }
    fn(message.data);
  }

  dispatchEvent(event) {
    this.worker.postMessage({
      type: 'event',
      id: this.id,
      data: simplifyObject(event),
    });
  }

  sendEvent(data) {
    this.worker.postMessage({
      type: 'event',
      id: this.id,
      data,
    });
  }

  sendSize() {
    this.sendEvent({
      type: 'size',
      width: this.element.clientWidth,
      height: this.element.clientHeight,
    });
  }

  initialise() {
    // register an id
    this.worker.postMessage({
      type: 'makeProxy',
      id: this.id,
    });

    this.worker.addEventListener('message', this.handleMessageFromWorker);
    window.addEventListener('resize', this.sendSize);
  }
}

function simplifyObject(object) {
  let messageData = {};
  for (let prop in object)
    if (typeof object[prop] !== 'function' && typeof object[prop] !== 'object')
      messageData[prop] = object[prop];
  return messageData
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

function startWorker(canvas, workerURL, args) {
  const offscreen = canvas.transferControlToOffscreen();
  const worker = new Worker(workerURL, { type: 'module' });

  const proxy = new ElementProxy(canvas, worker);
  if(args.windowKeysToCopy) {
    const windowSimplified = JSON.parse(JSON.stringify(window, getCircularReplacer()))
    
    const filtered = Object.keys(windowSimplified)
    .filter(key => args.windowKeysToCopy.includes(key))
    .reduce((obj, key) => {
      obj[key] = windowSimplified[key];
      return obj;
    }, {});

    args.userData.window = filtered
  }
  
  worker.postMessage({
      type: 'start',
      canvas: offscreen,
      canvasId: proxy.id,
      userData: args.userData
    },
    [offscreen],
  );

  proxy.sendSize();

  return proxy;
}

// if we don't have web worker
function startMainPage(canvas, entryPoint) {
  entryPoint({ canvas, inputElement: canvas });
}

export function createOffscreenCanvas(canvas, workerURL, args = {}) {
  if (canvas.transferControlToOffscreen) {
    return startWorker(canvas, workerURL, args);
  } else {
    if(args.entryPoint)
      startMainPage(canvas, args.entryPoint);
    return false;
  }
}
