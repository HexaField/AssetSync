import * as THREE from 'three'
import ScreenBase from './ScreenBase';
import { easyPlane } from '../util/MeshTemplates'
import HTMLObject from '../util/HTMLObject';

export default class ScreenTextureEditor extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);

        this.onFinished = this.onFinished.bind(this);
        
        this.drawStartPos = new THREE.Vector2();
        this.pos = new THREE.Vector2();
        
        this.resolution = 1000;
/*
        this.drawingCanvas = document.getElementById('drawing-canvas');
        this.drawingContext = this.drawingCanvas.getContext('2d');
        // this.drawingCanvas.style.width = ''+(this.width*this.resolution)+'px';
        // this.drawingCanvas.style.height = ''+(this.height*this.resolution)+'px';
        this.drawingContext.fillStyle = '#FFFFFF';
        this.drawingContext.fillRect(0, 0, this.width*this.resolution, this.height*this.resolution);
        // this.drawingCanvas.style.opacity = 1;
        // this.drawingCanvas.style.background = new THREE.Color(0xffffff); //0x2685ff
        this.cssObj = new HTMLObject(this.screenManager.conjure, this.group, this.drawingCanvas, { width: 128 / this.resolution, height: 128 / this.resolution, scale: 0.1, resolution: this.resolution });
        // this.cssObj.objectCSS.element.addEventListener("blur", ()=>{ this.edit(false); }, true);
        this.addHTML(this.cssObj)

        this.texture = new THREE.CanvasTexture(this.drawingCanvas);

        this.textureRender = easyPlane({ width: this.width, height: this.height, }, { color: 0xffffff })
        this.group.add(this.textureRender);
        this.textureRender.material.map = this.texture;*/
    }

    draw()
    {
        console.log(this.pos)
        this.drawingContext.moveTo( this.drawStartPos.x, this.drawStartPos.y );
        this.drawingContext.strokeStyle = '#000000';
        this.drawingContext.lineTo( this.pos.x, this.pos.y );
        this.drawingContext.stroke();
        // reset drawing start position to current position.
        this.drawStartPos.set( this.pos.x, this.pos.y );
        // need to flag the map as needing updating.
        this.texture.needsUpdate = true;

    }

    setOnSelectCallback(callback)
    {
        this.onSelectCallback = callback;
    }

    setAsset(asset)
    {
        console.log(asset)
    }

    onFinished()
    {

        if(this.onSelectCallback)
            this.onSelectCallback(this.texture)
    }

    updateAssets()
    {
        if(!this.active) return;
        this.getAssetsByType(this.currentAssetType);
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        let intersections = updateArgs.mouseRaycaster.intersectObject(this.background, false);
        if(intersections.length > 0)
        {
            if(updateArgs.input.isPressed('MOUSELEFT', true))
            {
                
            }
            if(updateArgs.input.isDown('MOUSELEFT', true))
            {
                this.draw();
            }
            if(updateArgs.input.isReleased('MOUSELEFT', true))
            {

            }
        }
    }
}