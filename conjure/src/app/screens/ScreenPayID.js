import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementLabelled from './elements/ScreenElementLabelled'
import ScreenElementJSONTree from './elements/ScreenElementJSONTree'
import ScreenElementScroll from './elements/ScreenElementScroll'
import ScreenElementText from './elements/ScreenElementText'


export default class ScreenPayID extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args)

        this.payIDHandler = this.screenManager.conjure.getProfile().getServiceManager().getService('PayID').payIDHandler

        this.buttonWidth = 0.4
        this.buttonHeight = 0.1
        this.panelWidth = 0.7
        this.panelHeight = this.height - 0.4

        this.background.visible = true
        this.group.add(this.background)

        this.selectedDomain = undefined
        this.selectedAccount = undefined
        this.selectedWallet = undefined

        this.refreshDomains = this.refreshDomains.bind(this)
        this.refreshAccounts = this.refreshAccounts.bind(this)
        this.refreshWallets = this.refreshWallets.bind(this)

        this.addDomain = this.addDomain.bind(this)
        this.removeDomain = this.removeDomain.bind(this)
        this.addAccount = this.addAccount.bind(this)
        this.removeAccount = this.removeAccount.bind(this)
        this.createAccount = this.createAccount.bind(this)
        this.updateAccount = this.updateAccount.bind(this)
        this.addWallet = this.addWallet.bind(this)
        this.removeWallet = this.removeWallet.bind(this)
        this.setActiveWallet = this.setActiveWallet.bind(this)

        // Domains
        this.domainsLabel = new ScreenElementText(this, this, { x: -this.width/2 + 0.4, y: this.height/2 - 0.1, width: this.buttonWidth, height: 0.1, text: 'Domains' })
        this.registerElement(this.domainsLabel)
        
        this.domainsPanel = new ScreenElementScroll(this, this, { x: -this.width/2 + 0.4, y: 0.05, width: this.panelWidth, height: this.panelHeight, scrollSide: 'left' })
        this.registerElement(this.domainsPanel)
        
        this.addDomainButton = new ScreenElementButton(this, this, { x: -this.width/2 + 0.4, y: -this.height/2 + 0.2, width: this.buttonWidth, height: this.buttonHeight, text: 'Add' });
        this.addDomainButton.setOnClickCallback(this.addDomain)
        this.registerElement(this.addDomainButton)
        
        this.removeDomainButton = new ScreenElementButton(this, this, { x: -this.width/2 + 0.4, y: -this.height/2 + 0.05, width: this.buttonWidth, height: this.buttonHeight, text: 'Remove' });
        this.removeDomainButton.setOnClickCallback(this.removeDomain)
        this.registerElement(this.removeDomainButton)

        // Accounts
        this.accountsLabel = new ScreenElementText(this, this, { x: -0.4, y: this.height/2 - 0.1, width: this.buttonWidth, height: 0.1, text: 'Accounts' })
        this.registerElement(this.accountsLabel)
        this.accountsLabel.setHidden(true)
        
        this.accountsPanel = new ScreenElementScroll(this, this, { x: -0.4, y: 0.05, width: this.panelWidth, height: this.panelHeight, scrollSide: 'left'})
        this.registerElement(this.accountsPanel)
        
        this.addAccountButton = new ScreenElementButton(this, this, { x: -0.4, y: -this.height/2 + 0.2, width: this.buttonWidth, height: this.buttonHeight, text: 'Add' });
        this.addAccountButton.setOnClickCallback(this.addAccount)
        this.registerElement(this.addAccountButton)
        
        this.removeAccountButton = new ScreenElementButton(this, this, { x: -0.4, y: -this.height/2 + 0.05, width: this.buttonWidth, height: this.buttonHeight, text: 'Remove' });
        this.removeAccountButton.setOnClickCallback(this.removeAccount)
        this.registerElement(this.removeAccountButton)

        // this.createAccountButton = new ScreenElementButton(this, this, -0.25, -this.height/2 + 0.2, 0, this.buttonWidth / 2, this.buttonHeight, { text: 'Create' });
        // this.createAccountButton.setOnClickCallback(this.createAccount)
        // this.registerElement(this.createAccountButton)
        
        // this.updateAccountButton = new ScreenElementButton(this, this, -0.25, -this.height/2 + 0.05, 0, this.buttonWidth / 2, this.buttonHeight, { text: 'Update' });
        // this.updateAccountButton.setOnClickCallback(this.updateAccount)
        // this.registerElement(this.updateAccountButton)

        // Wallets
        this.walletsLabel = new ScreenElementText(this, this, { x: 0.2, y: this.height/2 - 0.1, width: this.buttonWidth, height: 0.1, text: 'Wallets' })
        this.registerElement(this.walletsLabel)
        this.walletsLabel.setHidden(true)
        
        this.walletsPanel = new ScreenElementScroll(this, this, { x: 0.2, y: 0.05, width: this.panelWidth, height: this.panelHeight, scrollSide: 'left'})
        this.registerElement(this.walletsPanel)
        
        // this.addWalletButton = new ScreenElementButton(this, this, 0.15, -this.height/2 + 0.2, 0, this.buttonWidth / 2, this.buttonHeight, { text: 'Add Wallet' });
        // this.addWalletButton.setOnClickCallback(this.addWallet)
        // this.registerElement(this.addWalletButton)
        
        // this.removeWalletButton = new ScreenElementButton(this, this, 0.15, -this.height/2 + 0.05, 0, this.buttonWidth / 2, this.buttonHeight, { text: 'Remove Wallet' });
        // this.removeWalletButton.setOnClickCallback(this.removeWallet)
        // this.registerElement(this.removeWalletButton)

        this.setActiveWalletButton = new ScreenElementButton(this, this, { x: 0.2, y: -this.height/2 + 0.05, width: this.buttonWidth, height: this.buttonHeight, text: 'Make Active' });
        this.setActiveWalletButton.setOnClickCallback(this.setActiveWallet)
        this.registerElement(this.setActiveWalletButton)

        // Info
        this.infoLabel = new ScreenElementText(this, this, { x: this.width/2 - 0.5, y: this.height/2 - 0.1, width: this.buttonWidth, height: 0.1, text: 'Wallet Information' })
        this.registerElement(this.infoLabel)
        this.infoLabel.setHidden(true)

        this.infoPanel = new ScreenElementJSONTree(this, this, { x: this.width/2 - 0.5, y: -0.1, width: this.panelWidth + 0.2, height: this.panelHeight + 0.3 })
        this.infoPanel.setSchema(this.getSchema())
        this.registerElement(this.infoPanel)
    }

    addDomain()
    {
        this.screenManager.screenTextEntry.setTitle('Add Domain')
        this.screenManager.screenTextEntry.setCallback((value) => {
            if(!value) return
            this.payIDHandler.addDomain(value)
            this.selectedDomain = undefined
            this.refreshDomains()
        })
        this.screenManager.showScreen(this.screenManager.screenTextEntry)
    }

    removeDomain()
    {
        if(this.selectedDomain)
        {
            if(!this.payIDHandler.removeDomain(this.selectedDomain.getDomain())) return
            this.selectedDomain = undefined
            this.refreshDomains()
        }   
    }

    async addAccount()
    {
        if(!this.selectedDomain) return
        this.screenManager.screenTextEntry.setTitle('Add Account')
        this.screenManager.screenTextEntry.setCallback(async (value) => {
            if(!await this.payIDHandler.addAccount(this.selectedDomain, value))
                return
            this.selectedAccount = undefined
            this.selectedWallet = undefined
            this.refreshAccounts()
        })
        this.screenManager.showScreen(this.screenManager.screenTextEntry)
    }

    removeAccount()
    {
        if(this.selectedAccount)
        {
            this.payIDHandler.removeAccount(this.selectedDomain, this.selectedAccount)
            this.selectedAccount = undefined
            this.selectedWallet = undefined
            this.refreshAccounts()
        }   
    }

    async createAccount()
    {
        if(!this.selectedDomain) return
        this.screenManager.screenTextEntry.setTitle('Add Account')
        this.screenManager.screenTextEntry.setCallback(async (value) => {
            if(!await this.payIDHandler.createAccount(this.selectedDomain, value))
                return
            this.selectedAccount = undefined
            this.selectedWallet = undefined
            this.refreshAccounts()
        })
    }

    async updateAccount()
    {
        if(this.selectedAccount)
        {
            if(!await this.payIDHandler.updateAccount(this.selectedDomain, this.selectedAccount))
                return
            this.selectedAccount = undefined
            this.selectedWallet = undefined
            this.refreshAccounts()
        }   
    }

    async addWallet()
    {
        if(!this.selectedAccount) return
        this.screenManager.screenTextEntry.setTitle('Add Wallet')
        this.screenManager.screenTextEntry.setCallback(async (value) => {
            if(!await this.payIDHandler.addWallet(this.selectedDomain, this.selectedAccount, value))
                return
            this.selectedWallet = undefined
            this.refreshWallets()
        })
        this.screenManager.showScreen(this.screenManager.screenTextEntry)
    }

    async removeWallet()
    {
        if(this.selectedWallet)
        {
            this.selectedAccount.removeWallet(this.selectedDomain, this.selectedAccount, this.selectedWallet)
            this.selectedWallet = undefined
            this.refreshWallets()
        }   
    }

    setActiveWallet()
    {
        this.payIDHandler.setActiveID(this.selectedDomain, this.selectedAccount)
    }

    refreshDomains()
    {
        this.domainsPanel.removeAllItems()
        for(let domain of this.payIDHandler.getDomains())
        {
            let domainButton = new ScreenElementButton(this, this.domainsPanel, { width: this.buttonWidth, height: this.buttonHeight, text: domain.getDomain() });
            domainButton.setOnClickCallback(() => {
                this.domainsPanel.unSelectAll()
                if(this.selectedDomain === domain)
                {
                    domainButton.setSelected(false)
                    this.selectedDomain = undefined
                }
                else
                {
                    domainButton.setSelected(true)
                    this.selectedDomain = domain
                }
                this.refreshAccounts()
            })
            this.domainsPanel.registerItem(domainButton)
        }
        this.domainsPanel.updateItems()
        this.refreshAccounts()
    }

    refreshAccounts()
    {
        this.accountsPanel.removeAllItems()
        this.selectedAccount = undefined
        this.selectedWallet = undefined
        if(this.selectedDomain)
        {
            this.accountsLabel.setHidden(false)
            this.addAccountButton.setHidden(false)
            this.removeAccountButton.setHidden(false)
            // this.createAccountButton.setHidden(false)
            // this.updateAccountButton.setHidden(false)
            for(let account of this.selectedDomain.getAccounts())
            {
                let accountButton = new ScreenElementButton(this, this.accountsPanel, { width: this.buttonWidth, height: this.buttonHeight, text: account.getAccount() });
                accountButton.setOnClickCallback(() => {
                    this.accountsPanel.unSelectAll()
                    if(this.selectedAccount === account)
                    {
                        accountButton.setSelected(false)
                        this.selectedAccount = undefined
                    }
                    else
                    {
                        accountButton.setSelected(true)
                        this.selectedAccount = account
                    }
                    this.refreshWallets()
                })
                this.accountsPanel.registerItem(accountButton)
            }
        }
        else
        {
            this.accountsLabel.setHidden(true)
            this.addAccountButton.setHidden(true)
            this.removeAccountButton.setHidden(true)
            // this.createAccountButton.setHidden(true)
            // this.updateAccountButton.setHidden(true)
        }
        this.accountsPanel.updateItems()
        this.refreshWallets()
    }

    refreshWallets()
    {
        this.walletsPanel.removeAllItems()
        this.selectedWallet = undefined
        if(this.selectedAccount)
        {
            this.walletsLabel.setHidden(false)
            // this.addWalletButton.setHidden(false)
            // this.removeWalletButton.setHidden(false)
            for(let wallet of this.selectedAccount.getWallets())
            {
                let walletButton = new ScreenElementButton(this, this.walletsPanel, { width: this.buttonWidth, height: this.buttonHeight, text: wallet.getAddress() });
                walletButton.setOnClickCallback(() => {
                    this.walletsPanel.unSelectAll()
                    if(this.selectedWallet === wallet)
                    {
                        walletButton.setSelected(false)
                        this.selectedWallet = undefined
                    }
                    else
                    {
                        walletButton.setSelected(true)
                        this.selectedWallet = wallet
                    }
                    this.refreshInfo()
                })
                this.walletsPanel.registerItem(walletButton)
            }
        }
        else
        {
            this.walletsLabel.setHidden(true)
            // this.addWalletButton.setHidden(true)
            // this.removeWalletButton.setHidden(true)
        }
        this.walletsPanel.updateItems()
        this.refreshInfo()
    }

    refreshInfo()
    {
        if(this.selectedWallet)
        {
            this.infoPanel.setHidden(false)
            this.infoLabel.setHidden(false)
            this.infoPanel.updateTree(this.selectedWallet.getInfo());
        }
        else
        {
            this.infoPanel.setHidden(true)
            this.infoLabel.setHidden(true)
        }
    }

    showScreen(active)
    {
        super.showScreen(active);
        this.refreshDomains()
    }

    update(updateArgs)
    {
        super.update(updateArgs)
    }

    getSchema()
    {
        return {
            paymentNetwork: {
                type: 'static',
                label: 'Network',
            },
            environment: {
                type: 'static',
                label: 'Environment',
            },
            addressDetailsType: {
                type: 'static',
                label: 'Details Type'
            },
            addressDetails: {
                type: 'json',
                label: 'addressDetails',
                key: 'addressDetails',
                items: {
                    address: {
                        type: 'static',
                        label: "Address",
                    },
                    tag: {
                        type: 'static',
                        label: "Tag",
                    },
                }
                
            }
            // recentTransactions: {
            //     type: 'array',
            //     sort: 'timestamp',
            //     label: 'hash',
            //     items: {
            //         type: {
            //             type: 'static',
            //             label: 'Type',
            //         },
            //         hash: {
            //             type: 'static',
            //             label: 'Hash',
            //         },
            //         amount: {
            //             type: 'static',
            //             label: 'Amount',
            //         },
            //         participant: {
            //             type: 'static',
            //             label: 'Participant',
            //         },
            //         timestamp: {
            //             type: 'timestamp',
            //             label: "Timestamp",
            //         }
            //     }
            // },
        }
    }
}