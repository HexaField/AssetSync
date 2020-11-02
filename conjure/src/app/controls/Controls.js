import { EventDispatcher } from "@AssetSync/common"
import { EVENTS } from '../core/Constants.js'

export class Controls extends EventDispatcher {
    constructor(input) {
        super()

        this.controlSchemes = {}
        this.currentScheme

        input.addKey('FOCUS', 'f');
        input.addKey('EDIT_CONTROLS', '1');
        input.addKey('FLY_CONTROLS', '2');
        input.addKey('AVATAR_CONTROLS', '3');
        input.addKey('FORWARD', 'w'); 
        input.addKey('BACKWARD', 's');
        input.addKey('LEFT', 'a');
        input.addKey('RIGHT', 'd');
        input.addKey('JUMP', 'SPACEBAR');
    }

    addControlScheme(name, scheme, shouldSet) {
        this.controlSchemes[name] = scheme
        if(shouldSet)
            this.setControlScheme(name)

    }

    removeControlScheme(name) {
        if (this.controlSchemes[name])
            delete this.controlSchemes[name]
    }

    setControlScheme(name) {
        if (!this.controlSchemes[name]) return

        if(this.currentScheme)
            this.currentScheme.disable()
        
        this.currentScheme = this.controlSchemes[name]
        
        if(this.currentScheme)
            this.currentScheme.enable()
    }

    update(updateArgs) {
        if(!this.currentScheme) return

        this.currentScheme.input(updateArgs)
        this.currentScheme.update(updateArgs)
    }
}