import ScreenBase from './ScreenBase';
import { NETWORKING_OPCODES } from '../world/realm/NetworkingSchemas';
import ScreenElementButton from './elements/ScreenElementButton';

export default class ScreenUserInteract extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.background.visible = true;
        this.group.add(this.background);

        this.buttonPay = new ScreenElementButton(this, this, { x: -this.width / 4, y: this.height / 4, width: this.buttonWidth, height: this.buttonHeight, text: 'Pay' })
        this.buttonPay.setOnClickCallback(() => { this.screenManager.showScreen(this.screenManager.screenUserPay); })
        this.registerElement(this.buttonPay)
        
        this.buttonTrade = new ScreenElementButton(this, this, { x: this.width / 4, y: this.height / 4, width: this.buttonWidth, height: this.buttonHeight, text: 'Trade' })
        this.buttonTrade.setOnClickCallback(() => { this.screenManager.showScreen(this.screenManager.screenUserPay); })
        this.registerElement(this.buttonTrade)
        
        this.buttonSell = new ScreenElementButton(this, this, { x: -this.width / 4, y: -this.height / 4, width: this.buttonWidth, height: this.buttonHeight, text: 'Sell' })
        this.buttonSell.setOnClickCallback(() => { this.screenManager.showScreen(this.screenManager.screenUserPay); })
        this.registerElement(this.buttonSell)
        
        this.buttonBuy = new ScreenElementButton(this, this, { x: this.width / 4, y: -this.height / 4, width: this.buttonWidth, height: this.buttonHeight, text: 'Buy' })
        this.buttonBuy.setOnClickCallback(() => { this.screenManager.showScreen(this.screenManager.screenUserPay); })
        this.registerElement(this.buttonBuy)
    }

    setUser(user)
    {
        this.user = user;
        this.screenTitle.setText('Interacting with ' + user.username)
        this.screenManager.screenUserPay.setUser(user)
        this.screenManager.conjure.getWorld().realm.sendTo(NETWORKING_OPCODES.PROFILE.SERVICE.PAYID.REQUESTID, '', user.peerID)
    }

    showScreen(active)
    {
        super.showScreen(active);
    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }
}