// import { NETWORKING_OPCODES } from '../../backend/Constants.js'
import { generateUUID } from '@AssetSync/common'
import ServiceManager from './services/ServiceManager.js'

export default class Profile {
    constructor(conjure) {
        this.conjure = conjure
        this.isLoaded = false

        // data
        this.profileData = {}
        this.makeDefaultProfile()

        this.serviceManager = new ServiceManager(conjure)
    }

    makeDefaultProfile() {
        this.profileData = {
            id: generateUUID(),
            username: 'New User ' + Math.round(Math.random() * 10000)
        }
    }

    getServiceManager() { return this.serviceManager }
    getProfile() { return this.profileData }
    getID() { return this.profileData.id }
    getUsername() { return this.profileData.username }

    setUsername(newName) {
        this.profileData.username = newName
        // this.conjure.getWorld().sendData(NETWORKING_OPCODES.USER.UPDATE, { username: this.getUsername() })
    }

    createProfile() {
        if (this.isLoaded) return
        this.saveProfile()
        this.setProfileLoaded(true)
    }

    removeProfile() {
        if (!this.isLoaded) return
        this.makeDefaultProfile()
        this.setProfileLoaded(false)
    }

    async loadFromDatabase() {
        let data
        try {
            data = JSON.parse(await window.clientDatastore.get('profile'))
        } catch (err) { console.log(err) }
        console.log(data)

        if (!data) return

        if (data.profile)
            this.setProfileFromDatabase(data.profile)
        if (data.services)
            this.getServiceManager().setServicesFromDatabase(data.services)
    }

    saveProfile() {
        // replace with dht
        window.clientDatastore.put('profile', JSON.stringify({ profile: this.profileData, services: this.getServiceManager().getServiceAsJson() }))
    }

    setProfileFromDatabase(data) {
        this.profileData = data
        this.setProfileLoaded(true)

        this.conjure.getGlobalHUD().log('Successfully loaded profile!')
    }

    setProfileLoaded(loaded) {
        this.conjure.getScreens().screenProfile.setProfileLoaded(loaded)
        this.isLoaded = loaded
        if (loaded) {
            this.conjure.getScreens().screenProfile.setProfileName(this.getUsername()) // eventually change this to update all profile info on screen
        }
    }
}