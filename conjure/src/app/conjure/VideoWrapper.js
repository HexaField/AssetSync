export class VideoWrapper {
    constructor(conjure) {
        this.conjure = conjure
        this.worldSync = conjure.worldSync
    }

    async makeRequest(func, ...args) {
        return await this.worldSync.makeRequest('media', {
            type: 'video',
            request: {
                func: func,
                args: [...args]
            }
        })
    }

    async createVideo(url) {
        return await this.makeRequest('createVideo', url)
    }
}