
// import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.2"
// import "https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix@2.0"
// https://stackoverflow.com/questions/56747195/is-there-a-way-to-send-video-data-from-a-video-tag-mediastream-to-an-offscreenca
import BodySegmentation from './BodySegmentation.js'

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
        const audioTracks = inputStream.getAudioTracks()

        if ('srcObject' in video) {
            video.srcObject = inputStream
        } else {
            video.src = window.URL.createObjectURL(inputStream) // for older browsers
        }
        video.play()
        video.volume = 0

        const outputStream = canvas.captureStream(60)

        const processors = []
        processors.push(new BodySegmentation())
        processors.forEach((processor) => {
            processor.load()
        })

        async function processStream() {
            canvas.getContext('2d').clearRect(0, 0, width, height)
            canvas.getContext('2d').drawImage(video, 0, 0, width, height)
            processors.forEach((processor) => {
                processor.process({ width, height, video, canvas })
            })
            requestAnimationFrame(processStream);
        }
        processStream()

        audioTracks.forEach((track) => {
            outputStream.addTrack(track)
        })

        return outputStream
    } catch (err) { console.log(err) }
}