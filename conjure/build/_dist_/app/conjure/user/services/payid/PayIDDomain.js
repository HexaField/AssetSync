import n from"./PayIDAccount.js";export default class o{constructor(t){this.domain=t,this.accounts=[]}getDomain(){return this.domain}addAccount(t){let c=new n(t);return this.accounts.push(c),c}createAccount(t){}removeAccount(t){for(let c in this.accounts)if(this.accounts[c].account===t){this.accounts.splice(c,1);return}}getAccount(t){for(let c of this.accounts)if(c.account===t)return c;return}getAccounts(){return this.accounts}}