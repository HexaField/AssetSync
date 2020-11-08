export const REALM_WORLD_GENERATORS = {
    NONE: 'None',
    INFINITE_WORLD: 'Infinite World',
}

export const REALM_WHITELIST = {
    NONE: 'None',
    SERVICE: 'Service',
    PASSCODE: 'Passcode'
}

import _ from 'lodash'

export default class RealmData
{  
    constructor(data)
    {
        this.setData(data)
    }

    setData(params = {})
    {
        const now = Date.now()
        this.data = {
            id: String(params.id || now),
            name: params.name || this.getName() || 'New Realm',
            timestamp: now,
            iconURL: params.iconURL || this.getIconURL(),
            global: Boolean(params.global),
            whitelist: params.whitelist ? {
                type: params.whitelist.type || REALM_WHITELIST.NONE,
                ids: params.whitelist.ids || []
            } : {
                type: REALM_WHITELIST.NONE,
                ids: []
            },
            worldData: params.worldData || {},
            worldSettings: Object.assign({}, params.worldSettings || {
                features: params.features  && params.features.length ? params.features : [],
                worldGeneratorType: REALM_WORLD_GENERATORS.INFINITE_WORLD 
            }, params.worldSettings ? _.clone(params.worldSettings) : {})
        }
    }

    getWorldSettings()
    {
        return this.data.worldSettings
    }

    getData()
    {
        return this.data
    }

    getID()
    {
        return this.data.id
    }

    getName()
    {
        if(this.data)
            return this.data.name
        return ''
    }

    getIconURL()
    {
        if(this.data)
            return this.data.iconURL
        return ''
    }
}