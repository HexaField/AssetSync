import { AudioManager } from "./AudioManager.js"
import { VideoManager } from "./VideoManager.js"

export class MediaHandler {
    constructor(worldSync) {

        this.audioManager = new AudioManager(worldSync)
        this.videoManager = new VideoManager(worldSync)

        this.audio = this.audio.bind(this)
        this.video = this.video.bind(this)

        this.handlers = {
            audio: this.audio,
            video: this.video
        }
    }

    async audio({ func, args }) {
        if(typeof this.audioManager[func] === 'function')
            return await this.audioManager[func](...args)
    }

    async video({ func, args }) {
        if(typeof this.videoManager[func] === 'function')
            return await this.videoManager[func](...args)
    }

    async handle(args) {
        if(typeof this.handlers[args.type] === 'function')
            return await this.handlers[args.type](args.request)
    }
}