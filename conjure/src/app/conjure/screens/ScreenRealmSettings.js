import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementJSONTree from './elements/ScreenElementJSONTree'
import { REALM_WORLD_GENERATORS, REALM_WHITELIST, REALM_TYPES } from '../../backend/realm/RealmData.js'
import RealmData from '../../backend/realm/RealmData.js'

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
        this.createEphemeral = this.createEphemeral.bind(this)
        this.isCreating = false

        this.jsonTree = new ScreenElementJSONTree(this, this, { width: this.width, height: this.height, alwaysUpdate: true })
        this.registerElement(this.jsonTree)

        this.cancelButton = new ScreenElementButton(this, this, { x : -this.width / 3, y: -this.height / 2 + 0.25, width: this.buttonWidth, height: this.buttonHeight });
        this.cancelButton.setText('Cancel');
        this.cancelButton.setOnClickCallback(() => { this.data = {}; this.fromService = false; this.screenManager.hideLastOpenScreen() });
        this.registerElement(this.cancelButton);

        this.createButton = new ScreenElementButton(this, this, { x : 0, y: -this.height / 2 + 0.25, width: this.buttonWidth, height: this.buttonHeight });
        this.createButton.setText('Create');
        this.createButton.setOnClickCallback(this.createRealm);
        this.registerElement(this.createButton);

        this.createFromServiceButton = new ScreenElementButton(this, this, { x : this.width / 3, y: -this.height / 2 + 0.25, width: this.buttonWidth, height: this.buttonHeight });
        this.createFromServiceButton.setText('Create From Service');
        this.createFromServiceButton.setOnClickCallback(this.selectFromList);
        this.registerElement(this.createFromServiceButton);

        this.createEphemeralButton = new ScreenElementButton(this, this, { x : this.width / 3, y: -this.height / 2 + 0.1, width: this.buttonWidth, height: this.buttonHeight });
        this.createEphemeralButton.setText('Create Emphemeral');
        this.createEphemeralButton.setOnClickCallback(this.createEphemeral);
        this.registerElement(this.createEphemeralButton);

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
                }
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
            this.data = args.data ? new RealmData(args.data) : RealmData.create()
            this.jsonTree.updateTree(this.data, this.updateData)
        }
        else
        {   
            this.createButton.setText('Update')
            this.createFromServiceButton.setHidden(true) // TODO: turn this into 'manage features' when in update mode
            // when in updating mode, we always want to force to get the latest data
            this.data = this.screenManager.conjure.getWorld().realm.realmData
            this.jsonTree.updateTree(this.data, this.updateData)
        }
    }

    async createRealm()
    {
        if(this.isCreating)
        {
            await this.screenManager.conjure.realms.createRealm(this.data)
            console.log('Successfully made realm!', this.data)
            this.screenManager.hideLastOpenScreen(this.screenManager.screenRealms)
            this.screenManager.conjure.world.joinRealm(this.data)
            this.data = undefined // must reset data
        }
        else
        {
            this.data.timestamp = Date.now()
            await this.screenManager.conjure.realms.updateRealm(new RealmData(this.data))
            this.screenManager.conjure.getWorld().forceReloadCurrentRealm()
        }
    }

    async selectFromList()
    {
        this.screenManager.showScreen(this.screenManager.screenList)
        this.screenManager.screenList.setOnSelectCallback(this.selectedFromList)
        this.screenManager.screenList.setList((await this.screenManager.conjure.getProfile().getServiceManager().getPotentialRealms()).filter(realm => realm.owner), 'name')
    }

    async createEphemeral() {
        const data = RealmData.create()
        data.type = REALM_TYPES.EPHEMERAL
        await this.screenManager.conjure.realms.createRealm(data)
        this.screenManager.hideLastOpenScreen(this.screenManager.screenRealms)
        this.screenManager.conjure.world.joinRealm(data)
        this.data = undefined
    }

    selectedFromList(item)
    {
        if(!this.data) return
        if(!item.owner) return
        this.fromService = true
        this.data = new RealmData(item)
        this.data.whitelist.type = REALM_WHITELIST.SERVICE
        this.jsonTree.setSchema(this.getSchema())
        this.jsonTree.updateTree(this.data, this.updateData)
    }

    updateData()
    {
        
    }

    update(updateArgs)
    {
        super.update(updateArgs)
    }
}