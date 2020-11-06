import { RGBAFormat, RGBFormat, CanvasTexture, Loader, ImageBitmapLoader } from 'three';

export class TextureLoader extends Loader
{
	constructor(manager) 
	{
		super(manager)
	}

	load ( url, onLoad, onProgress, onError ) {
		
		const texture = new CanvasTexture();

		const loader = new ImageBitmapLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.setPath( this.path );

		loader.load( url, function ( image ) {

			texture.image = image;

			// JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
			const isJPEG = url.search( /\.jpe?g($|\?)/i ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

			texture.format = isJPEG ? RGBFormat : RGBAFormat;
			texture.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

		return texture;

	}

}