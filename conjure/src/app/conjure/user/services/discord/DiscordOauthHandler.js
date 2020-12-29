// import DiscordOauth2 from 'discord-oauth2'
import randomBytes from '../../../util/randombytes'

export default class DiscordOauthHandler {
    constructor(service) {
        this.serviceHandler = service;
        this.userData = undefined;
        this.loggedIn = false;
    }

    async initialise() {
        this.clientId = '719132345483132948';

        this.url = 'https://discord.com/api/oauth2/authorize?' + this._encode({
            client_id: this.clientId,
            redirect_uri: window.location.origin + "/success.html",
            response_type: "token",
            scope: "identify guilds",
            state: randomBytes(16).toString("hex")//window.crypto.getRandomValues(new Uint32Array(16)).toString("hex")
        })

        const access_token = await window.clientDatastore.get('discordAccessToken')
        if (access_token)
            return await this.getUser(access_token)

        return true
    }

    logOut() {
        if (!this.loggedIn) return
        // let access_token = window.clientDatastore.getItem('discordAccessToken');
        // if(!access_token) return
        // const credentials = Buffer.from(`${this.clientId}`).toString("base64"); 

        // this.oauth.revokeToken(access_token, credentials).then((response) => {
        window.clientDatastore.del('discordAccessToken');
        this.userData = undefined;
        this.setLoggedIn(false);
        // }); 
    }

    logInToDiscord() {
        if (this.loggedIn)
            this.logOut();
        else {
            window.addEventListener("message", function (ev) {
                if (ev.data.message === "deliverResult") {
                    let params = ev.data.result
                        .substr(1)
                        .split("&")
                        .map(v => v.split("="))
                        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});
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
    async getUser(access_token) {
        if (!access_token) return false

        try {
            // const user_data = await this.oauth.getUser(access_token)
            const user_data = await this.request("GET", "/users/@me", access_token)

            console.log("Successfully logged into discord!");
            await window.clientDatastore.put('discordAccessToken', access_token)
            this.setLoggedIn(true)
            // console.log(user_data)
            this.userData = user_data;
            this.serviceHandler.setData({ discordName: this.userData.username, discordID: this.userData.id });
            return true
        }
        catch (error) {
            console.log('Sorry, could not log you in. Your session may have expired.')
            await window.clientDatastore.del('discordAccessToken')
            this.userData = undefined;
            this.setLoggedIn(false)
        }
    }

    async getUserGuilds() {
        try {
            const access_token = await window.clientDatastore.get('discordAccessToken')
            return await this.request("GET", "/users/@me/guilds", access_token)
        } catch (error) {
            reject(error)
        }
    }

    setLoggedIn(loggedIn) {
        this.loggedIn = loggedIn;
        this.serviceHandler.setAuthenticated(loggedIn);
    }

    request(method, url, access_token) {
        const headers = {
            "User-Agent": `Discord-OAuth2 (https://github.com/hexafield/assetsync, 0.0.0)`,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        };
        return new Promise(async (resolve) => {
            const request = new Request('https://discordapp.com/api/' + url, {
                method,
                headers
            })
            fetch(request).then(response => {
                if (response.status === 200) {
                    response.json().then(result => resolve(result))
                } else {
                    console.log(response)
                    response.json().then(console.log)
                }
            })
        })
    }

    _encode(obj) {
        let string = "";
        for (const [key, value] of Object.entries(obj)) {
            if (!value) continue;
            string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return string.substring(1);
    }
} 