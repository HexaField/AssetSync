import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementBase from './elements/ScreenElementBase'
import ScreenElementTextBox from './elements/ScreenElementTextBox'
import ScreenElementScroll from './elements/ScreenElementScroll'
import RealmData from '../world/realm/RealmData'
import ScreenElementSprite from './elements/ScreenElementSprite'

export default class ScreenRealms extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.buttonWidth = 0.4;
        this.buttonHeight = 0.1;

        this.background.visible = true;
        this.group.add(this.background);

        this.createRealm = this.createRealm.bind(this);
        this.pin = this.pin.bind(this);
        this.joinRealm = this.joinRealm.bind(this);

        this.realms = [] // [{ realmData, pinned }, ...]

        this.joinButton = new ScreenElementButton(this, this, { x: -this.width/4, y: this.height/2 - 0.1, width: this.buttonWidth, height: this.buttonHeight, text: 'Join Realm' });
        this.joinButton.setOnClickCallback(this.joinRealm)
        this.registerElement(this.joinButton)

        this.discordIdTextbox = new ScreenElementTextBox(this, this, { x: this.width/4, y: this.height/2 - 0.1, width: this.buttonWidth, height: this.buttonHeight });
        this.discordIdTextbox.setValue('')
        this.registerElement(this.discordIdTextbox);

        this.scrollPanel = new ScreenElementScroll(this, this, { width: this.width, height: this.height - 0.4 });
        this.registerElement(this.scrollPanel);

        this.createButton = new ScreenElementButton(this, this, { y: -this.height/2 + 0.2, width: this.buttonWidth, height: this.buttonHeight, text: 'Create Realm' });
        this.createButton.setOnClickCallback(this.createRealm)
        this.registerElement(this.createButton)
    }

    showScreen(active)
    {
        super.showScreen(active);
        this.scrollPanel.setActive(active);
        if(active)
            this.getRealms()
    }

    async getRealms()
    {
        this.realms = []
        this.realms.push(...await this.screenManager.conjure.getWorld().getRealmsAndPinned())
        this.displayRealms()
    }

    createRealm()
    {
        this.screenManager.showScreen(this.screenManager.screenRealmSettings, { isCreating: true })
    }

    // TODO: add realm icons
    displayRealms()
    {
        this.scrollPanel.removeAllItems()
        for(let realm of this.realms)
        {
            let container = new ScreenElementBase(this, this.scrollPanel, { z: 0.025, width: this.buttonWidth * 2, height: this.buttonHeight })
            
            let button = new ScreenElementButton(this, container, { width: this.buttonWidth, height: this.buttonHeight })
            button.setOnClickCallback(this.joinRealm, realm.realmData.id) // return all the realm info data
            button.setValue(realm.realmData.name)
            container.registerElement(button)
            
            let icon = new ScreenElementSprite(this, container, { x: -this.buttonWidth * 0.5, width: this.buttonHeight, height: this.buttonHeight })
            icon.load(realm.realmData.iconURL ? realm.realmData.iconURL : 'default_realm')
            // icon.setIconScale(0.1)
            container.registerElement(icon)
            
            let pinIcon = new ScreenElementSprite(this, container, { x: this.buttonWidth * 0.5, width: this.buttonHeight, height: this.buttonHeight })
            pinIcon.load(realm.pinned === 'global' ? 'global_icon' : realm.pinned ? 'pin_full' : 'pin_empty')
            pinIcon.setIconScale(0.75)
            pinIcon.setOnClickCallback(this.pin, realm) // return all the realm info data
            container.registerElement(pinIcon)
            
            this.scrollPanel.registerItem(container)
        }
        this.scrollPanel.updateItems(0)
    }

    async pin(realmData)
    {
        // replace with dht
        // for(let realm of await this.screenManager.conjure.getDataHandler(SERVER_PROTOCOLS.GET_REALMS)) // get all stored realms
        // {
        //     if(realm.id === realmData.realmData.id)
        //     {
        //         console.log(realmData)
        //         await this.screenManager.conjure.getDataHandler(SERVER_PROTOCOLS.PIN_REALM, { data: realmData.realmData, pin: !realmData.pinned })
        //         this.getRealms()
        //         return
        //     }
        // }
    }
    
    async joinRealm(id)
    {
        let realmData = await this.screenManager.conjure.getWorld().getRealm(id || this.discordIdTextbox.getValue())
        if(realmData)
        {
            this.screenManager.conjure.getWorld().joinRealm(new RealmData(realmData)) // for joining a private realm
            this.screenManager.hideAllScreens()
        }
        else
        {
            console.log('Could not find realm with id', id || this.discordIdTextbox.getValue())
        }
    }

    update(updateArgs)
    {
        super.update(updateArgs)
    }
}