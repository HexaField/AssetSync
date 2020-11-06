export default class PayIDWallet

{
	constructor(info)
	{
        this.walletInfo = info
            // recentTransactions: [
            //     { type: 'receive', hash:'r4AZpDKVoBxVcYUJCWMcqZzyWsHTteC4ZE', amount: 4.20, participant: 'MockPayee1$asset.stream', timestamp: Date.now() + Math.round(Math.random() * 100000)},
            //     { type: 'receive', hash:'rKLpjpCoXgLQQYQyj13zgay73rsgmzNH13', amount: 0.25, participant: 'MockPayee2$asset.stream', timestamp: Date.now() + Math.round(Math.random() * 100000)},
            //     { type: 'pay', hash:'U2mEJSLqBRkYLVTv55rFTgQajkLTnT6mA', amount: 10.00, participant: 'MockRecipient$asset.stream', timestamp: Date.now() + Math.round(Math.random() * 100000)},
            // ],
    }
    
    getInfo()
    {
        return this.walletInfo
    }

    getAddress()
    {
        if(this.walletInfo && this.walletInfo.addressDetails)
            return this.walletInfo.addressDetails.address
    }
}