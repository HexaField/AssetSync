export default class BodySegmentation {
    constructor() { }

    async load() {
        this.net = await bodyPix.load({
            architecture: 'MobileNetV1',
            outputStride: 8,
            // multiplier: 1,
            quantBytes: 4
        })
    }

    async process({  canvas }) {
        if (this.net) {
            // make cutout
            this.net.segmentPerson(canvas, {
                flipHorizontal: true,
                internalResolution: 'medium',
                segmentationThreshold: 0.4
            }).then((segmentation) => {
                this.segmentation = segmentation
            })

            if(this.segmentation) {
                // apply cutout
                var imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
                var pixel = imageData.data;
                for (var p = 0; p < pixel.length; p += 4) {
                    if (this.segmentation.data[p / 4] == 0) {
                        pixel[p + 3] = 0;
                    }
                }
                canvas.getContext('2d').imageSmoothingEnabled = true
                canvas.getContext('2d').putImageData(imageData, 0, 0)
                return true
            }
        }
    }
}