export default class Feature
{
    constructor(realm)
    {
        this.realm = realm
    }

    async load() {}

    async unload() {}

    update(updateArgs) {}
}