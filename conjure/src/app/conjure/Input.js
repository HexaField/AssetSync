import * as THREE from 'three'
import { JoyStick } from 'enable3d'
import Keybindings from './Keybindings';
import Pinput from './util/pinput'
import EventEmitter from 'events'

export default class Input extends EventEmitter {
    constructor(conjure) {
        super()
        this.conjure = conjure
        this.isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
        this.input = new Pinput();
        this.mouse = new THREE.Vector2();
        this.mouseDelta = new THREE.Vector2();
        this.scroll = 0;
        this.scrollVelocity = 0;
        this.keybindings = new Keybindings(conjure);

        if (this.isMobile) {
            this.touchBindings = {}
            this.cameraSensitivity = 4
            this.joystick = new JoyStick()
            this.moveAxis = this.joystick.add.axis({
                styles: { left: 35, bottom: 35, size: 100 }
            })
            this.moveAxis.onMove(event => {
                const { top, right } = event
                this.touchBindings['FORWARD'] = Math.abs(top > 0 ? top : 0)
                this.touchBindings['BACKWARD'] = Math.abs(top < 0 ? top : 0)
                this.touchBindings['LEFT'] = Math.abs(right < 0 ? right : 0)
                this.touchBindings['RIGHT'] = Math.abs(right > 0 ? right : 0)
            })
            this.cameraAxis = this.joystick.add.axis({
                styles: { right: 35, bottom: 35, size: 100 }
            })
            this.cameraAxis.onMove(event => {
                const { top, right } = event
                this.mouseDelta.y = top * -this.cameraSensitivity
                this.mouseDelta.x = right * this.cameraSensitivity
            })
        }

        this.onMouseWheel = this.onMouseWheel.bind(this);
        document.addEventListener('wheel', this.onMouseWheel, false);
        this.addKey('HOME', 'GRAVE');
    }

    getTouchInput(key) {
        return this.touchBindings[key] || false
    }

    isPressed(key, ignoreBinding) {
        if (this.isMobile)
            return this.getTouchInput(key)
        return this.input.isPressed(ignoreBinding ? key : this.keybindings.getKey(key));
    }

    isReleased(key, ignoreBinding) {
        if (this.isMobile)
            return this.getTouchInput(key)
        return this.input.isReleased(ignoreBinding ? key : this.keybindings.getKey(key));
    }

    isDown(key, ignoreBinding) {
        if (this.isMobile)
            return this.getTouchInput(key)
        return this.input.isDown(ignoreBinding ? key : this.keybindings.getKey(key));
    }

    addKey(key, value) {
        this.keybindings.addKey(key, value);
    }

    onMouseWheel(event) {
        let delta = 0;

        if (event.wheelDelta) //WebKit / Opera / Explorer 9
            delta = event.wheelDelta;
        else if (event.detail) // Firefox 
            delta = - event.detail;
        delta *= 0.01;
        if (delta > 1)
            delta = 1;
        if (delta < -1)
            delta = -1;
        this.scrollVelocity = delta;
        this.scroll += this.scrollVelocity
    }

    update() {
        this.input.update();
        if (this.isMobile) {
        }
        else {
            this.mouseDelta.x = this.input.mouseMovement.x
            this.mouseDelta.y = this.input.mouseMovement.y
            this.mouse.x = (this.input.mousePosition.x / window.innerWidth) * 2 - 1;
            this.mouse.y = - (this.input.mousePosition.y / window.innerHeight) * 2 + 1;
        }

        if (this.scrollVelocity > 0 || this.scrollVelocity < 0)
            this.scrollVelocity *= 0.5;
        if (this.scroll > 5)
            this.scroll = 5;
        if (this.scroll < -5)
            this.scroll = -5;
        if (this.scroll > 0)
            this.scroll *= 0.5;
        if (this.scroll < 0)
            this.scroll *= 0.5;
        if ((this.scroll < 0.01 && this.scroll > 0) || (this.scroll > -0.01 && this.scroll < 0))
            this.scroll = 0;
    }
}