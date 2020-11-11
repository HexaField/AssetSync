import * as THREE from 'three'
import { number } from './util/number';

export class AudioWrapper
{
    constructor(conjure)
    {
        this.conjure = conjure
        this.worldSync = conjure.worldSync
    }

    async makeRequest(func, ...args) {
        return await this.worldSync.makeRequest('media', { 
            type: 'sound',
            request: {
                func, 
                args
            }
        })
    }

    async create(waitForInput)
    {
        if(waitForInput)
        {
            this.conjure.getLoadingScreen().setText('WARNING!\n\nThis realm automatically plays audio.\nPlease click to continue.') 
            await this.conjure.getLoadingScreen().awaitInput()
        }

        return await this.makeRequest('create', waitForInput)
        
    }

    async load(label, url)
    {
        return await this.makeRequest('load', label, url)
    }

    async createFromMediaSource(mediaElement, mesh, args = {})
    {
        return await this.makeRequest('createFromMediaSource', mediaElement, mesh, args)
    }
    
    // { loop, volume, refDistance,  }
    play(label, args = {})
    {
        this.makeRequest('play', label, args)
    }

    setMasterVolume(amount)
    {
        this.makeRequest('setMasterVolume', number(amount))
    }

    toggleMute()
    {
        this.makeRequest('toggleMute')
    }
}