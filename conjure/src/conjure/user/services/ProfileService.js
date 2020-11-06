export default class ProfileService
{
    constructor(profile, name)
    {
        this.profile = profile
        this.name = name
        this.data = {}
    }

    async initialise()
    {
        // console.log('Initialised service ' + this.name)
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
    getRealmIDs() { return [] }
}