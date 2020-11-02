import * as THREE from 'three'

export class AvatarControls {
    constructor(camera, user) {

        this.camera = camera
        this.user = user
        this.enabled = false

        this.offset = new THREE.Vector3(0, user.eyeHeight, 0.1)
        this.sensitivity = new THREE.Vector2(0.5, 0.5)
        this.radius = 8;
        this.targetRadius = 0
        this.interpolationFactor = 0.1
        this.theta = 0;
        this.phi = 0;

        // settings
        this.moveSensitivity = 50.0;
        this.moveDamp = 10.0;

		this.zoomSensitivity = 0.25;
		this.minDistance = 0.01;
		this.maxDistance = 8;
		this.zoom = this.minDistance;
        
        // internals

        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        this.sprint = false;
        this.crouch = false;

        this.mouseX = 0
        this.mouseY = 0
        this.lastMouseX = 0
        this.lastMouseY = 0
        
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        
        this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
        
        this.isLocked = false;    
        this.lockEvent = { type: 'lock' };
        this.unlockEvent = { type: 'unlock' };
        
        this.PI_2 = Math.PI / 2;
        
        this.vec = new THREE.Vector3();
        this.euler = new THREE.Euler( 0, 0, 0, 'YXZ' );

    }

    enable() {

        this.enabled = true

    }

    disable() {

        this.enabled = false

    }

    input({ input }) {
        this.forward = input.isDown('FORWARD')
        this.left = input.isDown('LEFT')
        this.backward = input.isDown('BACKWARD')
        this.right = input.isDown('RIGHT')
        
        this.sprint = input.isDown('SHIFT', true)
        this.crouch = input.isDown('CONTROL', true)
		if(input.isPressed('JUMP'))
            this.user.jump();
    }

    updateCamera(deltaX, deltaY)
    {
        const center = this.user.group.position.clone().add(this.offset)
        
        this.theta -= deltaX * (this.sensitivity.x / 2)
        this.theta %= 360
        this.phi += deltaY * (this.sensitivity.y / 2)
        this.phi = Math.min(85, Math.max(-85, this.phi))

        this.radius = THREE.MathUtils.lerp(this.radius, this.targetRadius, this.interpolationFactor)
        if(this.radius < this.minDistance)
            this.radius = this.minDistance

        this.camera.position.x = center.x + this.radius * Math.sin((this.theta * Math.PI) / 180) * Math.cos((this.phi * Math.PI) / 180)
        this.camera.position.y = center.y + this.radius * Math.sin((this.phi * Math.PI) / 180)
        this.camera.position.z = center.z + this.radius * Math.cos((this.theta * Math.PI) / 180) * Math.cos((this.phi * Math.PI) / 180)
        this.camera.updateMatrix()
        this.camera.lookAt(center)
    }

    update({ input, delta })
    {
        // if ( !this.enabled || !this.isLocked ) return
        
        this.raycaster.ray.origin.copy(this.camera.position);
        if(!this.user.group.body) return // havent loaded user yet - should fix this
        this.user.group.body.setAngularVelocityY(0)

        if(this.enabled)
        {
            this.updateCamera(input.mouseDelta.x, input.mouseDelta.y)

            // Third Person Rotation
            const rotation = this.camera.getWorldDirection(this.vec)
            let theta = Math.atan2(rotation.x, rotation.z) - Math.PI
            const rotationMan = this.user.group.getWorldDirection(this.vec)
            const thetaMan = Math.atan2(rotationMan.x, rotationMan.z)

            if(theta > Math.PI) theta -= Math.PI * 2
            if(theta < -Math.PI) theta += Math.PI * 2
            
            
            const l = Math.abs(theta - thetaMan)
            let rotationSpeed = 16//isTouchDevice ? 2 :
            let d = Math.PI / (128)
            if(l > Math.PI / 6)
                this.user.turnedTooMuch = true;
            else
                this.user.turnedTooMuch = false;
            if (l > d)
            {
                if (l > Math.PI) 
                    rotationSpeed *= -1
                if (theta < thetaMan) 
                    rotationSpeed *= -1
                if(!this.user.animMovementLock)
                    this.user.group.body.setAngularVelocityY(rotationSpeed * Math.min(l, Math.PI * 0.15) * (this.user.currentAnimation === 'falling' ? 0.2 : 1))
            }
            else
            {
                this.user.group.body.setAngularVelocityY(0)
                if(!this.user.animMovementLock)
                    this.user.group.body.setRotation(this.user.group.body.x, rotation.y, this.user.group.body.z);
            }
        }


        // Third Person Movement
        this.velocity.x -= this.velocity.x * this.moveDamp * delta;
        this.velocity.y -= this.velocity.y * this.moveDamp * delta;
        this.velocity.z -= this.velocity.z * this.moveDamp * delta;

        if(this.enabled)
        {
            if(Math.abs(this.velocity.x) < 0.01)
                this.velocity.x = 0;
            if(Math.abs(this.velocity.y) < 0.01)
                this.velocity.y = 0;
            if(Math.abs(this.velocity.z) < 0.01)
                this.velocity.z = 0;

            this.direction.x = number( this.right ) - number( this.left );
            // this.direction.y = number( this.up ) - number( this.down );
            this.direction.z = number( this.forward ) - number( this.backward );
            this.direction.normalize();

            if ( this.forward || this.backward ) this.velocity.z -= this.direction.z * this.moveSensitivity * delta;
            // if ( this.up || this.down ) this.velocity.y -= this.direction.y * this.moveSensitivity * delta;
            if ( this.left || this.right ) this.velocity.x -= this.direction.x * this.moveSensitivity * delta;
            
        }
        if(!this.user.animMovementLock)
        {
            this.speedMulti = this.user.onGround ? (this.sprint ? 1.6 : 0.5) : 0.5

            this.moveRight( -this.velocity.x * this.speedMulti * 0.6);
            this.moveForward( -this.velocity.z  * this.speedMulti);
        }    
        if(this.zoom > this.minDistance * 2)
        {
            // console.log(this.zoom)
            // this.camera.updateMatrix();
            // this.camera.lookAt(this.user.group.position.clone().add(this.controls.offset));
        }

        this.raycaster.ray.direction.copy(this.getDirection(this.vec).normalize());
        if(this.zoom < 3)
        {
            // refactor this to take distance to the camera in User.js instead
            this.user.setTransparency(this.zoom <= this.minDistance ? 0 : this.zoom);
        }
        this.lastMouseX = input.mouse.x;
        this.lastMouseY = input.mouse.y;
    }

    moveForward(distance)
    {
        // move forward parallel to the xz-plane
        // assumes camera.up is y-up)
        this.vec.setFromMatrixColumn(this.camera.matrix, 0);
        this.vec.crossVectors(this.camera.up, this.vec);
        this.vec.multiplyScalar(distance);
        this.user.group.body.setVelocity(this.user.group.body.velocity.x + this.vec.x, this.user.group.body.velocity.y, this.user.group.body.velocity.z + this.vec.z);
	}

    moveRight(distance)
    {
        this.vec.setFromMatrixColumn(this.camera.matrix, 0);
        this.vec.multiplyScalar(distance);
        this.user.group.body.setVelocity(this.vec.x, this.user.group.body.velocity.y, this.vec.z);
	}

}