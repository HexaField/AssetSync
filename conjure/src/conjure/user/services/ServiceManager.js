// import ProfileServiceDiscord from "./ProfileServiceDiscord"
// import ProfileServicePayID from "./ProfileServicePayID"

import { SERVER_PROTOCOLS } from '../../../data/DataHandler'

export default class ServiceManager
{  
    constructor(conjure)
    {
        this.conjure = conjure
        this.services = {}

        // this.addService(new ProfileServiceDiscord(this))
        // this.addService(new ProfileServicePayID(this))
    }

    getServiceAsJson()
    {
        let servicesJson = {}
        for(let service of Object.keys(this.services))
            servicesJson[service] = this.services[service].toJson()
        return servicesJson
    }
    // addService(service)
    // {
    //     let serviceExists = false
    //     for(let s of this.services)
    //     {
    //         if(s === service)
    //             serviceExists = true
    //     }
    //     if(!serviceExists)
    //         this.services.push(service)
    // }


    addService(service)
    {
        this.services[service.getName()] = service
    }

    linkService(serviceName)
    {
        this.services[serviceName].link()
    }

    unlinkService(serviceName)
    {
        this.services[serviceName].unlink()
    }

    getServiceLinked(serviceName)
    {
        return this.services[serviceName].getIsLinked()
    }

    getService(serviceName)
    {
        return this.services[serviceName]
    }

    refreshServices()
    {
        this.conjure.getScreens().screenServices.selectService()
    }

    async initialiseServices()
    {
        for(let service of Object.values(this.services))
        {
            await service.initialise()
        }
        this.conjure.getScreens().screenServices.addServices()
    }

    async getPotentialRealms()
    {
        let potentialRealmsFound = []
        for(let service of Object.values(this.services))
        {
            potentialRealmsFound.push(...await service.getRealmsIDs())
        }
        return potentialRealmsFound
    }

    async getRealmsFromConnectedServices()
    {
        let realmsFound = []
        for(let service of Object.values(this.services))
        {
            let ids = await service.getRealmsIDs()
            for(let i in ids)
            {
                let realm = await this.conjure.getDataHandler(SERVER_PROTOCOLS.GET_REALM, ids[i].id)
                if(realm)
                    realmsFound.push(realm)
            }
        }
        return realmsFound
    }

    setServicesFromDatabase(data)
    {
        for(let service of Object.keys(data))
            if(this.getService(service))
                this.getService(service).readFromJson(data[service])
    }
}