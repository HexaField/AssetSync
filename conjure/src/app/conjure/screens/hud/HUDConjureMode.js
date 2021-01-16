import ScreenBase from '../ScreenBase';
import ScreenElementButton from '../elements/ScreenElementButton';
import { CONJURE_MODE } from '../../Conjure';
import * as THREE from 'three'

export default class HUDExploreMode extends ScreenBase {
    constructor(screenManager, args) {
        super(screenManager, args)

        this.screenTitle.mesh.visible = false

        this.tabs = {
            Exit: () => { this.screenManager.conjure.setConjureMode(CONJURE_MODE.EXPLORE) },
            Assets: () => { this.screenManager.showScreen(this.screenManager.screenAssets) },
            Create: () => { this.screenManager.showScreen(this.screenManager.screenObjectCreate) },
            // Fly: this.screenManager.conjure.world.objectControls.toggleConjureControls(),
            Settings: () => { this.screenManager.showScreen(this.screenManager.screenRealmSettings) },
        }

        this.tabKeys = Object.keys(this.tabs)

        this.tabHeight = 0.5 / this.tabKeys.length // this makes it so all the tabs fit in the same space vertically
        let y = 0.5 // start at one quarter from the top (-1 is bottom, 0 is center, 1 is top)

        for (let tab of this.tabKeys) {
            let button = new ScreenElementButton(this, this, { x: -0.95, y: y, width: 0.1, height: this.tabHeight, text: tab, anchor: true })
            button.setOnClickCallback(this.tabs[tab])
            this.registerElement(button)
            y -= this.tabHeight * 2
        }

        // remove button
        this.objectButtonRemove = new ScreenElementButton(this, this, { x: -0.05, y: -0.9, width: 0.1, height: 0.1, text: '', anchor: true })
        this.objectButtonRemove.button.material.visible = false
        this.objectButtonRemove.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.01, 0.1), new THREE.MeshBasicMaterial({ color: 0xff0000 })).rotateZ(-Math.PI / 3))
        this.objectButtonRemove.group.add(new THREE.Mesh(new THREE.RingBufferGeometry(0.04, 0.05, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 })))
        this.objectButtonRemove.setOnClickCallback(() => { 
            const obj = this.screenManager.conjure.world.objectControls.getSelectedObject()
            if(obj) {
                this.screenManager.conjure.world.realm.destroyObject(obj)
            }
        })
        this.objectButtonRemove.onMouseOver = () => {
            this.objectButtonRemove.group.scale.set(1, 1, 1)
        }
        this.objectButtonRemove.onMouseOut = () => {
            this.objectButtonRemove.group.scale.set(0.75, 0.75, 0.75)
        }
        this.registerElement(this.objectButtonRemove)
        
        // edit button
        this.objectButtonEdit = new ScreenElementButton(this, this, { x: 0.05, y: -0.9, width: 0.1, height: 0.1, text: '', anchor: true })
        this.objectButtonEdit.button.material.visible = false
        
        // middle 3 lines
        this.objectButtonEdit.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.06, 0.005), new THREE.MeshBasicMaterial({ color: 0x00ff00 })).translateY(0.02))
        this.objectButtonEdit.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.06, 0.005), new THREE.MeshBasicMaterial({ color: 0x00ff00 })))
        this.objectButtonEdit.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.06, 0.005), new THREE.MeshBasicMaterial({ color: 0x00ff00 })).translateY(-0.02))

        // outside lines
        this.objectButtonEdit.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.1, 0.01), new THREE.MeshBasicMaterial({ color: 0x00ff00 })).translateY(0.05))
        this.objectButtonEdit.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.1, 0.01), new THREE.MeshBasicMaterial({ color: 0x00ff00 })).translateY(-0.05))
        this.objectButtonEdit.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.01, 0.1), new THREE.MeshBasicMaterial({ color: 0x00ff00 })).translateX(0.05))
        this.objectButtonEdit.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.01, 0.1), new THREE.MeshBasicMaterial({ color: 0x00ff00 })).translateX(-0.05))
        this.objectButtonEdit.setOnClickCallback(() => {
            const obj = this.screenManager.conjure.world.objectControls.getSelectedObject()
            if(obj) {
                this.screenManager.showScreen(this.screenManager.screenObjectEdit)
                this.screenManager.screenObjectEdit.setObject(obj)
            }
        })
        this.objectButtonEdit.onMouseOver = () => {
            this.objectButtonEdit.group.scale.set(1, 1, 1)
        }
        this.objectButtonEdit.onMouseOut = () => {
            this.objectButtonEdit.group.scale.set(0.75, 0.75, 0.75)
        }
        this.registerElement(this.objectButtonEdit)

        // edit button
        // this.objectButtonDone = new ScreenElementButton(this, this, { x: 0.15, width: 0.1, height: 0.1, text: '' })
        // this.objectButtonDone.button.material.visible = false

        // this.objectButtonDone.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.01, 0.075), new THREE.MeshBasicMaterial({ color: 0x0000ff })).rotateZ(Math.PI * 0.8).translateY(-0.01))
        // this.objectButtonDone.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.01, 0.05), new THREE.MeshBasicMaterial({ color: 0x0000ff })).rotateZ(Math.PI * 0.25).translateX(-0.01))

        // this.objectButtonDone.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.1, 0.01), new THREE.MeshBasicMaterial({ color: 0x0000ff })).translateY(0.05))
        // this.objectButtonDone.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.1, 0.01), new THREE.MeshBasicMaterial({ color: 0x0000ff })).translateY(-0.05))
        // this.objectButtonDone.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.01, 0.1), new THREE.MeshBasicMaterial({ color: 0x0000ff })).translateX(0.05))
        // this.objectButtonDone.group.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.01, 0.1), new THREE.MeshBasicMaterial({ color: 0x0000ff })).translateX(-0.05))
        // this.objectButtonDone.setOnClickCallback(this.removeObject)
        // this.registerElement(this.objectButtonDone)
        this.screenManager.conjure.world.objectControls.on('selected', (obj) => {
            this.showIcons(obj !== undefined)
        })
    }

    showIcons(show) {
        this.objectButtonRemove.setDisabled(!show)
        this.objectButtonRemove.group.visible = show
        this.objectButtonEdit.setDisabled(!show)
        this.objectButtonEdit.group.visible = show
    }

    showScreen(active) {
        super.showScreen(active)
        this.showIcons(this.screenManager.conjure.world.objectControls.getSelectedObject() !== undefined)
    }

    update(updateArgs) {
        super.update(updateArgs)
    }
}