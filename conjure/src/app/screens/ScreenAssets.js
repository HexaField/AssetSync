import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementCycleButton from './elements/ScreenElementCycleButton'
import ScreenElementLabelled from './elements/ScreenElementLabelled'
import ScreenElementScroll from './elements/ScreenElementScroll'
import ScreenElementSlider from './elements/ScreenElementSlider'
import ScreenElementText from './elements/ScreenElementText'
import ScreenElementToggleButton from './elements/ScreenElementToggleButton'
import ScreenElementAssetSelector from './elements/ScreenElementAssetSelector'
// import { ASSET_TYPE } from '../AssetManager'
import ScreenElementMesh from './elements/ScreenElementMesh'
import * as THREE from 'three'
import ScreenElementLoadFile from './elements/ScreenElementLoadFile'
import ScreenElementSprite from './elements/ScreenElementSprite'
import ScreenElementTextureEditor from './elements/ScreenElementTextureEditor'
import { number } from '../util/number'
import ScreenElementStructure from './elements/ScreenElementStructure'

const pi = Math.PI;
const tau = pi * 2;

export default class ScreenAssets extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);

        this.onAssetTypeChange = this.onAssetTypeChange.bind(this);
        this.onAssetPresetChange = this.onAssetPresetChange.bind(this);
        this.getDetailsByAsset = this.getDetailsByAsset.bind(this);
        this.onAssetDetailChange = this.onAssetDetailChange.bind(this);
        this.onSaveAsset = this.onSaveAsset.bind(this);

        this.onCreateAsset = this.onCreateAsset.bind(this);
        this.onLoadAsset = this.onLoadAsset.bind(this);
        this.onDestroyAsset = this.onDestroyAsset.bind(this);

        this.currentAsset = undefined;
        this.generateSchemas();

        this.assetPanel = new ScreenElementScroll(this, this, { x: -this.width/2 + 0.4, y: -0.1, width: 0.8, height: this.height - 0.2, scrollSide: 'left' });
        this.registerElement(this.assetPanel)
        this.assetPanel.background.visible = false;

        this.assetTypeButton = new ScreenElementCycleButton(this, this, { x: -this.width/2 + 0.4, y: this.height/2 - 0.1, width: 0.3, height:0.1 });
        this.assetTypeButton.setOnClickCallback(this.onAssetTypeChange, true);
        this.assetTypeButton.setValues(Object.keys(this.schemas));
        this.registerElement(this.assetTypeButton);

        this.createButton = new ScreenElementButton(this, this, { x: -this.width/2 + 0.15, y: -this.height/2 + 0.1, width: 0.2, height: 0.1, text:'Create' });
        this.createButton.setOnClickCallback(this.onCreateAsset);
        this.registerElement(this.createButton);

        this.loadButton = new ScreenElementLoadFile(this, this, { x: -this.width/2 + 0.4, y: -this.height/2 + 0.1, width: 0.2, height: 0.1, text:'Load', onLoad:this.onLoadAsset });
        this.registerElement(this.loadButton);

        this.destroyButton = new ScreenElementButton(this, this, { x: -this.width/2 + 0.65, y: -this.height/2 + 0.1, width: 0.2, height: 0.1, text:'Destroy'});
        this.destroyButton.setOnClickCallback(this.onDestroyAsset);
        this.registerElement(this.destroyButton);

        this.detailsPanel = new ScreenElementScroll(this, this, { y: -0.1, width: 0.8, height: this.height - 0.2, scrollSide: 'left'});
        this.registerElement(this.detailsPanel)
        this.detailsPanel.background.visible = false;

        this.assetPresetButton = new ScreenElementCycleButton(this, this, { y: this.height/2 - 0.1, width: 0.3, height: 0.1 });
        this.assetPresetButton.setOnClickCallback(this.onAssetPresetChange, true);
        this.registerElement(this.assetPresetButton);
        this.assetPresetButton.setHidden(true);

        this.assetSaveButton = new ScreenElementButton(this, this, { x: this.width/2 - 0.4, y: this.height/2 - 0.1, width: 0.3, height: 0.1 });
        this.assetSaveButton.setText('Save')
        this.assetSaveButton.setOnClickCallback(this.onSaveAsset);
        this.registerElement(this.assetSaveButton);
        this.assetSaveButton.setHidden(true);

        this.temporaryGeometry = new THREE.BoxGeometry(1,1);
        this.temporaryMaterial = new THREE.MeshNormalMaterial();
        this.previewMesh = new ScreenElementMesh(this, this, { x: this.width/2 - 0.4, geometry: this.temporaryGeometry, material: this.temporaryMaterial, rotate:true, scale:0.25 })
        this.previewMesh.group.visible = false;
        this.registerElement(this.previewMesh);

        this.previewStructure = new ScreenElementStructure(this, this, { x: this.width/3, rotate:true, scale:0.25 })
        this.previewStructure.group.visible = false;
        this.registerElement(this.previewStructure);

        this.previewImage = new ScreenElementSprite(this, this, { x: this.width/2 - 0.4, width: 0.2, height: 0.2 })
        this.registerElement(this.previewImage);


        this.geometryMappings = new Map([
            ["BoxBufferGeometry", THREE.BoxBufferGeometry],
            ["SphereBufferGeometry", THREE.SphereBufferGeometry],
            ["TetrahedronBufferGeometry", THREE.TetrahedronBufferGeometry],
            ["OctahedronBufferGeometry", THREE.OctahedronBufferGeometry],
            ["IcosahedronBufferGeometry", THREE.IcosahedronBufferGeometry],
            ["DodecahedronBufferGeometry", THREE.DodecahedronBufferGeometry],
            ["CylinderBufferGeometry", THREE.CylinderBufferGeometry],
            ["ConeBufferGeometry", THREE.ConeBufferGeometry],
            // ["LatheBufferGeometry", THREE.LatheBufferGeometry],
            // ["TorusBufferGeometry", THREE.TorusBufferGeometry],
            // ["TorusKnotBufferGeometry", THREE.TorusKnotBufferGeometry],
            // ["TubeBufferGeometry", THREE.TubeBufferGeometry],
            // ["ParametricBufferGeometry", THREE.ParametricBufferGeometry],
            // ["EdgesBufferGeometry", THREE.EdgesGeometry],
            // ["WireframeBufferGeometry", THREE.WireframeGeometry],
            // ["TextBufferGeometry", THREE.TextBufferGeometry],
            ["PlaneBufferGeometry", THREE.PlaneBufferGeometry],
            ["CircleBufferGeometry", THREE.CircleBufferGeometry],
            ["RingBufferGeometry", THREE.RingBufferGeometry]
            // ["ShapeBufferGeometry", THREE.ShapeBufferGeometry]
        ]);

        this.materialMappings = new Map([
            ["MeshBasicMaterial", THREE.MeshBasicMaterial],
            ["MeshDepthMaterial", THREE.MeshDepthMaterial],
            ["MeshLambertMaterial", THREE.MeshLambertMaterial],
            ["MeshMatcapMaterial", THREE.MeshMatcapMaterial],
            ["MeshNormalMaterial", THREE.MeshNormalMaterial],
            // ["MeshPhongMaterial", THREE.MeshPhongMaterial],
            ["MeshPhysicalMaterial", THREE.MeshPhysicalMaterial],
            ["MeshStandardMaterial", THREE.MeshStandardMaterial],
            ["MeshToonMaterial", THREE.MeshToonMaterial]
        ]);

        this.assetList = [];
        this.currentAssetType = ASSET_TYPE.TEXTURE;
        this.getAssetsByType(this.currentAssetType);
    }

    onCreateAsset()
    {

    }

    onLoadAsset(files)
    {
        // https://web.dev/read-files/
        
        for(let file of files)
        {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = event => {
                console.log(file, event);
                let type = undefined;
                if(file.type.indexOf('image') !== -1)
                {
                    type = ASSET_TYPE.TEXTURE;
                }
                if(file.name.endsWith('fbx'))
                    type = 'fbx';
                if(file.name.endsWith('gltf'))
                    type = 'gltf';
                if(type)
                    this.screenManager.conjure.assetManager.createAsset(type, event.target.result, file.name)
                else
                    console.log('Failed to load file as asset: Unsupported file type', file.type)
            };
        }
    }

    onDestroyAsset()
    {
        if(this.screenManager.conjure.assetManager.removeAsset(this.currentAsset))
        {
            this.currentAsset = undefined;
            this.getAssetsByType(this.currentAssetType);
            this.getDetailsByAsset();
            // this.onAssetDetailChange();
        }
    }
    
    onAssetPresetChange()
    {
        this.getDetailsByAsset({ type: this.currentAssetType, preset: this.assetPresetButton.getValue(true) })
    }

    onAssetDetailChange()
    {
        let values = {}
        let isItemSelected = false;
        for(let item of this.assetPanel.items)
        {
            if(item.element.selected)
            {
                isItemSelected = true;
                break;
            }
        }
        if(!isItemSelected)
        {
            this.previewMesh.group.visible = false;
            this.previewImage.group.visible = false;
            return;
        }
        if(this.detailsPanel.items.length === 0)
            return;
        for(let item of this.detailsPanel.items)
        {
            let value = item.getValue()
            if(number(value))
                value = number(value)
            values[item.getText()] = value;
        }
        let preset = this.assetPresetButton.getValue(true)
        switch(this.currentAssetType)
        {
            case ASSET_TYPE.TEXTURE: 
                this.previewImage.setIconTexture(this.currentAsset.data);

                this.previewMesh.group.visible = false;
                this.previewImage.group.visible = true;
                this.previewStructure.group.visible = false;
                break;
            
            case ASSET_TYPE.GEOMETRY: 
                values = Object.values(values);
                this.temporaryGeometry = new (this.geometryMappings.get(preset))(...values);
                this.previewMesh.setGeometry(this.temporaryGeometry);
                this.temporaryAsset = this.temporaryGeometry;

                this.previewMesh.group.visible = true;
                this.previewImage.group.visible = false;
                this.previewStructure.group.visible = false;
                break;
            
            case ASSET_TYPE.MATERIAL: 
                this.temporaryMaterial = new (this.materialMappings.get(preset))(values);
                this.previewMesh.setMaterial(this.temporaryMaterial);
                this.temporaryAsset = this.temporaryMaterial;

                this.previewMesh.group.visible = true;
                this.previewImage.group.visible = false;
                this.previewStructure.group.visible = false;
                break;
            
            case ASSET_TYPE.STRUCTURE:
                this.previewMesh.group.visible = false;
                this.previewImage.group.visible = false;
                this.previewStructure.group.visible = true;
                break;

            default: break;
        }
    }

    getDetailsByAsset(data)
    {
        if(!data)
        {
            this.assetPresetButton.setHidden(true);
            this.assetSaveButton.setHidden(true);
            this.onAssetDetailChange();
            return;
        }
        if(data.element)
        {
            for(let e of this.assetPanel.items)
               e.element.setSelected(false);
            data.element.setSelected(true)
            this.currentAsset = data.asset;
        }
        // TODO: fill in data from asset
        // TODO: create new temp asset upon value changes
        // TODO: add save button to add changes to asset
        let schema = this.schemas[data.type];

        // console.log(data.asset)
        // console.log(this.schemas)
        let keys = Object.keys(schema);
        let found = false;
        let isDefault = true;
        let presetType = '';
        if(data.asset)
        {
            for(let key of keys)
                if(!found && key === String(data.asset.data.type)) {
                    schema = schema[key];
                    isDefault = false;
                    found = true;
                    presetType = key;
                }
            if(!found)
            {
                console.log('ERROR: ScreenAsset: found asset with unsupported type', data.asset.data.type);
                return;
            }
        }
        else if(data.preset)
        {
            for(let key of keys)
                if(!found && key === String(data.preset)) {
                        schema = schema[key];
                        found = true;
                        presetType = key;
                    }
            if(!found)
            {
                console.log('ERROR: ScreenAsset: found asset with unsupported type', data.preset);
                return;
            }
        }
        let assetData = undefined;
        if(!isDefault)
        {
            assetData = data.asset.data;
            if(data.asset.data.parameters)
                assetData = data.asset.data.parameters;
        }
        this.detailsPanel.removeAllItems();
        for (let schemaKey in schema)
        {
            let editable = undefined;
            if(schema[schemaKey] === '0' || schema[schemaKey] === '1') // if option is bool rather than range
            {
                editable = new ScreenElementToggleButton(this, this.detailsPanel, { width: 0.4, height: 0.1 });
                editable.setOnClickCallback(this.onAssetDetailChange, editable);
                editable.setValue(isDefault ? schema[schemaKey] : assetData[schemaKey]);
            }
            else if(schema[schemaKey] === 'static')
            {
                editable = new ScreenElementText(this, this.detailsPanel, { width: 0.4, height: 0.1, anchorX: 'left', width: 1, fontScale: 0.5 });
                editable.setText(assetData[schemaKey]);
            }
            else if(schema[schemaKey] === 'texture') // if this is a texture
            {
                let hash = this.screenManager.conjure.assetManager.defaultTextureAssetHash;
                if(!isDefault && assetData[schemaKey])
                    hash = this.screenManager.conjure.assetManager.getHashByTypeAndData(ASSET_TYPE.TEXTURE, assetData[schemaKey]);
                // console
                let asset = this.screenManager.conjure.assetManager.getByIPFSHash(ASSET_TYPE.TEXTURE, hash);
                editable = new ScreenElementAssetSelector(this, this.detailsPanel, { width: 0.4, height: 0.1, previewScale: 0.1 });
                editable.setOnClickCallback(this.onAssetDetailChange, editable);
                editable.setAsset(asset);
            }
            else if(schema[schemaKey] === 'image') // if this is an image
            {
                editable = new ScreenElementTextureEditor(this, this.detailsPanel, { width: 0.4, height: 0.1, previewScale: 0.1 });
                editable.setOnClickCallback(this.onAssetDetailChange, editable);
                editable.setAsset(data.asset);
            }
            else if(schema[schemaKey][0] === 2) // if this is a list
            {
                editable = new ScreenElementCycleButton(this, this.detailsPanel, { width: 0.4, height: 0.1 });
                editable.setOnClickCallback(this.onAssetDetailChange, editable);
                editable.setValues(schema[schemaKey][1], isDefault ? schema[schemaKey][2] : assetData[schemaKey]);
            }
            else if(schema[schemaKey][0] === 3) // if this is a colour
            {
                // change this to col
                // editable = new ScreenElementSlider(this, this.detailsPanel, { width: 0.4, height: 0.1 });
                // editable.setOnClickCallback(this.onAssetDetailChange, editable);
                // editable.setValues([1, 0, 255, 255]);
            }
            else
            {
                let params = schema[schemaKey];
                if(!isDefault)
                    params[3] = assetData[schemaKey]
                editable = new ScreenElementSlider(this, this.detailsPanel, { width: 0.4, height: 0.1 });
                editable.setOnClickCallback(this.onAssetDetailChange, editable);
                editable.setValues(params);
            }
            if(editable)
            {
                const label = new ScreenElementLabelled(this, this.detailsPanel, { width: 0.4, height: 0.1, element: editable });
                label.setText(schemaKey);
                this.detailsPanel.registerItem(label);
            }
        }
        this.detailsPanel.updateItems(0)
        this.assetPresetButton.setHidden(false)

        if(this.detailsPanel.items.length > 0 && this.assetPanel.items.length > 0 && this.schemas[data.type] && Object.keys(this.schemas[data.type]).length > 1)
        {
            this.assetPresetButton.setValue(presetType)
            this.assetPresetButton.setHidden(false);
            this.assetSaveButton.setHidden(false);
        }
        else
        {
            this.assetPresetButton.setHidden(true);
            this.assetSaveButton.setHidden(true);
        }
        this.onAssetDetailChange();
    }

    generateSchemas()
    {
        this.schemas = []
        let assetTypes = Object.values(ASSET_TYPE);
        for(let assetType of assetTypes)
            switch(assetType)
            {
                case ASSET_TYPE.TEXTURE: this.schemas[assetType] = this.getTextureSchema(); break;
                case ASSET_TYPE.MATERIAL: this.schemas[assetType] = this.getMaterialSchema(); break; 
                case ASSET_TYPE.GEOMETRY: this.schemas[assetType] = this.getGeometrySchema(); break; 
                case ASSET_TYPE.STRUCTURE: this.schemas[assetType] = this.getStructureSchema(); break; 
                default:break; 
            }
    }

    onAssetTypeChange(assetType)
    {
        this.currentAssetType = assetType;
        this.getAssetsByType(assetType)
        // TODO add other panels and update them
        this.detailsPanel.removeAllItems();
        this.assetPresetButton.setHidden(true);
        this.assetSaveButton.setHidden(true);
        this.onAssetDetailChange();
    }

    getAssetsByType(assetType)
    {
        for(let button of this.assetList)
            this.assetPanel.removeItem(button)
        this.assetList = [];
        let assets = this.screenManager.conjure.assetManager.getAllOfTypeByLastUsed(assetType)
        if(assets)
        for(let asset of assets)
        {
            const assetButton = new ScreenElementButton(this, this.assetPanel, { width: 0.4, height: 0.1 });
            assetButton.setText(asset.name)
            assetButton.setOnClickCallback(this.getDetailsByAsset, {asset:asset, type:assetType, element:assetButton});
            const previewLabel = new ScreenElementLabelled(this, this.assetPanel, { x: 0.05, z: 0.1, width: 0.4, height: 0.1, element: assetButton });
            previewLabel.setText('');
            switch(assetType)
            {
                case ASSET_TYPE.TEXTURE:
                    previewLabel.setIconFromTexture(asset.data)
                    previewLabel.setIconSize(0.1);
                    previewLabel.icon.group.position.set(-0.2, 0, 0)
                    break;
                case ASSET_TYPE.MATERIAL:
                    previewLabel.registerElement(new ScreenElementMesh(this, previewLabel, { x:-0.2, geometry: this.screenManager.conjure.assetManager.defaultGeometry, material: asset.data, rotate:true, scale:0.075 }))
                    break;
                case ASSET_TYPE.GEOMETRY:
                    previewLabel.registerElement(new ScreenElementMesh(this, previewLabel, { x: -0.2, geometry: asset.data, material: this.screenManager.conjure.assetManager.normalMaterial, rotate:true, scale:0.075 }))
                    break;
                case ASSET_TYPE.STRUCTURE:
                    previewLabel.registerElement(new ScreenElementStructure(this, previewLabel, { x: -0.2, structure: asset.data, rotate:true, scale:0.075 }))
                    this.previewStructure.structure = asset.data;
                    break;
                default:break;
            }
            this.assetPanel.registerItem(previewLabel);
            this.assetList.push(previewLabel)
        }
        this.assetPanel.updateItems(0)

        if(this.assetPanel.items.length > 0 && this.schemas[assetType] && Object.keys(this.schemas[assetType]).length > 1)
        {
            this.assetPresetButton.setValues(Object.keys(this.schemas[assetType]))
            this.assetPresetButton.setHidden(false);
            this.assetSaveButton.setHidden(false);
        }
        else
        {
            this.assetPresetButton.setHidden(true);
            this.assetSaveButton.setHidden(true);
        }
    }

    async onSaveAsset()
    {
        if(!this.currentAsset) return;
        await this.screenManager.conjure.assetManager.saveAsset(this.currentAssetType, this.temporaryAsset.uuid, this.temporaryAsset)
    }

    updateAssets()
    {
        if(!this.active) return;
        this.getAssetsByType(this.currentAssetType);
        this.onAssetDetailChange();
    }

    showScreen(active)
    {
        super.showScreen(active);
        this.getAssetsByType(this.currentAssetType)
        this.onAssetDetailChange();
    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }

    getGeometrySchema()
    {
        return {
            "BoxBufferGeometry": {"width": [0, 0.01, 2, 1], "height": [0, 0.01, 2, 1], "depth": [0, 0.01, 2, 1], "widthSegments": [1, 1, 16, 1], "heightSegments": [1, 1, 16, 1], "depthSegments": [1, 1, 16, 1]},
            "SphereBufferGeometry": {"radius": [0, 0, 2, 1], "widthSegments": [1, 3, 32, 8], "heightSegments": [1, 2, 32, 8], "phiStart": [0, 0, 6, 0], "phiLength": [0, 0, tau, tau], "thetaStart": [0, 0, 6, 0], "thetaLength": [0, 0, pi, pi]},
            "TetrahedronBufferGeometry": {"radius": [0, 0, 2, 1], "detail": [1, 0, 5, 0]},
            "OctahedronBufferGeometry": {"radius": [0, 0, 2, 1], "detail": [1, 0, 5, 0]},
            "IcosahedronBufferGeometry": {"radius": [0, 0, 2, 1], "detail": [1, 0, 5, 0]},
            "DodecahedronBufferGeometry": {"radius": [0, 0, 2, 1], "detail": [1, 0, 5, 0]},
            "CylinderBufferGeometry": {"radiusTop": [0, 0, 2, 1], "radiusBottom": [0, 0, 2, 1], "height": [0, 0.001, 2, 1], "radialSegments": [1, 3, 64, 8], "heightSegments": [1, 1, 64, 1], "openEnded": '0', "thetaStart": [0, 0, tau, 0], "thetaLength": [0, 0, tau, tau]},
            "ConeBufferGeometry": {"radius": [0, 0.001, 4, 1], "height": [0, 0.001, 4, 1], "radialSegments": [1, 3, 64, 8], "heightSegments": [1, 1, 64, 1], "openEnded": [-1, 1], "thetaStart": [0, 0, tau, 0], "thetaLength": [0, 0, tau, tau]},
            // "Lathe": {},
            // "TorusKnotBufferGeometry": {}, 
            // "Knot": {},
            // "Tube": {},
            // "Parametric": {},
            // "Edges": {},
            // "Wireframe": {},
            // "Text": {},
            "PlaneBufferGeometry": {"width": [0, 0.01, 2, 1], "height": [0, 0.01, 2, 1], "widthSegments": [1, 1, 32, 1], "heightSegments": [1, 1, 32, 1]},
            "CircleBufferGeometry": {"radius": [0, 0.001, 4, 1], "segments": [1, 3, 128, 8], "thetaStart": [0, 0, tau, 0], "thetaLength": [0, 0, tau, tau]},
            "RingBufferGeometry": {"innerRadius": [0, 0.001, 2, 1], "outerRadius": [0, 0.001, 2, 1], "thetaSegments": [1, 3, 32, 8], "phiSegments": [1, 1, 32, 1], "thetaStart": [0, 0, tau, 0], "thetaLength": [0, 0, tau, tau]},
            // "Shape":{}
        }
    }

    getMaterialSchema()
    {
        let schema = { 
            "MeshBasicMaterial": {"color": [3], "wireframe": '0', "vertexColors": '0', "map": 'texture'},
            "MeshDepthMaterial": {"wireframe": '0'},
            "MeshLambertMaterial": {"color": [3], "emissive": [3], "wireframe": '0', "vertexColors": '0'},
            "MeshMatcapMaterial": {"color": [3], "map": 'texture', "matcap": 'texture', "alphaMap": 'texture', "normalMap": 'texture'},
            "MeshNormalMaterial": {"flatShading": '0', "wireframe": '0'}, 
            // "Phong": {"color": [3], "emissive": [3], "specular": [3], "wireframe": '0', "flatshading": '0', "vertexColors": '0', "map": 'texture', "alphaMap": 'texture'},
            "MeshPhysicalMaterial": {"color": [3], "emissive": [3], "roughness": [0,0,1,1], "metalness": [0,0,1,0], "reflectivity": [0,0,1,0.5], "clearcoat": [0,0,1,0], "ccRoughness": [0,0,1,0], "wireframe": '0', "flatshading": '0', "vertexColors": '0', "map": 'texture', "roughnessMap": 'texture', "alphaMap": 'texture'},
            "MeshStandardMaterial": {"color": [3], "emissive": [3], "roughness": [0,0,1,1], "metalness": [0,0,1,0], "wireframe": '0', "flatshading": '0', "vertexColors": '0', "map": 'texture', "roughnessMap": 'texture', "alphaMap": 'texture'},
            "MeshToonMaterial": {"color": [3], "map": 'texture', "gradientMap": 'texture', "alphaMap": 'texture'}
        }
        let schemaKeys = Object.keys(schema);
        let common = this.getMaterialCommonSchema();
        for(let schemaKey of schemaKeys)
        {
            schema[schemaKey] = {...schema[schemaKey], ...common}
        }
        return schema;
    }

    getMaterialCommonSchema()
    {
        return {
            "transparent": '0', 
            "opacity": [0, 0, 1, 1], 
            "depthTest": '1', 
            "depthWrite": '1', 
            "alphaTest": [0, 0, 1, 1], 
            "side": [2, ['Front', 'Back', 'Double'], 0]
        }
    }

    getTextureSchema()
    {
        return {
            1009: {
                "image": 'image',
                // "uuid": 'static',
            },
        }
    }

    getStructureSchema()
    {
        return {
            "Group": '',
            "Mesh": '',
        }
    }
}