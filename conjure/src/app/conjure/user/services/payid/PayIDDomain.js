import PayIDAccount from './PayIDAccount'

export default class PayIDDomain
{
	constructor(domain)
	{
        this.domain = domain
        this.accounts = []
    }
    
    getDomain()
    {
        return this.domain
    }

    addAccount(accountName)
    {
        let newAccount = new PayIDAccount(accountName)
        this.accounts.push(newAccount)
        return newAccount
    }
    
    createAccount(accountName)
    {
        
    }

    removeAccount(accountName)
    {
        for(let i in this.accounts)
            if(this.accounts[i].account === accountName)
                {
                    this.accounts.splice(i, 1)
                    return
                }
    }

    getAccount(accountName)
    {
        for(let account of this.accounts)
            if(account.account === accountName)
                    return account
        return
    }

    getAccounts()
    {
        return this.accounts
    }
}