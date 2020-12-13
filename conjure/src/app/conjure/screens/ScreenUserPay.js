import ScreenBase from './ScreenBase';
import ScreenElementText from './elements/ScreenElementText'
import ScreenElementTextBox from './elements/ScreenElementTextBox'
import ScreenElementButton from './elements/ScreenElementButton'
import { NETWORKING_OPCODES } from '../../backend/Constants.js'
import ScreenElementLabelled from './elements/ScreenElementLabelled';

export default class ScreenUserPay extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.background.position.setZ(-0.1)
        this.group.add(this.background);

        this.payidservice = this.screenManager.conjure.getProfile().getServiceManager().getService('PayID')

        this.user = undefined
        this.pay = this.pay.bind(this)

        this.textMyPayidTitle = new ScreenElementText(this, this, { x: -this.width/4, y: this.height / 2 - 0.1, width: this.buttonWidth, height: this.buttonHeight, text: 'My Payid' })
        this.registerElement(this.textMyPayidTitle)
        this.textOtherPayidTitle = new ScreenElementText(this, this, { x: this.width/4, y: this.height / 2 - 0.1, width: this.buttonWidth, height: this.buttonHeight, text: "<other's> Payid" })
        this.registerElement(this.textOtherPayidTitle)

        this.textMyPayidAddress = new ScreenElementText(this, this, { x: -this.width/4, y: this.height / 2 - 0.2, width: this.buttonWidth, height: this.buttonHeight, text: 'Loading...' })
        this.registerElement(this.textMyPayidAddress)
        this.textOtherPayidAddress = new ScreenElementText(this, this, { x: this.width/4, y: this.height / 2 - 0.2, width: this.buttonWidth, height: this.buttonHeight, text: "Loading..." })
        this.registerElement(this.textOtherPayidAddress)

        this.textMyPayidBalance = new ScreenElementText(this, this, { x: -this.width/4, y: this.height / 2 - 0.3, width: this.buttonWidth, height: this.buttonHeight, text: 'Loading...'} )
        this.registerElement(this.textMyPayidBalance)

        this.amountBox = new ScreenElementTextBox(this, this, { x: this.width/8, y: this.height / 2 - 0.3, width: this.buttonWidth / 2, height: this.buttonHeight })
        this.amountBox.setValue(0)
        this.amountLabel = new ScreenElementLabelled(this, this, { x: this.width/4, y: this.height / 2 - 0.3, width: this.buttonWidth / 2, height: this.buttonHeight, element: this.amountBox })
        this.amountLabel.setText('Amount: ')
        this.registerElement(this.amountLabel)

        this.buttonCancel = new ScreenElementButton(this, this, { x: -this.width/4, y: -this.height / 4, width: this.buttonWidth, height: this.buttonHeight, text: 'Cancel' })
        this.buttonCancel.setOnClickCallback(() => { this.screenManager.showScreen(this.screenManager.screenUserInteract); })
        this.registerElement(this.buttonCancel)

        this.buttonPay = new ScreenElementButton(this, this, { x: this.width/4, y: -this.height / 4, width: this.buttonWidth, height: this.buttonHeight, text: 'Pay' })
        this.buttonPay.setOnClickCallback(this.pay)
        this.registerElement(this.buttonPay)

        this.noOtherPayid = 'User has no PayID selected'
        this.noMyPayid = 'No PayID selected'
        this.noBal = 'Could not load balance'
    }

    setUser(user)
    {
        // this.user = user
        // this.object = undefined
        this.screenTitle.setText('Trading with user ' + user.username)
        this.textOtherPayidTitle.setText(user.username + "'s Payid")
        this.textOtherPayidAddress.setText('ponderjaunt$xpring.money')
        this.textMyPayidAddress.setText('hexafield$xpring.money')
        this.textMyPayidBalance.setText('Loading...')
        this.amountBox.setValue(3)
        this.onPayCallback = undefined
    }

    setObject(object)
    {
        // this.user = undefined
        // this.object = object
        this.screenTitle.setText('Trading with object ' + object.name)
        this.amountBox.setValue(10)
        this.textOtherPayidTitle.setText(object.name + "'s Payid")
        this.textOtherPayidAddress.setText(object.userData.payID)
        this.textMyPayidAddress.setText('Loading...')
        this.textMyPayidBalance.setText('Loading...')
        this.onPayCallback = (() => {
            console.log('here we gooooooo!!!!!')
            this.screen.screenManager.conjure.getWorld().realm.sendData(NETWORKING_OPCODES.REALM.TRONIFY)
            this.screen.screenManager.conjure.getWorld().realm.tron()
            object.visible = false
        })
    }

    setOthersPayID(id)
    {
        // this.textOtherPayidAddress.setText(id || this.noOtherPayid)
    }

    async setMyPayID()
    {
        // change this to have a screen show up with a list of all my payids
        // this.textMyPayidAddress.setText(this.payidservice.getPreferredID() || this.noMyPayid)
        // this.textMyPayidBalance.setText((await this.payidservice.getBalanceOnPreferred()) || this.noBal)
    }

    pay()
    {
        // let amount = this.amountBox.getValue()
        // if(isNaN(amount) || this.textMyPayidAddress.getValue() === this.noMyPayid || this.textOtherPayidAddress.getValue() === this.noOtherPayid) return
        // this.payidservice.sendPayment(amount, this.textMyPayidAddress.getValue(), this.textOtherPayidAddress.getValue())
        this.screenManager.closeAllScreens()
        if(this.onPayCallback)
            this.onPayCallback()
    }

    showScreen(active)
    {
        super.showScreen(active);
        if(active)
            this.setMyPayID()
    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }
}