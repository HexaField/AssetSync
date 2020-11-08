import * as THREE from 'three'
import { CONJURE_MODE } from '../Conjure'

import HUDGlobal from './hud/HUDGlobal'
import HUDExploreMode from './hud/HUDExploreMode'
import HUDConjureMode from './hud/HUDConjureMode'

import ScreenHomeMenu from './ScreenHomeMenu'
import ScreenRealmSettings from './ScreenRealmSettings'
import ScreenObjectCreate from './ScreenObjectCreate'
import ScreenObjectEdit from './ScreenObjectEdit'
import ScreenObjectsHierarchy from './ScreenObjectsHierarchy'
import ScreenProfile from './ScreenProfile'
import ScreenSettings from './ScreenSettings'
import ScreenRealms from './ScreenRealms'
import ScreenAssets from './ScreenAssets'
import ScreenAssetSelect from './ScreenAssetSelect'
import ScreenTextureEditor from './ScreenTextureEditor'
import ScreenUserInteract from './ScreenUserInteract'
import ScreenUserPay from './ScreenUserPay'
import ScreenServices from './ScreenServices'
import ScreenPayID from './ScreenPayID'
import ScreenTextEntry from './ScreenTextEntry'
import ScreenFeatures from './ScreenFeatures'
import ScreenList from './ScreenList'

export default class ScreenManager
{  
    constructor(conjure)
    {
        this.conjure = conjure;
        this.domElement = conjure.renderer.domElement;
        this.world = conjure.getWorld();
        this.camera = conjure.camera;
        
        this.group = new THREE.Group();
        this.conjure.scene.add(this.group);

        this.hideLastOpenScreen = this.hideLastOpenScreen.bind(this) // for text entry screen callback

        // TODO: rename this to explore mode HUD and add conjure mode HUD
        this.hudGlobal = new HUDGlobal(this, { name:'Global', width: 2.75, height:1 });
        this.hudExplore = new HUDExploreMode(this, { name:'Explore', width: 2.75, height:1 });
        this.hudConjure = new HUDConjureMode(this, { name:'Conjure', width: 2.75, height:1 });
        this.hudGlobal.showScreen(false)
        this.hudExplore.showScreen(false)
        this.hudConjure.showScreen(false)

        this.screens = [];
        
        this.screenHomeMenu = this.createScreen(new ScreenHomeMenu(this, { name:'Home Menu', width:1, height:1, pauses:true }));
        this.screenRealmSettings = this.createScreen(new ScreenRealmSettings(this, { name:'Realm Settings', width:1.5, height:1, pauses:true }));
        this.screenObjectCreate = this.createScreen(new ScreenObjectCreate(this, { name:'Create Object', width:0.8, height:0.4 }));
        this.screenObjectEdit = this.createScreen(new ScreenObjectEdit(this, { name:'Object Edit', width:0.8, height:1.6, x:0.75, anchor:true }));
        this.screenObjectsHierarchy = this.createScreen(new ScreenObjectsHierarchy(this, { name:'Objects Hierarchy', width:0.8, height:1.6, x:-0.6, anchor:true }));
        this.screenSettings = this.createScreen(new ScreenSettings(this, { name:'Settings', width:1.6, height:0.8, pauses:true }));
        this.screenProfile = this.createScreen(new ScreenProfile(this, { name:'Profile', width:1.6, height:0.8, pauses:true }));
        this.screenServices = this.createScreen(new ScreenServices(this, { name:'Services', width:1.6, height:0.8, pauses:true }));
        this.screenRealms = this.createScreen(new ScreenRealms(this, { name:'Realms', width:1.5, height:1.5, pauses:true }));
        this.screenAssets = this.createScreen(new ScreenAssets(this, { name:'Assets', width:2.4, height:1.0, pauses:true }));
        this.screenAssetSelect = this.createScreen(new ScreenAssetSelect(this, { name:'Assets Select', width:0.8, height:1.6 }));
        this.screenTextureEditor = this.createScreen(new ScreenTextureEditor(this, { name:'Edit Texture', width:1.6, height:1.6 }));
        this.screenUserInteract = this.createScreen(new ScreenUserInteract(this, { name:'User Interact', width:1.5, height:1, pauses:true }));
        this.screenFeatures = this.createScreen(new ScreenFeatures(this, { name:'Features', width:1.6, height:0.8, pauses:true }));

        if(this.conjure.getProfile().getServiceManager().getService('PayID'))
        {
            this.screenUserPay = this.createScreen(new ScreenUserPay(this, { name:'Pay User', width:1.5, height:0.6, pauses:true }))
            this.screenPayID = this.createScreen(new ScreenPayID(this, { name:'PayID', width:2.8, height:1.2, pauses:true }));
        }
        
        this.screenTextEntry = this.createScreen(new ScreenTextEntry(this, { name:'Enter Value', width: 0.8, height: 0.4 }))
        this.screenList = this.createScreen(new ScreenList(this, { name:'Select from list', width: 0.8, height: 1.6 }))

        this.openScreens = [];
        this.mouseOver = false;
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
        if(updateArgs.input.isPressed('HOME') && !this.conjure.getWorld().getScreensDisabled())
        {
            if(this.openScreens.length === 0)
                this.showScreen(this.screenHomeMenu);
            else
                this.hideLastOpenScreen();
        }
        if(updateArgs.input.isPressed('P', true) && !this.conjure.getWorld().getScreensDisabled())
        {
            if(this.openScreens.length === 0 && this.conjure.getWorld().realm)
                this.showScreen(this.screenRealmSettings);
        }
        this.mouseOver = false;
        for(let s of this.openScreens)
        {
            if(!s.pauses || s === this.openScreens[this.openScreens.length - 1])
                s.update(updateArgs);
            if(s.mouseOver)
                this.mouseOver = true;
        }
        if(this.openScreens.length === 0)
        {
            if(this.conjure.conjureMode === CONJURE_MODE.EXPLORE)
                this.hudExplore.update(updateArgs);
            if(this.conjure.conjureMode === CONJURE_MODE.CONJURE)
                this.hudConjure.update(updateArgs);
        }
        this.hudGlobal.update(updateArgs);
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