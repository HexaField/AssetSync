/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */

export class EventDispatcher {

    constructor() { 
        this._listeners = {}
    }
    
    addEventListener(type, listener) {
        if (this._listeners[type] === undefined) {
            this._listeners[type] = [];
        }

        if (this._listeners[type].indexOf(listener) === -1) {
            this._listeners[type].push(listener);
        }
    
    }

    hasEventListener(type, listener) {
        return (
            this._listeners[type] !== undefined && this._listeners[type].indexOf(listener) !== -1
        );
    }

    removeEventListener(type, listener) {
        var listenerArray = this._listeners[type];

        if (listenerArray !== undefined) {
            var index = listenerArray.indexOf(listener);

            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }

    dispatchEvent(event) {
        var listenerArray = this._listeners[event.type];

        if (listenerArray !== undefined) {
            event.target = this;

            // Make a copy, in case listeners are removed while iterating.
            var array = listenerArray.slice(0);

            for (var i = 0, l = array.length; i < l; i++) {
                array[i].call(this, event);
            }
        }
    }
}