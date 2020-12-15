// import ProfileServiceDiscord from "./discord/ProfileServiceDiscord"
// import ProfileServicePayID from "./ProfileServicePayID"

export default class ServiceManager {
    constructor(conjure) {
        this.conjure = conjure
        this.services = {}

        // this.addService(new ProfileServiceDiscord(this))
        // this.addService(new ProfileServicePayID(this))
    }

    getServiceAsJson() {
        let servicesJson = {}
        for (let service of Object.keys(this.services))
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


    addService(service) {
        this.services[service.getName()] = service
    }

    linkService(serviceName) {
        this.services[serviceName].link()
    }

    unlinkService(serviceName) {
        this.services[serviceName].unlink()
    }

    getServiceLinked(serviceName) {
        return this.services[serviceName].getAuthenticated()
    }

    getService(serviceName) {
        return this.services[serviceName]
    }

    refreshServices() {
        this.conjure.getScreens().screenServices.selectService()
    }

    async initialiseServices() {
        for (let service of Object.values(this.services)) {
            if (await service.initialise())
                service.isInitialised = true
        }
        this.conjure.getScreens().screenServices.addServices()
    }

    async getPotentialRealms() {
        let potentialRealmsFound = []
        for (let service of Object.values(this.services)) {
            potentialRealmsFound.push(...await service.getRealms())
        }
        return potentialRealmsFound
    }

    async getRealmsFromConnectedServices() {
        let realmsFound = []
        for (let service of Object.values(this.services)) {
            let ids = await service.getRealms()
            for (let i in ids) {
                if (await this.conjure.realms.getRealmById(ids[i].id))
                    if (realm) 
                        realmsFound.push(ids[i])
            }
        }
        return realmsFound
    }

    setServicesFromDatabase(data) {
        for (let service of Object.keys(data))
            if (this.getService(service))
                this.getService(service).readFromJson(data[service])
    }
}