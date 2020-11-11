// import { REALM_PROTOCOLS } from "../world/realm/Realm.js"
import { generateUUID } from '@AssetSync/common'
import ServiceManager from './services/ServiceManager.js'

export default class Profile
{  
    constructor(conjure)
    {
        this.conjure = conjure
        this.isLoaded = false
        this.lastUpdated = 0

        // data
        this.profileData = {}
        this.makeDefaultProfile()
     
        this.serviceManager = new ServiceManager(conjure)
    }

    makeDefaultProfile()
    {
        this.profileData = {
            id: generateUUID(),
            username: 'New User ' + Math.round(Math.random() * 10000)
        }
    }

    getServiceManager() { return this.serviceManager }
    getProfile() { return this.profileData }
    getID() { return this.profileData.id }
    getUsername() { return this.profileData.username }
    
    setUsername(newName)
    {
        this.profileData.username = newName
        // this.conjure.getWorld().sendData(REALM_PROTOCOLS.USER.UPDATE, { username: this.getUsername() })
    }

    createProfile()
    {
        if(this.isLoaded) return
        this.saveProfile()
        this.setProfileLoaded(true)
    }

    removeProfile()
    {
        if(!this.isLoaded) return
        this.makeDefaultProfile()
        this.setProfileLoaded(false)
    }

    async loadFromDatabase()
    {
        let data = await this.conjure.profiles.get()

        if(!data || data.timestamp < this.lastUpdated || !data.data) return
        this.lastUpdated = data.timestamp

        if(data.data.profile)
            this.setProfileFromDatabase(data.data.profile)
        if(data.data.services)
            this.getServiceManager().setServicesFromDatabase(data.data.services)
    }

    saveProfile()
    {
        // replace with dht
        this.conjure.profiles.put({ profile: this.profileData, services: this.getServiceManager().getServiceAsJson() })
    }

    setProfileFromDatabase(data)
    {
        this.profileData = data
        this.setProfileLoaded(true)

        this.conjure.getGlobalHUD().log('Successfully loaded profile!')
    }

    setProfileLoaded(loaded)
    {
        this.conjure.getScreens().screenProfile.setProfileLoaded(loaded)
        this.isLoaded = loaded
        if(loaded)
        {
            this.conjure.getScreens().screenProfile.setProfileName(this.getUsername()) // eventually change this to update all profile info on screen
        }
    }
}