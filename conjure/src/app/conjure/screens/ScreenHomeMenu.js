import ScreenBase from './ScreenBase';
import * as THREE from 'three'
import ScreenElementText from './elements/ScreenElementText'
import { number } from '../util/number'
import { CONJURE_MODE } from '../Conjure';

export default class ScreenHomeMenu extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args)

        this.segments = []
        this.segmentTargets = []
        this.labels = []
        this.expandScale = 1.25;
        this.hoverNumber = 0;
        this.segmentItems = ['Profile', 'Settings', 'Build', 'Explore', 'Realms']

        this.createRing()
    }

    createRing()
    {
        let material = new THREE.MeshBasicMaterial({ color: this.defaultColour3, side: THREE.DoubleSide, transparent: true, opacity: this.defaultOpacity})

        for(let i = 0; i < this.segmentItems.length; i++)
        {
            let segMesh = new THREE.Mesh(new THREE.RingBufferGeometry(0.25, 0.5, 8, 1, 0, 0.9 * Math.PI * 2 / this.segmentItems.length), new THREE.MeshBasicMaterial({ color: this.defaultColour3, side: THREE.DoubleSide, transparent: true, opacity: this.defaultOpacity}))
            let segTarget = new THREE.Mesh(new THREE.RingBufferGeometry(0.25, 0.5 * this.expandScale, 8, 1, 0, 0.9 * Math.PI * 2 / this.segmentItems.length), material)
            segMesh.rotateZ(i * Math.PI * 2 / this.segmentItems.length)
            segTarget.rotateZ(i * Math.PI * 2 / this.segmentItems.length)
            segTarget.visible = false
            this.segments.push(segMesh)
            this.segmentTargets.push(segTarget)
            this.group.add(segMesh)
            this.group.add(segTarget)

            let angle = (i + 0.5) * Math.PI * 2 / this.segmentItems.length
            let point = new THREE.Vector2(Math.cos(angle), Math.sin(angle))
            point.multiplyScalar(0.35)

            let text = new ScreenElementText(this, this, { x: point.x, y: point.y, z: 0.025 })
            text.setText(this.segmentItems[i])
            this.registerElement(text)
            this.labels.push(text)
        }
    }

    clickItem()
    {
        switch(this.hoverNumber)
        {
            case 0: this.screenManager.showScreen(this.screenManager.screenProfile); break;
            case 1: this.screenManager.showScreen(this.screenManager.screenSettings); break;
            case 2: this.screenManager.conjure.setConjureMode(CONJURE_MODE.BUILD); break;
            case 3: this.screenManager.conjure.setConjureMode(CONJURE_MODE.EXPLORE); break;
            case 4: this.screenManager.showScreen(this.screenManager.screenRealms); break;
            default: break;
        }
    }

    showScreen(active)
    {
        super.showScreen(active)
        this.enableButton(2, Boolean(this.world.realm))
    }

    enableButton(number, enable)
    {
        this.segments[number].material.opacity = enable ? this.defaultOpacity : this.defaultOpacity * 0.75
        enable ? this.segmentTargets[number].layers.enable(0) : this.segmentTargets[number].layers.disable(0)
    }

    update(updateArgs)
    {
        super.update(updateArgs)
                
        if(this.segments.length > 0 && this.segments[this.hoverNumber])
            this.segments[this.hoverNumber].scale.set(1,1,1)
        let intersections = updateArgs.mouseRaycaster.intersectObjects(this.segmentTargets, false);
        if(intersections.length)
        {
            let hoverTarget = intersections[0].object
            for(let i in this.segmentTargets)
                if(this.segmentTargets[i] === hoverTarget)
                    this.hoverNumber = number(i)

            this.segments[this.hoverNumber].scale.set(this.expandScale, this.expandScale, this.expandScale)
            if(updateArgs.input.isPressed('MOUSELEFT', true))
                this.clickItem()
        }
        else
            this.hoverNumber = undefined
    }
}