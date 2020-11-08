export default class ProfileService
{
    constructor(profile, name)
    {
        this.profile = profile
        this.name = name
        this.data = {}
        this.isAuthenticated = false
    }

    async initialise()
    {
        return true
        // console.log('Initialised service ' + this.name)
    }    
    
    getAuthenticated()
    {
        return this.isAuthenticated
    }

    setAuthenticated(authenticated)
    {
        this.isAuthenticated = authenticated
        if(!authenticated)
            this.data = {}
        this.profile.refreshServices()
    }


    getSchema()
    {
        return {}
    }

    getData()
    {
        return this.data
    }

    getName()
    {
        return this.name
    }

    setData(data)
    {
        this.data = data
    }

    toJson()
    {
        return ''
    }

    readFromJson(data) {}

    // must return data with the format 
    // { id, name } 
    // optional is 
    // { iconURL }
    async getRealms() { return [] }
}