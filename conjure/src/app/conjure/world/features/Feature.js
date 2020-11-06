export default class Feature
{
    constructor(realm)
    {
        this.realm = realm
    }

    async preload() {}

    async load() {}

    async unload() {}

    update(updateArgs) {}
}