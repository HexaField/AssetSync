import ProfileService from '../ProfileService'
import PayIDHandler from './PayIDHandler'

export default class ProfileServicePayID extends ProfileService
{  
    constructor(profile)
    {
        super(profile, 'PayID')
        this.payIDHandler = new PayIDHandler(this)
        this.openPayIDScreen = this.openPayIDScreen.bind(this)
    }

    async initialise()
    {
        super.initialise()
        await this.payIDHandler.initialise()
    }

    openPayIDScreen()
    {
        this.profile.conjure.getScreens().showScreen(this.profile.conjure.getScreens().screenPayID)
    }

    getPreferredID()
    {
        return this.payIDHandler.activeID
    }

    getBalanceOnPreferred()
    {
        return this.payIDHandler.getBalance(this.getPreferredID())
    }

    sendPayment(amount, to, from)
    {
        if(this.payIDHandler.sendPayment(amount, to, from))
            this.conjure.getGlobalHUD().log('Successfully sent ' + amount + ' from ' + from + ' to ' + to)
    }

    getSchema()
    {
        return {
            linkButton: {
                type: 'button',
                buttonText: 'Edit Info',
                ignoreLabel: true,
                callback: this.openPayIDScreen,
            }
        }
    }

    toJson()
    {
        let json = {
            domains: {},
            activeID: this.payIDHandler.activeID,
        }
        for(let domain of this.payIDHandler.domains)
        {
            json.domains[domain.getDomain()]= {}
            for(let account of domain.accounts)
            {
                json.domains[domain.getDomain()][account.getAccount()] = {}
                for(let wallet of account.wallets)
                {
                    json.domains[domain.getDomain()][account.getAccount()][wallet.getAddress()] = wallet.getInfo()
                }
            }
        }
        console.log('PayID toJson', json)
        return json
    }

    async readFromJson(data)
    {
        let domains = Object.keys(data.domains)
        for(let domain of domains)
        {
            let newDomain = this.payIDHandler.addDomain(domain) || this.payIDHandler.getDomain(domain)
            if(newDomain)
            {
                let accounts = Object.keys(data.domains[domain])
                for(let account of accounts)
                {
                    let newAccount = await this.payIDHandler.addAccount(newDomain, account)
                    if(newAccount)
                    {
                        let wallets = Object.keys(data.domains[domain][account])
                        for(let wallet of wallets)
                        {
                            console.log(wallet, data.domains[domain][account][wallet])
                            await this.payIDHandler.addWallet(newDomain, newAccount, data.domains[domain][account][wallet])
                        }
                    }
                }
            }
        }
        this.payIDHandler.activeID = data.activeID
    }
}