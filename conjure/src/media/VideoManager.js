import { generateUUID } from '@AssetSync/common'

export class VideoManager {
    constructor(worldSync) {
        this.worldSync = worldSync
    }

    async createVideo(mediaURL) {

        const UUID = 'videoStream' + generateUUID()

        let video = document.createElement( 'video' );
        video.crossOrigin = "anonymous";
        video.loop = true

        const req = new XMLHttpRequest();
        req.open('GET', mediaURL, true);
        req.responseType = 'blob';

        req.onload = (result) => {
            if (result.target.status === 200 && video)
            {
                let videoBlob = result.target.response;
                let vid = URL.createObjectURL(videoBlob);
                video.src = vid;
                video.play();
                video.volume = 0

                const stream = video.captureStream();
                console.log(video, stream, stream.getVideoTracks())
                const [track] = stream.getVideoTracks();
                const imageCapture = new ImageCapture(track);

                function updateVideo() {

                    imageCapture.grabFrame().then(imageBitmap => {
                        console.log(UUID, imageBitmap)
                        this.worldSync._peerSync.sendEvent({ 
                                type: UUID,
                                imageBitmap 
                            },
                            [imageBitmap]
                        )
                    })

                    video.requestVideoFrameCallback( updateVideo )
                }

                // create audio

                if ( 'requestVideoFrameCallback' in video ) {
                    video.requestVideoFrameCallback( updateVideo )
                }
            }
        }
        req.onerror = () => {
            console.log('Failed to get video at', mediaURL)
        }
        req.send();

        return UUID

    }

    createGif(url) {

    }
}