import * as THREE from 'three'
// import Events from './Events'
import { number } from '../../util/number'

export default class FlyControls
{  
    constructor(camera, domElement)
    {
        this.vector = new THREE.Vector3();
        this.camera = camera;
        this.domElement = domElement;

        this.enabled = false;

        this.mass = 20;
        this.moveSensitivity = 100.0;
        this.moveDamp = 10.0;

        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.fly = false;
        this.canJump = false;
        this.lockXZ = false;
        
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

        this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        // from PointerLockControls.js

        this.isLocked = false;
    
        this.lockEvent = { type: 'lock' };
        this.unlockEvent = { type: 'unlock' };
    
        this.PI_2 = Math.PI / 2;
        
        this.vec = new THREE.Vector3();
        this.vec_ = new THREE.Vector3();
        this.euler = new THREE.Euler( 0, 0, 0, 'YXZ' );

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onPointerlockChange = this.onPointerlockChange.bind(this);
        this.onPointerlockError = this.onPointerlockError.bind(this);
    }

    input(updateArgs)
    {
        if ( this.enabled === false || this.isLocked === false ) return;
        if(updateArgs.input.isDown('FORWARD'))
            this.forward = true;
        else
            this.forward = false;
        
        if(updateArgs.input.isDown('LEFT'))
            this.left = true;
        else
            this.left = false;

        if(updateArgs.input.isDown('BACKWARD'))
            this.backward = true;
        else
            this.backward = false;
        
        if(updateArgs.input.isDown('RIGHT'))
            this.right = true;
        else
            this.right = false;

        if(updateArgs.input.isPressed('v', true))
            this.lockXZ = !this.lockXZ;

        if(updateArgs.input.isDown('JUMP'))
            this.up = true;
        else
            this.up = false;
        if(updateArgs.input.isDown('SHIFT', true))
            this.down = true;
        else
            this.down = false;        
    }

    onMouseMove( event )
    {
        if ( this.enabled === false || this.isLocked === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        // console.log(movementX, movementY);
        this.euler.setFromQuaternion( this.camera.quaternion );
        
		this.euler.y -= movementX * 0.002;
		this.euler.x -= movementY * 0.002;
        
		this.euler.x = Math.max( - this.PI_2, Math.min( this.PI_2, this.euler.x ) );
        
		this.camera.quaternion.setFromEuler( this.euler );
    }
    

    update(updateArgs)
    {
        this.raycaster.ray.origin.copy( this.getObject().position );
        
        this.velocity.x -= this.velocity.x * this.moveDamp * updateArgs.delta;
        this.velocity.y -= this.velocity.y * this.moveDamp * updateArgs.delta;
        this.velocity.z -= this.velocity.z * this.moveDamp * updateArgs.delta;

        this.direction.x = number( this.right ) - number( this.left );
        this.direction.y = number( this.up ) - number( this.down );
        this.direction.z = number( this.forward ) - number( this.backward );
        this.direction.normalize(); // this ensures consistent movements in all directions

        if ( this.forward || this.backward ) this.velocity.z -= this.direction.z * this.moveSensitivity * updateArgs.delta;
        if ( this.up || this.down ) this.velocity.y -= this.direction.y * this.moveSensitivity * updateArgs.delta;
        if ( this.left || this.right ) this.velocity.x -= this.direction.x * this.moveSensitivity * updateArgs.delta;
        
        this.moveRight( - this.velocity.x * updateArgs.delta );
        this.moveUp( - this.velocity.y * updateArgs.delta );
        this.moveForward( - this.velocity.z * updateArgs.delta );

        this.raycaster.ray.direction.copy(this.getDirection(this.vector).normalize()); // this is for control switching
    }
    
    onPointerlockChange()
    {
        if(!this.enabled) return;
        if ( document.pointerLockElement === this.domElement )
        {
			this.lock();
			this.isLocked = true;
        }
        else
        {
			this.unlock();
			this.isLocked = false;
		}
	}

    onPointerlockError()
    {
		console.log( 'FlyControls.js: Unable to use Pointer Lock API' );
    }

    connect()
    {
        document.addEventListener( 'mousemove', this.onMouseMove, false );
		document.addEventListener( 'pointerlockchange', this.onPointerlockChange, false );
		document.addEventListener( 'pointerlockerror', this.onPointerlockError, false );
        this.enabled = true;
        this.lock();
	}

    disconnect()
    {
        document.removeEventListener( 'mousemove', this.onMouseMove, false );
		document.removeEventListener( 'pointerlockchange', this.onPointerlockChange, false );
        document.removeEventListener( 'pointerlockerror', this.onPointerlockError, false );
        this.unlock();
        this.enabled = false;
    }
    
    dispose()
    {
		this.disconnect();
	}

    getObject()  // retaining this method for backward compatibility
    {
		return this.camera;
	}

    getDirection()
    {
		let direction = new THREE.Vector3( 0, 0, - 1 );
		direction.applyQuaternion( this.camera.quaternion );
		return direction;
	}

    moveForward( distance )
    {
        if(this.lockXZ)
        {
            // move forward parallel to the xz-plane
            // assumes camera.up is y-up
            this.vec.setFromMatrixColumn( this.camera.matrix, 0 );
            this.vec.crossVectors( this.camera.up, this.vec );
            this.camera.position.addScaledVector( this.vec, distance );
        }
        else
        {
            // move in the direction the camera is looking
            this.camera.position.addScaledVector( this.getDirection(this.vec_), distance);
        }
	}

    moveRight( distance )
    {
		this.vec.setFromMatrixColumn( this.camera.matrix, 0 );
        this.camera.position.addScaledVector( this.vec, distance );
	}

    moveUp( distance )
    {
        this.vec.set(0,1,0);
		this.camera.position.addScaledVector( this.vec, distance );
    }
    
    lock()
    {
		this.domElement.requestPointerLock();
	}

    unlock()
    {
		document.exitPointerLock();
	}
}