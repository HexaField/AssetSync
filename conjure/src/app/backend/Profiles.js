export default class Profiles {
    
    constructor(assetSync) {
        this.assetSync = assetSync
    }

    async get() {
        try {
            return JSON.parse(await this.assetSync.storagePlugin.readFile('profile.json') || '{}')
        }
        catch (error) {
            console.log('ProfileManager: could not load profile with error', error);
            // this.conjure.getGlobalHUD().log('Failed to load profile')
            return
        }
    }

    async put(data) {
        try {
            let newObject = { timestamp: String(Date.now()), data: data }
            await this.assetSync.storagePlugin.writeFile('profile.json', JSON.stringify(newObject))
            console.log('ProfileManager: Successfully saved profile');
            // this.conjure.getGlobalHUD().log('Successfully saved profile')
            return true
        } catch (error) {
            console.log('ProfileManager: could not save profile', data, 'with error', error);
            // this.conjure.getGlobalHUD().log('Failed to save profile')
            return false
        }
    }
}