import * as THREE from 'three'
import { easyPlane } from '../../util/MeshTemplates'
import TextRenderer3D from '../text/TextRenderer3D'
import ScreenElementBase from './ScreenElementBase';
import ScreenElementButton from './ScreenElementButton';

export default class ScreenElementPage extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.frameBorder = 0.1;

        this.plane = new THREE.Plane();
        this.worldPosition = new THREE.Vector3();
        this.intersection = new THREE.Vector3();
        
        this.background = easyPlane({ width: this.width, height: this.height }, { color: 0x2685ff});
        this.background.material.transparent = true;
        this.background.material.opacity = 0.5;
        this.group.add(this.background);
        
        this.changePage = this.changePage.bind(this);
        this.currentPage = 0;

        this.lastPageButton = new ScreenElementButton(screen, this, { x: -0.18, y: -this.height/2+this.frameBorder+0.05, z: 0.1, width: 0.25, height: 0.15 });
        this.lastPageButton.setOnClickCallback(this.changePage, -1);
        this.lastPageButton.setText('Last');
        this.registerElement(this.lastPageButton);

        //sceneCSS, parent, string, colour, width, height, scale, editable
        this.currentPageText = new TextRenderer3D(screen.screenManager.conjure, this.group, { text: ''+this.currentPage, scale: 0.75 });
        this.currentPageText.group.position.setY(-height/2+this.frameBorder+0.05);
        this.currentPageText.group.position.setZ(0.2);

        this.nextPageButton = new ScreenElementButton(screen, this, { x: 0.18, y: -this.height/2 + this.frameBorder + 0.05, z: 0.1, width: 0.25, height: 0.15 });
        this.nextPageButton.setOnClickCallback(this.changePage, +1);
        this.nextPageButton.setText('Next');
        this.registerElement(this.nextPageButton);
        
        this.currentPage = 0;
        this.iterator = 0;
        this.verticalFit = 3;
        this.pageElements = [];

        // this.setActive(false);

        // this.elementsToShow = 0; // list of bools
    }

    registerItem(element)
    {   
        element.group.position.y = (this.height / 2) - 0.15 - 0.3 * this.iterator;
        this.iterator++;
        
        this.pageElements.push(element);
        // this.registerElement(element);

        element.setHTMLActive(false);
        element.setActive(false);
        
        if(this.iterator >= this.verticalFit)
            this.iterator = 0;
    }

    setActive(active)
    {
        super.setActive(active);
        // if(!active)
        for(let i = 0; i < this.pageElements.length; i++)
        {
            this.pageElements[i].setHTMLActive(false);
            this.pageElements[i].setActive(false);
        }
        this.changePage(0);
    }


    changePage(delta)
    {
        if(this.pageElements.length === 0) return;
        for(let i = 0; i < this.verticalFit; i++)
        {
            if(this.pageElements[i+(this.verticalFit*this.currentPage)])
            {
                this.pageElements[i+(this.verticalFit*this.currentPage)].setActive(false)
            }
        }
        if(!this.active) return;
        this.currentPage += delta;
        for(let i = 0; i < this.verticalFit; i++)
        {
            if(this.pageElements[i+(this.verticalFit*this.currentPage)])
            {
                this.pageElements[i+(this.verticalFit*this.currentPage)].setActive(true)
            }
        }
        
        if(this.currentPage === 0)
            this.lastPageButton.setDisabled(true);
        else if(this.lastPageButton.disabled)
            this.lastPageButton.setDisabled(false);
        
        if(this.currentPage >= Math.floor((this.pageElements.length - 1) / this.verticalFit))
            this.nextPageButton.setDisabled(true);
        else if(this.nextPageButton.disabled)
            this.nextPageButton.setDisabled(false);
        
        // if(this.currentPage > Math.floor((this.elements.length) / this.verticalFit))
        //     this.changePage(-1);

        this.currentPageText.setText(this.currentPage+1);
        
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        for(let i = 0; i < this.pageElements.length; i++)
        {
            this.pageElements[i].update(updateArgs);
        }
    }
}