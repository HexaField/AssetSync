import c from"../../../util/randombytes/index.js";export default class d{constructor(e){this.serviceHandler=e,this.userData=void 0,this.loggedIn=!1}async initialise(){this.clientId="719132345483132948",this.url="https://discord.com/api/oauth2/authorize?"+this._encode({client_id:this.clientId,redirect_uri:window.location.origin+"/success.html",response_type:"token",scope:"identify guilds",state:c(16).toString("hex")});const e=await window.clientDatastore.get("discordAccessToken");return e?await this.getUser(e):!0}logOut(){if(!this.loggedIn)return;window.clientDatastore.del("discordAccessToken"),this.userData=void 0,this.setLoggedIn(!1)}logInToDiscord(){this.loggedIn?this.logOut():(window.addEventListener("message",function(e){if(e.data.message==="deliverResult"){let t=e.data.result.substr(1).split("&").map(s=>s.split("=")).reduce((s,[i,n])=>({...s,[i]:n}),{});this.getUser(t.access_token),e.source.close()}}.bind(this)),window.open(this.url,"Login"))}async getUser(e){if(!e)return!1;try{const t=await this.request("GET","/users/@me",e);return console.log("Successfully logged into discord!"),await window.clientDatastore.put("discordAccessToken",e),this.setLoggedIn(!0),console.log(t),this.userData=t,this.serviceHandler.setData({discordName:this.userData.username,discordID:this.userData.id}),!0}catch(t){console.log("Sorry, could not log you in. Your session may have expired."),await window.clientDatastore.del("discordAccessToken"),this.userData=void 0,this.setLoggedIn(!1)}}async getUserGuilds(){try{const e=await window.clientDatastore.get("discordAccessToken");return await this.request("GET","/users/@me/guilds",e)}catch(e){reject(e)}}setLoggedIn(e){this.loggedIn=e,this.serviceHandler.setAuthenticated(e)}request(e,t,s){const i={"User-Agent":"Discord-OAuth2 (https://github.com/hexafield/assetsync, 0.0.0)","Content-Type":"application/json",Authorization:`Bearer ${s}`};return new Promise(async n=>{const r=new Request("https://discordapp.com/api/"+t,{method:e,headers:i});fetch(r).then(o=>{o.status===200?o.json().then(a=>n(a)):(console.log(o),o.json().then(console.log))})})}_encode(e){let t="";for(const[s,i]of Object.entries(e)){if(!i)continue;t+=`&${encodeURIComponent(s)}=${encodeURIComponent(i)}`}return t.substring(1)}}
