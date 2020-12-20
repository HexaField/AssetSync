import DiscordOauth2 from 'discord-oauth2'

export default class DiscordOauthHandler
{  
    constructor(service)
    {
        this.serviceHandler = service;
        this.userData = undefined;
        this.loggedIn = false;
    }

    async initialise()
    {
        this.clientId = '719132345483132948';

        this.oauth = new DiscordOauth2({
            clientId: this.clientId,
            // clientSecret: this.clientSecret,
            redirectUri: window.location.origin + "/success.html",
        });

        this.url = this.oauth.generateAuthUrl({
            scope: "identify guilds",
            responseType: 'token',
            state: window.crypto.getRandomValues(new Uint32Array(16)).toString("hex"), 
        });

        const access_token = self.simpleStorage.get('discordAccessToken')
        if(access_token)
            return await this.getUser(access_token)

        return true
    }

    logOut()
    {
        if(!this.loggedIn) return
        // let access_token = self.simpleStorage.getItem('discordAccessToken');
        // if(!access_token) return
        // const credentials = Buffer.from(`${this.clientId}`).toString("base64"); 

        // this.oauth.revokeToken(access_token, credentials).then((response) => {
            self.simpleStorage.del('discordAccessToken');
            this.userData = undefined;
            this.setLoggedIn(false);
        // }); 
    }

    logInToDiscord()
    {
        if(this.loggedIn)
            this.logOut();
        else
        {
            window.addEventListener("message", function(ev) {
                if (ev.data.message === "deliverResult") {
                    let params = ev.data.result
                        .substr(1)
                        .split("&")
                        .map(v => v.split("="))
                        .reduce( (pre, [key, value]) => ({ ...pre, [key]: value }), {} );
                    this.getUser(params.access_token)
                    ev.source.close();
                }
            }.bind(this));

            //let authWindow = 
            window.open(this.url, 'Login');
        }
    }

    // this acts as the login 
    //   - if we fail to get the user data, we may as well bind that to if we are logged in!
    async getUser(access_token)
    {
        if(!access_token) return false

        try
        {
            const user_data = await this.oauth.getUser(access_token)
            
            console.log("Successfully logged into discord!");
            self.simpleStorage.set('discordAccessToken', access_token)
            this.setLoggedIn(true)
            console.log(user_data)
            this.userData = user_data;
            this.serviceHandler.setData({ discordName: this.userData.username, discordID: this.userData.id });
            return true
        }
        catch(error)
        {
            console.log('Sorry, could not log you in. Your session may have expired.')
            self.simpleStorage.del('discordAccessToken')
            this.userData = undefined;
            this.setLoggedIn(false)
        }
    }

    async getUserGuilds()
    {
        return await new Promise((resolve, reject) => {
            try{
                const access_token = self.simpleStorage.get('discordAccessToken')
                this.oauth.getUserGuilds(access_token).then((user_guilds) => {
                    resolve(user_guilds);
                })
            } catch(error) {
                reject(error)
            }
        })
    }

    setLoggedIn(loggedIn)
    {
        this.loggedIn = loggedIn;
        this.serviceHandler.setAuthenticated(loggedIn);
    }
} 