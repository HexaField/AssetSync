import { AnimationMixer, Object3D } from 'three'

export default class Mixers
{
    constructor()
    {
        this._mixers = []
        this.mixers = {
            create: (root) => this.animationMixer(root),
            add: (animationMixer) => this._mixers.push(animationMixer),
            get: () => this._mixers,
            update: (delta) => this._mixers.forEach(mixer => mixer.update(delta / 1000))
        }

    }

    animationMixer(root)
    {
        const mixer = new AnimationMixer(root)
        this.mixers.add(mixer)
        return mixer
    }
}

