import * as THREE from 'three'

import HUDGlobal from './hud/HUDGlobal.js'
import HUDExploreMode from './hud/HUDExploreMode.js'
import HUDConjureMode from './hud/HUDConjureMode.js'

import ScreenHomeMenu from './ScreenHomeMenu.js'
// import ScreenRealmSettings from './ScreenRealmSettings.js'
// import ScreenObjectCreate from './ScreenObjectCreate.js'
// import ScreenObjectEdit from './ScreenObjectEdit.js'
// import ScreenObjectsHierarchy from './ScreenObjectsHierarchy.js'
// import ScreenProfile from './ScreenProfile.js'
// import ScreenSettings from './ScreenSettings.js'
// import ScreenRealms from './ScreenRealms.js'
// import ScreenAssets from './ScreenAssets.js'
// import ScreenAssetSelect from './ScreenAssetSelect.js'
// import ScreenTextureEditor from './ScreenTextureEditor.js'
// import ScreenUserInteract from './ScreenUserInteract.js'
// import ScreenUserPay from './ScreenUserPay.js'
// import ScreenServices from './ScreenServices.js'
// import ScreenPayID from './ScreenPayID.js'
// import ScreenFeatures from './ScreenFeatures.js'
import ScreenTextEntry from './ScreenTextEntry.js'
import ScreenList from './ScreenList.js'

export class Screens
{  
    constructor(conjure)
    {
        this.conjure = conjure
        
        this.group = new THREE.Group();

        this.hideLastOpenScreen = this.hideLastOpenScreen.bind(this) // for text entry screen callback

        this.screens = [];
        
        this.openScreens = [];
        this.mouseOver = false;
    }

    createDefaultScreens() {

        this.hudGlobal = new HUDGlobal(this, { name:'Global', width:2, height:1 });
        this.hudExplore = new HUDExploreMode(this, { name:'Explore', width:2, height:1 });
        this.hudConjure = new HUDConjureMode(this, { name:'Conjure', width:2, height:1 });
        this.hudGlobal.showScreen(false)
        this.hudExplore.showScreen(false)
        this.hudConjure.showScreen(false)

        
        this.screenHomeMenu = this.createScreen(new ScreenHomeMenu(this, { name:'Home Menu', width:1, height:1, pauses:true }));
        // this.screenRealmSettings = this.createScreen(new ScreenRealmSettings(this, { name:'Realm Settings', width:1.5, height:1, pauses:true }));
        // this.screenObjectCreate = this.createScreen(new ScreenObjectCreate(this, { name:'Create Object', width:0.8, height:0.4 }));
        // this.screenObjectEdit = this.createScreen(new ScreenObjectEdit(this, { name:'Object Edit', width:0.8, height:1.6, x:0.75, anchor:true }));
        // this.screenObjectsHierarchy = this.createScreen(new ScreenObjectsHierarchy(this, { name:'Objects Hierarchy', width:0.8, height:1.6, x:-0.6, anchor:true }));
        // this.screenSettings = this.createScreen(new ScreenSettings(this, { name:'Settings', width:1.6, height:0.8, pauses:true }));
        // this.screenProfile = this.createScreen(new ScreenProfile(this, { name:'Profile', width:1.6, height:0.8, pauses:true }));
        // this.screenServices = this.createScreen(new ScreenServices(this, { name:'Services', width:1.6, height:0.8, pauses:true }));
        // this.screenRealms = this.createScreen(new ScreenRealms(this, { name:'Realms', width:1.5, height:1.5, pauses:true }));
        // this.screenAssets = this.createScreen(new ScreenAssets(this, { name:'Assets', width:2.4, height:1.0, pauses:true }));
        // this.screenAssetSelect = this.createScreen(new ScreenAssetSelect(this, { name:'Assets Select', width:0.8, height:1.6 }));
        // this.screenTextureEditor = this.createScreen(new ScreenTextureEditor(this, { name:'Edit Texture', width:1.6, height:1.6 }));
        // this.screenUserInteract = this.createScreen(new ScreenUserInteract(this, { name:'User Interact', width:1.5, height:1, pauses:true }));
        // this.screenFeatures = this.createScreen(new ScreenFeatures(this, { name:'Features', width:1.6, height:0.8, pauses:true }));

        this.screenTextEntry = this.createScreen(new ScreenTextEntry(this, { name:'Enter Value', width: 0.8, height: 0.4 }))
        this.screenList = this.createScreen(new ScreenList(this, { name:'Select from list', width: 0.8, height: 1.6 }))

    }

    createScreen(screen)
    {
        this.screens.push(screen)
        screen.showScreen(false);
        return screen;
    }

    getScreenByName(screenName)
    {
        for(let s of this.screens)
            if(s.screenName === screenName)
                return s;
    }

    getScreenOpen(screen)
    {
        if(typeof screen === 'string')
        {
            screen = this.getScreenByName(screen);
            if(!screen) return false;
        }
        for(let s of this.openScreens)
            if(screen === s) 
                return true;
        return false;
    }

    isHudOpen()
    {
        return this.hudExplore.active || this.hudConjure.active
    }

    hideHud()
    {
        this.hudExplore.showScreen(false)
        this.hudConjure.showScreen(false)
    }

    showHud()
    {
        if(this.conjure.conjureMode === CONJURE_MODE.LOADING)
        {
            this.hudExplore.showScreen(false)
            this.hudConjure.showScreen(false)
            return
        }
        this.hideAllScreens()
        if(this.conjure.conjureMode === CONJURE_MODE.EXPLORE)
        {
            this.hudExplore.showScreen(true)
            this.hudConjure.showScreen(false)
        }
        if(this.conjure.conjureMode === CONJURE_MODE.CONJURE)
        {
            this.hudExplore.showScreen(false)
            this.hudConjure.showScreen(true)
        }   
    }

    showScreen(screen, args = {})
    {
        if(!screen) return;
        if(typeof screen === 'string')
        {
            screen = this.getScreenByName(screen);
            if(!screen) return;
        }
        if(this.getScreenOpen(screen)) return;
        if(screen.pauses)
        {
            this.closeAllScreens()
            this.controlsEnabled = false
            this.hideHud();
        }
        if(screen.showScreen(true, args) === 'cancel') // todo: change this to be return true/false instead of cancel
        {
            this.hideScreen(screen, args)
        }
        else
        {
            screen.group.position.z = 0.1 * this.openScreens.length
            this.openScreens.push(screen);
        }
    }

    closeAllScreens()
    {
        for(let screen of this.openScreens)
            screen.showScreen(false);
        this.openScreens = [];
    }

    hideAllScreens()
    {
        this.controlsEnabled = true
        if(this.openScreens.length === 0) return;
        for(let screen of this.openScreens)
            screen.showScreen(false);
        this.openScreens = [];
        this.mouseOver = false;
        this.showHud();
    }

    hideLastOpenScreen()
    {
        if(this.openScreens.length === 0) return;
        this.openScreens[this.openScreens.length - 1].showScreen(false);
        this.openScreens.splice(this.openScreens.length - 1, 1);
        if(this.openScreens.length === 0)
        {
            this.mouseOver = false;
            this.controlsEnabled = true
            this.showHud();
        }
    }
    
    hideScreen(screen, args = {})
    {
        if(typeof screen === 'string')
        {
            screen = this.getScreenByName(screen);
            if(!screen) return;
        }
        if(!screen)
        {
            this.hideAllScreens();
        }
        else
        {
            for(let i = 0; i < this.openScreens.length; i++)
                if(this.openScreens[i] === screen)
                {
                    screen.showScreen(false, args);
                    this.openScreens.splice(i, 1);
                }
        }
        if(this.screens.length === 0)
            this.hideAllScreens();
    }

    update(updateArgs)
    {
        // add custom key listeners to allow this to scale
        // if(updateArgs.input.isPressed('HOME') && !this.conjure.world.getScreensDisabled())
        // {
        //     if(this.openScreens.length === 0)
        //         this.showScreen(this.screenHomeMenu);
        //     else
        //         this.hideLastOpenScreen();
        // }
        // if(updateArgs.input.isPressed('P', true) && !this.conjure.world.getScreensDisabled())
        // {
        //     if(this.openScreens.length === 0 && this.conjure.world.realm)
        //         this.showScreen(this.screenRealmSettings);
        // }
        // this.mouseOver = false;
        // for(let s of this.openScreens)
        // {
        //     if(!s.pauses || s === this.openScreens[this.openScreens.length - 1])
        //         s.update(updateArgs);
        //     if(s.mouseOver)
        //         this.mouseOver = true;
        // }
        // if(this.openScreens.length === 0)
        // {
        //     if(this.conjure.conjureMode === CONJURE_MODE.EXPLORE)
        //         this.hudExplore.update(updateArgs);
        //     if(this.conjure.conjureMode === CONJURE_MODE.CONJURE)
        //         this.hudConjure.update(updateArgs);
        // }
        // this.hudGlobal.update(updateArgs);
    }

    resizeScreens(ratio)
    {
        for(let screen of this.screens)
            screen.resizeScreen(ratio)
        this.hudExplore.resizeScreen(ratio)
        this.hudConjure.resizeScreen(ratio)
        this.hudGlobal.resizeScreen(ratio)
    }
}