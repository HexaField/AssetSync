import PayIDDomain from './PayIDDomain'
import DigitalAssetHandler from './DigitalAssetHandler'
// import { getPublicAccount } from './PayIDAPI'

export default class PayIDHandler
{  
    constructor(service)
    {
        this.service = service
        this.digitalAssetHandler = new DigitalAssetHandler(this)
        this.domains = []
        this.activeID = undefined
    }

    async initialise()
    {
        await this.digitalAssetHandler.initialise()
        console.log(this.domains)
        this.addDomain('xpring.money')
    }

    setActiveID(domain, account)
    {
        this.activeID = account.getAccount() + '$' + domain.getDomain()
    }
    
    async getBalance(payid)
    {
        // let balance = await this.digitalAssetHandler.ilpClient.getBalance(payid)
        // console.log('Net balance was ' + balance.netBalance + ' with asset scale ' + balance.assetScale)
        // return balance
    }

    async sendPayment(amount, to, from)
    {
        return await this.digitalAssetHandler.makePayment(amount, to, from)
    }


    async addAccount(domain, accountName)
    {
        if(domain.getAccount(accountName)) return
        try
        {
            let response = await this.digitalAssetHandler.payIdClient.allAddressesForPayId(accountName + '$' + domain.getDomain())
            console.log(response)
            if(response.error)
            {
                this.conjure.getGlobalHUD().log(response.message)
                return
            }
            let newAccount = domain.addAccount(accountName)
            for(let address of response)
                newAccount.addWallet(address)

            // Make first wallet added the default to receive payments
            if(!this.activeID)
                this.activeID = accountName + '$' + domain.getDomain()
            
            return newAccount
        }
        catch(error)
        {
            console.log(error)
        }
    }

    removeAccount(domain, account) // not async as simply removing our reference to account
    {
        domain.removeAccount(account.getAccount())
    }

    async createAccount(domain, accountName)
    {
        // if(!this.digitalAssetHandler.getSupportedDomain(domain.getDomain())) return
        
        // domain.createAccount(accountName)
    }

    async updateAccount(domain, account)
    {

    }

    async addWallet(domain, account, walletInfo)
    {
        // account.addWallet(walletInfo || this.digitalAssetHandler.generateWallet())
        // return true
    }

    async removeWallet(domain, account, wallet)
    {
        // account.removeWallet(wallet)
    }

    // todo: verify domain is a valid payid server
    addDomain(domainName)
    {
        console.log(this.domains)
        if(this.getDomain(domainName)) return

        let newDomain = new PayIDDomain(domainName)
        this.domains.push(newDomain)
        return newDomain;
    }

    removeDomain(domainName)
    {
        for(let i in this.domains)
            if(this.domains[i].getDomain() === domainName)
                {
                    this.domains.splice(i, 1)
                    return true
                }
    }

    getDomain(domainName)
    {
        for(let domain of this.domains)
            if(domain.domain === domainName)
                    return domain
        return
    }
    
    getDomains()
    {
        return this.domains
    }

    refreshScreen()
    {
        // replace this with callback
        // global.conjure.getScreens().screenPayID.refresh()
    }
}