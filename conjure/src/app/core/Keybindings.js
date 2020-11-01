export default class Keybindings {
    constructor() {
        this.keys = {}
    }

    addKey(key, value) {
        this.keys[key] = value;
    }

    removeKey(key) {
        delete this.keys[key];
    }

    changeKey(key, value) {
        this.addKey(key, value);
    }

    getKey(key) {
        return this.keys[String(key)];
    }
}