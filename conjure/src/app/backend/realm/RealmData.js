export const REALM_WORLD_GENERATORS = {
    NONE: 'None',
    // INFINITE_WORLD: 'Infinite World',
}

export const REALM_WHITELIST = {
    NONE: 'None',
    SERVICE: 'Service',
    PASSCODE: 'Passcode'
}

export const GLOBAL_REALMS = {
    LOBBY: {
        id: 'Lobby',
        name: 'Lobby',
        timestamp: -1,
        worldSettings: {
            features: ['Lobby'],
            worldGeneratorType: REALM_WORLD_GENERATORS.NONE
        }
    },
    GALLERY: {
        id: 'Gallery',
        name: 'Art Gallery',
        timestamp: -1,
        worldData: {
            playsAudio: true
        },
        worldSettings: {
            features: ['Gallery'],
            worldGeneratorType: REALM_WORLD_GENERATORS.NONE
        }
    },
    CAMPFIRE: {
        id: 'Campfire',
        name: 'Campfire',
        timestamp: -1,
        worldData: {
            playsAudio: true
        },
        worldSettings: {
            features: ['Campfire'],
            worldGeneratorType: REALM_WORLD_GENERATORS.NONE
        }
    },
}

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

export default class RealmData
{  
    constructor(params)
    {
        if(!params || !params.id || !params.name) throw new Error('Error: Invalid realm data! ' + params)

        this.id = String(params.id || randomString(8))
        this.name = params.name || 'New Realm'
        this.timestamp = params.timestamp || (new Date()).toUTCString()
        this.iconURL = params.iconURL || ''
        this.global = Boolean(params.global)

        // temp until DIDs is in

        this.whitelist = params.whitelist || {}
        this.whitelist.type = this.whitelist.type || REALM_WHITELIST.NONE
        this.whitelist.ids = this.whitelist.ids || []

        this.worldSettings = params.worldSettings || {}
        this.worldSettings.features = this.worldSettings.features || []
        this.worldSettings.worldGeneratorType = this.worldSettings.worldGeneratorType || REALM_WORLD_GENERATORS.NONE 

        // user data
        this.worldData = params.worldData || {}
    }

    getWorldSettings()
    {
        return this.worldSettings
    }

    getData()
    {
        return this
    }

    getID()
    {
        return this.id
    }

    getName()
    {
        return this.name
    }

    getIconURL()
    {
        return this.iconURL
    }
}