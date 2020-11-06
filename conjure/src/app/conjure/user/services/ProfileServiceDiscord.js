import DiscordHandler from './discord/DiscordHandler'
import ProfileService from './ProfileService'

export default class ProfileServiceDiscord extends ProfileService
{  
    constructor(profile)
    {
        super(profile, 'Discord')
        this.link = this.link.bind(this)
        this.isLinked = false
        this.discordHandler = new DiscordHandler(this)
    }

    async initialise()
    {
        await super.initialise()
        await this.discordHandler.tryConnect();
    }

    getSchema()
    {
        return {
            linkButton: {
                type: 'button',
                buttonText: this.getIsLinked() ? 'Unlink' : 'Link',
                ignoreLabel: true,
                callback: this.link,
            }
        }
    }

    link()
    {
        if(this.getIsLinked())
            this.discordHandler.logOut()
        else
            this.discordHandler.logInToDiscord()
    }

    getIsLinked()
    {
        return this.isLinked
    }
    
    setLinked(linked)
    {
        this.isLinked = linked
        if(!linked)
            this.data = {}
        this.profile.refreshServices()
    }

    toJson()
    {
        if(this.isLinked)
            return this.data
        return super.toJson()
    }

    readFromJson(data)
    {
        
    }

    async getGuilds()
    {
        if(!this.isLinked) return []
        return await this.discordHandler.getUserGuilds()
    }

    async getRealmsIDs()
    {
        if(!this.guilds) 
            this.guilds = await this.getGuilds()
        let guilds = JSON.parse(JSON.stringify(this.guilds))
        for(let guild of guilds)
        {
            guild.iconURL = 'https://cdn.discordapp.com/icons/' + guild.id + '/'+ guild.icon + '.png'
            guild.id = this.getName() +'-'+ guild.id
        }
        return guilds
    }
}