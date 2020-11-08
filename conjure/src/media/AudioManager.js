import * as THREE from 'three'
import { number } from './util/number';

export default class AudioManager
{
    constructor()
    {
        this.buffers = {}
        this.sounds = []
        this.sources = []

        this.camera = new THREE.Camera()
    }

    getSources()
    {
        return this.sources
    }

    getAudioContext()
    {
        return this.audioListener.context
    }

    getHasContext()
    {
        return this.audioListener !== undefined
    }

    setCameraPosition(pos) {
        this.camera.position.copy(pos)
    }

    // todo
    setCameraArguments(args) {
        // this.camera.position.copy(pos)
    }

    async create()
    {
        if(this.getHasContext()) return

        // window.AudioContext = self.AudioContext
        this.audioListener = new THREE.AudioListener();
        
        await this.audioListener.context.resume()
        this.camera.add(this.audioListener);
        this.setMasterVolume(1.0)

        this.audioLoader = new THREE.AudioLoader();
    }

    async load(label, url)
    {
        if(this.buffers[label]) return
        
        if(!url) return

        await new Promise((resolve, reject) => {
            this.audioLoader.load(url, (buffer) => {
                this.buffers[label] = buffer
                return resolve()
            })
        })
    }

    createFromMediaSource(mediaElement, mesh, args = {})
    {
        if(!this.audioListener) return

        let sound = new THREE.PositionalAudio(this.audioListener)
        sound.setMediaElementSource(mediaElement)
        sound.setVolume(args.volume === undefined ? 1 : args.volume);
        sound.setRefDistance(args.refDistance === undefined ? 20 : args.refDistance);
        mesh.userData.sound = sound

        this.sources.push(mesh)
    }
    
    // { loop, volume, refDistance,  }
    play(buffer, args = {})
    {
        if(!this.audioListener || !this.buffers[buffer]) return
        
        let sound = args.positional ? new THREE.PositionalAudio(this.audioListener) : new THREE.Audio(this.audioListener);
        
        sound.setBuffer(this.buffers[buffer]);
        sound.setLoop(Boolean(args.loop));
        sound.setVolume(args.volume === undefined ? 1 : args.volume);
        if(args.positional)
            sound.setRefDistance(args.refDistance === undefined ? 20 : args.refDistance);
        sound.play();
        sound.onEnded = () => {
            for(let i in this.sounds)
                if(sound === this.sounds[i])
                    this.sounds.slice(i, 1)
        }
        this.sounds.push(sound)
        return sound
    }

    setMasterVolume(amount)
    {
        if(!this.audioListener) return
        this.audioListener.setMasterVolume(number(amount))
        this.updateSources()
    }

    async toggleMute()
    {
        if(!this.audioListener) 
            await this.create(false)
        
        this.audioListener.setMasterVolume(this.audioListener.getMasterVolume() === 0 ? 1 : 0)
        this.updateSources()
        return this.audioListener.getMasterVolume()
    }

    updateSources()
    {
        for(let source of this.sources)
        {
            source.userData.media.volume = this.audioListener.getMasterVolume()
        }
    }
}