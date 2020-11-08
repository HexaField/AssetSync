import * as THREE from 'three'
import * as DiscordOauth2 from 'discord-oauth2'
import randomBytes from '../../../util/randombytes'

export default class DiscordHandler
{  
    constructor(service)
    {
        this.serviceHandler = service;
        this.loader = new THREE.FileLoader();
        this.userData = undefined;
        this.accessDiscord = this.accessDiscord.bind(this);
        this.loggedIn = false;
    }

    tryConnect()
    {
        this.load('discord-info.txt', this.accessDiscord);
    }

    load(file, callback)
    {
        this.loader.load(
            file,
            ( data ) => { callback(data) },
            ( xhr ) => { 
                // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); 
            },
            ( err ) => { console.error( 'Failed to load discord key, could not log in.' ); }
        );
    }

    async logOut()
    {
        if(!this.loggedIn) return;
        let accessToken = JSON.parse(self.basicStorage.getItem('discordAccessToken'));
        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64"); 
        const response = await this.oauth.revokeToken(accessToken.access_token, credentials)
        await self.simpleStorage.del('discordAccessToken');
        this.userData = undefined;
        this.setLoggedIn(false);
    }

    async accessDiscord(data)
    {
        let data_split = data.split('\n');
        this.clientId = data_split[0];
        this.clientSecret = data_split[1];

        this.oauth = new DiscordOauth2({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUri: location.origin + "/success.html",
        });

        this.url = this.oauth.generateAuthUrl({
            scope: "identify guilds",
            state: randomBytes(16).toString("hex"), 
        });

        if(window.localStorage.getItem('discordAccessToken'))
        {
            let accessToken = JSON.parse(await self.simpleStorage.get('discordAccessToken'));
            try {
                const access_token = this.oauth.tokenRequest({
                    refreshToken: accessToken.refresh_token,
                    grantType: "refresh_token",
                    scope: "identify guilds",
                })
                if(access_token)
                {
                    console.log("Successfully logged into discord with refresh token!");
                    await self.simpleStorage.set('discordAccessToken', JSON.stringify(access_token));
                    this.setLoggedIn(true);
                    await this.getUser(access_token);
                }
            } catch (error) {
                console.log(error);
                await self.simpleStorage.clear('discordAccessToken');
                this.userData = undefined;
                this.setLoggedIn(false);
            }
        }
    }

    async logInToDiscord()
    {
        if(this.loggedIn)
            this.logOut();
        else
        {
            window.addEventListener("message", async (ev) => {
                if (ev.data.message === "deliverResult")
                {
                    let params = (new URL(ev.data.result)).searchParams;
                    await this.logIn(params.get('code'), params.get('state'))
                    ev.source.close();
                }
            });
            
            //let authWindow = 
            window.open(this.url, 'Login');
        }
    }

    async logIn(code, state)
    {
        try {
            const access_token = this.oauth.tokenRequest({
                code: code,
                scope: "identity guilds",
                grantType: "authorization_code",
            })
            if(access_token)
            {
                console.log("Successfully logged into discord!");
                await self.simpleStorage.set('discordAccessToken', JSON.stringify(access_token));
                this.setLoggedIn(true);
                await this.getUser(access_token);
            }   
        } catch(error) {
            console.log(error);
            await self.simpleStorage.del('discordAccessToken');
            this.userData = undefined;
            this.setLoggedIn(false);
        }
    }

    async getUser(access_token)
    {
        const user_data = await this.oauth.getUser(access_token.access_token)
        this.userData = user_data;
        this.serviceHandler.setData({ discordName: this.userData.username, discordID: this.userData.id });
    }

    async getUserGuilds()
    {
        return await new Promise(async (resolve, reject) => {
            try{
                const user_guilds = await this.oauth.getUserGuilds(JSON.parse(await self.simpleStorage.get('discordAccessToken')).access_token)
                resolve(user_guilds);
            } catch(error) {
                reject(error)
            }
        })
    }

    setLoggedIn(loggedIn)
    {
        this.loggedIn = loggedIn;
        this.serviceHandler.setLinked(loggedIn);
    }
}