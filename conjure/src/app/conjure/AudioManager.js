import * as THREE from 'three'
import { number } from './util/number';

export class AudioManager {
    constructor(conjure) {
        this.conjure = conjure
        this.buffers = {}
        this.sounds = []
    }

    getSounds() {
        return this.sounds
    }

    getAudioContext() {
        return this.audioListener.context
    }

    getHasContext() {
        return this.audioListener !== undefined
    }

    async create(waitForInput) {
        if (this.getHasContext()) return

        if (waitForInput) {
            this.conjure.getLoadingScreen().setText('WARNING!\n\nThis realm automatically plays audio.\nPlease click to continue.')
            await this.conjure.getLoadingScreen().awaitInput()
        }

        // window.AudioContext = self.AudioContext
        this.audioListener = new THREE.AudioListener();

        await this.audioListener.context.resume()
        this.conjure.camera.add(this.audioListener);
        this.setMasterVolume(1.0)

        this.audioLoader = new THREE.AudioLoader();
    }

    async load(label, url) {
        if (this.buffers[label]) return

        if (!url) return

        await new Promise((resolve, reject) => {
            this.audioLoader.load(url, (buffer) => {
                this.buffers[label] = buffer
                return resolve()
            })
        })
    }

    createFromMediaSource(mediaElement, mesh, args = {}) {
        if (!this.audioListener) return

        let sound = new THREE.PositionalAudio(this.audioListener)
        
        typeof mediaElement === HTMLMediaElement ? sound.setMediaElementSource(mediaElement) : sound.setMediaStreamSource(mediaElement)
        sound.setVolume(args.volume === undefined ? 1 : args.volume);
        sound.setRefDistance(args.refDistance === undefined ? 20 : args.refDistance);
        mesh.userData.sound = sound
        mesh.add(sound)
        sound.destroy = () => {
            if (this.sounds.includes(sound)) {
                this.sounds.splice(this.sounds.indexOf(sound), 1)
            }
            sound.disconnect()
            mesh.remove(sound)
        }

        this.sounds.push(sound)
        return sound
    }

    // { loop, volume, refDistance,  }
    play(buffer, args = {}) {
        if (!this.audioListener || !this.buffers[buffer]) return

        let sound = args.positional ? new THREE.PositionalAudio(this.audioListener) : new THREE.Audio(this.audioListener);

        sound.setBuffer(this.buffers[buffer]);
        sound.setLoop(Boolean(args.loop));
        sound.setVolume(args.volume === undefined ? 1 : args.volume);
        if (args.positional)
            sound.setRefDistance(args.refDistance === undefined ? 20 : args.refDistance);
        sound.play();
        sound.onEnded = () => {
            for (let i in this.sounds)
                if (sound === this.sounds[i])
                    this.sounds.slice(i, 1)
        }
        this.sounds.push(sound)
        return sound
    }

    setMasterVolume(amount) {
        if (!this.audioListener) return
        this.audioListener.setMasterVolume(number(amount))
        this.updateSounds()
    }

    async toggleMute() {
        if (!this.audioListener)
            await this.create(false)

        this.audioListener.setMasterVolume(this.audioListener.getMasterVolume() === 0 ? 1 : 0)
        this.updateSounds()
        return this.audioListener.getMasterVolume()
    }

    updateSounds() {
        for (let sound of this.sounds) {
            sound.setVolume(this.audioListener.getMasterVolume())
        }
    }
}