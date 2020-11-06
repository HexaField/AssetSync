import * as THREE from 'three'
import ScreenElementButton from './ScreenElementButton';
import HTMLObject from '../../util/HTMLObject'

export default class ScreenElementLoadFile extends ScreenElementButton
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);
        
        this.onLoad = args.onLoad;

        // let input = document.createElement( 'input' );
        // input.id = 'asset-loader';
        // input.type = 'file'
        // input.style.width = ''+(this.width)+'px';
        // input.style.height = ''+(this.height)+'px';
        // input.style.opacity = 0;
        // input.style.background = new THREE.Color(0xffffff); //0x2685ff
        
        // input.addEventListener('change', (event) => {
        //     const fileList = event.target.files;
        //     if(this.onLoad)
        //         this.onLoad(fileList);
        // });
        // this.cssObj = new HTMLObject(screen.screenManager.conjure, this.group, input, { width: this.width, height: this.height, scale: 0.1, resolution: 50 });
        // this.addHTML(this.cssObj)
        // this.cssObj.show(true);
        // this.cssObj.objectCSS.element.focus();
        
        this.setText('Load');
    }

    onClick()
    {
        super.onClick()
        // this.cssObj.objectCSS.element.click();
    }

    setActive(active)
    {
        super.setActive(active)
        // this.cssObj.show(true);
        // this.cssObj.objectCSS.element.focus();
    }
}