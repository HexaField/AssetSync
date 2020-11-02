export default class pinput {
	constructor() {
		this.realState = {
			keyStates: new Array(256),
			mouseStates: new Array(3),
			mousePosition: { x: 0, y: 0 },
			mouseMovement: { x: 0, y: 0 }
		}

		this.keyStates = new Array(256);
		this.previousKeyStates = new Array(256);

		// analogous to *keyStates* and *previousKeyStates* 
		this.mouseStates = new Array(3);
		this.previousMouseStates = new Array(3);

		this.useRealState = false;

		this.mousePosition = {
			x: 0,
			y: 0,
		}

		this.mouseMovement = {
			x: 0,
			y: 0,
		}

		this.lastMousePosition = {
			x: 0,
			y: 0,
		}

		// initializes all the keyStates to their resting 
		// position - not pressed
		for (var i = 0; i < this.keyStates.length; i++) {
			this.keyStates[i] = false;
			this.previousKeyStates[i] = false;
		}

		// same as *keyStates* initialization
		for (var i = 0; i < this.mouseStates.length; i++) {
			this.mouseStates[i] = false;
			this.previousMouseStates[i] = false;
		}
        
		window.addEventListener('keydown', (e) => {
			if (e.which == 18)
				e.preventDefault();
			this.realState.keyStates[e.which] = true;
		})

		window.addEventListener('keyup', (e) => {
			this.realState.keyStates[e.which] = false;
		})

		window.addEventListener('mousedown', (e) => {
			this.realState.mouseStates[e.button] = true;
		})

		window.addEventListener('mouseup', (e) => {
			this.realState.mouseStates[e.button] = false;
		})

		window.addEventListener('mousemove', (e) => {
			this.realState.mousePosition.x = e.clientX;
			this.realState.mousePosition.y = e.clientY;
			this.realState.mouseMovement.x = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
			this.realState.mouseMovement.y = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
		})

		this.isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	}

	// checks if the browser is firefox. used for determining some 
	// edge cases, as some key codes differ from browser to browser.

	// removes all whitespace from a given string.
	removeWhiteSpace(string) {
		var input = input + "";
		return string.replace(/\s+/, '');
	}

	// replaces all consecutive instances of whitespace in a given
	// string with one space.
	stripWhiteSpace(string) {
		var input = input + "";
		return string.replace(/\s+/, ' ');
	}

	// converts a string to a keycode
	convertStringToKeycode(key) {
		var key = this.removeWhiteSpace(key);
		key = key.toUpperCase();

		switch (key) {
			case "BACKSPACE":
				return ['key', 8];
			case "SPACEBAR":
				return ['key', 32];
			case "TAB":
				return ['key', 9];
			case "ENTER":
				return ['key', 13];
			case "SHIFT":
				return ['key', 16];
			case "CONTROL":
				return ['key', 17];
			case "ALT":
				return ['key', 18];
			case "CAPSLOCK":
				return ['key', 20];
			case "ESCAPE":
				return ['key', 27];
			case "PAGEUP":
				return ['key', 33];
			case "PAGEDOWN":
				return ['key', 34];
			case "ARROWLEFT":
				return ['key', 37];
			case "ARROWUP":
				return ['key', 38];
			case "ARROWRIGHT":
				return ['key', 38];
			case "ARROWDOWN":
				return ['key', 40];
			case "INSERT":
				return ['key', 45];
			case "DELETE":
				return ['key', 46];
			case "GRAVE":
				return ['key', 192];
			case "+":
				return ['key', isFireFox ? 61 : 187];
			case "=":
				return ['key', isFireFox ? 61 : 187];
			case "-":
				return ['key', isFireFox ? 173 : 189];
			case "[":
				return ['key', 219];
			case "]":
				return ['key', 221];
			case "/":
				return ['key', 191];
			case "\\":
				return ['key', 220];
			default:
				return ['key', key.charCodeAt(0)];

		}
	}

	// converts a string of space separated keys to an array
	// of keycodes which can be used to check their states
	convertStringToKeyCombo(keyCombo) {
		var keyComboString = this.stripWhiteSpace(keyCombo);
		var combo = keyComboString.split(' ');

		for (var i = 0; i < combo.length; i++) {
			combo[i] = this.convertStringToKeycode(combo[i]);
		};
		return combo;
	}

	// same as *convertStringToKeyCombo* but with mouse buttons
	convertStringToButtonCode(buttonCode) {
		var code = this.removeWhiteSpace(buttonCode);
		code = code.toUpperCase();

		switch (buttonCode) {
			case "MOUSELEFT":
				return ['mouse', 0];
			case "MOUSEMIDDLE":
				return ['mouse', 1];
			case "MOUSERIGHT":
				return ['mouse', 2];
			default:
				return null;
		}
	}

	convertStringToCombo(combo) {
		var combo = this.stripWhiteSpace(combo);
		var tokens = combo.split(' ');
		var keysAndButtons = [];

		for (var i = 0; i < tokens.length; i++) {
			var code = this.convertStringToButtonCode(tokens[i]);

			if (code != null) {
				keysAndButtons.push(code)
			}
			else {
				keysAndButtons.push(this.convertStringToKeycode(tokens[i]));
			}
		}

		return keysAndButtons;
	}

	checkCombo(combination, mouseStates, keyStates) {
		var combo = this.convertStringToCombo(combination);

		for (var i = 0; i < combo.length; i++) {
			if (combo[i][0] === 'mouse') {
				if (!mouseStates[combo[i][1]]) {
					return false;
				}
			}
			else {
				if (!keyStates[combo[i][1]]) {
					return false;
				}
			}
		}
		return true;
	}

	// initializes the *realState* with the default values
	init() {
		for (var i = 0; i < this.realState.keyStates.length; i++) {
			this.realState.keyStates[i] = false;
		}

		for (var i = 0; i < this.realState.mouseStates.length; i++) {
			this.realState.mouseStates[i] = false;
		}
	}

	// checks whether the given key is down in the given array.
	isKeyDown(key, keyStateArray) {
		var keyCode = this.convertStringToKeycode(key);
		return keyStateArray[keyCode];
	}

	// same as *isKeyDown* but with mouse button
	isButtonDown(button, buttonStateArray) {
		var buttonCode = this.convertStringToButtonCode(button);
		return buttonStateArray[buttonCode];
	}

	// checks if the key was clicked given an array of keystates and
	// an array of previous key states
	isKeyClicked(key, currentKeyStateArray, previousKeyStateArray) {
		return this.isKeyDown(key, currentKeyStateArray) && !this.isKeyDown(key, previousKeyStateArray);
	}

	// same as *isKeyClicked* but with mouse buttons
	isButtonClicked(key, currentButtonStateArray, previousButtonStateArray) {
		return this.isButtonDown(key, currentButtonStateArray) && !this.isButtonDown(key, previousButtonStateArray);
	}

	isReleased(combo) {
		return !this.checkCombo(combo, this.mouseStates, this.keyStates) &&
			this.checkCombo(combo, this.previousMouseStates, this.previousKeyStates);
	}

	isPressed(combo) {
		return this.checkCombo(combo, this.mouseStates, this.keyStates) &&
			!this.checkCombo(combo, this.previousMouseStates, this.previousKeyStates);
	}

	isDown(combo) {
		if (this.useRealState) {
			this.mousePosition.x = this.realState.mousePosition.x;
			this.mousePosition.y = this.realState.mousePosition.y;
			return this.checkCombo(combo, this.realState.mouseStates, this.realState.keyStates);
		}
		return this.checkCombo(combo, this.mouseStates, this.keyStates);
	}

	// updates the key and mouse states of the current *pinput* instance.
	// the previous key and mouse states are set to the current ones, and
	// the current ones are set to reflect the actual state of the keyboard
	// and mouse.
	update() {
        this.previousKeyStates = this.keyStates.slice(0);
		this.keyStates = this.realState.keyStates.slice(0);
        
		this.previousMouseStates = this.mouseStates.slice(0);
		this.mouseStates = this.realState.mouseStates.slice(0);

		this.lastMousePosition.x = this.mousePosition.x;
		this.lastMousePosition.y = this.mousePosition.y;

		this.mousePosition.x = this.realState.mousePosition.x;
		this.mousePosition.y = this.realState.mousePosition.y;

		this.mouseMovement.x = this.realState.mouseMovement.x;
		this.mouseMovement.y = this.realState.mouseMovement.y;
		this.realState.mouseMovement.x = 0;
		this.realState.mouseMovement.y = 0;
	}
}