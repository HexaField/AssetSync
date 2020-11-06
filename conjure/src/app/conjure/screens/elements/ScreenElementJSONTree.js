import ScreenElementBase from './ScreenElementBase';
import ScreenElementJSONCollapsible from './ScreenElementJSONCollapsible';
import ScreenElementLabelled from './ScreenElementLabelled';
import ScreenElementText from './ScreenElementText';
import ScreenElementTextBox from './ScreenElementTextBox';
import ScreenElementVector3 from './ScreenElementVector3';
import ScreenElementButton from './ScreenElementButton';
import ScreenElementScroll from './ScreenElementScroll';
import ScreenElementAssetSelector from './ScreenElementAssetSelector';
import ScreenElementScaler from './ScreenElementScaler';

import { ASSET_TYPE } from '../../AssetManager';
import ScreenElementCycleButton from './ScreenElementCycleButton';
import ScreenElementToggleButton from './ScreenElementToggleButton';

export default class ScreenElementJSONTree extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.indent = 0.025;
        this.frameBorder = 0.05;
        this.schema = {}

        this.collapsibleDragCallback = args.collapsibleDragCallback;

        this.refresh = this.onUpdate.bind(this)
        this.updateDisplay = this.updateDisplay.bind(this);
        this.itemSelected = args.itemSelected
        this.itemHover = args.itemHover

        this.scrollPanel = new ScreenElementScroll(this.screen, this, { width: this.width, height: this.height, scrollSide: 'left', onScrollerCallback: this.updateDisplay, nestedElements: true });
        this.scrollPanel.innerWidth = this.scrollPanel.width - (this.indent * 4)
        this.scrollPanel.itemsGap = this.indent;
        this.registerElement(this.scrollPanel)

        this.alwaysUpdate = Boolean(args.alwaysUpdate)
    }
    
    setSchema(schema) // json schema detailing what should be shown
    {
        this.schema = schema;
    }

    onUpdate()
    {
        if(this.onUpdateCallback)
            this.onUpdateCallback()
    }
    
    updateTree(data, onUpdateCallback)
    {
        this.onUpdateCallback = onUpdateCallback;
        this.wipeTree(this.scrollPanel.items);
        this.scrollPanel.removeAllItems();
        // if(!data) return;
        if(this.schema['type'] === 'array' && Array.isArray(data)) // this is an array
            this.makeOfArray(this.scrollPanel, data, this.schema)
        else if(this.schema['type'] === 'json')
            this.makeOfJSON(this.scrollPanel, data, this.schema.items)
        else
            this.makeOfJSON(this.scrollPanel, data, this.schema)
            
        this.updateDisplay();
    }

    //TODO: add schema definitions as enums to reduce ambiguity

    makeOfJSON(parent, json, schema)
    {
        if(!json) return;
        let schemaKeys = Object.keys(schema)
        let width = (parent.innerWidth - (2 * this.indent)) / 2

        for(let schemaKey of schemaKeys)
        {
            let element = undefined;
            switch(schema[schemaKey]['type'])
            {
                case 'json': {
                    this.makeOfJSON(parent, json[schemaKey], schema[schemaKey]['items'])
                } break;

                case 'label': {
                    let label = new ScreenElementText(this.screen, this.scrollPanel, { width: width, height: 0.075, textSettings: { scale: 0.75 } });
                    label.setText(schema[schemaKey].label)
                    parent.addItem(label);
                    this.scrollPanel.registerElement(label)
                } break;

                case 'object': {
                    let obj = json[schema[schemaKey]['object']];
                    if(obj)
                    {
                        let label = new ScreenElementJSONCollapsible(this.screen, this.scrollPanel, { width: width, height: 0.075, tree: this, selectable: true, textSettings: { scale: 0.75 } });
                        label.setOnClickCallback(this.updateDisplay)
                        label.setOnSelectedCallback(this.itemSelected, obj)
                        label.setOnHoverCallback(this.itemHover, obj)
                        label.setText(schema[schemaKey].label);
                        label.setReference(obj);
                        parent.addItem(label);
                        this.scrollPanel.registerElement(label)
                    }
                } break;

                case 'array': {
                    if(Array.isArray(json[schemaKey]) && json[schemaKey].length)
                        this.makeOfArray(parent, json[schemaKey], schema[schemaKey].items === 'root' ? this.schema : schema[schemaKey])
                } break;

                case 'static': {
                    element = new ScreenElementText(this.screen, this.scrollPanel, { width: width, height: 0.075, textSettings: { anchorX: 'left', width: 1, scale: 0.75 } });
                    element.setText(json[schemaKey]);
                } break;

                case 'timestamp': {
                    element = new ScreenElementText(this.screen, this.scrollPanel, { width: width, height: 0.075, textSettings: { anchorX: 'left', width: 1, scale: 0.75 } });
                    element.setText(new Date(json[schemaKey]).toLocaleString());
                } break;

                case 'list': {
                    element = new ScreenElementCycleButton(this.screen, this.scrollPanel, { width: width, height: 0.075, textSettings: { width: 1, scale: 0.75 } });
                    element.setValues(schema[schemaKey].items);
                    element.setValue(json[schemaKey])
                    element.setOnChangeCallback((newValue) => {
                        json[schemaKey] = newValue;
                        this.onUpdate()
                    });
                } break;

                case 'button': {
                    element = new ScreenElementButton(this.screen, this.scrollPanel, { width: width, height: 0.075, textSettings: { width: 1, scale: 0.75 } });
                    element.setText(schema[schemaKey].buttonText)
                    element.setOnClickCallback(schema[schemaKey].callback);
                    element.setDisabled(schema[schemaKey].disable);
                } break;

                case 'bool': {
                    element = new ScreenElementToggleButton(this.screen, this.scrollPanel, { width: width, height: 0.075, textSettings: { width: 1, scale: 0.75 } });
                    element.setValue(json[schemaKey])
                    element.setOnChangeCallback((newValue) => {
                        json[schemaKey] = newValue;
                        this.onUpdate()
                    });
                } break;

                case 'text': {
                    element = new ScreenElementTextBox(this.screen, this.scrollPanel, { width: width, height: 0.075 });
                    element.setText(json[schemaKey]);
                    element.setSubject(json[schemaKey]);
                    element.setOnChangeCallback((newValue) => {
                        json[schemaKey] = newValue;
                        this.onUpdate()
                    });
                    element.setActive(true);
                } break;

                case 'vector3': {
                    element = new ScreenElementVector3(this.screen, this.scrollPanel, { width: width / 2, height: 0.075 });
                    element.setSubject(json[schemaKey]);
                } break;

                case 'scaler': {
                    element = new ScreenElementScaler(this.screen, this.scrollPanel, { width: width, height: 0.075 });
                    element.setValue(json[schemaKey]);
                    element.setDefaultValue(schema[schemaKey].default)
                    element.setOnChangeCallback((newValue) => {
                        json[schemaKey] = newValue;
                        this.onUpdate()
                    });
                } break;

                case 'material': {
                    let hash = this.screen.screenManager.conjure.assetManager.getHashByTypeAndData(
                        ASSET_TYPE.MATERIAL, 
                        json[schemaKey]
                    );
                    let asset = this.screen.screenManager.conjure.assetManager.getByIPFSHash(ASSET_TYPE.MATERIAL, hash);
                    element = new ScreenElementAssetSelector(this.screen, this.scrollPanel, { width: width, height: 0.075, previewScale: 0.075 });
                    element.setAsset(asset);
                    element.setOnClickCallback((newAsset) => {
                        json[schemaKey] = newAsset.data;
                        this.onUpdate()
                    });
                } break;

                case 'geometry': {
                    let hash = this.screen.screenManager.conjure.assetManager.getHashByTypeAndData(
                        ASSET_TYPE.GEOMETRY, 
                        json[schemaKey]
                    );
                    let asset = this.screen.screenManager.conjure.assetManager.getByIPFSHash(ASSET_TYPE.GEOMETRY, hash);
                    element = new ScreenElementAssetSelector(this.screen, this.scrollPanel, { width: width, height: 0.075, previewScale: 0.075 });
                    element.setAsset(asset);
                    element.setOnClickCallback((newAsset) => {
                        json[schemaKey] = newAsset.data;
                        this.onUpdate()
                    });
                } break;
                default:break;
            }
            if(element)
            {
                if(schema[schemaKey].ignoreLabel)
                {
                    parent.addItem(element);
                    this.scrollPanel.registerElement(element)
                }
                else
                {
                    element.group.position.setX((parent.innerWidth / 2 - (2 * this.indent))/2)
                    let label = new ScreenElementLabelled(this.screen, this.scrollPanel, { width: width, height: 0.075, element, ratio:4, updateCallback: this.alwaysUpdate, textSettings: { anchorX:'right', width: 1, scale: 0.75 } });
                    label.setText(schema[schemaKey].label);
                    parent.addItem(label);
                    this.scrollPanel.registerElement(label)
                }
            }
        }
    }

    makeOfArray(parent, array, schema)
    {
        if(!array || !array.length) return;
        array = this.sortArray(array, schema.sort || 'name');
        if(!array || !array.length) return;
        for(let entry of array)
        {
            let label = new ScreenElementJSONCollapsible(this.screen, this.scrollPanel, { width: (parent.innerWidth - (2 * this.indent)) / 2, height: 0.075, tree: this, collapsible: true });
            label.setOnClickCallback(this.updateDisplay)
            label.setOnSelectedCallback(this.itemSelected, entry)
            label.setOnHoverCallback(this.itemHover, entry)
            label.setText(entry[schema['label']]);
            label.setReference(entry);
            parent.addItem(label);
            this.scrollPanel.registerElement(label)
            
            if(typeof entry == 'object')
                this.makeOfJSON(label, entry, schema.items)
        }
    }

    updateDisplay()
    {
        this.hideAll(this.scrollPanel.items);
        this.updateVisible(0, this.scrollPanel.items);
        this.scrollPanel.updateItems();
    }

    hideAll(array)
    {
        for(let item of array)
        {
            item.setHidden(true);
            if(item.items)
                this.hideAll(item.items);
        }
    }

    // use this when collapsing
    updateVisible(indent, array)
    {
        for(let item of array)
        {
            item.setHidden(false);
            item.group.position.set(indent + this.indent, 0, 0);
            if(item.items && !item.uncollapsed)
                this.updateVisible(indent + this.indent, item.items)
        }
    }

    wipeTree(items)
    {
        // TODO: make sure we aren't causing a memory leak by just forgetting about stuff
        for(let item of items)
        {
            this.scrollPanel.group.remove(item.group)
            if(item.items)
                this.wipeTree(item.items)
            
            item.destroy();
        }
        items = [];
    }

    sortArray(items, sortKey)
    {
        if(!items || !items.length) return;
        items.sort(function(a, b) {
            var textA = String(a[sortKey]).toUpperCase();
            var textB = String(b[sortKey]).toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        return items;
    }

    getAllSelectedItems()
    {
        let selectedItems = [];
        for(let item of this.scrollPanel.items)
            if(item.selected)
                selectedItems.push(item)
        return selectedItems;
    }

    getItemByReference(items, referenceToGet)
    {
        for(let item of items)
        {
            if(item.reference === referenceToGet) 
                return item;
            if(item.items)
            {
                let i = this.getItemByReference(item.items, referenceToGet);
                if(i) return i;
            }
        }
        return;
    }

    setActive(active)
    {
        super.setActive(active)
        for(let item of this.scrollPanel.items)
            item.setActive(active)
    }

    updateValue() // hmm...
    {

    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }
}