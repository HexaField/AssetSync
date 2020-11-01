import * as THREE from 'three'
import ThreeEditableText from 'three-typeable-text'

export default class LoadingScreen {
    constructor(fonts) {
        this.fonts = fonts
        this.passcodeLoseFocus = this.passcodeLoseFocus.bind(this)
        this.active = false
        this.passcodeCallback = undefined
    }

    init(sceneController, proxy) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: proxy.canvas })
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setPixelRatio(proxy.devicePixelRatio);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        sceneController.registerRenderer(this.renderer)

        this.camera = new THREE.PerspectiveCamera(80, proxy.innerWidth / proxy.innerHeight, 0.1, 100);
        sceneController.registerCamera(this.camera)

        this.scene = new THREE.Scene()
        document.addEventListener('keydown', (event) => {
            if (this.active && this.passcodeCallback) {
                var keyCode = event.key
                if (keyCode === 'Escape') {
                    this.passcodeCallback()
                    this.active = false
                }
            }
        }, false)

        this.passcodeTextEntry = new ThreeEditableText({ onFocus: this.passcodeLoseFocus, camera: this.camera, font: this.fonts.getFont('System'), align: 'left', string: "", material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }) });
        this.passcodeText = new ThreeEditableText({ useDocumentListeners: false, font: this.fonts.getFont('System'), align: 'right', string: "Enter Passcode > ", material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }) });
        this.textObj = new ThreeEditableText({ useDocumentListeners: false, font: this.fonts.getFont('System'), string: "", material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }) });

        this.passcodeText.getObject().position.set(0.25, -4, 0)
        this.passcodeTextEntry.getObject().position.set(-0.25, -4, 0)

        this.setPasscodeVisible(false)

        this.camera.position.set(0, 0, 50)
        this.camera.lookAt(0, 0, 0)

        this.scene.add(this.passcodeTextEntry.getObject())
        this.scene.add(this.passcodeText.getObject())
        this.scene.add(this.textObj.getObject())

        sceneController.registerSceneLoop(({ delta, time, mouseRaycaster, worldRaycaster }) => {
            this.passcodeTextEntry.updateCursor()
            this.renderer.render(this.scene, this.camera)
        })
    }

    setPasscodeCallback(callback) {
        this.passcodeCallback = callback
    }

    passcodeLoseFocus(focus) {
        if (!focus && this.active) {
            if (this.passcodeCallback)
                this.passcodeCallback(this.passcodeTextEntry.getText())
            this.passcodeTextEntry.actionFocus(true)
        }
    }

    setPasscodeVisible(visible) {
        this.passcodeText.getObject().visible = visible
        this.passcodeTextEntry.getObject().visible = visible
        this.passcodeTextEntry.actionFocus(visible)
    }

    setText(text) {
        this.textObj.setText(text)
        if (text.includes('\n'))
            this.textObj.getObject().position.setY((this.textObj._line_height * text.match(/\n/g).length))
        else
            this.textObj.getObject().position.setY(0)
        this.update()
    }

    async awaitInput() {
        return new Promise((resolve, reject) => {
            document.addEventListener('click', () => { return resolve() })
        })
    }
}