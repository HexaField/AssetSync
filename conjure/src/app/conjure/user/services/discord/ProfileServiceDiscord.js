// import DiscordHandler from './DiscordOauthHandler'
import ProfileService from '../ProfileService'

export default class ProfileServiceDiscord extends ProfileService
{  
    constructor(profile)
    {
        super(profile, 'Discord')
        this.link = this.link.bind(this)
    }

    async initialise()
    {
        await super.initialise()

        this.discordHandler = new DiscordOauthHandler(this)
        if(await this.discordHandler.initialise())
            this.guilds = await this.getGuilds()
    }

    getSchema()
    {
        return {
            linkButton: {
                type: 'button',
                buttonText: this.getAuthenticated() ? 'Unlink' : 'Link',
                ignoreLabel: true,
                callback: this.link,
            }
        }
    }

    link()
    {
        if(!this.discordHandler) 
            return
        if(this.getAuthenticated())
            this.discordHandler.logOut()
        else
            this.discordHandler.logInToDiscord()
    }

    toJson()
    {
        if(this.isAuthenticated)
            return this.data
        return super.toJson()
    }

    readFromJson(data)
    {
        
    }

    async getGuilds()
    {
        if(!this.discordHandler || !this.isAuthenticated) return []
        return await this.discordHandler.getUserGuilds()
    }

    async getRealms()
    {
        if(!this.guilds || this.guilds.length === 0) 
            this.guilds = await this.getGuilds()
        let guilds = JSON.parse(JSON.stringify(this.guilds))
        for(let guild of guilds)
        {
            guild.iconURL = 'https://cdn.discordapp.com/icons/' + guild.id + '/'+ guild.icon + '.png'
            guild.worldData = {
                guildID: guild.id
            }
            guild.id = 'Discord-' + guild.id
            guild.worldSettings = {
                features: ['Discord']
            }
        }
        return guilds
    }
}