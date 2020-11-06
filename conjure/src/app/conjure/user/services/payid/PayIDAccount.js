import PayIDWallet from './PayIDWallet'

export default class PayIDAccount
{
	constructor(account)
	{
        this.account = account
        this.wallets = []
    }
    
    getAccount()
    {
        return this.account
    }

    addWallet(walletName)
    {
        let newWallet = new PayIDWallet(walletName)
        this.wallets.push(newWallet)
        return newWallet
    }
    
    removeWallet(wallet)
    {
        for(let i in this.wallets)
            if(this.wallets[i].wallet === wallet)
                {
                    this.wallets.splice(i, 1)
                    return
                }
    }

    getWallet(walletName)
    {
        for(let wallet of this.wallets)
            if(wallet.domain === walletName)
                    return wallet
        return
    }

    getWallets()
    {
        return this.wallets
    }
}