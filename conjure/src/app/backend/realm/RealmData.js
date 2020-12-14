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
        timestamp: 0,
        worldSettings: {
            features: ['Lobby'],
            worldGeneratorType: REALM_WORLD_GENERATORS.NONE
        }
    },
    GALLERY: {
        id: 'Gallery',
        name: 'Art Gallery',
        timestamp: 0,
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
        timestamp: 0,
        worldData: {
            playsAudio: true
        },
        worldSettings: {
            features: ['Campfire'],
            worldGeneratorType: REALM_WORLD_GENERATORS.NONE
        }
    },
}

export default class RealmData
{  
    constructor(params = {})
    {
        const now = Date.now()
        this.id = String(params.id || now)
        this.name = params.name || 'New Realm'
        this.timestamp = now
        this.iconURL = params.iconURL
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