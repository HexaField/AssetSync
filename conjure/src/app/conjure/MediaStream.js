
// import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.2"
// import "https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix@2.0"

export default async function capture() {
    try {
        const width = 320, height = 240

        const video = document.createElement('video')
        video.width = width
        video.height = height

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const inputStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })

        if ('srcObject' in video) {
            video.srcObject = inputStream
        } else {
            video.src = window.URL.createObjectURL(inputStream) // for older browsers
        }
        video.play()
        console.log('Loading net...')
        const net = await bodyPix.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            multiplier: 1,
            quantBytes: 2
        });
        console.log('Loaded net!')

        const outputStream = canvas.captureStream(60)
        loadAndBlur()

        async function loadAndBlur() {
            const segmentation = await net.segmentPerson(video, {
                flipHorizontal: true,
                internalResolution: 'low',
                segmentationThreshold: 0.33
            })
            drawBody(segmentation)
            requestAnimationFrame(loadAndBlur);
        }

        function drawBody(personSegmentation) {
            canvas.getContext('2d').clearRect(0, 0, width, height)
            canvas.getContext('2d').drawImage(video, 0, 0, width, height);
            var imageData = canvas.getContext('2d').getImageData(0, 0, width, height);
            var pixel = imageData.data;
            for (var p = 0; p < pixel.length; p += 4) {
                if (personSegmentation.data[p / 4] == 0) {
                    pixel[p + 3] = 0;
                }
            }

            canvas.getContext('2d').imageSmoothingEnabled = true;
            canvas.getContext('2d').putImageData(imageData, 0, 0)
        }

        return outputStream
    } catch (err) { console.log(err) }
}