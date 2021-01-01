import*as t from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{number as i}from"../util/number.js";export default class n{constructor(e,o){this.vector=new t.Vector3,this.camera=e,this.domElement=o,this.enabled=!1,this.mass=20,this.moveSensitivity=100,this.moveDamp=10,this.forward=!1,this.backward=!1,this.left=!1,this.right=!1,this.up=!1,this.down=!1,this.fly=!1,this.canJump=!1,this.lockXZ=!1,this.velocity=new t.Vector3,this.direction=new t.Vector3,this.raycaster=new t.Raycaster(new t.Vector3,new t.Vector3(0,-1,0),0,10),this.isLocked=!1,this.lockEvent={type:"lock"},this.unlockEvent={type:"unlock"},this.PI_2=Math.PI/2,this.vec=new t.Vector3,this.vec_=new t.Vector3,this.euler=new t.Euler(0,0,0,"YXZ"),this.onMouseMove=this.onMouseMove.bind(this),this.onPointerlockChange=this.onPointerlockChange.bind(this),this.onPointerlockError=this.onPointerlockError.bind(this)}input(e){if(this.enabled===!1||this.isLocked===!1)return;e.input.isDown("FORWARD")?this.forward=!0:this.forward=!1,e.input.isDown("LEFT")?this.left=!0:this.left=!1,e.input.isDown("BACKWARD")?this.backward=!0:this.backward=!1,e.input.isDown("RIGHT")?this.right=!0:this.right=!1,e.input.isPressed("v",!0)&&(this.lockXZ=!this.lockXZ),e.input.isDown("JUMP")?this.up=!0:this.up=!1,e.input.isDown("SHIFT",!0)?this.down=!0:this.down=!1}onMouseMove(e){if(this.enabled===!1||this.isLocked===!1)return;var o=e.movementX||e.mozMovementX||e.webkitMovementX||0,s=e.movementY||e.mozMovementY||e.webkitMovementY||0;this.euler.setFromQuaternion(this.camera.quaternion),this.euler.y-=o*.002,this.euler.x-=s*.002,this.euler.x=Math.max(-this.PI_2,Math.min(this.PI_2,this.euler.x)),this.camera.quaternion.setFromEuler(this.euler)}update(e){this.raycaster.ray.origin.copy(this.getObject().position),this.velocity.x-=this.velocity.x*this.moveDamp*e.delta,this.velocity.y-=this.velocity.y*this.moveDamp*e.delta,this.velocity.z-=this.velocity.z*this.moveDamp*e.delta,this.direction.x=i(this.right)-i(this.left),this.direction.y=i(this.up)-i(this.down),this.direction.z=i(this.forward)-i(this.backward),this.direction.normalize(),(this.forward||this.backward)&&(this.velocity.z-=this.direction.z*this.moveSensitivity*e.delta),(this.up||this.down)&&(this.velocity.y-=this.direction.y*this.moveSensitivity*e.delta),(this.left||this.right)&&(this.velocity.x-=this.direction.x*this.moveSensitivity*e.delta),this.moveRight(-this.velocity.x*e.delta),this.moveUp(-this.velocity.y*e.delta),this.moveForward(-this.velocity.z*e.delta),this.raycaster.ray.direction.copy(this.getDirection(this.vector).normalize())}onPointerlockChange(){if(!this.enabled)return;document.pointerLockElement===this.domElement?(this.lock(),this.isLocked=!0):(this.unlock(),this.isLocked=!1)}onPointerlockError(){console.log("FlyControls.js: Unable to use Pointer Lock API")}connect(){document.addEventListener("mousemove",this.onMouseMove,!1),document.addEventListener("pointerlockchange",this.onPointerlockChange,!1),document.addEventListener("pointerlockerror",this.onPointerlockError,!1),this.enabled=!0,this.lock()}disconnect(){document.removeEventListener("mousemove",this.onMouseMove,!1),document.removeEventListener("pointerlockchange",this.onPointerlockChange,!1),document.removeEventListener("pointerlockerror",this.onPointerlockError,!1),this.unlock(),this.enabled=!1}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(){let e=new t.Vector3(0,0,-1);return e.applyQuaternion(this.camera.quaternion),e}moveForward(e){this.lockXZ?(this.vec.setFromMatrixColumn(this.camera.matrix,0),this.vec.crossVectors(this.camera.up,this.vec),this.camera.position.addScaledVector(this.vec,e)):this.camera.position.addScaledVector(this.getDirection(this.vec_),e)}moveRight(e){this.vec.setFromMatrixColumn(this.camera.matrix,0),this.camera.position.addScaledVector(this.vec,e)}moveUp(e){this.vec.set(0,1,0),this.camera.position.addScaledVector(this.vec,e)}lock(){this.domElement.requestPointerLock()}unlock(){document.exitPointerLock()}}
