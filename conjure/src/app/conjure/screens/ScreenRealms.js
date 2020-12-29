import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementBase from './elements/ScreenElementBase'
import ScreenElementTextBox from './elements/ScreenElementTextBox'
import ScreenElementScroll from './elements/ScreenElementScroll'
import RealmData, { REALM_TYPES } from '../../backend/realm/RealmData'
import ScreenElementSprite from './elements/ScreenElementSprite'

export default class ScreenRealms extends ScreenBase {
    constructor(screenManager, args) {
        super(screenManager, args);

        this.buttonWidth = 0.4;
        this.buttonHeight = 0.1;

        this.background.visible = true;
        this.group.add(this.background);

        this.createRealm = this.createRealm.bind(this);
        this.shareRealm = this.shareRealm.bind(this);
        this.forgetRealm = this.forgetRealm.bind(this);
        this.joinRealm = this.joinRealm.bind(this);

        this.realms = [] // [{ realmData, pinned }, ...]

        this.joinButton = new ScreenElementButton(this, this, { x: -this.width / 4, y: this.height / 2 - 0.1, width: this.buttonWidth, height: this.buttonHeight, text: 'Join Realm' });
        this.joinButton.setOnClickCallback(this.joinRealm)
        this.registerElement(this.joinButton)

        this.discordIdTextbox = new ScreenElementTextBox(this, this, { x: this.width / 4, y: this.height / 2 - 0.1, width: this.buttonWidth, height: this.buttonHeight });
        this.discordIdTextbox.setValue('')
        this.registerElement(this.discordIdTextbox);

        this.scrollPanel = new ScreenElementScroll(this, this, { width: this.width, height: this.height - 0.4 });
        this.registerElement(this.scrollPanel);

        this.createButton = new ScreenElementButton(this, this, { x: -this.width / 4, y: -this.height / 2 + 0.2, width: this.buttonWidth, height: this.buttonHeight, text: 'Create Realm' });
        this.createButton.setOnClickCallback(this.createRealm)
        this.registerElement(this.createButton)

        this.shareButton = new ScreenElementButton(this, this, { x: this.width / 4, y: -this.height / 2 + 0.2, width: this.buttonWidth, height: this.buttonHeight, text: 'Get Link' });
        this.shareButton.setOnClickCallback(this.shareRealm)
        this.registerElement(this.shareButton)

        this.getRealms()
    }

    showScreen(active) {
        super.showScreen(active);
        this.scrollPanel.setActive(active);
        if (active)
            this.getRealms()
    }

    async getRealms() {
        this.realms = await this.screenManager.conjure.getWorld().getRealms()
        this.displayRealms()
    }

    createRealm() {
        this.screenManager.showScreen(this.screenManager.screenRealmSettings, { isCreating: true })
    }

    shareRealm() {
        const url = this.screenManager.conjure.makeUrl()
        navigator.clipboard.writeText(url)
        CONSOLE.log('Copied', url, 'to clipboard!')
    }

    // TODO: add realm icons
    displayRealms() {
        this.scrollPanel.removeAllItems()
        for (let realm of this.realms) {
            let container = new ScreenElementBase(this, this.scrollPanel, { z: 0.025, width: this.buttonWidth * 2, height: this.buttonHeight })

            let button = new ScreenElementButton(this, container, { width: this.buttonWidth, height: this.buttonHeight })
            button.setOnClickCallback(this.joinRealm, realm.id) // return all the realm info data
            button.setValue(realm.name)
            container.registerElement(button)

            let icon = new ScreenElementSprite(this, container, { x: -this.buttonWidth * 0.5, width: this.buttonHeight, height: this.buttonHeight })
            icon.load(realm.iconURL ? ('https://cors-anywhere.herokuapp.com/' + realm.iconURL) : 'default_realm')
            // icon.setIconScale(0.1)
            container.registerElement(icon)

            let forgetIcon = new ScreenElementSprite(this, container, { x: this.buttonWidth * 0.5, width: this.buttonHeight, height: this.buttonHeight })
            forgetIcon.load(realm.type === REALM_TYPES.GLOBAL ? 'global_icon' : 'pin_full')// : 'pin_empty')
            forgetIcon.setIconScale(0.75)
            if (!realm.global) { // todo: properly implement this
                forgetIcon.setOnClickCallback(this.forgetRealm, realm) // return all the realm info data
            }
            container.registerElement(forgetIcon)

            this.scrollPanel.registerItem(container)
        }
        this.scrollPanel.updateItems(0)
    }

    async forgetRealm(realmData) {
        await this.screenManager.conjure.realms.forgetRealm(realmData)
        this.getRealms()
    }

    async joinRealm(id) {
        let realmData = await this.screenManager.conjure.getWorld().getRealm(id || this.discordIdTextbox.getValue())
        if (realmData) {
            this.screenManager.conjure.getWorld().joinRealm(new RealmData(realmData)) // for joining a private realm
            this.screenManager.hideAllScreens()
        }
        else {
            console.log('Could not find realm with id', id || this.discordIdTextbox.getValue())
        }
    }

    update(updateArgs) {
        super.update(updateArgs)
    }
}