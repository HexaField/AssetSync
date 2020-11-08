import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementJSONTree from './elements/ScreenElementJSONTree'
import { REALM_WORLD_GENERATORS, REALM_WHITELIST } from '../world/realm/RealmData'
import RealmData from '../world/realm/RealmData'

export default class ScreenRealmSettings extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args)

        this.group.add(this.background)

        this.fromService = false

        this.createRealm = this.createRealm.bind(this)
        this.updateData = this.updateData.bind(this)
        this.selectFromList = this.selectFromList.bind(this)
        this.selectedFromList = this.selectedFromList.bind(this)
        this.isCreating = false

        this.jsonTree = new ScreenElementJSONTree(this, this, { width: this.width, height: this.height, alwaysUpdate: true })
        this.registerElement(this.jsonTree)

        this.cancelButton = new ScreenElementButton(this, this, { x : -this.width / 3, y: -this.height / 2 + 0.2, width: this.buttonWidth, height: this.buttonHeight });
        this.cancelButton.setText('Cancel');
        this.cancelButton.setOnClickCallback(() => { this.data = {}; this.fromService = false; this.screenManager.hideLastOpenScreen() });
        this.registerElement(this.cancelButton);

        this.createButton = new ScreenElementButton(this, this, { x : 0, y: -this.height / 2 + 0.2, width: this.buttonWidth, height: this.buttonHeight });
        this.createButton.setText('Create');
        this.createButton.setOnClickCallback(this.createRealm);
        this.registerElement(this.createButton);

        this.createFromServiceButton = new ScreenElementButton(this, this, { x : this.width / 3, y: -this.height / 2 + 0.2, width: this.buttonWidth, height: this.buttonHeight });
        this.createFromServiceButton.setText('Create From Service');
        this.createFromServiceButton.setOnClickCallback(this.selectFromList);
        this.registerElement(this.createFromServiceButton);

        this.data = undefined
    }

    getSchema()
    {
        return {
            type: 'json',
            label: 'name',
            items: {
                id: {
                    type: 'static',
                    label: 'ID',
                },
                name: {
                    type: this.fromService ? 'static' : 'text',
                    label: 'Name',
                },
                // todo, if fromService, load the image as an icon
                iconURL: {
                    type: this.fromService ? 'static' : 'text',
                    label: 'Icon',
                },
                whitelist: {
                    type: 'json',
                    label: 'Whitelist Settings',
                    items: {
                        type: {
                            type: this.isCreating && !this.fromService ? 'list' : 'static',
                            label: 'Whitelist Type',
                            items: this.fromService ? [REALM_WHITELIST.SERVICE] : Object.values(REALM_WHITELIST)
                        }
                    }
                },
                // features: {
                //     type: 'button',
                //     buttonText: 'Features',
                //     ignoreLabel: true,
                //     disable: this.isCreating,
                //     callback: () => this.screenManager.showScreen(this.screenManager.screenFeatures, this.data.getData()),
                // },
                worldSettings: {
                    type: 'json',
                    label: 'World Settings',
                    items: {
                        worldGeneratorType: {
                            type: 'list',
                            label: 'Terrain Type',
                            items: Object.values(REALM_WORLD_GENERATORS)
                        }
                    }
                },
            }
        }
    }

    showScreen(active, args = {})
    {
        // initial check for the case that we are trying to update a realm without one loaded
        // maybe should move this to the place where it's called in this case?
        if(active && !args.isCreating && !this.screenManager.conjure.getWorld().realm) 
        {
            return 'cancel'
        }
        super.showScreen(active)
        if(!active) return

        this.isCreating = Boolean(args.isCreating)
        if(this.isCreating && !this.data)
            this.fromService = false
        // this.jsonTree.setActive(active)
        this.jsonTree.setSchema(this.getSchema())
        if(this.isCreating)
        {
            this.createButton.setText('Create')
            this.createFromServiceButton.setHidden(false)
            if(!this.data)
                this.data = new RealmData(args.data ? args.data.getData() : {})
            this.jsonTree.updateTree(this.data.getData(), this.updateData)
        }
        else
        {   
            this.createButton.setText('Update')
            this.createFromServiceButton.setHidden(true) // TODO: turn this into 'manage features' when in update mode
            // when in updating mode, we always want to force to get the latest data
            this.data = this.screenManager.conjure.getWorld().realm.realmData
            this.jsonTree.updateTree(this.data.getData(), this.updateData)
        }
    }

    async createRealm()
    {
        // replace with dht
        // if(this.isCreating)
        // {
        //     await this.screenManager.conjure.getDataHandler(SERVER_PROTOCOLS.PIN_REALM, { data: this.data.getData(), pin: true })
        //     console.log('Successfully made realm!', this.data)
        //     this.screenManager.showScreen(this.screenManager.screenRealms)
        //     this.data = undefined // must reset data
        // }
        // else
        // {
        //     this.data.getData().timestamp = Date.now()
        //     await this.screenManager.conjure.getDataHandler(SERVER_PROTOCOLS.UPDATE_REALM, this.data.getData())
        //     this.screenManager.conjure.getWorld().forceReloadCurrentRealm()
        // }
    }

    async selectFromList()
    {
        this.screenManager.showScreen(this.screenManager.screenList)
        this.screenManager.screenList.setOnSelectCallback(this.selectedFromList)
        this.screenManager.screenList.setList((await this.screenManager.conjure.getProfile().getServiceManager().getPotentialRealms()).filter(realm => realm.owner), 'name')
    }

    selectedFromList(item)
    {
        if(!this.data) return
        if(!item.owner) return
        this.fromService = true
        this.data = new RealmData(item)
        this.data.getData().whitelist.type = REALM_WHITELIST.SERVICE
        this.jsonTree.setSchema(this.getSchema())
        this.jsonTree.updateTree(this.data.getData(), this.updateData)
    }

    updateData()
    {
        
    }

    update(updateArgs)
    {
        super.update(updateArgs)
    }
}